import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const WORK_DIR = path.resolve('brag-output/work');
const PORT = 9333;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('Launching Chrome with remote debugging on port', PORT);
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${PORT}`,
    '--window-size=1920,1080',
    'about:blank'
  ]);

  await sleep(1500);

  // Get websocket debugger URL
  const versionRes = await fetch(`http://localhost:${PORT}/json/version`);
  const versionData = await versionRes.json();
  const wsUrl = versionData.webSocketDebuggerUrl;
  console.log('CDP WS URL:', wsUrl);

  const ws = new WebSocket(wsUrl);

  let id = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      cb(msg);
    }
  };

  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  // Create new target
  const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
  const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });

  function sendSession(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, sessionId, method, params }));
    });
  }

  await sendSession('Page.enable');
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false
  });

  const pagesToCapture = [
    { url: 'http://localhost:5173/?skip=1', name: 'ethix_home.png', wait: 2500, pre: async () => {
      await sendSession('Runtime.evaluate', { expression: 'sessionStorage.setItem("skipPreloader", "true");' });
    }},
    { url: 'http://localhost:5173/our-work', name: 'ethix_our_work.png', wait: 2000 },
    { url: 'http://localhost:5173/services', name: 'ethix_services.png', wait: 2000 },
    { url: 'http://localhost:5173/about', name: 'ethix_about.png', wait: 2000 },
    { url: 'http://localhost:5173/contact', name: 'ethix_contact.png', wait: 2000 },
    { url: 'http://localhost:5173/admin', name: 'ethix_admin.png', wait: 2500, pre: async () => {
      await sendSession('Runtime.evaluate', { expression: 'sessionStorage.setItem("ethix_admin_token", "ethix2026"); location.reload();' });
      await sleep(1500);
    }}
  ];

  for (const p of pagesToCapture) {
    console.log(`Navigating to ${p.url} -> ${p.name}`);
    await sendSession('Page.navigate', { url: p.url });
    if (p.pre) await p.pre();
    await sleep(p.wait);
    const { result: { data } } = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(WORK_DIR, p.name), Buffer.from(data, 'base64'));
    console.log(`Saved ${p.name} (${data.length} b64 bytes)`);
  }

  ws.close();
  chrome.kill();
  console.log('Finished capturing all live EthixWeb pages!');
}

main().catch(err => {
  console.error('Error capturing live pages:', err);
  process.exit(1);
});
