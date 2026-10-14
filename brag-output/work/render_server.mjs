import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const PORT = 3888;
const WORK_DIR = path.resolve('brag-output/work');
const FRAMES_DIR = path.join(WORK_DIR, 'frames');

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

// Map static paths
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = urlObj.pathname;

  if (pathname === '/') {
    const htmlPath = path.join(WORK_DIR, 'generator.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(htmlPath));
  } else if (pathname === '/frame') {
    const frameIndex = urlObj.searchParams.get('i');
    const padded = String(frameIndex).padStart(4, '0');
    const outPath = path.join(FRAMES_DIR, `frame_${padded}.jpg`);
    const fileStream = fs.createWriteStream(outPath);
    req.pipe(fileStream);
    req.on('end', () => {
      res.writeHead(200);
      res.end('ok');
    });
  } else if (pathname === '/done') {
    res.writeHead(200);
    res.end('done');
    console.log('\nAll frames received! Closing render server.');
    server.close();
    process.exit(0);
  } else if (pathname.startsWith('/fonts/')) {
    const fontFile = path.resolve('public', pathname.slice(1));
    if (fs.existsSync(fontFile)) {
      res.writeHead(200, { 'Content-Type': 'font/woff2' });
      fs.createReadStream(fontFile).pipe(res);
      return;
    }
    res.writeHead(404); res.end();
  } else if (pathname.startsWith('/assets/')) {
    const assetFile = path.resolve('src/assets', pathname.slice(8));
    const ext = path.extname(assetFile);
    if (fs.existsSync(assetFile)) {
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(assetFile).pipe(res);
      return;
    }
    res.writeHead(404); res.end();
  } else if (pathname.startsWith('/screenshots/')) {
    const shotFile = path.resolve('screenshots', pathname.slice(13));
    if (fs.existsSync(shotFile)) {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      fs.createReadStream(shotFile).pipe(res);
      return;
    }
    res.writeHead(404); res.end();
  } else if (pathname.startsWith('/work/')) {
    const workFile = path.resolve(WORK_DIR, pathname.slice(6));
    const ext = path.extname(workFile);
    if (fs.existsSync(workFile)) {
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(workFile).pipe(res);
      return;
    }
    res.writeHead(404); res.end();
  } else {
    res.writeHead(404); res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Render server listening on http://localhost:${PORT}`);
  console.log('Launching headless Chrome to render 660 frames (1920x1080 @ 30fps)...');
  
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1920,1080',
    `http://localhost:${PORT}`
  ]);

  chrome.stderr.on('data', d => {
    const msg = d.toString();
    if (!msg.includes('GL') && !msg.includes('font')) {
      // console.log('[Chrome]', msg.trim());
    }
  });

  chrome.on('exit', (code) => {
    console.log(`Chrome process finished (code ${code})`);
  });
});
