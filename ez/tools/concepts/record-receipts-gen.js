// Three receipt directions for the X2+ record cards, built from ez-data.js (GE graded, the newest round with calls in).
const fs = require('fs'), path = require('path');
const R = __dirname;
global.window = global; eval(fs.readFileSync(path.join(R, 'ez-data.js'), 'utf8') + ';global.ROUNDS=ROUNDS;global.PENDING=PENDING;global.MODELS=MODELS;global.logo=logo;global.TICKERS=TICKERS');
const g = ROUNDS[ROUNDS.length - 1], p = PENDING[0];
const nm = m => { const n = (MODELS[m] && MODELS[m].name) || m; return n.length <= 3 ? n : n[0] + n.slice(1).toLowerCase(); };
const md = s => { const m = String(s).match(/(\d+)\/(\d+)/); return ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+m[1]] + ' ' + +m[2]; };
const arw = v => (v < 0 ? '▼' : '▲') + ' ' + Math.abs(v) + '%';
// graded calls: closest first; pending: sheet order
const gc = g.calls.map(c => { const [d, mg] = c[1].split(' '); const v = (d === 'DOWN' ? -1 : 1) * parseFloat(mg); return { m: c[0], v, off: c[2], ok: (v > 0) === (g.a > 0), win: (g.win || '').split(' & ').includes(c[0]) }; }).sort((a, b) => a.off - b.off);
const pc = p.calls.map(c => ({ m: c.m, v: c.v }));
const G = { n: g.n, co: g.co, tk: g.ticker, a: g.a, filed: md(g.called), graded: md(g.resolves), win: nm(g.win) };
const P = { n: p.n, co: p.co, tk: p.ticker, filed: md(p.called), res: md(p.resolves) };
const head = `<div class="sh"><span class="no">01</span><span class="mk">The record</span></div><h2>Every call, receipts included</h2>
<ul class="bl"><li>Don't trust us. Verify every call below.</li><li>Every call straight to your <b>X</b> feed.</li></ul>`;
const base = `@font-face{font-family:Anton;src:url(fonts/Anton.woff2)}@font-face{font-family:Barlow;font-weight:500;src:url(fonts/barlow-500.woff2)}
@font-face{font-family:Barlow;font-weight:700;src:url(fonts/barlow-700.woff2)}@font-face{font-family:Barlow;font-weight:800;src:url(fonts/barlow-800.woff2)}
@font-face{font-family:Mono;font-weight:100 900;src:url(fonts/geist-mono-latin-wght-normal.woff2)}
*{box-sizing:border-box}body{margin:0;background:#0d0b12;color:#f3ead6;font-family:Barlow,sans-serif;width:520px}
.wrap{padding:26px 16px 34px;background:radial-gradient(120% 60% at 80% 0%,rgba(242,182,50,.08),transparent 60%),#0d0b12}
.sh{display:flex;gap:8px;align-items:center}.sh .no{background:#000;color:#f2b632;font:400 18px/1 Anton;padding:6px 9px}.sh .mk{background:#f2b632;color:#000;font:400 13px/1 Anton;letter-spacing:.14em;text-transform:uppercase;padding:7px 12px;transform:skew(-8deg)}
h2{font:400 34px/1 Anton;text-transform:uppercase;margin:14px 0 10px;color:#f3ead6;text-shadow:2px 2px 0 #2a2340}
.bl{list-style:none;padding:0;margin:0 0 20px;display:grid;gap:6px;font:500 16px/1.35 Barlow;color:#d6cebb}.bl li::before{content:"";display:inline-block;width:7px;height:7px;background:#f2b632;margin:0 10px 2px 0}.bl b{color:#f2b632}
.row{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start}
.lg{display:inline-grid;place-items:center;width:1em;height:1em;border-radius:22.5%;vertical-align:middle;flex:none}.lg>svg{width:62%;height:62%}
.cap{font:600 11px/1 Barlow;letter-spacing:.14em;text-transform:uppercase;color:#a49fb4;margin:0 0 8px}`;
const page = (title, css, cards) => `<!doctype html><meta charset="utf-8"><title>${title}</title><style>${base}${css}</style><div class="wrap">${head}<div class="row"><div><p class="cap">Graded</p>${cards[0]}</div><div><p class="cap">Calls in, not graded</p>${cards[1]}</div></div></div>`;

