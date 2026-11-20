// Night studio, feed films desk A (nt-fv1..fv5, 2026-11-20): the pieces the five concept films share, lifted from fl-feed.html (?pace=up) and
// fl-pre.html: the phone with the app's real UI (top bar, FEED tab, posts with the key clause marked, "LONG (+4%)" and "58% confident"), the
// glass lift by layout zoom, the fingertip, the grain, the beat grid of m3-electro (124 BPM, beat 0.4839 s, first beat 0.025 s), the house bug
// (the EZ. logo 64 px tall with "Earnings Zeason" beside it in the film's own face, 44 px from the top-left corners) and the end card.
// Data: w6/fl/data.json (posts verbatim from calls.csv, marks, the plain-words reading). Each page sets FACE before FV.boot().
const FV = {};
FV.BT = .4839; FV.PH = .025; FV.B = n => FV.PH + n * FV.BT;
FV.cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)); FV.n = (t, a, b) => FV.cl((t - a) / (b - a)); FV.lerp = (a, b, x) => a + (b - a) * x;
FV.eo = x => 1 - Math.pow(1 - x, 3); FV.eo5 = x => 1 - Math.pow(1 - x, 5); FV.eio = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
FV.spr = x => x >= 1 ? 1 : x <= 0 ? 0 : 1 - Math.exp(-5.8 * x) * (Math.cos(5.66 * x) + 1.0247 * Math.sin(5.66 * x));   // vid2's lift spring: starts from rest
FV.slam = x => x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.exp(-9 * x) * Math.cos(9 * x);   // a hard landing with one small overshoot
// a camera track on beats: [[beat, {key: value}], ...]; each move starts on its beat and lands in `d` s (spring)
FV.trk = (K, t, d = .75) => { const s = Object.assign({}, K[0][1]); for (let i = 1; i < K.length; i++) { const a = FV.B(K[i][0]); if (t < a) break; const e = FV.spr(FV.n(t, a, a + d)), g = K[i][1]; for (const k in g) s[k] = FV.lerp(s[k] == null ? g[k] : s[k], g[k], e) } return s };
FV.esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
FV.$ = (s, r = document) => r.querySelector(s); FV.$$ = (s, r = document) => [...r.querySelectorAll(s)];
FV.money = v => (v < 0 ? '−' : '+') + '$' + Math.abs(Math.round(v)).toLocaleString('en-US');
FV.NOP = /[.,;:!?'"“”‘’()·]/;   // our own lines carry no punctuation (owner's rule)
FV.check = (...lines) => lines.forEach(l => { if (FV.NOP.test(l)) throw new Error('punctuation in our line: ' + l); if (l.split(/\s+/).filter(Boolean).length > 8) throw new Error('more than 8 words: ' + l) });
let D;
FV.mark = (k, s) => { const m = D.marks[k];
  return `<span class="aim" style="width:${s}px;height:${s}px;background:${m.bg}"><svg viewBox="0 0 24 24" width="${(s * .58).toFixed(1)}" height="${(s * .58).toFixed(1)}"><path fill="${m.fg}"${m.fr ? ` fill-rule="${m.fr}"` : ''} d="${m.d}"/>${m.dot ? `<path fill="${m.dotc}" d="${m.dot}"/>` : ''}</svg></span>` };
FV.flag = (c, w) => c === 'CN' ? `<svg class="fl" width="${w}" height="${w * 2 / 3}" viewBox="0 0 30 20"><rect width="30" height="20" fill="#de2910"/><path fill="#ffde00" d="M6 3l1.2 3.6H11L8 8.8l1.1 3.6L6 10.2 2.9 12.4 4 8.8 1 6.6h3.8z"/></svg>`
  : `<svg class="fl" width="${w}" height="${w * 2 / 3}" viewBox="0 0 30 20"><rect width="30" height="20" fill="#b22234"/>${[2.3, 6.9, 11.5, 16.1].map(y => `<rect y="${y}" width="30" height="1.55" fill="#fff"/>`).join('')}<rect width="13" height="10.8" fill="#3c3b6e"/></svg>`;
