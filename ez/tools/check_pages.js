// Smoke test for the live pages after a sheet sync or a new film.
//   node ez/tools/check_pages.js
// Needs Playwright (npm i -g playwright, or the preinstalled one). Loads each page, reports errors,
// the round counts it sees, which rounds can play, and whether every film file exists.
const path = require('path'), fs = require('fs');
let pw; try { pw = require('playwright'); } catch (e) { pw = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright'); }
const EZ = path.join(__dirname, '..');
const PAGES = ['v6-primetime.html', 'v9-primetime-kraft.html'];
(async () => {
  const b = await pw.chromium.launch(); let bad = 0;
  for (const f of PAGES) {
    const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
    await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());   // fonts are cosmetic here
    const p = await ctx.newPage(), errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errs.push(m.text()) });
    await p.goto('file://' + path.join(EZ, f)); await p.waitForTimeout(1500);
    const r = await p.evaluate(() => ({
      graded: ROUNDS.length, pending: PENDING.map(x => 'R' + x.n + ' ' + x.co), upcoming: UPCOMING.length,
      playable: (typeof REEL !== 'undefined' ? REEL : ROUNDS).map(x => 'R' + x.n),
      filmSoon: [...document.querySelectorAll('.mini.nofilm .t')].map(e => e.textContent),
      films: ROUNDS.filter(x => x.film).map(x => [x.film, x.poster]),
      standings: LADDER.map(l => l.m + ' ' + l.won + ' won, ' + l.dir.replace(/ /g, '') + ', avg ' + l.avg)
    }));
    const missing = [];
    r.films.forEach(([fl, po]) => { ['.mp4', '.webm'].forEach(x => { if (!fs.existsSync(path.join(EZ, 'media', fl + x))) missing.push(fl + x) }); if (!fs.existsSync(path.join(EZ, 'media', po + '.jpg'))) missing.push(po + '.jpg') });
    delete r.films;
    const ok = !errs.length && !missing.length; if (!ok) bad++;
    console.log((ok ? 'OK   ' : 'FAIL ') + f + '\n' + JSON.stringify(r, null, 1) + (errs.length ? '\nERRORS: ' + errs.join(' | ') : '') + (missing.length ? '\nMISSING FILES: ' + missing.join(', ') : '') + '\n');
    await ctx.close();
  }
  await b.close(); process.exit(bad ? 1 : 0);
})();
