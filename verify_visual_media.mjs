import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';

const PORT = 3000;
const BASE_URL = `http://127.0.0.1:${PORT}/polar-science-portal/`;

async function main() {
  console.log('🚀 Starting Vite preview server...');
  const previewProcess = spawn('npx.cmd', ['vite', 'preview', '--port', PORT.toString(), '--host'], {
    cwd: 'c:\\Users\\FestB\\Downloads\\polar-science-portal-main',
    shell: true,
    stdio: 'pipe'
  });

  await new Promise((resolve) => setTimeout(resolve, 3500));

  let browser;
  try {
    const executablePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
    console.log(`🌐 Launching browser (${executablePath})...`);
    browser = await chromium.launch({
      executablePath,
      headless: true
    });

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.error(`❌ Console Error: ${msg.text()}`);
      }
    });

    const artifactDir = 'C:/Users/FestB/.gemini/antigravity/brain/d39d7a72-7277-4ada-83dc-3a95cd3608f4';

    console.log('📌 Navigating to portal root...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Click 'Learn & Challenge' pillar
    console.log('🎓 Clicking Learn & Challenge pillar...');
    await page.click('button:has-text("Learn & Challenge")');
    await page.waitForTimeout(1000);

    // 1. Test Polar Species Directory
    console.log('📸 1. Clicking Polar Species Directory sub-nav...');
    await page.click('button:has-text("Polar Species Directory")');
    await page.waitForTimeout(1500);

    console.log('📸 Capturing Species Directory image...');
    await page.screenshot({ path: `${artifactDir}/media_01_species_penguin.png` });

    // Click image to test Lightbox
    console.log('🔍 Clicking image to test Fullscreen Lightbox...');
    await page.click('div:has-text("FIELD OBSERVATION")');
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${artifactDir}/media_02_species_lightbox.png` });

    // Press Escape to close lightbox
    console.log('⌨️ Pressing Escape to close Lightbox...');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(800);

    // Switch species to Polar Bear
    console.log('🐻 Switching to Polar Bear species...');
    await page.click('button:has-text("Polar Bear")');
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${artifactDir}/media_03_species_polar_bear.png` });

    // 2. Test Educational Modules / Learn Hub
    console.log('📸 2. Clicking Educational Modules sub-nav...');
    await page.click('button:has-text("Educational Modules")');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${artifactDir}/media_04_learn_module_cryosphere.png` });

    // Click module banner image to test Lightbox
    console.log('🔍 Clicking Learn module banner to test Lightbox...');
    await page.click('div:has-text("SCIENTIFIC VISUALIZATION")');
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${artifactDir}/media_05_learn_lightbox.png` });

    // Press Escape to close lightbox
    await page.keyboard.press('Escape');
    await page.waitForTimeout(800);

    // Switch module to Atmospheric Circulation
    console.log('🌤️ Switching to Atmospheric Circulation module...');
    await page.click('button:has-text("The Antarctic Ozone Hole")');
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${artifactDir}/media_06_learn_module_atmosphere.png` });

    console.log('====================================');
    console.log(`Total Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length === 0) {
      console.log('✅ PERFECT RECORD: 0 Browser Console Errors across all media tests!');
    } else {
      console.log(`⚠️ Console errors logged:`, consoleErrors);
    }
    console.log('====================================');

  } catch (err) {
    console.error('❌ Verification script failed:', err);
  } finally {
    if (browser) await browser.close();
    previewProcess.kill('SIGTERM');
    process.exit(0);
  }
}

main();
