// nt-ov.js: shared pieces of the outcome-film desk's five takes (night studio, 2026-11-20): nt-ov1.html to nt-ov5.html.
// Every take reads data/close-<date>.json (prep-close.js) through OV.load(), so a script fills it for any close of 1 to 10 companies:
// nt-ov<n>.html?d=<YYYY-MM-DD>. Needs lib.js first (L.* easing, L.grain).
// The house bug (night BRIEF): the EZ. logo 64 px tall, "Earnings Zeason" beside it in the take's own face, 44 px from the top and left
// edges of the 1080 x 1350 frame, on top of everything from the first frame to the end card. The end card: the logo held >= 1.5 s.
// Colours: only the brand palette (logo black, cream, green, red, gold) and each company's own logo colours.
const OV = {};
OV.Q = new URLSearchParams(location.search);
OV.DATE = OV.Q.get('d') || '2026-11-20';
OV.K = '#04070e'; OV.CR = '#f8f0d9'; OV.G = '#03c870'; OV.R = '#ff3a31'; OV.AU = '#fdbc2a';
OV.rgb = { K: '4,7,14', CR: '248,240,217', G: '3,200,112', R: '255,58,49', AU: '253,188,42' };
OV.money = v => Math.round(v) === 0 ? '$0' : (v < 0 ? '−' : '+') + '$' + Math.abs(Math.round(v)).toLocaleString('en-US');
OV.pct = v => (v < 0 ? '−' : v > 0 ? '+' : '') + Math.abs(v).toFixed(2) + '%';
OV.sgn = v => v > 0 ? OV.G : v < 0 ? OV.R : OV.CR;
// a number that snaps to the frame (the motion-blur samples of one frame show the same digits)
OV.fr = t => Math.floor(t * 30 + 1e-6) / 30;
OV.load = async () => {
  const [m, d] = await Promise.all([fetch('models5.json').then(r => r.json()), fetch('data/close-' + OV.DATE + '.json').then(r => r.json())]);
  OV.MOD = m; const D = OV.D = d; D.N = D.rounds.length;
  D.title = D.before ? ['Season 2', `trades ${D.before + 1} to ${D.after}`] : D.N === 1 ? ['First trade', 'of Season 2'] : [`First ${D.N} trades`, 'of Season 2'];
  D.byK = {};
  D.ais.forEach(a => { a.calls = D.rounds.map(r => r.calls.find(c => c.k === a.k)); a.night = D.night[a.k]; a.s0 = D.season0[a.k]; a.s1 = D.season1[a.k];
    a.W = a.calls.filter(c => c.right).length; a.L = a.calls.length - a.W; a.rank = D.order.indexOf(a.k); a.nrank = D.nightOrder.indexOf(a.k); D.byK[a.k] = a });
  D.ranked = D.order.map(k => D.byK[k]);
  D.lead = D.ranked.filter(a => a.s1 === D.ranked[0].s1).map(a => a.k);
  D.rounds.forEach(r => { r.longs = r.calls.filter(c => c.side === 'LONG'); r.shorts = r.calls.filter(c => c.side === 'SHORT');
    r.win = r.move < 0 ? 'SHORT' : r.move > 0 ? 'LONG' : null;
    r.px = mm => { const P = r.path, T = D.total; if (!P) return mm >= T ? r.move : 0; if (mm <= 0) return 0; if (mm >= T) return r.move;
      let i = 1; while (i < P.length && P[i][0] < mm) i++; const a = P[i - 1], b = P[i] || P[i - 1]; return L.lerp(a[1], b[1], (mm - a[0]) / Math.max(1, b[0] - a[0])) } });
  return D;
};
// film time -> minutes after the close before (0 .. D.total): the after-hours reaction, the night, the session, the last hour
OV.night = (t, t0, t1) => { const D = OV.D, T = D.total, o = D.open; if (t <= t0) return 0; if (t >= t1) return T; const x = (t - t0) / (t1 - t0);
  const K = o != null ? [[0, 0], [.3, 90], [.42, o], [.75, T - 60], [1, T]] : [[0, 0], [.4, 90], [1, T]];
  for (let i = 1; i < K.length; i++) if (x <= K[i][0]) return L.lerp(K[i - 1][1], K[i][1], (x - K[i - 1][0]) / (K[i][0] - K[i - 1][0])); return T };
// New York clock for a minute offset from the close before (4:00 PM)
OV.DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
OV.clock = m => { const D = OV.D, tot = 16 * 60 + Math.round(m), d = Math.floor(tot / 1440), mm = tot % 1440; let h = Math.floor(mm / 60); const mi = mm % 60, ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
  return { day: OV.DAYS[(OV.DAYS.indexOf(D.day0) + d) % 7], h, mi: String(mi).padStart(2, '0'), ap, t: h + ':' + String(mi).padStart(2, '0') + ' ' + ap } };
