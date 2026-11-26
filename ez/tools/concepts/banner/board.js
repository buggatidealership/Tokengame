// node board.js [a,b,c] : shoots each take (out/banner-<v>.png, 3000x1000; out/banner-<v>-1500.jpg) and the profile preview board.
const { chromium } = require('playwright'), path = require('path'), http = require('http'), fs = require('fs');
(async () => { const vs = (process.argv[2] || 'a,b,c').split(','), out = path.join(__dirname, 'out');
  const T = { json: 'application/json', woff2: 'font/woff2', png: 'image/png', svg: 'image/svg+xml' };
  const srv = http.createServer((q, r) => { const f = path.join(__dirname, decodeURIComponent(q.url.split('?')[0])); fs.readFile(f, (e, d) => e ? (r.writeHead(404), r.end()) : (r.writeHead(200, { 'content-type': T[f.split('.').pop()] || 'text/html' }), r.end(d))) }).listen(8994);
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1500, height: 500 }, deviceScaleFactor: 2 });
  for (const v of vs) for (const g of ['', '&guide=1']) { await p.goto(`http://localhost:8994/banner.html?v=${v}${g}`); await p.waitForFunction('window.READY', null, { timeout: 30000 });
    if (await p.evaluate('window.READY') !== 1) throw new Error('fonts did not load');
    // measured: every text box against the kept-clear zones, and the smallest type at 600 and 390 wide
    if (!g) { const m = await p.evaluate(() => { const Z = [[0, 300, 430, 500], [0, 0, 180, 170], [1150, 0, 1500, 170], [0, 0, 1500, 60], [0, 440, 1500, 500]]; let hits = 0, min = 1e9; const w = document.createTreeWalker(document.getElementById('b'), NodeFilter.SHOW_TEXT);
        for (let n; n = w.nextNode();) { if (!n.textContent.trim()) continue; const r = document.createRange(); r.selectNodeContents(n); const q = r.getBoundingClientRect(); if (!q.width) continue; min = Math.min(min, parseFloat(getComputedStyle(n.parentElement).fontSize)); if (Z.some(z => q.left < z[2] && q.right > z[0] && q.top < z[3] && q.bottom > z[1])) hits++ }
        const big = Math.max(...[...document.querySelectorAll('#b *')].map(e => parseFloat(getComputedStyle(e).fontSize))); return { hits, min, big } });
      console.log(`take ${v}: text boxes in a kept-clear zone ${m.hits}; biggest type ${m.big}px = ${(m.big * .4).toFixed(1)}px on desktop, ${(m.big * .26).toFixed(1)}px on a phone; smallest ${m.min}px = ${(m.min * .4).toFixed(1)}px / ${(m.min * .26).toFixed(1)}px`) }
    await p.screenshot({ path: path.join(out, `banner-${v}${g ? '-guide' : ''}.png`) }) }
  const q = await b.newPage({ viewport: { width: 1156, height: 420 }, deviceScaleFactor: 2 });
  for (const v of vs) { await q.goto(`http://localhost:8994/preview.html?v=${v}`); await q.waitForFunction('window.READY'); await q.screenshot({ path: path.join(out, `preview-${v}.png`) }) }
  await b.close(); srv.close() })();