FV.hwords = s => { const w = s.split(/\s+/).filter(Boolean); let o = ''; w.forEach((x, i) => { const sp = i < w.length - 1; o += `<span class="hw${sp ? ' sp' : ''}">${FV.esc(x)}<i>${FV.esc(x)}</i></span>${sp ? ' ' : ''}` }); return o };
FV.quote = (keep, hl) => { const i = keep.indexOf(hl); if (i < 0) throw new Error('highlight not in text: ' + hl);
  return `<span class="rest">${FV.esc(keep.slice(0, i))}</span><span class="hlc">${FV.hwords(hl)}</span><span class="rest">${FV.esc(keep.slice(i + hl.length))}</span>` };
FV.sweep = (el, p) => { if (!el) return; const ln = w => w.firstChild.textContent.length + (w.classList.contains('sp') ? 1 : 0), ws = [...el.querySelectorAll('.hw')], N = ws.reduce((s, w) => s + ln(w), 0); let c = 0;
  ws.forEach(w => { const l = ln(w), x = Math.min(1, Math.max(0, (p * N - c) / l)); c += l; w.lastChild.style.clipPath = `inset(-12% ${((1 - x) * 100).toFixed(2)}% -12% 0)`; w.lastChild.style.opacity = x > 0 ? 1 : 0 }) };