// a model's mark on its own tile
OV.mark = (k, s, extra = '') => { const m = OV.MOD[k];
  return `<svg class="mk" width="${s}" height="${s}" viewBox="-4 -4 32 32" style="display:block;flex:none;border-radius:${(s * .26).toFixed(1)}px;background:${m.bg};${extra}"><path d="${m.d}" fill="${m.fg}"${m.fr ? ' fill-rule="evenodd"' : ''}/>${m.dot ? `<path d="${m.dot}" fill="${m.dotc}"/>` : ''}</svg>` };
// a model's mark alone (no tile), in one colour: for print and engraving
OV.glyph = (k, s, col) => { const m = OV.MOD[k];
  return `<svg class="gl" width="${s}" height="${s}" viewBox="0 0 24 24" style="display:block;flex:none"><path d="${m.d}" fill="${col}"${m.fr ? ' fill-rule="evenodd"' : ''}/></svg>` };
OV.wm = (cls = '') => `<span class="ovwm ${cls}"><i class="e">E</i>arnings <i class="z">Z</i>eason</span>`;
// the house bug: call once with the take's face (font shorthand without size), e.g. OV.bug("800 30px Inter")
OV.bug = (font, opts = {}) => {
  const st = document.createElement('style'); st.textContent = `
#ovbug{position:absolute;left:44px;top:44px;height:64px;display:flex;align-items:center;gap:16px;z-index:900;pointer-events:none;white-space:nowrap}
#ovbug img{width:64px;height:64px;display:block;filter:drop-shadow(0 4px 14px rgba(0,0,0,.55))}
#ovbug .ovwm{font:${font};color:${opts.color || OV.CR};text-shadow:0 2px 12px rgba(0,0,0,.65);${opts.css || ''}}
.ovwm i{font-style:normal}.ovwm .e{color:${OV.G}}.ovwm .z{color:${OV.R}}
#ovend{position:absolute;inset:0;z-index:950;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;opacity:0;pointer-events:none}
#ovend img{width:360px;height:360px;display:block}
#ovend .ovwm{font:${opts.endFont || font};font-size:${opts.endSize || 64}px;color:${OV.CR}}
#ovend .sub{font:${opts.subFont || font};font-size:30px;letter-spacing:.2em;color:${OV.AU};margin-top:-14px}`;
  document.head.appendChild(st);
  document.body.insertAdjacentHTML('beforeend', `<div id="ovbug"><img src="ezlogo.svg" alt="">${OV.wm()}</div>
    <div id="ovend"><div id="ovendbg"></div><img src="ezlogo.svg" alt="">${OV.wm()}<div class="sub">${opts.sub || 'SEASON 2'}</div></div>`);
};
// the end card from t0: the ground darkens to logo black, the logo lands with a spring, its ring of light breathes to the last frame
OV.endR = (t, t0) => { const e = L.$('#ovend'), k = L.n(t, t0, t0 + .35), s = L.spring(t - t0, 1.6, 7);
  e.style.opacity = k; e.style.background = `radial-gradient(60% 45% at 50% 46%,rgba(253,188,42,${(.16 + .05 * Math.sin((t - t0) * 4)).toFixed(3)}),transparent 70%),rgba(4,7,14,${(.96 * k).toFixed(3)})`;
  const im = e.querySelector('img'); im.style.transform = `scale(${(.7 + .3 * s).toFixed(4)}) rotate(${(-8 * (1 - L.eo(L.n(t, t0, t0 + .6)))).toFixed(2)}deg)`;
  e.querySelector('.ovwm').style.transform = `translateY(${(30 * (1 - L.eo5(L.n(t, t0 + .12, t0 + .5)))).toFixed(1)}px)`; e.querySelector('.ovwm').style.opacity = L.n(t, t0 + .12, t0 + .4);
  const sb = e.querySelector('.sub'); sb.style.opacity = L.n(t, t0 + .3, t0 + .6); };
// the grain over everything (above the scene, below the bug)
OV.grain = (alpha = .06) => { const cv = document.createElement('canvas'); cv.id = 'ovgrain'; cv.style.cssText = 'position:absolute;inset:0;width:1080px;height:1350px;mix-blend-mode:overlay;pointer-events:none;z-index:800';
  document.body.appendChild(cv); return L.grain(cv, alpha) };
OV.ready = async (fontsList = []) => { for (const f of fontsList) await document.fonts.load(f); await document.fonts.ready;
  await Promise.all(L.$$('img').map(i => i.decode().catch(() => 0))); window.READY = 1 };
// beat grid of a bed: B(n) = drop + n x beat, with MUSIC.at chosen so the bed's measured drop lands on the film's drop
OV.grid = (bpm, dropFilm, dropFile, bed) => { const p = 60 / bpm; window.MUSIC = { f: bed, at: +(dropFile - dropFilm).toFixed(4) }; return { p, B: n => dropFilm + n * p } };