// ---------- A: the $EZ ticket, the same paper as the Results tab ----------
const tA = `
.tk{position:relative;background:#f1e6cc;color:#141217;padding:14px 18px 16px;filter:drop-shadow(4px 5px 0 #000);
 -webkit-mask:radial-gradient(circle at 0 10px,transparent 5px,#000 5.5px) left/51% 20px repeat-y,radial-gradient(circle at 100% 10px,transparent 5px,#000 5.5px) right/51% 20px repeat-y;
 background-image:radial-gradient(rgba(80,60,20,.08) 1px,transparent 1.2px),linear-gradient(90deg,#1f8f55 0 5px,transparent 5px 9px,#1f8f55 9px 11px,transparent 11px calc(100% - 11px),#c8372d calc(100% - 11px) calc(100% - 9px),transparent calc(100% - 9px) calc(100% - 5px),#c8372d calc(100% - 5px));background-size:5px 5px,100% 100%}
.tk::after{content:"";position:absolute;right:26px;top:-3px;width:5px;height:22px;border-radius:3px;background:linear-gradient(90deg,#6d6f73,#d5d7da 45%,#7d7f83);transform:rotate(-38deg)}
.tk .hd{display:flex;gap:9px;align-items:center;border-bottom:2px solid #141217;padding-bottom:8px}.tk .hd img{width:30px;height:30px;border-radius:7px;background:#fff;padding:3px;border:1.5px solid #141217}
.tk .hd b{font:400 19px/1 Anton;text-transform:uppercase;display:block}.tk .hd small{font:600 11px/1.2 Barlow;color:#5d564a}
.tk .film{margin:10px 0 0;height:150px;border:2px solid #141217;background:#000 center/cover}
.tk .perf{position:relative;margin:12px -18px;border-top:2px dashed rgba(20,18,23,.45)}
.tk .tiles{display:grid;grid-template-columns:1fr 1fr;gap:5px}
.tk .t{border:2px solid #141217;padding:5px 4px 4px;text-align:center;background:#4fe39a}.tk .t.no{background:#ff8a80}.tk .t.w{background:#f2b632}.tk .t.open{background:#fffaf0}
.tk .t i{display:flex;gap:4px;justify-content:center;align-items:center;font:700 10px/1 Barlow;font-style:normal;text-transform:uppercase}.tk .t i .lg{font-size:13px}
.tk .t b{display:block;font:800 17px/1.15 Barlow}.tk .t small{font:700 9.5px/1 Barlow}
.tk .t.open b.u{color:#11714a}.tk .t.open b.d{color:#c8372d}
.tk .out{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:5px}.tk .o{border:2px solid #141217;padding:6px 7px;font:700 9px/1 Barlow;letter-spacing:.1em;text-transform:uppercase}
.tk .o.mv{background:#24211f;color:#bdb5a3}.tk .o.mv b{display:block;color:#ff6158;font:800 18px/1.1 Barlow;letter-spacing:0;margin-top:3px}
.tk .o.wn{background:#fffaf0;color:#5d564a}.tk .o.wn b{display:block;color:#141217;font:400 18px/1.1 Anton;letter-spacing:.01em;margin-top:3px}
.tk .o.q{background:repeating-linear-gradient(-45deg,#fffaf0 0 6px,#efe3c6 6px 12px);color:#5d564a}.tk .o.q b{display:block;color:#141217;font:400 18px/1.1 Anton;margin-top:3px}
.tk .stamp{display:inline-block;margin:10px 0 8px;border:2.5px solid #c8372d;color:#c8372d;font:400 13px/1 Anton;letter-spacing:.12em;padding:5px 8px;transform:rotate(-4deg);text-transform:uppercase}
.tk .note{margin:9px 0 0;font:600 11px/1.3 Barlow;color:#5d564a}`;
const tileG = c => `<div class="t ${c.win ? 'w' : c.ok ? '' : 'no'}"><i>${logo(c.m)}${nm(c.m)}</i><b>${arw(c.v)}</b><small>${c.win ? '♛ won' : c.off + ' off'}</small></div>`;
const tileP = c => `<div class="t open"><i>${logo(c.m)}${nm(c.m)}</i><b class="${c.v < 0 ? 'd' : 'u'}">${arw(c.v)}</b><small>locked</small></div>`;
const A = [
  `<div class="tk"><div class="hd"><img src="media/GE.png"><span><b>${G.co}</b><small>${G.tk} · Round ${G.n} · ${G.filed}</small></span></div>
   <div class="film" style="background-image:url(media/round-32-ge-hd-poster.jpg)"></div><div class="perf"></div>
   <div class="tiles">${gc.map(tileG).join('')}</div>
   <div class="out"><div class="o mv">Stock moved<b>${arw(G.a)}</b></div><div class="o wn">Winner<b>${G.win}</b></div></div>
   <p class="note">Filed ${G.filed}, before the report. Graded ${G.graded}.</p></div>`,
  `<div class="tk"><div class="hd"><img src="media/NFLX.png"><span><b>${P.co}</b><small>${P.tk} · Round ${P.n} · ${P.filed}</small></span></div>
   <span class="stamp">Calls are in</span>
   <div class="tiles">${pc.map(tileP).join('')}</div><div class="perf"></div>
   <div class="out"><div class="o q">Stock moved<b>?</b></div><div class="o q">Graded<b>${P.res}</b></div></div>
   <p class="note">Locked ${P.filed}, before the report. No edits.</p></div>`];

