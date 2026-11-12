// Shared pieces for the five R106 CoreWeave resolution videos (2026-11-12). Each page defines window.R(t) (t in seconds) and sets
// window.READY=1 once fonts, marks and the price path are in. Rendered by ../inapp/rs.js (PAGE=dopa/v1.html etc.).
// Every number comes from ez-data.js (R106) or Hyperliquid's xyz:CRWV path (pth.json, scaled onto the sheet's +24.71%).
const L = {};
L.cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
L.n = (t, a, b) => L.cl((t - a) / (b - a));
L.lerp = (a, b, x) => a + (b - a) * x;
L.eo = x => 1 - Math.pow(1 - x, 3);
L.eo5 = x => 1 - Math.pow(1 - x, 5);
L.ei = x => x * x * x;
L.eio = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
L.back = (x, s = 1.70158) => { const c = s + 1; return 1 + c * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2) };
// a damped spring from 0 to 1 (x in seconds since the start); overshoots once and settles
L.spring = (x, f = 2.2, d = 7) => x <= 0 ? 0 : 1 - Math.exp(-d * x) * Math.cos(2 * Math.PI * f * x);
L.money = (v, sign = true) => (v < 0 ? '−' : sign ? '+' : '') + '$' + Math.abs(Math.round(v)).toLocaleString('en-US');
L.pct = (v, d = 2) => (v < 0 ? '−' : '+') + Math.abs(v).toFixed(d) + '%';
L.$ = (s, r = document) => r.querySelector(s);
L.$$ = (s, r = document) => [...r.querySelectorAll(s)];

// the round (ez-data.js row 106)
L.R = {
  n: 106, co: 'CoreWeave', tk: 'CRWV', move: 24.71, stake: 100000, typical: 3.86, rounds: 106,
  ai: [ // in the sheet's order
    { k: 'GPT', name: 'GPT', side: 'LONG', call: 8 },
    { k: 'KIMI', name: 'Kimi', side: 'SHORT', call: -10 },
    { k: 'CLAUDE', name: 'Claude', side: 'SHORT', call: -12 },
    { k: 'GROK', name: 'Grok', side: 'SHORT', call: -1.6 },
  ],
  season0: { GPT: -24740, KIMI: -104600, CLAUDE: 121200, GROK: 208870 },
  season1: { GPT: -30, KIMI: -129310, CLAUDE: 96490, GROK: 184160 },
  next: { co: 'Nebius', tk: 'NBIS', longs: 3, shorts: 1 },
};
L.R.ai.forEach(a => a.pnl = (a.side === 'LONG' ? 1 : -1) * L.R.stake * L.R.move / 100);

// price path: minutes since the Nov 10 close (4:00 pm New York) -> % move; 1440 = the Nov 11 close
L.path = null;
L.px = m => { const p = L.path; if (m <= 0) return 0; if (m >= 1440) return L.R.move;
  let i = 1; while (i < p.length && p[i][0] < m) i++; const a = p[i - 1], b = p[i]; return L.lerp(a[1], b[1], (m - a[0]) / Math.max(1, b[0] - a[0])) };
// New York clock for a minute offset
L.clock = m => { const tot = 16 * 60 + Math.round(m); const d = Math.floor(tot / 1440); const mm = tot % 1440; let h = Math.floor(mm / 60); const mi = mm % 60;
  const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return { day: d ? 'WED' : 'TUE', t: h + ':' + String(mi).padStart(2, '0') + ' ' + ap } };

L.models = null;
L.mark = (k, s, ring = true) => { const m = L.models[k];
  return `<svg class="mk" width="${s}" height="${s}" viewBox="-4 -4 32 32" style="border-radius:${s * .26}px;background:${m.bg};${ring ? 'box-shadow:0 0 0 ' + Math.max(1.5, s * .03) + 'px rgba(242,237,230,.18)' : ''}"><path d="${m.d}" fill="${m.fg}"/></svg>` };

// film grain: a few noise tiles, picked by frame so renders are repeatable
L.grain = (cv, alpha = .07) => { const W = 540, H = 675; cv.width = W; cv.height = H; const tiles = [];
  for (let k = 0; k < 6; k++) { const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); const im = x.createImageData(W, H);
    let s = 1234 + k * 977; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < im.data.length; i += 4) { const v = r() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255 } x.putImageData(im, 0, 0); tiles.push(c) }
  cv.style.opacity = alpha; return t => cv.getContext('2d').drawImage(tiles[Math.floor(t * 24) % tiles.length], 0, 0) };

L.boot = async (extra) => {
  const [m, p] = await Promise.all([fetch('models.json').then(r => r.json()), fetch('pth.json').then(r => r.json())]);
  L.models = m; L.path = p.pts;
  await document.fonts.ready;
  await Promise.all(L.$$('img').map(i => i.decode().catch(() => 0)));
  if (extra) await extra();
  window.READY = 1;
};

// the series bug (top) and the fine print (bottom), shared by every cut
L.chrome = (root) => { root.insertAdjacentHTML('beforeend', `
  <div class="bug"><img src="ezlogo.svg" alt=""><span>EARNINGS ZEASON</span><b>ROUND 106</b></div>
  <div class="fine">Simulated $100K per trade · not advice</div>`) };
L.css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800;900&family=Geist+Mono:wght@500;600;700&display=swap');
*{margin:0;box-sizing:border-box}html,body{width:1080px;height:1350px;overflow:hidden;background:#0e0c0b;color:#f2ede6;font-family:Inter,sans-serif}
.mono{font-family:'Geist Mono',monospace;font-variant-numeric:tabular-nums}
.mk{display:block;flex:none}
#grain{position:absolute;inset:0;width:1080px;height:1350px;mix-blend-mode:overlay;pointer-events:none;z-index:50}
#vig{position:absolute;inset:0;background:radial-gradient(ellipse 75% 65% at 50% 48%,transparent 55%,rgba(0,0,0,.55));pointer-events:none;z-index:49}
.bug{position:absolute;left:56px;top:58px;display:flex;align-items:center;gap:14px;z-index:40;font:600 19px 'Geist Mono',monospace;letter-spacing:.14em;color:#8e8680}
.bug img{width:46px;height:46px}.bug b{margin-left:18px;color:#f2ede6;font-weight:600}
.fine{position:absolute;left:0;right:0;bottom:56px;text-align:center;font:500 18px 'Geist Mono',monospace;letter-spacing:.06em;color:#5f5853;z-index:40}
.up{color:#55d6a2}.dn{color:#e8576b}.au{color:#fdbc2a}`;
