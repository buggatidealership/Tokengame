// FEED FILMS DESK B (night of 20 Nov 2026): the shared pieces of nt-fv6..nt-fv10. Each page loads lib.js, then this, sets its own type
// (FB.face) and builds its own layout; this file gives it the data (w6/nt/fvb/data.json, built by prep.py from calls.csv), the house bug
// (the EZ. logo 64 px tall and "Earnings Zeason" in the piece's own face, 44 px from the top and left, above everything to the last frame),
// the end card, the phone with the app's real UI (fl-feed.html's components: the header, the tab bar, the feed post with its key clause and
// its trade row "LONG (+4%)" / "58% confident"), glass lifts grown by layout zoom (never scale() under perspective), the fingertip, words
// that rise out of a mask, film grain, and the m3-electro beat grid (124 BPM, beat 0.4839 s, first beat 0.025 s).
const FB = {};
FB.BT = .4839; FB.PH = .025; FB.B = n => FB.PH + n * FB.BT;
FB.cl = L.cl; FB.n = L.n; FB.lerp = L.lerp; FB.eo = L.eo; FB.eio = L.eio;
FB.spr = x => x >= 1 ? 1 : x <= 0 ? 0 : 1 - Math.exp(-5.8 * x) * (Math.cos(5.66 * x) + 1.0247 * Math.sin(5.66 * x));   // starts from rest, one small overshoot
FB.sprB = x => x >= 1.6 ? 1 : x <= 0 ? 0 : 1 - Math.exp(-6.5 * x) * Math.cos(11 * x);                                    // a snappier spring with a bounce
FB.ss = x => { x = FB.cl(x); return x * x * x * (x * (x * 6 - 15) + 10) };                                                  // smootherstep: ease in and out
FB.esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
FB.money = v => (v < 0 ? '−' : '+') + '$' + Math.abs(Math.round(v)).toLocaleString('en-US');
FB.D = null;
FB.post = (k, t) => FB.D.posts.find(p => p.k === k && p.t === t);
FB.mark = (k, s, ring = true) => { const m = FB.D.marks[k];
  return `<span class="aim" style="width:${s}px;height:${s}px;background:${m.bg}${ring ? '' : ';box-shadow:none'}"><svg viewBox="0 0 24 24" width="${(s * .58).toFixed(1)}" height="${(s * .58).toFixed(1)}"><path fill="${m.fg}"${m.fr ? ` fill-rule="${m.fr}"` : ''} d="${m.d}"/>${m.dot ? `<path fill="${m.dotc}" d="${m.dot}"/>` : ''}</svg></span>` };
FB.flag = (c, w) => c === 'CN' ? `<svg class="fl" width="${w}" height="${w * 2 / 3}" viewBox="0 0 30 20"><rect width="30" height="20" fill="#de2910"/><path fill="#ffde00" d="M6 3l1.2 3.6H11L8 8.8l1.1 3.6L6 10.2 2.9 12.4 4 8.8 1 6.6h3.8z"/></svg>`
  : `<svg class="fl" width="${w}" height="${w * 2 / 3}" viewBox="0 0 30 20"><rect width="30" height="20" fill="#b22234"/>${[2.3, 6.9, 11.5, 16.1].map(y => `<rect y="${y}" width="30" height="1.55" fill="#fff"/>`).join('')}<rect width="13" height="10.8" fill="#3c3b6e"/></svg>`;
FB.hwords = s => { const w = s.split(/\s+/).filter(Boolean); let o = '';
  w.forEach((x, i) => { const sp = i < w.length - 1; o += `<span class="hw${sp ? ' sp' : ''}">${FB.esc(x)}<i>${FB.esc(x)}</i></span>${sp ? ' ' : ''}` }); return o };
FB.quote = (keep, hl) => { const i = keep.indexOf(hl); if (i < 0) throw new Error('key clause not in text: ' + hl);
  return `<span class="rest">${FB.esc(keep.slice(0, i))}</span><span class="hlc">${FB.hwords(hl)}</span><span class="rest">${FB.esc(keep.slice(i + hl.length))}</span>` };