// ---------- B: the till receipt (thermal paper, mono print, torn edges, barcode) ----------
const tB = `
.rc{position:relative;background:#f7f5ef;color:#1b1a1d;font:500 11.5px/1.45 Mono,monospace;padding:20px 14px 22px;filter:drop-shadow(0 6px 0 rgba(0,0,0,.55));
 -webkit-mask:linear-gradient(#000,#000) center/100% calc(100% - 16px) no-repeat,conic-gradient(from -45deg at 50% 100%,#000 90deg,transparent 0) top/12px 8px repeat-x,conic-gradient(from 135deg at 50% 0,#000 90deg,transparent 0) bottom/12px 8px repeat-x}
.rc .c{text-align:center}.rc .brand{font:400 26px/1 Anton;letter-spacing:.02em}.rc .brand .e{color:#1f8f55}.rc .brand .z{color:#c8372d}
.rc .t1{font-weight:700;letter-spacing:.16em;font-size:10px;margin-top:3px}
.rc hr{border:0;border-top:1.5px dashed #1b1a1d;margin:9px 0}
.rc .kv{display:flex;justify-content:space-between;gap:6px}.rc .kv b{font-weight:800}
.rc .ph{height:96px;margin:8px 0 2px;background:#000 center/cover;filter:grayscale(1) contrast(1.35) brightness(1.05)}
.rc .ln{display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:baseline}.rc .ln .m{white-space:nowrap;overflow:hidden}.rc .ln .m::after{content:" ......................"}
.rc .ln.w{font-weight:800;background:#1b1a1d;color:#f7f5ef;margin:0 -4px;padding:0 4px}
.rc .ln s{text-decoration:none;font-size:10px;color:#6b6770}.rc .ln.w s{color:#f2b632}
.rc .tot{font-weight:800;font-size:14px}.rc .tot .d{color:#c8372d}
.rc .bc{height:34px;margin:10px 8px 4px;background:repeating-linear-gradient(90deg,#1b1a1d 0 2px,transparent 2px 3px,#1b1a1d 3px 4px,transparent 4px 7px,#1b1a1d 7px 10px,transparent 10px 11px,#1b1a1d 11px 12px,transparent 12px 15px)}
.rc .ft{font-size:9.5px;letter-spacing:.12em;font-weight:700}
.rc .pend{display:block;width:max-content;margin:12px auto 2px;transform:rotate(-6deg);border:2.5px solid #c8372d;color:#c8372d;font:800 12px/1.15 Mono;letter-spacing:.06em;padding:5px 7px;text-align:center;background:rgba(247,245,239,.6)}`;
const lnG = c => `<div class="ln${c.win ? ' w' : ''}"><span class="m">${c.win ? '★ ' : ''}${nm(c.m).toUpperCase()}</span><span>${arw(c.v)}</span><s>${c.win ? 'WON' : c.off + ' off'}</s></div>`;
const lnP = c => `<div class="ln"><span class="m">${nm(c.m).toUpperCase()}</span><span>${arw(c.v)}</span><s></s></div>`;
const B = [
  `<div class="rc"><div class="c"><div class="brand">$<span class="e">E</span><span class="z">Z</span></div><div class="t1">EARNINGS ZEASON</div></div><hr>
   <div class="kv"><b>RECEIPT #${String(G.n).padStart(3, '0')}</b><span>${G.tk}</span></div><div class="kv"><span>${G.co.toUpperCase()}</span></div>
   <div class="kv"><span>FILED ${G.filed.toUpperCase()}</span><span>GRADED ${G.graded.toUpperCase()}</span></div>
   <div class="ph" style="background-image:url(media/round-32-ge-hd-poster.jpg)"></div><hr>
   ${gc.map(lnG).join('')}<hr>
   <div class="kv tot"><span>ACTUAL MOVE</span><span class="d">${arw(G.a)}</span></div>
   <div class="kv"><span>WINNER</span><b>${G.win.toUpperCase()}</b></div><hr>
   <div class="bc"></div><div class="c ft">NOBODY SAID IT WOULD BE EZ</div></div>`,
  `<div class="rc"><div class="c"><div class="brand">$<span class="e">E</span><span class="z">Z</span></div><div class="t1">EARNINGS ZEASON</div></div><hr>
   <div class="kv"><b>RECEIPT #${String(P.n).padStart(3, '0')}</b><span>${P.tk}</span></div><div class="kv"><span>${P.co.toUpperCase()}</span></div>
   <div class="kv"><span>FILED ${P.filed.toUpperCase()}</span><span>LOCKED</span></div><hr>
   ${pc.map(lnP).join('')}<hr>
   <div class="kv tot"><span>ACTUAL MOVE</span><span>PENDING</span></div>
   <div class="kv"><span>GRADED</span><b>${P.res.toUpperCase()} CLOSE</b></div><hr>
   <div class="pend">AWAITING THE CLOSE</div>
   <div class="bc"></div><div class="c ft">NOBODY SAID IT WOULD BE EZ</div></div>`];

