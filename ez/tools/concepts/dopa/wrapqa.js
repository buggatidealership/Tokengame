// node wrapqa.js <page.html[?query]> : the page-side checks of WRAP-BRIEF.md round 6 (the owner's words made countable, 2026-11-19).
// The page must set, besides window.R / READY / DUR / CUES / MUSIC:
//   window.SHOTS = [t0, t1, ...]  the second each shot (or, in a one-take video, each beat of the story) starts, first 0
//   window.BEAT  = { bpm, at }    the bed's tempo and the video time of one of its beats
//   window.DROPS = [d1, d2]       the video times of the bed's two drops (the chart's finish, the winner)
//   window.CHART = [[a, b], ...]  the spans when a chart or a leaderboard is the picture
// Elements that are not the shot's content (the brand bug, fine print, grounds) carry data-chrome. A canvas that draws content
// carries data-content and is sized to what it draws.
const { chromium } = require('playwright'); const page = process.argv[2]; let bad = 0;
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) bad++ };
(async () => { const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] }); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8993/' + page); await p.waitForFunction(() => window.READY === 1, null, { timeout: 120000 });
  const M = await p.evaluate(() => ({ dur: window.DUR, shots: window.SHOTS, beat: window.BEAT, drops: window.DROPS, chart: window.CHART, music: window.MUSIC }));
  ok(M.dur >= 28 && M.dur <= 36, `length ${M.dur} s (28 to 36)`);
  ok(Array.isArray(M.shots) && M.shots.length > 1 && M.shots[0] === 0, 'SHOTS declared, first at 0');
  const S = M.shots || [0], gaps = S.map((t, i) => (S[i + 1] ?? M.dur) - t), avg = M.dur / S.length;
  ok(avg <= 2.5, `a new shot every ${avg.toFixed(2)} s on average (at most 2.5), ${S.length} shots, longest ${Math.max(...gaps).toFixed(2)} s`);
  const per = 60 / M.beat.bpm, off = S.slice(1).map(t => { const k = (t - M.beat.at) / per; return Math.abs(k - Math.round(k)) * per });
  ok(Math.max(...off) <= .04, `every cut within 40 ms of a beat (worst ${(Math.max(...off) * 1000).toFixed(0)} ms, ${M.beat.bpm} BPM)`); ok(M.beat.bpm >= 140, `bed ${M.beat.bpm} BPM (140 or faster)`);
  const csec = (M.chart || []).reduce((a, [x, y]) => a + y - x, 0); ok(csec >= M.dur / 2, `charts and leaderboards ${csec.toFixed(1)} s of ${M.dur} s (at least half)`);
  ok((M.drops || []).length === 2 && S.some(t => Math.abs(t - M.drops[1]) < .05), `drops at ${M.drops}; a shot starts on the second`);
  let worstW = 1, worstH = 1, worstGap = 0, maxWords = 0, txt = '';
  for (let i = 0; i < S.length; i++) { const t = S[i] + Math.max(.3, gaps[i] * .85) - .02;
    const r = await p.evaluate(t => { window.R(t); const vis = e => { for (let x = e, o = 1; x && x.nodeType === 1; x = x.parentElement) { const c = getComputedStyle(x); if (c.display === 'none' || c.visibility === 'hidden') return 0; o *= +c.opacity; if (o < .25) return 0 } return 1 };
      const boxes = [], words = []; const add = q => { if (q.width > 2 && q.height > 2 && q.right > 0 && q.left < 1080 && q.bottom > 0 && q.top < 1350) boxes.push([Math.max(0, q.left), Math.max(0, q.top), Math.min(1080, q.right), Math.min(1350, q.bottom)]) };
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
      while (n = w.nextNode()) { const s = n.textContent.trim(), e = n.parentElement; if (!s || !e || e.closest('[data-chrome],script,style,defs') || !vis(e)) continue; const rg = document.createRange(); rg.selectNodeContents(n); const q = rg.getBoundingClientRect(); if (!(q.width > 2)) continue; add(q); words.push(s) }
      document.querySelectorAll('img,canvas[data-content],svg path,svg rect,svg circle,svg polyline,svg line').forEach(e => { if (e.closest('[data-chrome],defs,clipPath,mask') || !vis(e)) return; const c = getComputedStyle(e); if (e.tagName !== 'IMG' && e.tagName !== 'CANVAS' && c.fill === 'none' && (c.stroke === 'none' || +c.strokeOpacity < .25)) return; add(e.getBoundingClientRect()) });
      if (!boxes.length) return { w: 0, h: 0, gap: 1, words };
      const x0 = Math.min(...boxes.map(b => b[0])), x1 = Math.max(...boxes.map(b => b[2])), y0 = Math.min(...boxes.map(b => b[1])), y1 = Math.max(...boxes.map(b => b[3]));
      const rows = new Uint8Array(1350); boxes.forEach(b => rows.fill(1, Math.floor(b[1]), Math.ceil(b[3]))); let gap = 0, run = 0; for (let y = 60; y < 1290; y++) { run = rows[y] ? 0 : run + 1; gap = Math.max(gap, run) }
      return { w: (x1 - x0) / 1080, h: (y1 - y0) / 1350, gap: gap / 1350, words } }, t);
    const wc = r.words.join(' ').split(/\s+/).filter(x => /[A-Za-z]/.test(x)).length; txt += ' ' + r.words.join(' ');
    console.log(`  shot ${i + 1} @${S[i].toFixed(2)} (${gaps[i].toFixed(2)} s): spans ${(r.w * 100).toFixed(0)}% x ${(r.h * 100).toFixed(0)}%, widest empty band ${(r.gap * 100).toFixed(0)}%, ${wc} words: ${r.words.join(' | ').slice(0, 110)}`);
    worstW = Math.min(worstW, r.w); worstH = Math.min(worstH, r.h); worstGap = Math.max(worstGap, r.gap); maxWords = Math.max(maxWords, wc) }
  ok(worstW >= .75 && worstH >= .75, `content spans at least 75% of the frame each way on every shot (least ${(worstW * 100).toFixed(0)}% wide, ${(worstH * 100).toFixed(0)}% tall)`);
  ok(worstGap <= .15, `no empty band over 15% of the height (widest ${(worstGap * 100).toFixed(0)}%)`); ok(maxWords <= 8, `at most 8 words a shot (most ${maxWords})`);
  const pm = txt.match(/[.,:;!?·](?!\d)/g); ok(!pm, 'no punctuation on screen' + (pm ? ' (found ' + [...new Set(pm)].join(' ') + ')' : ''));
  ok(!/\b(up|down|made|lost|simulated|paper|coin|every earnings report|bet on|top plans?)\b/i.test(txt), 'only long, short and P&L as trade words');
  ok(!/undefined|NaN|Infinity|null/.test(txt), 'nothing undefined on screen'); ok(!/-\$|-\d/.test(txt), 'minus is U+2212'); ok(errs.length === 0, `no page errors (${errs.length}${errs[0] ? ': ' + errs[0].slice(0, 90) : ''})`);
  for (const [k, v] of [['Grok', '169'], ['Claude', '107'], ['GPT', '20'], ['Kimi', '150'], ['accuracy', '60%'], ['accuracy', '54%'], ['accuracy', '46%']]) ok(txt.includes(v), `${k} figure ${v} on screen`);
  console.log(bad ? `${bad} CHECKS FAIL` : 'ALL PAGE CHECKS PASS'); await b.close(); process.exit(bad ? 1 : 0) })();
