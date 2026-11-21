// node shoot.js [ids] : renders a1..b3.html at 400x500 css px x2.7 = 1080x1350 into ez/x2p-post-<id>.png and runs the checks:
// text clipped or outside the frame, text laid over a logo or a mark, punctuation, numbers not in the data, sibling rows.
const { chromium } = require('playwright'), path = require('path'), fs = require('fs');
const HERE = __dirname, EZ = path.resolve(HERE, '../../..');
const J = JSON.parse(fs.readFileSync(path.resolve(HERE, '../dopa/data/close-2026-11-20.json'), 'utf8'));
const ids = (process.argv[2] || 'a1,a2,a3,b1,b2,b3').split(',');
// every number the images may print, from the data (called moves, confidences, moves, P&Ls, counts, the quoted reasons)
const allow = new Set(['2', '1', '3', '4', '5', '15', '100K', '$100K', '13x', '13%', '0%', '+5%', '−5%', '−10%', '0']);
const fmt = v => (v < 0 ? '−' : '+') + '$' + Math.abs(v).toLocaleString('en-US');
J.rounds.forEach(r => { allow.add((r.move < 0 ? '−' : '+') + Math.abs(r.move).toFixed(2) + '%'); allow.add(String(r.s2n));
  r.calls.forEach(c => { allow.add((c.call < 0 ? '−' : '+') + Math.abs(c.call) + '%'); allow.add(fmt(c.pnl)) }) });
Object.values(J.season1).forEach(v => allow.add(fmt(v)));
const csv = fs.readFileSync(EZ + '/data/s2-calls/calls.csv', 'utf8');
for (const m of csv.matchAll(/,(LONG|SHORT),[\d.]+,(\d+),/g)) allow.add(m[2] + '%');

(async () => {
  const b = await chromium.launch(); let bad = 0;
  for (const id of ids) {
    const p = await b.newPage({ viewport: { width: 400, height: 500 }, deviceScaleFactor: 2.7 });
    await p.goto('file://' + HERE + '/' + id + '.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    const R = await p.evaluate(() => {
      const out = { clip: [], over: [], text: '', rows: {}, fonts: [] };
      const W = innerWidth, H = innerHeight;
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const logos = [...document.querySelectorAll('.co,.ai,.top .lg')].map(e => e.getBoundingClientRect());
      let n; while ((n = tw.nextNode())) { if (!n.textContent.trim()) continue; const el = n.parentElement; if (getComputedStyle(el).visibility === 'hidden') continue;
        const rg = document.createRange(); rg.selectNodeContents(n);
        for (const r of rg.getClientRects()) { if (r.width < .5) continue;
          if (r.left < -.5 || r.top < -.5 || r.right > W + .5 || r.bottom > H + .5) out.clip.push(n.textContent.trim() + ' outside frame');
          for (let a = el; a && a !== document.body; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.overflow !== 'visible' || cs.overflowX !== 'visible') { const ar = a.getBoundingClientRect();
            if (r.left < ar.left - .5 || r.right > ar.right + .5 || r.top < ar.top - .5 || r.bottom > ar.bottom + .5) out.clip.push(n.textContent.trim() + ' clipped by ' + a.className) } }
          for (const L of logos) { const ix = Math.min(r.right, L.right) - Math.max(r.left, L.left), iy = Math.min(r.bottom, L.bottom) - Math.max(r.top, L.top); if (ix > .5 && iy > .5) out.over.push(n.textContent.trim()) } } }
      // svg text too
      document.querySelectorAll('svg text').forEach(t => { const r = t.getBoundingClientRect(); if (r.right > W + .5 || r.left < -.5) out.clip.push(t.textContent + ' svg outside') });
      // logos and marks never overlap each other (except the stacked marks of one group)
      const L = [...document.querySelectorAll('.co,.ai')].filter(e => !e.closest('.ms'));
      for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) { const a = L[i].getBoundingClientRect(), c = L[j].getBoundingClientRect();
        if (Math.min(a.right, c.right) - Math.max(a.left, c.left) > .5 && Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top) > .5) out.over.push('logo on logo') }
      out.text = document.body.innerText + ' ' + [...document.querySelectorAll('svg text')].map(t => t.textContent).join(' ');
      // sibling rows: every table row of a table one height, cells of a column one left edge
      document.querySelectorAll('table').forEach((t, ti) => { const rs = [...t.rows].slice(1); out.rows[ti] = { h: [...new Set(rs.map(r => r.getBoundingClientRect().height.toFixed(2)))], col: [...new Set(rs.map(r => r.cells[1] && r.cells[1].getBoundingClientRect().left.toFixed(2)))] } });
      out.fonts = [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family);
      out.bottom = Math.max(...[...document.querySelectorAll('.w > *')].map(e => e.getBoundingClientRect().bottom));
      return out });
    // punctuation: anything but letters, digits, spaces, $ % + − & and number separators inside a number
    const t = R.text.replace(/(\d)[.,](\d)/g, '$1$2').replace(/P&L/g, 'PnL');
    const punct = [...new Set(t.match(/[^\p{L}\p{N}\s$%+−]/gu) || [])];
    const nums = [...new Set((R.text.match(/[+−]?\$?[\d][\d,.]*(?:%|x|K)?/g) || []))].filter(x => !allow.has(x));
    const shot = EZ + '/x2p-post-' + id + '.png';
    await p.screenshot({ path: shot });
    console.log(`${id}: clip ${R.clip.length}${R.clip.length ? ' ' + JSON.stringify(R.clip.slice(0, 4)) : ''} | over ${R.over.length}${R.over.length ? ' ' + JSON.stringify(R.over.slice(0, 4)) : ''} | punct ${JSON.stringify(punct)} | unknown numbers ${JSON.stringify(nums)} | rows ${JSON.stringify(R.rows)} | content bottom ${R.bottom.toFixed(1)}/500 | fonts ${[...new Set(R.fonts)]}`);
    if (R.clip.length || R.over.length || punct.length || nums.length || R.bottom > 500) bad++;
    await p.close() }
  await b.close(); process.exit(bad ? 1 : 0) })();
