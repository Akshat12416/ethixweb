import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { resolve } from 'node:path';

async function capture() {
  const browser = await Browser.launch();
  const page = await browser.newPage({ width: 1440, height: 900 });

  // 1. Navigate to page
  await page.goto('http://localhost:4173/', { timeoutMs: 15000, settleMs: 50 });
  
  // Frame 1: Preloader state at 350ms (only centered web on blank white screen)
  await sleep(350);
  await page.screenshot({ path: resolve('.taste-skill/inspect/preloader-frame-1-loading.jpg'), quality: 85 });
  console.log('Captured Frame 1: Preloader active');

  // Frame 2: Mid-transition at 1250ms (web falling down, texts emerging from behind)
  await sleep(900);
  await page.screenshot({ path: resolve('.taste-skill/inspect/preloader-frame-2-transition.jpg'), quality: 85 });
  console.log('Captured Frame 2: Drop and emergence transition');

  // Frame 3: Settled hero at 2200ms
  await sleep(1000);
  await page.screenshot({ path: resolve('.taste-skill/inspect/preloader-frame-3-settled.jpg'), quality: 85 });
  console.log('Captured Frame 3: Hero settled');

  await browser.close();
}

capture().catch(console.error);