FB.sweep = (el, p) => { if (!el) return; const ln = w => w.firstChild.textContent.length + (w.classList.contains('sp') ? 1 : 0), ws = [...el.querySelectorAll('.hw')], n = ws.reduce((s, w) => s + ln(w), 0); let c = 0;
  ws.forEach(w => { const l = ln(w), x = Math.min(1, Math.max(0, (p * n - c) / l)); c += l; w.lastChild.style.clipPath = `inset(-12% ${((1 - x) * 100).toFixed(2)}% -12% 0)`; w.lastChild.style.opacity = x > 0 ? 1 : 0 }) };
FB.sideTxt = x => `${x.side} <span>(${x.side === 'LONG' ? '+' : '−'}${x.size}%)</span>`;   // owner: "LONG (+4%)"
FB.ICON = { LEADERBOARD: '<path d="M5 20V10M12 20V4M19 20v-7"/>', FEED: '<path d="M4 5.5h16v10.5H10l-4.5 3.5V16H4z"/><path d="M8 9.5h8M8 12.5h5"/>', 'AI PROFILES': '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="17" cy="9" r="2.4"/><path d="M15.8 14.2c2.4.1 4.1 1.6 4.7 4.8"/>', UPCOMING: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>' };
FB.DAY = { '2026-11-19': 'Nov 19' };
// a feed post (fl-feed.html's): head, the words with the key clause, optional rows (o.rows: html placed before the trade row), the trade row
FB.postHTML = (x, o = {}) => `<div class="post"${o.id ? ` id="${o.id}"` : ''}><div class="ph">${FB.mark(x.k, 40)}<div><b>${x.name}</b><small>${FB.flag(x.flag, 19)}${x.lab}<span class="d">${FB.DAY[x.called] || x.called}</span></small></div>${o.head || ''}</div>
  ${o.noq ? '' : o.qid ? `<div class="pqx" id="${o.qid}"><div class="pq">${FB.quote(x.keep, x.hl)}</div></div>` : `<div class="pq">${FB.quote(x.keep, x.hl)}</div>`}${o.rows || ''}
  <div class="tc"><img src="${x.logo}" alt=""><div class="cn"><b>${x.co}</b><span>${x.t}</span><small>${x.conf}% confident</small></div><div class="sd ${x.side[0]}">${FB.sideTxt(x)}</div></div>${o.tail || ''}</div>`;
// the phone: body, screen, the app (header with the logo, the name and the SEASON 2 chip; views; the tab bar), island, glare
FB.phoneHTML = (views = '', tabs = ['LEADERBOARD', 'FEED', 'AI PROFILES', 'UPCOMING']) => `<div class="phw"><div class="phn"><div class="body"></div><div class="scr"><div class="app">
  <div class="tb"><img src="ezlogo.svg" alt=""><b><i class="e">E</i>arnings <i class="z">Z</i>eason</b><div class="ssn">SEASON 2</div></div>
  <div class="views">${views}</div>
  <div class="nav">${tabs.map(n => `<div data-n="${n}"><svg viewBox="0 0 24 24">${FB.ICON[n]}</svg>${n}</div>`).join('')}</div><div class="tab"></div>
</div><div class="dimv"></div><div class="isl"></div><div class="glare"></div></div></div></div>`;
// place a phone: centre (cx, cy) in the frame, z its layout zoom (1 = 390 x 844), rotations in degrees, s an extra transform scale (keep it near 1)
FB.place = (w, o) => { const z = o.z, ph = w.firstElementChild; ph.style.zoom = z.toFixed(4); w.style.width = (390 * z).toFixed(1) + 'px'; w.style.height = (844 * z).toFixed(1) + 'px';
  w.style.left = (o.cx - 195 * z).toFixed(1) + 'px'; w.style.top = (o.cy - 422 * z).toFixed(1) + 'px';
  w.style.transform = (Math.abs(o.rx || 0) < .001 && Math.abs(o.ry || 0) < .001 ? '' : `rotateX(${(o.rx || 0).toFixed(3)}deg) rotateY(${(o.ry || 0).toFixed(3)}deg) `) + `rotate(${(o.rz || 0).toFixed(3)}deg) scale(${(o.s || 1).toFixed(4)})`;
  const gl = w.querySelector('.glare'); if (gl) gl.style.backgroundPosition = `${(40 + 40 * Math.sin((o.t || 0) * .4)).toFixed(1)}% ${(30 + 30 * Math.cos((o.t || 0) * .3)).toFixed(1)}%` };
// a track of camera keys [[time, {props}], ...]: each key starts at its time and lands in dur s on the lift spring (or ease if o.ease)
FB.track = (K, t, dur = .75, ez = FB.spr) => { const s = Object.assign({}, K[0][1]); for (let i = 1; i < K.length; i++) { const a = K[i][0]; if (t < a) break;
  const e = ez(FB.n(t, a, a + (K[i][2] || dur))), g = K[i][1]; for (const k in g) s[k] = FB.lerp(s[k], g[k], e) } return s };
// words that rise out of a mask one by one ({g w} green, {r w} red, {y w} gold); no punctuation allowed in our own lines
FB.NOP = /[.,;:!?'"“”‘’()·]/;
FB.words = (s, cls = 'w') => { if (FB.NOP.test(s.replace(/\{[gryc] /g, '').replace(/\}/g, ''))) throw new Error('punctuation in line: ' + s);
  const f = s.replace(/\{([gryc]) ([^}]+)\}/g, (_, c, w) => w.split(' ').map(x => `\u0001${c}${x}`).join(' ')); let n = 0;
  return f.split(/\s+/).filter(Boolean).map(w => { const c = w[0] === '\u0001' ? w[1] : ''; const x = c ? w.slice(2) : w; return `<span class="${cls}"><i class="${c}" data-n="${n++}">${FB.esc(x)}</i></span>` }).join(' ') };
// a line on screen from a to b: words rise in (k apart), all leave together; dir +1 rises up, -1 drops
FB.rise = (el, t, a, b, k = .07, dir = 1) => { if (!el) return; const on = t >= a - .05 && t < b + .5; el.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  el.querySelectorAll('i[data-n]').forEach(w => { const j = +w.dataset.n, i = FB.eo(FB.n(t, a + j * k, a + .45 + j * k)), o = Math.pow(FB.n(t, b + j * .025, b + .3 + j * .025), 3);
    w.style.transform = `translateY(${(dir * ((1 - i) * 112) - dir * o * 118).toFixed(1)}%)` }) };
// the house bug (coordinator, 23:25: exactly s2d.html's .bug, one fixed logotype in every film): the EZ. logo 64 px and EARNINGS ZEASON in
// Kanit italic 800 31 px, left 54, top 50, above everything to the last frame. A signature: it does not count as the in-scene branding (B4).
FB.bug = (root) => { root.insertAdjacentHTML('beforeend', `<div id="bug"><img src="ezlogo.svg" alt=""><span>EARNINGS ZEASON</span></div>`) };
// an in-scene brand mark (B1, B3): the EZ. mark inside the shot's object; class bm so the brand check can find it
FB.EZ = (s, cls = '') => `<img class="bm ${cls}" src="ezlogo.svg" alt="" style="width:${s}px;height:${s}px">`;
// the end card: the logo, SEASON 2, the feature's name; the logo arrives by t0 + .8 and holds to the last frame
FB.endHTML = (name, face, cls = '') => `<div id="endc" class="${cls}"><img src="ezlogo.svg" alt=""><small>SEASON 2</small><h3 style="font-family:${face}">${FB.words(name, 'ew')}</h3></div>`;
FB.endR = (t, t0) => { const e = document.getElementById('endc'); if (!e) return; e.style.opacity = t >= t0 ? 1 : 0; if (t < t0) return;
  e.style.transform = `translateY(${(-14 * FB.eo(FB.n(t, t0, t0 + 3))).toFixed(1)}px) scale(${(1 + .05 * FB.eo(FB.n(t, t0, t0 + 3.2))).toFixed(4)})`;   // a slow push in on the hold
  const lg = FB.spr(FB.n(t, t0, t0 + .8)), im = e.querySelector('img'); im.style.transform = `translateY(${(50 * (1 - lg)).toFixed(1)}px) scale(${(.6 + .4 * lg).toFixed(3)})`; im.style.opacity = FB.cl(lg * 2).toFixed(3);
  const kq = FB.eo(FB.n(t, t0 + .3, t0 + .7)), sm = e.querySelector('small'); sm.style.opacity = kq.toFixed(3); sm.style.transform = `translateY(${(16 * (1 - kq)).toFixed(1)}px)`;
  sm.style.letterSpacing = (.32 - .08 * FB.eo(FB.n(t, t0 + .3, t0 + 2.5))).toFixed(3) + 'em';
  e.querySelectorAll('h3 i[data-n]').forEach(w => { const k = +w.dataset.n, i = FB.eo(FB.n(t, t0 + FB.BT + k * .09, t0 + FB.BT + .5 + k * .09)); w.style.transform = `translateY(${((1 - i) * 112).toFixed(1)}%)` }) };
// a fingertip on the glass (vid2.html's): x, y on screen; k presence, pr press, rp ripple
FB.touch = (x, y, k, pr, rp) => { const d = document.getElementById('td'), r = document.getElementById('tr'); k = FB.cl(k); d.style.opacity = (k * .95).toFixed(3);
  d.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${(1.18 - .18 * k - .2 * (pr || 0)).toFixed(3)})`;
  r.style.opacity = rp > 0 && rp < 1 ? (.8 * (1 - rp)).toFixed(3) : 0; r.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${(1 + 1.9 * FB.eo(rp || 0)).toFixed(3)})` };
