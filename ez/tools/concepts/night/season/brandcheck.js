// Brand checks for the switch film (RESEARCH.md B1, B3, B4, B5; BRIEF.md house bug), measured on the page every 0.05 s:
// node tools/concepts/night/season/brandcheck.js   (from ez/; serves dopa/ to the browser from disk)
// In-scene mark = the EZ. mark in the terminal's header on the phone, mapped through the camera, counted while its centre is inside the middle
// 60% of the frame (x 216 to 864, y 270 to 1080), the phone is at least half visible and nothing (a line card, a lifted row) covers it.
// Also: the house bug never covered; the lines' words, characters and holds; the smallest text drawn by the film itself.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const D = path.resolve(__dirname, '../../dopa'); const MT = { html: 'text/html', js: 'text/javascript', json: 'application/json', css: 'text/css', svg: 'image/svg+xml', jpg: 'image/jpeg', png: 'image/png' };
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.route('http://local.test/**', r => { const u = new URL(r.request().url()); const f = path.join(D, decodeURIComponent(u.pathname)); if (!f.startsWith(D) || !fs.existsSync(f)) return r.fulfill({ status: 404, body: '' });
    r.fulfill({ status: 200, contentType: MT[path.extname(f).slice(1)] || 'application/octet-stream', body: fs.readFileSync(f) }) });
  await p.goto('http://local.test/nt-season.html'); await p.waitForFunction(() => window.READY === 1, null, { timeout: 180000 });
  const rows = [];
  for (let t = 0; t <= 20.6; t += .05) rows.push(await p.evaluate(async t => { await window.R(t);
    const r = e => e.getBoundingClientRect(), ov = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    const ph = document.querySelector('#phw'), z = +document.querySelector('#ph').style.zoom, m = new DOMMatrix(getComputedStyle(ph).transform), op = +ph.style.opacity || (ph.style.opacity === '' ? 1 : 0);
    const EL = window.__el; const mk = { x: m.e + (16 + 15) * z, y: m.f + (65 + 15) * z, s: 30 * z };
    const mr = { left: mk.x - mk.s / 2, right: mk.x + mk.s / 2, top: mk.y - mk.s / 2, bottom: mk.y + mk.s / 2 };
    const covers = [...document.querySelectorAll('#ln,.lf,#end')].filter(e => getComputedStyle(e).display !== 'none' && +getComputedStyle(e).opacity > .05);
    const covered = covers.some(e => ov(r(e), mr) > .2 * mk.s * mk.s);
    const inZone = mk.x >= 216 && mk.x <= 864 && mk.y >= 270 && mk.y <= 1080 && op > .5 && !covered;
    const endMark = +getComputedStyle(document.querySelector('#end')).opacity > .5;
    const bug = r(document.querySelector('#bug')), bugHit = covers.concat([...document.querySelectorAll('#td')]).filter(e => +getComputedStyle(e).opacity > .05).some(e => ov(r(e), bug) > 0) || (op > .05 && ov(r(document.querySelector('#ph .body')), bug) > 0);
    return { t, inZone, endMark, bugHit, mx: Math.round(mk.x), my: Math.round(mk.y), z: +z.toFixed(2) } }, t));
  // appearances: runs of inZone of at least 0.5 s
  const runs = []; let s = null; rows.forEach((r, i) => { if (r.inZone && s === null) s = r.t; if ((!r.inZone || i === rows.length - 1) && s !== null) { const e = r.inZone ? r.t : rows[i - 1].t; if (e - s >= .5) runs.push([+s.toFixed(2), +e.toFixed(2)]); s = null } });
  const endRun = rows.filter(r => r.endMark); const fonts = await p.evaluate(() => [...document.querySelectorAll('#st *')].filter(e => !e.closest('#ph') && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())).map(e => [e.tagName + (e.id ? '#' + e.id : ''), parseFloat(getComputedStyle(e).fontSize)]));
  const LN = await p.evaluate(() => [...(window.__LN || [])]);
  console.log(JSON.stringify({ firstInSceneMark: (rows.find(r => r.inZone) || {}).t, inSceneRuns: runs, runsStartingAtLeast3sApart: runs.filter((r, i) => i === 0 || r[0] - runs[i - 1][0] >= 3).length,
    endCard: endRun.length ? [endRun[0].t, endRun[endRun.length - 1].t] : null, bugCoveredFrames: rows.filter(r => r.bugHit).map(r => +r.t.toFixed(2)), frame0: rows[0],
    smallestFilmText: fonts.sort((a, b) => a[1] - b[1]).slice(0, 3), lines: LN.map(l => ({ text: (l[2] + ' ' + l[3]).trim(), words: (l[2] + ' ' + l[3]).trim().split(/\s+/).length, held: +(l[1] - l[0]).toFixed(2), needs: +(1 + .08 * (l[2] + ' ' + l[3]).trim().length).toFixed(2) })) }, null, 1));
  await b.close() })();
