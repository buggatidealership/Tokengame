// H50 header mockups: lays a take's CSS over the built X6+ page and shoots / measures the header.
// node run.js <outdir> <takes: now,A,B,C> <widths: 320,360,390,1280,1536> [--first] [--crawl] [--long] [--dsf=2] [--tab=leaderboard]
// --first: the whole first screen (390x844 or 1280x800) instead of the top 220/200px. --crawl: a 1280 strip of the bottom crawl.
// --long: puts a long company in the pill ("SK Hynix" on phones, "Novartis (NOVN.SW)" on desktop) to test the fit.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const HERE = __dirname, URL = 'http://127.0.0.1:8997/v50-live-x6plus.html';
const [out, takesArg = 'now,A,B,C', widthsArg = '320,360,390,1280,1536', ...flags] = process.argv.slice(2);
const opt = k => flags.find(f => f.startsWith('--' + k));
const dsf = +(opt('dsf') || '--dsf=1').split('=')[1];
const tab = (opt('tab') || '').split('=')[1] || '';
fs.mkdirSync(out, { recursive: true });
const css = t => t === 'now' ? '' : fs.readFileSync(path.join(HERE, 'base.css'), 'utf8') + '\n' + fs.readFileSync(path.join(HERE, t + '.css'), 'utf8');
(async () => {
  const b = await chromium.launch();
  const report = [];
  for (const t of takesArg.split(',')) for (const w of widthsArg.split(',').map(Number)) {
    const H = w < 900 ? 844 : 800;
    const p = await b.newPage({ viewport: { width: w, height: H }, deviceScaleFactor: dsf });
    await p.goto(URL + (tab ? '#/' + tab : ''), { waitUntil: 'load' });
    await p.waitForFunction(() => !document.documentElement.classList.contains('x2p-cur'), null, { timeout: 90000 });
    await p.waitForTimeout(900);
    if (t !== 'now') await p.evaluate(([c, t]) => {
      const s = document.createElement('style'); s.id = 'h50css'; s.textContent = c; document.head.appendChild(s);
      document.documentElement.classList.add('h50', 'h50-' + t);
    }, [css(t), t]);
    if (opt('long')) await p.evaluate(w => { const ic = document.querySelector('#liveTxt .x2p-ic'); if (ic) ic.textContent = w < 900 ? 'SK Hynix' : 'Novartis (NOVN.SW)'; }, w);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(500);
    // stills: hold the live dot at full strength
    await p.evaluate(() => document.getAnimations().forEach(a => { if (a.animationName === 'h50pulse' || a.animationName === 'pulse') { a.pause(); a.currentTime = 0; } }));
    const m = await p.evaluate(() => {
      const q = s => document.querySelector(s), R = e => e ? e.getBoundingClientRect() : null;
      const hd = q('header.top'), parts = { brand: q('header.top a.brand'), live: q('header.top a.live'), x: q('header.top a.x2p-xhd') };
      [...document.querySelectorAll('header.top nav.nav a')].forEach((a, i) => parts['tab' + i] = a);
      const box = {}; for (const k in parts) { const r = R(parts[k]); if (r && r.width) box[k] = { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; }
      const keys = Object.keys(box), over = [];
      for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) {
        const a = box[keys[i]], c = box[keys[j]];
        const ox = Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x), oy = Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y);
        if (ox > 0.5 && oy > 0.5) over.push(keys[i] + '/' + keys[j] + ' ' + ox.toFixed(1) + 'x' + oy.toFixed(1));
      }
      const rows = [...new Set(keys.map(k => Math.round(box[k].y + box[k].h / 2)))].sort((a, b) => a - b);
      // rows: cluster centres within 12px
      const cl = []; rows.forEach(y => { if (!cl.length || y - cl[cl.length - 1] > 12) cl.push(y); });
      const clipped = [];
      const lt = q('#liveTxt'); if (lt && lt.scrollWidth > lt.clientWidth + 0.5) clipped.push('pill text ' + lt.scrollWidth + '>' + lt.clientWidth);
      document.querySelectorAll('header.top nav.nav a').forEach(a => { const ar = a.getBoundingClientRect(); a.childNodes.forEach(n => { if (n.nodeType === 3 && n.textContent.trim()) { const rg = document.createRange(); rg.selectNodeContents(n); const tr = rg.getBoundingClientRect(); if (tr.left < ar.left - 0.5 || tr.right > ar.right + 0.5) clipped.push(a.textContent.trim() + ' text ' + tr.left.toFixed(1) + '-' + tr.right.toFixed(1) + ' in ' + ar.left.toFixed(1) + '-' + ar.right.toFixed(1)); } }); const sm = a.querySelector('small'); if (sm) { const r = sm.getBoundingClientRect(); if (r.left < ar.left - 0.5 || r.right > ar.right + 0.5) clipped.push('Soon tag outside its tab'); } });
      const nm = q('header.top a.brand b'); const nmr = R(nm);
      const outside = keys.filter(k => box[k].x < -0.5 || box[k].x + box[k].w > innerWidth + 0.5);
      const small = keys.filter(k => box[k].h < 40 && !/brand/.test(k)).map(k => k + ' ' + box[k].w + 'x' + box[k].h);
      const ff = [...hd.querySelectorAll('*')].filter(e => e.getBoundingClientRect().width && e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())).map(e => getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g, ''));
      return { hdrH: +R(hd).height.toFixed(1), pos: getComputedStyle(hd).position, rows: cl.length, overlaps: over, clipped, outside, under40: small,
        sideScroll: document.documentElement.scrollWidth - innerWidth, nameLines: nm ? Math.round(nmr.height / parseFloat(getComputedStyle(nm).lineHeight || 16)) : 0, fonts: [...new Set(ff)], box };
    });
    const lab = `${t}-${w}`;
    report.push({ take: t, w, ...m });
    const W = w, hh = w < 900 ? 220 : 200;
    if (opt('first')) await p.screenshot({ path: path.join(out, lab + '-first.png') });
    else await p.screenshot({ path: path.join(out, lab + (opt('long') ? '-long' : '') + (tab ? '-' + tab : '') + '.png'), clip: { x: 0, y: 0, width: W, height: hh } });
    if (opt('crawl') && w >= 1200) {
      await p.mouse.move(5, 5);
      await p.screenshot({ path: path.join(out, lab + '-crawl.png'), clip: { x: 0, y: H - 60, width: W, height: 60 } });
    }
    await p.close();
  }
  fs.writeFileSync(path.join(out, 'report' + (opt('long') ? '-long' : '') + '.json'), JSON.stringify(report, null, 1));
  for (const r of report) console.log(`${r.take} ${r.w}: h=${r.hdrH} ${r.pos} rows=${r.rows} side=${r.sideScroll} lines=${r.nameLines} over=[${r.overlaps.join('; ')}] clip=[${r.clipped.join('; ')}] out=[${r.outside}] <40=[${r.under40.join('; ')}] fonts=${r.fonts.join('/')}`);
  await b.close();
})();