FB.tap = (t, Tt, el, dx = 0, dy = 0) => { if (!el || t < Tt - .7 || t > Tt + .65) return false; const r = el.getBoundingClientRect(), x = r.left + r.width / 2 + dx, y = r.top + r.height / 2 + dy;
  const k = FB.eo(FB.n(t, Tt - .7, Tt - .35)) * (1 - FB.n(t, Tt + .15, Tt + .4)), a = 1 - FB.eo(FB.n(t, Tt - .7, Tt - .1));
  FB.touch(x + a * 30, y + a * 70, k, FB.n(t, Tt - .1, Tt) * (1 - FB.n(t, Tt, Tt + .14)), FB.n(t, Tt, Tt + .55)); return true };
// a lift: a copy of an element on glass, grown by layout zoom from where its source sits (read each frame) to tgt(t) = {x: centre, y: top, z, r}
FB.lifts = {};
FB.mkLift = (id, el, cls = '', w0 = 358) => { const w = document.createElement('div'); w.className = 'lw'; const c = el.cloneNode(true); c.removeAttribute('id');
  c.className += ' lc glass ' + cls; c.style.margin = '0'; c.style.width = w0 + 'px'; w.appendChild(c); document.getElementById('lift').appendChild(w); w.style.display = 'block'; c.style.zoom = 1;
  const h0 = c.offsetHeight; w.style.display = 'none'; return FB.lifts[id] = { w, c, el, h0, w0, hlc: c.querySelector('.hlc') } };
