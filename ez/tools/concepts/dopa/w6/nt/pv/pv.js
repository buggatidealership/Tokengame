// Shared pieces for the five night prediction films (nt-pv1..5.html, 2026-11-20). Each page defines window.R(t) and sets READY=1
// (the frame-page contract of close.html and fl-feed.html, rendered by wrapxs.sh). Data: w6/nt/pv/data.json (prep.py, calls.csv only;
// no outcome). ?co=INTU|KEYS|ESTC on every page. Nothing here hints at the result: the films are posted before the report.
const PV = {};
PV.Q = new URLSearchParams(location.search);
PV.CO = (PV.Q.get('co') || '').toUpperCase();
PV.cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
PV.n = (t, a, b) => PV.cl((t - a) / (b - a));
PV.lerp = (a, b, x) => a + (b - a) * x;
PV.eo = x => 1 - Math.pow(1 - x, 3);
PV.eo5 = x => 1 - Math.pow(1 - x, 5);
PV.ei = x => x * x * x;
PV.eio = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
PV.back = (x, s = 1.70158) => { const c = s + 1; return 1 + c * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2) };
PV.spring = (x, f = 2.2, d = 7) => x <= 0 ? 0 : 1 - Math.exp(-d * x) * Math.cos(2 * Math.PI * f * x);
PV.$ = (s, r = document) => r.querySelector(s);
PV.$$ = (s, r = document) => [...r.querySelectorAll(s)];
PV.esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// a pseudo-random number from a seed (repeatable renders)
PV.rnd = s => { let x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) };
PV.num = v => String(+v);
// the post row's words (owner, 2026-11-20): "LONG (+4%)" and "58% confident"
PV.call = x => `${x.side} (${x.side === 'LONG' ? '+' : '−'}${PV.num(x.call)}%)`;
PV.mv = x => `${x.side === 'LONG' ? '+' : '−'}${PV.num(x.call)}%`;
PV.conf = x => `${x.conf}% confident`;
PV.C = { ink: '#04070e', cream: '#f8f0d9', green: '#03c870', red: '#ff3a31', gold: '#fdbc2a' };
PV.side = x => x.side === 'LONG' ? PV.C.green : PV.C.red;
// an AI's mark on its own disc (models5.json)
PV.mark = (k, s, extra = '') => { const m = PV.D.marks[k];
  return `<span class="pvm" style="width:${s}px;height:${s}px;background:${m.bg};${extra}"><svg viewBox="0 0 24 24" width="${(s * .58).toFixed(1)}" height="${(s * .58).toFixed(1)}"><path fill="${m.fg}"${m.fr ? ` fill-rule="${m.fr}"` : ''} d="${m.d}"/></svg></span>` };
PV.coLogo = (s, r = .22) => `<img class="pvc" src="${PV.co.logo}" width="${s}" height="${s}" style="border-radius:${s * r}px">`;
PV.logo = s => `<img src="ezlogo.svg" width="${s}" height="${s}" style="display:block">`;
// the house bug (research B4 and B8, 2026-11-20 23:25): s2d.html's .bug, one fixed logotype in every film: the EZ. logo 64 px and
// "EARNINGS ZEASON" in Kanit italic 800 31 px, left 54 px, top 50 px. A signature only: the brand moments are inside the scene.
PV.bug = () => `<div id="hbug" style="position:absolute;left:54px;top:50px;height:64px;display:flex;align-items:center;gap:16px;z-index:90;pointer-events:none;color:#f2ede6;letter-spacing:.02em">
  <img src="ezlogo.svg" width="64" height="64" style="display:block;filter:drop-shadow(0 4px 14px rgba(0,0,0,.5))"><span style="font:italic 800 31px/1 Kanit,sans-serif;letter-spacing:.01em;white-space:nowrap;text-shadow:0 2px 14px rgba(0,0,0,.6)">EARNINGS ZEASON</span></div>`;
// the AI's words: the clause as words, each with a marker copy over it that a sweep uncovers left to right (the feed's marker)
PV.words = (s, cls = '') => { const w = s.split(/\s+/).filter(Boolean); return w.map((x, i) => `<span class="hw${i < w.length - 1 ? ' sp' : ''}">${PV.esc(x)}<i class="${cls}">${PV.esc(x)}</i></span>`).join(' ') };
PV.sweep = (el, p) => { const ws = [...el.querySelectorAll('.hw')], ln = w => w.firstChild.textContent.length + 1, n = ws.reduce((s, w) => s + ln(w), 0); let c = 0;
  ws.forEach(w => { const L = ln(w), x = PV.cl((p * n - c) / L); c += L; w.lastChild.style.clipPath = `inset(-14% ${((1 - x) * 100).toFixed(2)}% -14% 0)`; w.lastChild.style.opacity = x > 0 ? 1 : 0 }) };