FV.sideTxt = x => `${x.side} <span>(${x.side === 'LONG' ? '+' : '−'}${x.size}%)</span>`;   // owner: "LONG (+4%)"
FV.F = k => D.feed.find(x => x.k === k);
FV.ICON = { LEADERBOARD: '<path d="M5 20V10M12 20V4M19 20v-7"/>', FEED: '<path d="M4 5.5h16v10.5H10l-4.5 3.5V16H4z"/><path d="M8 9.5h8M8 12.5h5"/>', 'AI PROFILES': '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="17" cy="9" r="2.4"/><path d="M15.8 14.2c2.4.1 4.1 1.6 4.7 4.8"/>', UPCOMING: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>' };
// a post of the feed (the terminal's look at phone size); o.date, o.plain (show the In plain words row), o.grade (a graded receipt row)
FV.post = (x, o = {}) => { const co = D.cos.INTU; return `<div class="post"${o.id ? ` id="${o.id}"` : ''}><div class="ph">${FV.mark(x.k, 40)}<div><b>${x.name}</b><small>${FV.flag(x.flag, 19)}${x.lab}<span class="d">${o.date || 'Nov 19'}</span></small></div></div>
    <div class="pq">${o.text ? FV.esc(o.text) : FV.quote(x.keep, x.hl)}</div>
    ${o.plain && x.plain.length ? `<div class="pt"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h13"/></svg>In plain words<svg class="cv" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></div><div class="pp"><div class="ppi"><small>IN PLAIN WORDS<i>ours</i></small><p>${x.plain.map(FV.esc).join(' ')}</p></div></div>` : ''}
    <div class="tc"><img src="${co.logo}" alt=""><div class="cn"><b>${co.co}</b><span>${x.t}</span><small>${x.conf}% confident</small></div><div class="sd ${x.side[0]}">${FV.sideTxt(x)}</div></div>${o.grade || ''}</div>` };
FV.phone = (inner) => `<div class="phw"><div class="phn"><div class="body"></div><div class="scr"><div class="app">
  <div class="tb"><img src="ezlogo.svg" alt=""><b><i class="e">E</i>arnings <i class="z">Z</i>eason</b><div class="ssn"><span>SEASON 2</span></div></div>
  <div class="views">${inner || ''}</div>
  <div class="nav">${Object.keys(FV.ICON).map(n => `<div data-n="${n}"><svg viewBox="0 0 24 24">${FV.ICON[n]}</svg>${n}</div>`).join('')}</div><div class="tab"></div>
</div><div class="isl"></div><div class="glare"></div></div></div></div>`;
// the nav: which tab is lit (and the gold bar under it)
FV.navOn = (root, name) => { const ds = FV.$$('.nav div', root); ds.forEach(d => d.classList.toggle('on', d.dataset.n === name)); const d = ds.find(d => d.dataset.n === name), tb = FV.$('.tab', root);
  if (d && tb) { tb.style.left = (d.offsetLeft + d.offsetWidth * .22).toFixed(1) + 'px'; tb.style.width = (d.offsetWidth * .56).toFixed(1) + 'px' } };
// the house bug: the EZ. logo 64 px tall, 44 px from the top-left corner, "Earnings Zeason" beside it in the film's face (set by the page's CSS)
FV.bug = () => `<div id="bug"><img src="ezlogo.svg" alt=""><span>EARNINGS ZEASON</span></div>`;   // s2d.html's .bug (coordinator, 23:25 UTC): one fixed logotype in every film
FV.end = (k, name) => { FV.check(k, name); return `<div id="end"><img src="ezlogo.svg" alt=""><small>${k}</small><h3>${name.split(' ').map((w, i) => `<span class="w"><i data-n="${i}">${FV.esc(w)}</i></span>`).join(' ')}</h3></div>` };
// the end card: logo springs in, the season, the feature name word by word; held to the last frame
FV.endR = (t, t0) => { const e = FV.$('#end'); if (!e) return; e.style.opacity = t >= t0 ? 1 : 0; if (t < t0) return;
  const lg = FV.spr(FV.n(t, t0, t0 + .8)), im = e.querySelector('img'); im.style.transform = `translateY(${(40 * (1 - lg)).toFixed(1)}px) scale(${(.7 + .3 * lg + .006 * Math.sin(t * 2.2)).toFixed(4)})`; im.style.opacity = FV.cl(lg * 2).toFixed(3);
  const kq = FV.eo(FV.n(t, t0 + FV.BT * .5, t0 + FV.BT * .5 + .4)); e.querySelector('small').style.opacity = kq.toFixed(3); e.querySelector('small').style.transform = `translateY(${(14 * (1 - kq)).toFixed(1)}px)`;
  e.querySelectorAll('h3 .w>i').forEach(w => { const j = +w.dataset.n, a = t0 + FV.BT + j * .08, i = FV.eo(FV.n(t, a, a + .5)); w.style.transform = `translateY(${((1 - i) * 112).toFixed(1)}%)`; w.style.opacity = i > 0 ? 1 : 0 }) };
// lines: words rise in one by one out of a mask, leave together. FV.line(el, text) once; FV.lineR(el, t, a, b) every frame
FV.line = (el, s) => { FV.check(s.replace(/\{[gry] /g, '').replace(/\}/g, '')); let n = 0;
  el.innerHTML = s.replace(/\{([gry]) ([^}]+)\}/g, (_, c, w) => w.split(' ').map(x => `\u0001${c}${x}`).join(' ')).split(/\s+/).filter(Boolean).map(w => { const c = w[0] === '\u0001' ? w[1] : '', x = c ? w.slice(2) : w;
    return `<span class="w"><i class="${c}" data-n="${n++}">${FV.esc(x)}</i></span>` }).join(' ') };
FV.lineR = (el, t, a, b, dy = 112) => { const on = t >= a && t < b + .5; el.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  el.querySelectorAll('.w>i').forEach(w => { const k = +w.dataset.n, i = FV.eo(FV.n(t, a + k * .07, a + .45 + k * .07)), o = Math.pow(FV.n(t, b + k * .03, b + .3 + k * .03), 3);
    w.style.transform = `translateY(${((1 - i) * dy - o * (dy + 6)).toFixed(1)}%)` }) };
// a fingertip: x, y on screen; k presence, pr press, rp ripple
FV.touch = (x, y, k, pr, rp) => { const d = FV.$('#td'), r = FV.$('#tr'); k = FV.cl(k); d.style.opacity = (k * .95).toFixed(3); d.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${(1.18 - .18 * k - .2 * (pr || 0)).toFixed(3)})`;
  r.style.opacity = rp > 0 && rp < 1 ? (.8 * (1 - rp)).toFixed(3) : 0; r.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${(1 + 1.9 * FV.eo(rp || 0)).toFixed(3)})` };
FV.tap = (t, Tt, el, dx = 30, dy = 70) => { if (!el || t < Tt - .7 || t > Tt + .65) return false; const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, n = FV.n, eo = FV.eo;
  const k = eo(n(t, Tt - .7, Tt - .35)) * (1 - n(t, Tt + .15, Tt + .4)); FV.touch(x + (1 - eo(n(t, Tt - .7, Tt - .1))) * dx, y + (1 - eo(n(t, Tt - .7, Tt - .1))) * dy, k, n(t, Tt - .1, Tt) * (1 - n(t, Tt, Tt + .14)), n(t, Tt, Tt + .55)); return true };
// glass lifts: a copy of an element in #lift, grown by layout zoom from where its source sits to a target {x centre, y top, z, r}
FV.lifts = {};
FV.mkLift = (id, el, cls, w0 = 358) => { const w = document.createElement('div'); w.className = 'lw'; const c = el.cloneNode(true); c.removeAttribute('id'); c.className += ' lc glass ' + (cls || ''); c.style.margin = '0'; c.style.width = w0 + 'px';
  w.appendChild(c); FV.$('#lift').appendChild(w); w.style.display = 'block'; c.style.zoom = 1; const pp = c.querySelector('.pp'); let hp = 0;
  if (pp) { pp.style.height = 'auto'; hp = pp.offsetHeight; pp.style.height = '0px' } const h0 = c.offsetHeight; w.style.display = 'none';
  return FV.lifts[id] = { w, c, el, h0, hp, pp, w0, hlc: c.querySelector('.hlc') } };
FV.lift = (id, t, up, dn, tgt, dd = .5) => { const o = FV.lifts[id], kU = FV.spr(FV.n(t, up, up + .78)), kD = FV.eio(FV.n(t, dn, dn + dd)), k = kU * (1 - kD);
  if (t < up || (k <= .001 && t > dn)) { o.w.style.display = 'none'; o.el.style.opacity = 1; return 0 }
  o.w.style.display = 'block'; const r = o.el.getBoundingClientRect(), z0 = r.width / o.w0, g = tgt(t), z = FV.lerp(z0, g.z, k);
  const x = FV.lerp(r.left, g.x - o.w0 * z / 2, k), y = FV.lerp(r.top, g.y, k), fl = k * 5 * Math.sin(t * 1.3 + id.length);
  o.w.style.transform = `translate(${x.toFixed(2)}px,${(y + fl).toFixed(2)}px) rotate(${(k * (.35 * Math.sin(t * .9 + id.length) + (g.r || 0))).toFixed(3)}deg)`; o.c.style.zoom = z.toFixed(4);
  o.el.style.opacity = k > .02 ? 0 : 1; o.w.style.opacity = g.o == null ? 1 : g.o;
  o.c.style.setProperty('--gx', (50 + 38 * Math.sin(t * .55 + id.length)).toFixed(1) + '%'); o.c.style.setProperty('--gy', (22 + 30 * Math.sin(t * .42 + 1)).toFixed(1) + '%');
  return k };
// the sonic mark: the same short chime in the first second of every film (RESEARCH.md B7)
FV.STING = [.25, 'sfx-chime', .1];
FV.raf = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
// boot: data, the app's CSS (L.css: Inter and Geist Mono), the shared CSS, fonts and images; then the page's own build()
FV.boot = async (build, fonts = []) => {
  D = await fetch('w6/fl/data.json').then(r => r.json()); FV.D = D;
  const st = document.createElement('style'); st.textContent = L.css + FV.css; document.head.prepend(st);
  await build();
  for (const f of ['italic 800 31px Kanit', '800 92px Inter', '500 15.5px Inter', '700 13px "Geist Mono"', '500 13px "Geist Mono"'].concat(fonts)) await document.fonts.load(f);
  await document.fonts.ready; await Promise.all(FV.$$('img').map(i => i.decode().catch(() => 0)));
};
FV.css = `
:root{--tx:#f5f1ea;--mu:#8e9a93;--mu2:#5d6963;--up:#55d6a2;--dn:#ff5a6e;--ac:#fdbc2a;--cr:#f8f0d9;--ln:#24302b;--g:#03c870;--r:#ff3a31;--k:#04070e}
#st{position:absolute;inset:0;overflow:hidden;background:#04070e}
@font-face{font-family:Kanit;font-style:italic;font-weight:800;src:url(w6/c/kanit800i.woff2) format('woff2')}
@font-face{font-family:Kanit;font-style:italic;font-weight:900;src:url(w6/c/kanit900i.woff2) format('woff2')}
#bug{position:absolute;left:54px;top:50px;height:64px;display:flex;align-items:center;gap:16px;z-index:90;pointer-events:none;color:#f2ede6;letter-spacing:.02em}
#bug img{width:64px;height:64px;display:block}
#bug span{font:italic 800 31px/1 Kanit,sans-serif;letter-spacing:.01em;white-space:nowrap}
.e{color:var(--g)!important}.z{color:var(--r)!important}
#end{position:absolute;left:0;right:0;top:330px;text-align:center;opacity:0;z-index:60}
#end img{width:190px;height:190px;display:block;margin:0 auto;filter:drop-shadow(0 18px 50px rgba(0,0,0,.6))}
#end small{display:block;margin-top:40px;font:700 36px/1 'Geist Mono';letter-spacing:.2em;color:var(--ac)}
#end h3{margin-top:26px;font-size:124px;line-height:1.02;color:var(--tx)}
#end .w,.ln .w{display:inline-block;overflow:hidden;vertical-align:top;padding:.04em .04em .16em;margin:-.04em -.04em -.16em}.w>i{display:inline-block;font-style:normal}
.ln .g{color:var(--g)}.ln .r{color:var(--r)}.ln .y{color:var(--ac)}
#td{position:absolute;left:0;top:0;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.62),rgba(255,255,255,.3) 62%,rgba(255,255,255,.05));box-shadow:0 0 0 1.5px rgba(255,255,255,.4),0 6px 18px rgba(0,0,0,.45);opacity:0;pointer-events:none;z-index:80}
#tr{position:absolute;left:0;top:0;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;border:2.5px solid rgba(255,255,255,.75);opacity:0;pointer-events:none;z-index:80}
#lift{position:absolute;inset:0;pointer-events:none;z-index:30}
.lw{position:absolute;left:0;top:0;width:0;height:0;display:none}
.lw>.lc{position:absolute;left:0;top:0;width:358px}
.lc.glass{background:linear-gradient(162deg,rgba(248,240,217,.17) 0%,rgba(248,240,217,.07) 34%,rgba(10,15,13,.74) 70%,rgba(8,11,10,.82) 100%);box-shadow:inset 0 0 0 1px rgba(248,240,217,.26),inset 0 1px 0 rgba(255,255,255,.34),0 26px 60px rgba(0,0,0,.62),0 0 0 .5px rgba(0,0,0,.7);overflow:hidden}
.lc.glass::before{content:'';position:absolute;left:var(--gx,30%);top:var(--gy,0%);width:300px;height:220px;margin:-110px 0 0 -150px;border-radius:50%;background:radial-gradient(closest-side,var(--gc,rgba(3,200,112,.28)),transparent);mix-blend-mode:screen;pointer-events:none}
.lc.glass .tc{background:rgba(4,7,6,.55)}
.lc.glass.foc .pq .rest{color:rgba(231,225,217,.5)}
.lc .ph small,.lc .tc .cn span,.lc .tc .cn small{color:#a9b4ad}
/* the phone (fl-feed's), at 390 x 844 css px inside; .phw is placed and zoomed by the page */
.phw{position:absolute;left:0;top:0;width:390px;height:844px;will-change:transform}   /* composited: without it swiftshader paints the frame black around the phone */
.phn{position:absolute;left:0;top:0;width:390px;height:844px}
.phn .body{position:absolute;inset:-14px;border-radius:66px;background:linear-gradient(145deg,#5a605c 0%,#1d201e 13%,#0b0d0c 32%,#0b0d0c 68%,#1c1f1d 87%,#4b514d 100%);box-shadow:0 60px 120px rgba(0,0,0,.7),0 -20px 60px -26px rgba(40,200,130,.4),0 22px 70px -26px rgba(255,60,70,.36),inset 0 0 0 2px rgba(255,255,255,.12),inset 0 6px 6px -4px rgba(90,235,170,.55),inset 0 -6px 6px -4px rgba(255,84,94,.5)}
.phn .body::after{content:'';position:absolute;inset:8px;border-radius:59px;box-shadow:0 0 0 2px #020302,0 0 0 3px rgba(255,255,255,.05)}
.scr{position:absolute;inset:0;border-radius:52px;overflow:hidden;background:#060a08}
.app{position:absolute;inset:0;background:radial-gradient(90% 30% at 50% 0%,rgba(3,200,112,.14),transparent 70%),#060a08}
.isl{position:absolute;left:50%;top:11px;width:104px;height:30px;margin-left:-52px;border-radius:18px;background:#000;z-index:5}
.glare{position:absolute;inset:0;border-radius:52px;background:linear-gradient(115deg,transparent 0%,rgba(255,255,255,.035) 18%,rgba(255,255,255,.1) 30%,rgba(255,255,255,.02) 41%,transparent 50%,transparent 74%,rgba(255,255,255,.04) 86%,transparent 100%);background-size:230% 230%;background-repeat:no-repeat;pointer-events:none;z-index:6}
.tb{position:absolute;left:16px;right:16px;top:50px;height:46px;display:flex;align-items:center;gap:9px;z-index:3}
.tb img{width:30px;height:30px}.tb b{font:800 18px/1 Inter;letter-spacing:-.01em;white-space:nowrap}.tb i{font-style:normal}
.ssn{margin-left:auto;position:relative;height:26px;width:84px;font:600 11px/26px 'Geist Mono';letter-spacing:.1em;color:var(--ac);text-align:center;border-radius:8px;background:rgba(253,188,42,.1);box-shadow:inset 0 0 0 1.5px rgba(253,188,42,.35);overflow:hidden}
.views{position:absolute;left:0;right:0;top:100px;bottom:74px;overflow:hidden;-webkit-mask:linear-gradient(transparent 0,#000 12px,#000 calc(100% - 16px),transparent);mask:linear-gradient(transparent 0,#000 12px,#000 calc(100% - 16px),transparent)}
.vw{position:absolute;left:16px;width:358px;top:0}
.vh{padding:12px 2px 14px}.vh small{display:block;font:700 11px/1 'Geist Mono';letter-spacing:.16em;color:var(--ac);margin-bottom:8px}.vh b{font:800 25px/1 Inter;letter-spacing:-.03em}
.post{position:relative;margin-bottom:12px;padding:15px 16px 16px;border-radius:22px;background:rgba(14,19,17,.97);box-shadow:inset 0 0 0 1.5px var(--ln)}
.ph{display:flex;align-items:center;gap:11px}
.ph b{display:block;font:700 17px/1 Inter}.ph small{display:flex;align-items:center;gap:6px;margin-top:6px;font:500 13.5px/1 'Geist Mono';color:var(--mu)}.ph small .d{margin-left:8px}
.pq{margin-top:12px;font:500 15.5px/1.42 Inter;color:#e7e1d9;letter-spacing:-.005em}
.pt{display:flex;align-items:center;gap:7px;margin-top:11px;font:700 13.5px/1 Inter;color:var(--ac)}
.pt svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.pt .cv{margin-left:auto;width:16px;height:16px}
.pp{overflow:hidden;height:0}
.ppi{margin-top:10px;padding:11px 13px 12px;border-radius:14px;background:rgba(253,188,42,.08);box-shadow:inset 3px 0 0 var(--ac)}
.ppi small{display:block;font:700 13.5px/1 'Geist Mono';letter-spacing:.08em;color:var(--ac)}.ppi small i{font-style:normal;font-weight:500;color:var(--mu);letter-spacing:.02em;margin-left:6px}
.ppi p{margin-top:9px;font:600 16px/1.36 Inter;color:var(--cr);letter-spacing:-.01em}
.tc{display:flex;align-items:center;gap:11px;margin-top:12px;padding:10px 12px;border-radius:16px;background:#0b100e;box-shadow:inset 0 0 0 1.5px var(--ln)}
.tc img{width:34px;height:34px;border-radius:9px;flex:none}
.tc .cn b{font:700 16px/1 Inter}.tc .cn span{font:500 13.5px/1 'Geist Mono';color:var(--mu);margin-left:7px;letter-spacing:.04em}
.tc .cn small{display:block;margin-top:6px;font:500 13.5px/1 'Geist Mono';color:var(--mu)}
.tc .sd{margin-left:auto;white-space:nowrap;font:700 16px/1 'Geist Mono';letter-spacing:.04em;transform-origin:100% 50%}.tc .sd span{font-weight:600;font-size:14.5px;letter-spacing:0}
.L{color:var(--up)}.S{color:var(--dn)}
.nav{position:absolute;left:0;right:0;bottom:0;height:74px;display:flex;padding-bottom:10px;background:linear-gradient(180deg,rgba(6,9,8,.96),#060908);box-shadow:inset 0 1.5px 0 var(--ln);z-index:4}
.nav div{flex:1 1 0;min-width:0;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font:600 9.5px/1 'Geist Mono';letter-spacing:.07em;color:var(--mu2);white-space:nowrap}
.nav svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.nav .on{color:var(--tx)}
.tab{position:absolute;bottom:71px;height:3px;border-radius:0 0 3px 3px;background:var(--ac);box-shadow:0 0 12px rgba(253,188,42,.7);z-index:5}
.aim{border-radius:50%;display:inline-grid;place-items:center;flex:none;box-shadow:0 0 0 1.5px rgba(242,237,230,.14)}.aim svg{display:block}
.fl{display:inline-block;flex:none;border-radius:2px;vertical-align:middle}
.hlc{white-space:normal}.hw{position:relative;white-space:nowrap}
.hw i{position:absolute;left:0;right:-1.5px;top:-.08em;bottom:-.08em;padding:.08em 0 0;font-style:normal;white-space:pre;line-height:normal;color:#1a1405;background:#f3c04a;opacity:0}
.hw.sp i{right:-.3em}.hw:first-child i{left:-.1em;padding-left:.1em;border-radius:.12em 0 0 .12em}.hw:last-child i{right:-.1em;border-radius:0 .12em .12em 0}
#grain{position:absolute;inset:0;width:1080px;height:1350px;mix-blend-mode:overlay;pointer-events:none;z-index:95}
#vig{position:absolute;inset:0;background:radial-gradient(ellipse 75% 65% at 50% 48%,transparent 55%,rgba(0,0,0,.55));pointer-events:none;z-index:85}
`;