FB.lift = (id, t, up, dn, tgt, o = {}) => { const L0 = FB.lifts[id], kU = (o.spr || FB.spr)(FB.n(t, up, up + (o.du || .78))), kD = FB.eio(FB.n(t, dn, dn + (o.dd || .5))), k = kU * (1 - kD);
  if (t < up || (k <= .001 && t > dn)) { L0.w.style.display = 'none'; if (!o.keepSrc) L0.el.style.opacity = 1; return 0 }
  L0.w.style.display = 'block'; const r = L0.el.getBoundingClientRect(), z0 = r.width / L0.w0, g = tgt(t), z = FB.lerp(z0, g.z, k);
  const x = FB.lerp(r.left, g.x - L0.w0 * z / 2, k), y = FB.lerp(r.top, g.y, k), fl = k * (o.float == null ? 5 : o.float) * Math.sin(t * 1.3 + id.length);
  L0.w.style.transform = `translate(${x.toFixed(2)}px,${(y + fl).toFixed(2)}px) rotate(${(k * ((o.wob == null ? .35 : o.wob) * Math.sin(t * .9 + id.length) + (g.r || 0))).toFixed(3)}deg)`; L0.c.style.zoom = z.toFixed(4);
  if (!o.keepSrc) L0.el.style.opacity = k > .02 ? 0 : 1;
  L0.c.style.setProperty('--gx', (50 + 38 * Math.sin(t * .55 + id.length)).toFixed(1) + '%'); L0.c.style.setProperty('--gy', (22 + 30 * Math.sin(t * .42 + 1)).toFixed(1) + '%');
  return k };
