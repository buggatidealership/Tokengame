// Tap areas (probed with elementFromPoint along each control's centre lines, so pseudo-element extensions count) and the sticky check.
// node tap.js <takes> <widths>
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const HERE = __dirname, URL = 'http://127.0.0.1:8997/v50-live-x6plus.html';
const [takesArg = 'A,B,C', widthsArg = '320,390,1280'] = process.argv.slice(2);
const css = t => t === 'now' ? '' : fs.readFileSync(path.join(HERE, 'base.css'), 'utf8') + '\n' + fs.readFileSync(path.join(HERE, t + '.css'), 'utf8');
(async () => {
  const b = await chromium.launch();
  for (const t of takesArg.split(',')) for (const w of widthsArg.split(',').map(Number)) {
    const p = await b.newPage({ viewport: { width: w, height: w < 900 ? 844 : 800 } });
    await p.goto(URL, { waitUntil: 'load' });
    await p.waitForFunction(() => !document.documentElement.classList.contains('x2p-cur'), null, { timeout: 90000 });
    await p.waitForTimeout(600);
    if (t !== 'now') await p.evaluate(([c, t]) => { const s = document.createElement('style'); s.textContent = c; document.head.appendChild(s); document.documentElement.classList.add('h50', 'h50-' + t); }, [css(t), t]);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    const r = await p.evaluate(() => {
      const els = { brand: 'header.top a.brand', pill: 'header.top a.live', x: 'header.top a.x2p-xhd' };
      document.querySelectorAll('header.top nav.nav a:not(.x2p-soon)').forEach((a, i) => els['tab' + i] = a);
      const out = {};
      for (const k in els) {
        const e = typeof els[k] === 'string' ? document.querySelector(els[k]) : els[k]; if (!e) continue;
        const rc = e.getBoundingClientRect(), cx = rc.x + rc.width / 2, cy = rc.y + rc.height / 2;
        const hit = (x, y) => { const h = document.elementFromPoint(x, y); return h && (h === e || e.contains(h)); };
        let t0 = cy, t1 = cy, l0 = cx, l1 = cx;
        while (t0 > 0 && hit(cx, t0 - 1)) t0--; while (hit(cx, t1 + 1) && t1 < innerHeight) t1++;
        while (l0 > 0 && hit(l0 - 1, cy)) l0--; while (hit(l1 + 1, cy) && l1 < innerWidth) l1++;
        out[k] = Math.round(l1 - l0 + 1) + 'x' + Math.round(t1 - t0 + 1);
      }
      return out;
    });
    await p.evaluate(() => window.scrollTo(0, 1600)); await p.waitForTimeout(300);
    const st = await p.evaluate(() => { const h = document.querySelector('header.top').getBoundingClientRect(); return 'top ' + h.top.toFixed(1) + ' h ' + h.height.toFixed(1); });
    console.log(t, w, JSON.stringify(r), 'after scrolling 1600px:', st);
    await p.close();
  }
  await b.close();
})();