PV.css = `
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1350px;overflow:hidden;background:#04070e;color:#f8f0d9}
@font-face{font-family:'Geist Mono';src:url(fonts/geistmono.woff2) format('woff2');font-weight:100 900}
.pvm{border-radius:50%;display:inline-grid;place-items:center;flex:none}.pvm svg{display:block}
.pvc{display:block;flex:none}
.hw{position:relative;white-space:nowrap}
.hw i{position:absolute;left:-.06em;right:-.06em;top:-.04em;bottom:-.06em;font-style:inherit;white-space:pre;color:#1a1300;background:#fdbc2a;opacity:0;padding-left:.06em;border-radius:.08em}
.hw.sp i{right:-.34em}
#grain{position:absolute;inset:0;width:1080px;height:1350px;mix-blend-mode:overlay;pointer-events:none;z-index:80}
`;
// film grain tiles picked by frame
PV.grain = (cv, alpha = .06) => { const W = 540, H = 675; cv.width = W; cv.height = H; const tiles = [];
  for (let k = 0; k < 6; k++) { const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); const im = x.createImageData(W, H);
    let s = 1234 + k * 977; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < im.data.length; i += 4) { const v = r() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255 } x.putImageData(im, 0, 0); tiles.push(c) }
  cv.style.opacity = alpha; return t => cv.getContext('2d').drawImage(tiles[Math.floor(t * 24) % tiles.length], 0, 0) };
PV.load = async (defCo = 'INTU', fonts = '') => {
  PV.D = await fetch('w6/nt/pv/data.json').then(r => r.json()); const t = PV.CO || defCo; PV.co = PV.D.cos[t]; if (!PV.co) throw new Error('no company ' + t);
  PV.calls = PV.D.calls.filter(x => x.t === t);
  PV.nL = PV.calls.filter(x => x.side === 'LONG').length; PV.nS = PV.calls.length - PV.nL;
  PV.maj = PV.nL >= PV.nS ? 'LONG' : 'SHORT';
  const st = document.createElement('style'); st.textContent = (fonts ? `@import url('${fonts}');` : '') + PV.css; document.head.prepend(st);
  const lk = document.createElement('link'); lk.rel = 'stylesheet'; lk.href = 'https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,800&display=swap'; document.head.appendChild(lk);
  // the film's two lines of our own (no punctuation): when it reports and when it is graded
  PV.reports = `Reports ${PV.co.callDay} ${PV.co.when}`; PV.graded = `Graded ${PV.co.gradeDay} at the close`;
};
// the order a film reads the calls in: the majority side opens, the sides alternate while both have calls, the majority closes
PV.alt = () => { const a = PV.calls.filter(x => x.side === PV.maj).sort((p, q) => q.conf - p.conf), b = PV.calls.filter(x => x.side !== PV.maj).sort((p, q) => q.conf - p.conf), o = [];
  while (a.length || b.length) { if (a.length) o.push(a.shift()); if (b.length && a.length) o.push(b.shift()); else if (b.length && !a.length) o.push(b.shift()) }
  // keep the majority last when it can: move a minority call that ended up last one place earlier
  if (o.length > 1 && o[o.length - 1].side !== PV.maj) { const l = o.pop(); o.splice(o.length - 1, 0, l) } return o };
// the reading time a line needs: 1 s plus 0.08 s a character (the brief)
PV.need = s => 1 + .08 * s.length;
PV.ready = async (fams) => { for (const f of [...(fams || []), 'italic 800 31px Kanit']) await document.fonts.load(f); await document.fonts.ready; await Promise.all(PV.$$('img').map(i => i.decode().catch(() => 0))) };
PV.go = async () => { const raf = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); window.R(0); await raf(); window.R(.5); await raf(); window.R(0); await raf(); window.READY = 1 };
// beats: a grid of period B from phase P; at(n) is the time of beat n
PV.grid = (bpm, phase = 0) => { const B = 60 / bpm; return { B, at: n => phase + n * B, beat: t => (t - phase) / B } };
window.onerror = (m) => { document.title = 'ERR ' + m };
// the light on the beat: a soft glow (screen blend) over the whole frame that flares on every beat and decays, so the picture breathes with
// the bed and no half second stands still (wrapqa's motion check); above the end card too, so the logo breathes on the beat
PV.pulse = (col = '253,188,42', at = '50% 30%', size = '78% 58%', base = .05, amp = .1) => { const d = document.createElement('div'); d.id = 'pulse';
  d.style.cssText = `position:absolute;inset:0;pointer-events:none;z-index:75;mix-blend-mode:screen;background:radial-gradient(${size} at ${at},rgba(${col},1),rgba(${col},.4) 45%,rgba(${col},0) 82%)`;
  document.body.appendChild(d); return k => { const ph = ((k % 1) + 1) % 1; d.style.opacity = (base + amp * Math.exp(-4.5 * ph)).toFixed(3) } };