// the graded receipt (research F2.10: a reason beside its outcome; wrong as loud as right): the EZ. mark, the close, RIGHT or WRONG, the P&L
FB.rcHTML = (x, day = 'NOV 20', s = 22) => `<div class="rc">${FB.EZ(s)}<span>${day}</span><span class="${x.right ? 'ok' : 'no'}">${x.right ? 'RIGHT' : 'WRONG'}</span><span class="pnl ${x.pnl >= 0 ? 'L' : 'S'}">P&amp;L ${FB.money(x.pnl)}</span></div>`;
// the screen behind a lift dims (a dark layer over the app, cheap to draw; it replaced a blur filter that stalled the renderer under load)
FB.dim = d => { document.querySelectorAll('.dimv').forEach(v => v.style.opacity = (.7 * d).toFixed(3)) };
FB.raf = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
FB.load = async (fontsCSS, preload = []) => {
  const st = document.createElement('style'); st.textContent = `@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,800;1,900&display=swap');` + (fontsCSS || '') + L.css + FB.css; document.head.prepend(st);
  preload = ["italic 800 31px Kanit"].concat(preload);
  FB.D = await fetch('w6/nt/fvb/data.json').then(r => r.json());
  for (const f of preload) await document.fonts.load(f);
};
FB.ready = async () => { await document.fonts.ready; await Promise.all([...document.querySelectorAll('img')].map(i => i.decode().catch(() => 0))); window.R(0); await FB.raf(); window.R(.5); await FB.raf(); window.READY = 1 };
FB.css = `
:root{--k:#04070e;--cr:#f8f0d9;--g:#03c870;--r:#ff3a31;--au:#fdbc2a;--mu:rgba(248,240,217,.58);--mu2:rgba(248,240,217,.36);--ln:rgba(248,240,217,.13)}
html,body{background:#04070e}
#st{position:absolute;inset:0;overflow:hidden;background:#04070e}
#gnd{position:absolute;left:-60px;top:-75px;width:1200px;height:1500px;background-size:cover;background-position:50% 50%;will-change:transform}   /* a fixed raster that is only moved: re-rastering it every frame left white tiles under load (FV7, 21 Nov) */
#cam{position:absolute;inset:0;perspective:2400px;perspective-origin:50% 42%}
.phw{position:absolute;left:0;top:0;transform-origin:50% 50%;will-change:transform}
.phn{position:absolute;left:0;top:0;width:390px;height:844px}
.phn .body{position:absolute;inset:-14px;border-radius:66px;background:linear-gradient(145deg,#5a605c 0%,#1d201e 13%,#0b0d0c 32%,#0b0d0c 68%,#1c1f1d 87%,#4b514d 100%);box-shadow:0 60px 120px rgba(0,0,0,.7),0 -20px 60px -26px rgba(3,200,112,.4),0 22px 70px -26px rgba(255,58,49,.36),inset 0 0 0 2px rgba(255,255,255,.12),inset 0 6px 6px -4px rgba(3,200,112,.55),inset 0 -6px 6px -4px rgba(255,58,49,.5)}
.phn .body::after{content:'';position:absolute;inset:8px;border-radius:59px;box-shadow:0 0 0 2px #020302,0 0 0 3px rgba(255,255,255,.05)}
.scr{position:absolute;inset:0;border-radius:52px;overflow:hidden;background:#05080a}
.app{position:absolute;inset:0;background:radial-gradient(90% 30% at 50% 0%,rgba(3,200,112,.13),transparent 70%),#05080a;color:var(--cr)}
.isl{position:absolute;left:50%;top:11px;width:104px;height:30px;margin-left:-52px;border-radius:18px;background:#000;z-index:5}
.dimv{position:absolute;inset:0;background:#04070e;opacity:0;z-index:6;pointer-events:none}
.glare{position:absolute;inset:0;border-radius:52px;background:linear-gradient(115deg,transparent 0%,rgba(255,255,255,.035) 18%,rgba(255,255,255,.1) 30%,rgba(255,255,255,.02) 41%,transparent 50%,transparent 74%,rgba(255,255,255,.04) 86%,transparent 100%);background-size:230% 230%;background-repeat:no-repeat;pointer-events:none;z-index:7}
.tb{position:absolute;left:16px;right:16px;top:50px;height:46px;display:flex;align-items:center;gap:9px;z-index:3}
.tb img{width:30px;height:30px}.tb b{font:800 18px/1 Inter;letter-spacing:-.01em;white-space:nowrap}.tb i,#bug i{font-style:normal}.e{color:#03c870}.z{color:#ff3a31}
.ssn{margin-left:auto;height:26px;padding:0 10px;font:600 11px/26px 'Geist Mono';letter-spacing:.1em;color:var(--au);border-radius:8px;background:rgba(253,188,42,.1);box-shadow:inset 0 0 0 1.5px rgba(253,188,42,.35)}
.views{position:absolute;left:0;right:0;top:100px;bottom:74px;overflow:hidden;-webkit-mask:linear-gradient(transparent 0,#000 12px,#000 calc(100% - 16px),transparent);mask:linear-gradient(transparent 0,#000 12px,#000 calc(100% - 16px),transparent)}
.vw{position:absolute;left:16px;width:358px;top:0}
.vh{padding:12px 2px 14px}.vh small{display:block;font:700 11px/1 'Geist Mono';letter-spacing:.16em;color:var(--au);margin-bottom:8px}.vh b{font:800 25px/1 Inter;letter-spacing:-.03em}
.post{position:relative;margin-bottom:12px;padding:15px 16px 16px;border-radius:22px;background:rgba(12,16,18,.97);box-shadow:inset 0 0 0 1.5px var(--ln)}
.ph{display:flex;align-items:center;gap:11px}
.post .ph b{display:block;font:700 17px/1 Inter}.post .ph small{display:flex;align-items:center;gap:6px;margin-top:6px;font:500 13.5px/1 'Geist Mono';color:var(--mu)}
.post .ph small .d{margin-left:8px}
.pq{margin-top:12px;font:500 15.5px/1.42 Inter;color:#ece5d4;letter-spacing:-.005em}
.tc{display:flex;align-items:center;gap:11px;margin-top:12px;padding:10px 12px;border-radius:16px;background:#080c0e;box-shadow:inset 0 0 0 1.5px var(--ln)}
.tc img{width:34px;height:34px;border-radius:9px;flex:none;background:#fff;object-fit:contain}
.tc .cn b{font:700 16px/1 Inter}.tc .cn span{font:500 13.5px/1 'Geist Mono';color:var(--mu);margin-left:7px;letter-spacing:.04em}
.tc .cn small{display:block;margin-top:6px;font:500 13.5px/1 'Geist Mono';color:var(--mu)}
.tc .sd{margin-left:auto;white-space:nowrap;font:700 16px/1 'Geist Mono';letter-spacing:.04em;transform-origin:100% 50%}.tc .sd span{font-weight:600;font-size:14.5px;letter-spacing:0}
.L{color:#03c870}.S{color:#ff3a31}
.nav{position:absolute;left:0;right:0;bottom:0;height:74px;display:flex;padding-bottom:10px;background:linear-gradient(180deg,rgba(5,8,10,.96),#05080a);box-shadow:inset 0 1.5px 0 var(--ln);z-index:4}
.nav div{flex:1 1 0;min-width:0;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font:600 9.5px/1 'Geist Mono';letter-spacing:.07em;color:var(--mu2);white-space:nowrap}
.nav svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.nav .on{color:var(--cr)}
.tab{position:absolute;bottom:71px;height:3px;border-radius:0 0 3px 3px;background:var(--au);box-shadow:0 0 12px rgba(253,188,42,.7);z-index:5}
.aim{border-radius:50%;display:inline-grid;place-items:center;flex:none;box-shadow:0 0 0 1.5px rgba(248,240,217,.16)}.aim svg{display:block}
.fl{display:inline-block;flex:none;border-radius:2px;vertical-align:middle}
.hlc{white-space:normal}.hw{position:relative;white-space:nowrap}
.hw i{position:absolute;left:0;right:-1.5px;top:-.08em;bottom:-.08em;padding:.08em 0 0;font-style:normal;white-space:pre;line-height:normal;color:#1a1405;background:#fdbc2a;opacity:0}
.hw.sp i{right:-.3em}.hw:first-child i{left:-.1em;padding-left:.1em;border-radius:.12em 0 0 .12em}.hw:last-child i{right:-.1em;border-radius:0 .12em .12em 0}
#lift{position:absolute;inset:0;pointer-events:none}
.rc{display:flex;align-items:center;gap:9px;margin-top:10px;padding:8px 11px;border-radius:14px;background:rgba(3,5,7,.6);box-shadow:inset 0 0 0 1.2px var(--ln);font:600 12.5px/1 'Geist Mono';letter-spacing:.06em;color:var(--mu);white-space:nowrap}
.rc .bm{flex:none;border-radius:50%}.rc .ok,.rc .no{font:800 15px/1 'Geist Mono';letter-spacing:.08em;padding:5px 8px;border-radius:7px}
.rc .ok{color:#04070e;background:#03c870}.rc .no{color:#04070e;background:#ff3a31}.rc .pnl{margin-left:auto;font:700 18px/1 'Geist Mono';letter-spacing:-.01em}
.lw{position:absolute;left:0;top:0;width:0;height:0;display:none}.lw>.lc{position:absolute;left:0;top:0}
.lc.glass{background:linear-gradient(162deg,rgba(248,240,217,.17) 0%,rgba(248,240,217,.07) 34%,rgba(6,10,12,.5) 70%,rgba(5,8,10,.6) 100%),rgba(6,9,11,.84);box-shadow:inset 0 0 0 1px rgba(248,240,217,.26),inset 0 1px 0 rgba(255,255,255,.34),0 26px 60px rgba(0,0,0,.62),0 0 0 .5px rgba(0,0,0,.7);overflow:hidden}
.lc.glass::before{content:'';position:absolute;left:var(--gx,30%);top:var(--gy,0%);width:300px;height:220px;margin:-110px 0 0 -150px;border-radius:50%;background:radial-gradient(closest-side,var(--gc,rgba(3,200,112,.26)),transparent);mix-blend-mode:screen;pointer-events:none}
.lc.glass .tc{background:rgba(3,5,7,.55)}
.lc .post .ph small,.lc.post .ph small,.lc .tc .cn span,.lc .tc .cn small{color:rgba(248,240,217,.7)}
.lc.glass.foc .pq .rest{color:rgba(236,229,212,.5)}
#td{position:absolute;left:0;top:0;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.62),rgba(255,255,255,.3) 62%,rgba(255,255,255,.05));box-shadow:0 0 0 1.5px rgba(255,255,255,.4),0 6px 18px rgba(0,0,0,.45);opacity:0;pointer-events:none;z-index:60}
#tr{position:absolute;left:0;top:0;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;border:2.5px solid rgba(255,255,255,.75);opacity:0;pointer-events:none;z-index:60}
.w,.ew{display:inline-block;overflow:hidden;vertical-align:top;padding:.04em .04em .16em;margin:-.04em -.04em -.16em}.w>i,.ew>i{display:inline-block;font-style:normal}
i.g{color:#03c870}i.r{color:#ff3a31}i.y{color:#fdbc2a}i.c{color:#f8f0d9}
#bug{position:absolute;left:54px;top:50px;display:flex;align-items:center;gap:16px;z-index:100;color:#f2ede6;letter-spacing:.02em;white-space:nowrap;text-shadow:0 2px 14px rgba(0,0,0,.55)}
#bug img{width:64px;height:64px;display:block;filter:drop-shadow(0 4px 14px rgba(0,0,0,.5))}
#bug span{font:italic 800 31px/1 Kanit,sans-serif;letter-spacing:.01em}
#endc{position:absolute;left:0;right:0;top:330px;text-align:center;opacity:0;z-index:90;color:#f8f0d9}
#endc img{width:230px;height:230px;display:block;margin:0 auto;filter:drop-shadow(0 18px 50px rgba(0,0,0,.6))}
#endc small{display:block;margin-top:40px;font:700 34px/1 'Geist Mono';letter-spacing:.3em;color:#fdbc2a}
#endc h3{margin-top:26px;font-size:112px;line-height:1.02;font-weight:800;letter-spacing:-.03em}
#grain{position:absolute;inset:0;width:1080px;height:1350px;mix-blend-mode:overlay;pointer-events:none;z-index:95}
#vig{position:absolute;inset:0;background:radial-gradient(ellipse 78% 68% at 50% 50%,transparent 55%,rgba(0,0,0,.5));pointer-events:none;z-index:94}
#pulse{position:absolute;inset:0;pointer-events:none;opacity:0;mix-blend-mode:screen;z-index:2}
`;
