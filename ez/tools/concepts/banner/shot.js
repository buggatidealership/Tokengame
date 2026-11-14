// node shot.js <outdir> [a,b,c] : each take at 3000x1000 (2x) plus a guide version; refuses to shoot if the fonts did not load.
const { chromium } = require('playwright'), path = require('path'), http = require('http'), fs = require('fs');
(async () => { const out = process.argv[2], vs = (process.argv[3] || 'a,b,c').split(',');
  const srv = http.createServer((q, r) => { const f = path.join(__dirname, decodeURIComponent(q.url.split('?')[0])); fs.readFile(f, (e, d) => e ? (r.writeHead(404), r.end()) : (r.writeHead(200, { 'content-type': f.endsWith('.json') ? 'application/json' : f.endsWith('.woff2') ? 'font/woff2' : 'text/html' }), r.end(d))) }).listen(8994);
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1500, height: 500 }, deviceScaleFactor: 2 });
  for (const v of vs) for (const g of ['', '&guide=1']) { await p.goto(`http://localhost:8994/banner.html?v=${v}${g}`); await p.waitForFunction('window.READY', null, { timeout: 30000 });
    if (await p.evaluate('window.READY') !== 1) throw new Error('fonts did not load');
    await p.screenshot({ path: path.join(out, `banner-${v}${g ? '-guide' : ''}.png`) }) }
  await b.close(); srv.close() })();
