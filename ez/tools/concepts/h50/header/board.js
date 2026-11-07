// Composes the two boards from the shots run.js made (dsf 2).
// node board.js <shotdir> <report.json dir> -> /home/user/Tokengame/ez/x2p-h50-header-390.png and -1280.png
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [dir] = process.argv.slice(2);
const rep = JSON.parse(fs.readFileSync(path.join(dir, 'report-board.json'), 'utf8'));
const H = (t, w) => (rep.find(r => r.take === t && r.w === w) || {}).hdrH;
const T = { now: 'Today (live)', A: 'A · The crawl’s twin', B: 'B · The marquee at night', C: 'C · The title card' };
const SUB = {
  now: 'black bar, old lettering; X alone on its own row',
  A: 'cream stock and ink line like the bottom crawl, gold plate on the open tab',
  B: 'the end card’s dark board, the act ribbon on the open tab',
  C: 'a strip of the cover’s yellow, the cover’s inked badges as tabs'
};
const img = f => 'file://' + path.join(dir, f);
const css = `body{margin:0;background:#1b1512;color:#f6e7c4;font:600 22px/1.3 system-ui,sans-serif;padding:40px}
h1{font-size:40px;margin:0 0 6px}p.k{margin:0 0 30px;color:#cdbb98;font-size:22px}
.row{display:flex;gap:40px;align-items:flex-start}.cell{flex:none}
.lab{font-size:26px;margin:0 0 4px}.sub{font-size:18px;color:#cdbb98;margin:0 0 12px;max-width:760px;font-weight:500}
.m{font:600 18px/1.2 ui-monospace,monospace;color:#9fd8a8;margin:10px 0 0}
img{display:block;border:2px solid #000}
.sep{height:40px}`;
(async () => {
  const b = await chromium.launch();
  // phone board
  let h = `<style>${css}</style><h1>Top bar, phone 390px</h1><p class="k">Top 220px of the page, then the whole first screen (390x844). Shots at 2x. Header height measured in CSS px.</p><div class="row">`;
  for (const t of ['now', 'A', 'B', 'C']) h += `<div class="cell" style="width:780px"><p class="lab">${T[t]}</p><p class="sub">${SUB[t]}</p><img src="${img(t + '-390.png')}" width="780"><p class="m">header ${H(t, 390)}px at 390 · ${H(t, 320)}px at 320</p></div>`;
  h += `</div><div class="sep"></div><div class="row">`;
  for (const t of ['now', 'A', 'B', 'C']) h += `<div class="cell" style="width:780px"><img src="${img(t + '-390-first.png')}" width="780"></div>`;
  h += `</div>`;
  let p = await b.newPage({ viewport: { width: 3320, height: 1000 } });
  fs.writeFileSync(path.join(dir, 'board-390.html'), h); await p.goto('file://' + path.join(dir, 'board-390.html')); await p.waitForTimeout(800);
  await p.screenshot({ path: '/home/user/Tokengame/ez/x2p-h50-header-390.png', fullPage: true }); await p.close();
  // desktop board
  h = `<style>${css}</style><h1>Top bar, desktop 1280px, with the bottom crawl</h1><p class="k">For each: the top 200px, then the crawl at the foot of the same screen (the last 60px), so the two bars read side by side. Then the whole 1280x800 first screens. Shots at 2x.</p>`;
  for (const t of ['now', 'A', 'B', 'C']) h += `<p class="lab">${T[t]} <span class="m" style="margin-left:14px">header ${H(t, 1280)}px</span></p><p class="sub" style="max-width:none">${SUB[t]}</p><img src="${img(t + '-1280.png')}" width="2560"><div style="height:10px"></div><img src="${img(t + '-1280-crawl.png')}" width="2560"><div class="sep"></div>`;
  h += `<div class="row" style="flex-wrap:wrap;width:2600px;gap:40px">`;
  for (const t of ['now', 'A', 'B', 'C']) h += `<div class="cell"><p class="lab">${T[t]}</p><img src="${img(t + '-1280-first.png')}" width="1270"></div>`;
  h += `</div>`;
  p = await b.newPage({ viewport: { width: 2660, height: 1000 } });
  fs.writeFileSync(path.join(dir, 'board-1280.html'), h); await p.goto('file://' + path.join(dir, 'board-1280.html')); await p.waitForTimeout(800);
  await p.screenshot({ path: '/home/user/Tokengame/ez/x2p-h50-header-1280.png', fullPage: true }); await p.close();
  await b.close();
})();
