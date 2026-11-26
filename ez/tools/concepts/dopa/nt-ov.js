// nt-ov.js: shared pieces of the outcome-film desk's five takes (night studio, 2026-11-20): nt-ov1.html to nt-ov5.html.
// Every take reads data/close-<date>.json (prep-close.js) through OV.load(), so a script fills it for any close of 1 to 10 companies:
// nt-ov<n>.html?d=<YYYY-MM-DD>. Needs lib.js first (L.* easing, L.grain).
// The house bug (research B4 and B8, 23:25 update): exactly s2d.html's .bug, the EZ. logo 64 px and EARNINGS ZEASON in Kanit italic 800
// 31 px, left 54 top 50, the same in every film (a signature: the branding that counts is the mark inside each shot's main object, B1 and
// B3, which every take places itself). The end card: the logo and the same logotype, held >= 1.5 s.
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
OV.wm = (cls = '') => `<span class="ovwm ${cls}">EARNINGS ZEASON</span>`;
{ const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,800;1,900&display=swap'; document.head.appendChild(l); OV.kanit = new Promise(r => { l.onload = r; l.onerror = r }) }
// the house bug and the end card (the take's own face only for the end card's small line)
OV.bug = (font, opts = {}) => {
  const st = document.createElement('style'); st.textContent = `
#ovbug{position:absolute;left:54px;top:50px;height:64px;display:flex;align-items:center;gap:16px;z-index:900;pointer-events:none;white-space:nowrap}
#ovbug img{width:64px;height:64px;display:block;filter:drop-shadow(0 4px 14px rgba(0,0,0,.55))}
#ovbug .ovwm{font:italic 800 31px/1 Kanit,sans-serif;letter-spacing:.01em;color:${OV.CR};text-shadow:0 2px 12px rgba(0,0,0,.65)}
#ovend{position:absolute;inset:0;z-index:950;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;opacity:0;pointer-events:none}
#ovend img{width:360px;height:360px;display:block}
#ovend .ovwm{font:italic 800 64px/1 Kanit,sans-serif;letter-spacing:.01em;color:${OV.CR}}
#ovend .sub{font:${opts.subFont || font};font-size:30px;letter-spacing:.2em;color:${OV.AU};margin-top:-14px}`;
  document.head.appendChild(st);
  document.body.insertAdjacentHTML('beforeend', `<div id="ovbug"><img src="ezlogo.svg" alt="">${OV.wm()}</div>
    <div id="ovend"><div id="ovendbg"></div><img src="ezlogo.svg" alt="">${OV.wm()}<div class="sub">${opts.sub || 'SEASON 2'}</div></div>`);
};
// the end card from t0: the ground darkens to logo black, the logo lands with a spring, its ring of light breathes to the last frame
OV.endR = (t, t0) => { const e = L.$('#ovend'), k = L.n(t, t0, t0 + .35), s = L.spring(t - t0, 1.6, 7), st = L.$('#st');
  if (st) st.style.visibility = k >= 1 ? 'hidden' : '';  // the scene under a fully opaque end card is not drawn (renders faster)
  e.style.opacity = k; e.style.background = `radial-gradient(60% 45% at 50% 46%,rgba(253,188,42,${(.16 + .05 * Math.sin((t - t0) * 4)).toFixed(3)}),transparent 70%),rgba(4,7,14,${(k >= 1 ? 1 : .96 * k).toFixed(3)})`;
  const im = e.querySelector('img'); im.style.transform = `scale(${(.7 + .3 * s).toFixed(4)}) rotate(${(-8 * (1 - L.eo(L.n(t, t0, t0 + .6)))).toFixed(2)}deg)`;
  e.querySelector('.ovwm').style.transform = `translateY(${(30 * (1 - L.eo5(L.n(t, t0 + .12, t0 + .5)))).toFixed(1)}px)`; e.querySelector('.ovwm').style.opacity = L.n(t, t0 + .12, t0 + .4);
  const sb = e.querySelector('.sub'); sb.style.opacity = L.n(t, t0 + .3, t0 + .6); };
// the grain over everything (above the scene, below the bug)
OV.grain = (alpha = .06) => { const cv = document.createElement('canvas'); cv.id = 'ovgrain'; cv.style.cssText = 'position:absolute;inset:0;width:1080px;height:1350px;mix-blend-mode:overlay;pointer-events:none;z-index:800';
  document.body.appendChild(cv); return L.grain(cv, alpha) };
OV.ready = async (fontsList = []) => { await OV.kanit; await document.fonts.load('italic 800 31px Kanit'); for (const f of fontsList) await document.fonts.load(f); await document.fonts.ready;
  await Promise.all(L.$$('img').map(i => i.decode().catch(() => 0))); window.READY = 1 };
// beat grid of a bed: B(n) = drop + n x beat, with MUSIC.at chosen so the bed's measured drop lands on the film's drop
OV.grid = (bpm, dropFilm, dropFile, bed) => { const p = 60 / bpm; window.MUSIC = { f: bed, at: +(dropFile - dropFilm).toFixed(4) }; return { p, B: n => dropFilm + n * p } };
// the sonic mark (research B7): one short sting inside the first 2 s of every take, the same file in all five (swap it here)
OV.STING = 'sfx-chime';
OV.sting = (C, t = .12) => C.push([t, OV.STING, .2]);
// the EZ. mark drawn alone (no disc), for marks cast, printed or engraved into a scene object: letters in `ink`, slashes in brand colours
OV.markSvg = (w, ink = '#f8f0d9', slash = true, extra = '') => `<svg width="${w}" height="${(w * 260 / 340).toFixed(1)}" viewBox="25 80 345 255" style="display:block;${extra}"><path fill="${ink}" d="M116.8,88.0 L86.2,152.0 L102.1,152.0 L55.0,274.5 L154.2,274.5 L188.5,225.8 L128.7,225.8 L137.5,204.0 L170.2,203.5 L193.2,162.0 L149.1,162.0 L154.8,145.0 L143.4,138.5 L217.9,138.2 L192.2,182.0 L234.9,182.0 L181.5,250.8 L136.0,315.8 L272.5,315.8 L292.5,265.0 L230.4,265.0 L328.2,130.8 L225.1,130.8 L253.0,87.8 Z"/>${slash ? `<path fill="${OV.G}" d="M146.2,287.0 L133.0,287.0 L106.5,327.2 L119.0,326.5 Z M86.8,169.5 L74.8,169.5 L29.5,282.2 L43.7,282.2 Z M105.8,92.5 L89.5,95.8 L55.5,169.2 L69.0,169.2 Z"/><path fill="${OV.R}" d="M304.5,259.0 L300.5,269.5 L313.0,268.2 L317.0,258.8 Z M361.5,126.0 L344.0,126.5 L269.5,235.8 L256.0,257.5 L276.2,257.0 Z M279.0,87.8 L266.7,87.5 L251.5,117.2 L262.2,119.0 Z"/><path fill="${OV.AU}" d="M334.2,281.2 L302.0,281.2 L288.2,315.8 L321.0,315.5 Z"/>` : ''}</svg>`;