// ---------- C: the bookie's slip (carbon-copy paper, printed red form, typed entries, rubber stamp, a clipped photo) ----------
const tC = `
.sl{position:relative;background:#f5e7a3;color:#20202a;padding:16px 14px 16px;box-shadow:4px 5px 0 #000;
 background-image:linear-gradient(rgba(255,255,255,.25),rgba(0,0,0,.03)),radial-gradient(rgba(120,90,0,.07) 1px,transparent 1.3px);background-size:100% 100%,6px 6px}
.sl .top{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #b3261e;padding-bottom:6px;color:#b3261e}
.sl .top b{font:400 20px/1 Anton;letter-spacing:.04em}.sl .top small{font:700 9px/1.2 Barlow;letter-spacing:.14em;text-transform:uppercase;text-align:right}
.sl .lab{font:700 8.5px/1 Barlow;letter-spacing:.16em;text-transform:uppercase;color:#b3261e;margin-top:8px}
.sl .ev{font:600 13px/1.3 Mono;border-bottom:1px solid rgba(179,38,30,.55);padding:3px 0 4px}
.sl table{width:100%;border-collapse:collapse;margin-top:4px;font:600 12px/1 Mono}
.sl th{font:700 8.5px/1 Barlow;letter-spacing:.14em;text-transform:uppercase;color:#b3261e;text-align:left;padding:5px 2px;border-bottom:1.5px solid #b3261e}
.sl td{padding:7px 2px;border-bottom:1px solid rgba(179,38,30,.4)}.sl td:last-child{text-align:center;width:30px}
.sl td .lg{font-size:13px;margin-right:4px}
.sl .ok{color:#11714a;font:800 15px/1 Barlow}.sl .no{color:#b3261e;font:800 15px/1 Barlow}
.sl .res{display:flex;justify-content:space-between;align-items:baseline;margin-top:8px;font:700 13px/1 Mono}.sl .res .d{color:#b3261e;font-size:16px}
.sl .stamp{display:block;width:max-content;margin:12px 0 0 auto;transform:rotate(-8deg);border:3px solid rgba(37,63,160,.85);color:rgba(37,63,160,.9);font:400 15px/1.05 Anton;letter-spacing:.08em;padding:5px 9px;text-align:center;text-transform:uppercase;mix-blend-mode:multiply}
.sl .stamp.open{border-color:rgba(179,38,30,.85);color:rgba(179,38,30,.9)}
.sl .btm{display:flex;justify-content:space-between;align-items:center;margin-top:12px}.sl .btm .stamp{margin:0}
.sl .pic{position:relative;flex:none;width:92px;height:92px;background:#fff;padding:5px 5px 14px;box-shadow:2px 3px 0 rgba(0,0,0,.6);transform:rotate(6deg)}
.sl .pic i{display:block;width:100%;height:100%;background:#000 center/cover}
.sl .pic::after{content:"";position:absolute;left:30px;top:-8px;width:10px;height:26px;border:2.5px solid #9aa0a6;border-radius:6px;border-bottom-color:transparent}
.sl .foot{margin-top:10px;font:700 8.5px/1.3 Barlow;letter-spacing:.12em;text-transform:uppercase;color:#b3261e}`;
const rowG = c => `<tr><td>${logo(c.m)}${nm(c.m)}</td><td>${arw(c.v)}</td><td>${c.ok ? '<span class="ok">✓</span>' : '<span class="no">✗</span>'}</td></tr>`;
const rowP = c => `<tr><td>${logo(c.m)}${nm(c.m)}</td><td>${arw(c.v)}</td><td>&nbsp;</td></tr>`;
const C = [
  `<div class="sl"><div class="top"><b>SLIP ${String(G.n).padStart(4, '0')}</b><small>Filed ${G.filed}</small></div>
   <div class="lab">Event</div><div class="ev">${G.co} (${G.tk})<br>earnings</div>
   <table><tr><th>AI</th><th>Call</th><th>✓/✗</th></tr>${gc.map(rowG).join('')}</table>
   <div class="lab">Result, close ${G.graded}</div><div class="res"><span>Stock moved</span><span class="d">${arw(G.a)}</span></div>
   <p class="foot">Closest call wins</p><div class="btm"><div class="pic"><i style="background-image:url(media/round-32-ge-hd-poster.jpg)"></i></div><div class="stamp">Settled<br>${G.win} wins</div></div></div>`,
  `<div class="sl"><div class="top"><b>SLIP ${String(P.n).padStart(4, '0')}</b><small>Filed ${P.filed}</small></div>
   <div class="lab">Event</div><div class="ev">${P.co} (${P.tk})<br>earnings</div>
   <table><tr><th>AI</th><th>Call</th><th>✓/✗</th></tr>${pc.map(rowP).join('')}</table>
   <div class="lab">Result, close ${P.res}</div><div class="res"><span>Stock moved</span><span>____</span></div>
   <p class="foot">Locked before the report. No edits.</p><div class="stamp open">Open<br>till ${P.res}</div></div>`];

fs.writeFileSync(path.join(R, 'a.html'), page('A · $EZ ticket', tA, A));
fs.writeFileSync(path.join(R, 'b.html'), page('B · Till receipt', tB, B));
fs.writeFileSync(path.join(R, 'c.html'), page('C · Bookie slip', tC, C));
console.log('GE', JSON.stringify(G), 'calls', gc.map(c => c.m + ' ' + c.v + ' ' + c.off + (c.win ? ' W' : '')).join(', '));
console.log('P', JSON.stringify(P), pc.map(c => c.m + ' ' + c.v).join(', '));
