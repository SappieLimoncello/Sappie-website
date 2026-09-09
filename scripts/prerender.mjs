// Draait als postbuild-stap (zie package.json) na `vite build`. De site is
// een pure client-side React-app; zonder dit script bevat elke pagina in
// dist/ alleen een lege <div id="root"> totdat JavaScript is uitgevoerd, en
// crawlers die geen JS draaien zien dus niets van de inhoud. Dit script
// serveert de build lokaal, opent elke publieke pagina in een headless
// browser en schrijft de resulterende HTML terug naar dist/, zodat er
// meteen gevulde content staat.
//
// PRERENDER_ROUTES is de enige plek die bepaalt welke pagina's platte HTML
// krijgen. Bewust géén automatisch volgen van links: alleen routes die hier
// (of in EXCLUDED_ROUTES) met naam genoemd staan, worden meegenomen. Nieuwe
// routes in src/App.jsx die in geen van beide lijsten voorkomen, laten de
// build falen (zie checkRoutesAccountedFor) — zo kan een pagina nooit per
// ongeluk stilzwijgend wel of niet geprerenderd worden.
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;
const NAV_TIMEOUT_MS = 20_000;

const PRERENDER_ROUTES = [
  '/',
  '/productie',
  '/winkels-en-restaurants',
  '/reviews',
  '/contact',
  '/bestellen',
  '/welkom-bij-sappie',
  '/siroop-bestellen',
  '/algemene-voorwaarden',
  '/privacy-statement',
];

// Route -> reden waarom die bewust geen platte HTML krijgt.
const EXCLUDED_ROUTES = {
  '/welkom': 'redirect naar /welkom-bij-sappie, geen eigen inhoud',
  '/around-the-world': 'nog niet in het menu, bewust nog niet vindbaar voor crawlers',
};

function checkRoutesAccountedFor() {
  const appSource = readFileSync(join(ROOT, 'src', 'App.jsx'), 'utf8');
  const found = [...appSource.matchAll(/<Route path="([^"]+)"/g)].map((m) => m[1]);
  const known = new Set([...PRERENDER_ROUTES, ...Object.keys(EXCLUDED_ROUTES)]);
  const missing = found.filter((path) => !known.has(path));
  if (missing.length > 0) {
    throw new Error(
      `Nieuwe route(s) in src/App.jsx staan nog niet in scripts/prerender.mjs: ${missing.join(', ')}. ` +
        'Voeg toe aan PRERENDER_ROUTES (wel platte HTML) of EXCLUDED_ROUTES (bewust niet, met reden erbij).',
    );
  }
}

async function waitForServer(url, attemptsLeft = 40) {
  try {
    await fetch(url);
  } catch {
    if (attemptsLeft <= 0) throw new Error('vite preview-server kwam niet op tijd online');
    await new Promise((r) => setTimeout(r, 250));
    await waitForServer(url, attemptsLeft - 1);
  }
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  try {
    page.setDefaultNavigationTimeout(NAV_TIMEOUT_MS);
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle2' });
    const html = await page.content();
    const outDir = route === '/' ? DIST : join(DIST, route.replace(/^\//, ''));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    console.log(`  ✓ ${route}`);
  } finally {
    await page.close();
  }
}

async function main() {
  checkRoutesAccountedFor();

  // Eén stringcommando i.p.v. een args-array: Node waarschuwt (DEP0190) dat
  // argumenten bij shell:true niet escaped worden — hier ongevaarlijk omdat
  // alles hardcoded is, maar zo voorkomen we de waarschuwing toch.
  // detached zodat we op Linux/macOS de hele procesgroep kunnen doden i.p.v.
  // alleen de shell-wrapper (`npx` start zelf weer een kindproces voor vite,
  // dat anders na preview.kill() kan blijven hangen en de poort bezet houdt).
  const preview = spawn(`npx vite preview --port ${PORT} --strictPort`, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: true,
    detached: process.platform !== 'win32',
  });

  try {
    await waitForServer(BASE_URL);
    // --no-sandbox is nodig in de meeste CI-buildomgevingen (zo ook Netlify's
    // buildcontainer), waar Chromium's eigen OS-sandbox niet mag opstarten.
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    try {
      console.log(`Prerendering ${PRERENDER_ROUTES.length} pagina's...`);
      for (const route of PRERENDER_ROUTES) {
        try {
          await prerenderRoute(browser, route);
        } catch (err) {
          // Eén trage/flaky pagina (bv. de kaart die live Mapbox-tiles laadt)
          // mag de hele build niet laten falen: die pagina blijft dan gewoon
          // de normale client-side-gerenderde SPA-pagina, zoals voorheen.
          console.warn(`  ! ${route} kon niet worden geprerenderd, sla over: ${err.message}`);
        }
      }
    } finally {
      await browser.close();
    }
  } finally {
    stopServer(preview);
  }
}

function stopServer(child) {
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(child.pid), '/t', '/f']);
  } else {
    try {
      process.kill(-child.pid);
    } catch {
      child.kill();
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
