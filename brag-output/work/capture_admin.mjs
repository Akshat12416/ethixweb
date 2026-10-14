import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const WORK_DIR = path.resolve('brag-output/work');
const PORT = 9444;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${PORT}`,
    '--window-size=1920,1080',
    'about:blank'
  ]);

  await sleep(1500);

  const versionRes = await fetch(`http://localhost:${PORT}/json/version`);
  const versionData = await versionRes.json();
  const ws = new WebSocket(versionData.webSocketDebuggerUrl);

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

  // Navigate to /admin
  await sendSession('Page.navigate', { url: 'http://localhost:5173/admin' });
  await sleep(1500);

  // Type passcode and submit if input is present
  await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const input = document.querySelector('input[type="password"]');
      if (input) {
        input.value = 'ethix2026';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        const btn = document.querySelector('button[type="submit"]');
        if (btn) btn.click();
      }
    })()`
  });

  await sleep(2500);

  const { result: { data } } = await sendSession('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(WORK_DIR, 'ethix_admin_dashboard.png'), Buffer.from(data, 'base64'));
  console.log('Saved ethix_admin_dashboard.png');

  // Also capture Contact page zoomed in
  await sendSession('Page.navigate', { url: 'http://localhost:5173/contact' });
  await sleep(1500);
  const { result: { data: contactData } } = await sendSession('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(WORK_DIR, 'ethix_contact_full.png'), Buffer.from(contactData, 'base64'));
  console.log('Saved ethix_contact_full.png');

  ws.close();
  chrome.kill();
}

main().catch(console.error);
