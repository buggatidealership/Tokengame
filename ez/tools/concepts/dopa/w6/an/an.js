// Shared pieces for the four animation samples (an-feed1, an-feed2, an-in1, an-in2), 2026-11-20. Each page defines window.R(t) and
// sets READY=1 (the frame-page contract of close.html, rendered by wrapx.sh). Data: w6/an/data.json, written by w6/an/prep.js from
// calls.csv, feed/words.json and the close JSON, with the feed mockup's verbatim checks.
const AN = {};
AN.esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
AN.money = v => (v < 0 ? '−' : '+') + '$' + Math.abs(Math.round(v)).toLocaleString('en-US');
AN.num = v => String(+v);
// an AI's mark on its own disc (the feed's aiIcon), size in px
AN.mark = (k, s) => { const m = AN.D.marks[k];
  return `<span class="aim" style="width:${s}px;height:${s}px;background:${m.bg}"><svg viewBox="0 0 24 24" width="${(s * .58).toFixed(1)}" height="${(s * .58).toFixed(1)}"><path fill="${m.fg}"${m.fr ? ` fill-rule="${m.fr}"` : ''} d="${m.d}"/></svg></span>` };
// the terminal's own flags (v53-terminal.html flag())
AN.flag = (c, w) => c === 'CN' ? `<svg class="fl" width="${w}" height="${w * 2 / 3}" viewBox="0 0 30 20"><rect width="30" height="20" fill="#de2910"/><path fill="#ffde00" d="M6 3l1.2 3.6H11L8 8.8l1.1 3.6L6 10.2 2.9 12.4 4 8.8 1 6.6h3.8z"/></svg>`
  : `<svg class="fl" width="${w}" height="${w * 2 / 3}" viewBox="0 0 30 20"><rect width="30" height="20" fill="#b22234"/>${[2.3, 6.9, 11.5, 16.1].map(y => `<rect y="${y}" width="30" height="1.55" fill="#fff"/>`).join('')}<rect width="13" height="10.8" fill="#3c3b6e"/></svg>`;
AN.co = (t, s, r = .24) => `<img class="col" src="${AN.D.cos[t].logo}" width="${s}" height="${s}" style="border-radius:${s * r}px">`;
AN.tr = (k, t) => AN.D.trades.find(x => x.k === k && x.t === t);
AN.logo = s => `<img src="ezlogo.svg" width="${s}" height="${s}" style="display:block">`;
AN.brand = () => `<div class="tb"><span class="lgo">${AN.logo(76)}</span><b class="nmx"><i class="e">E</i>arnings <i class="z">Z</i>eason</b><span class="ssn">SEASON 2</span></div>`;
// the highlighted clause as words, each with a marker copy over it that a sweep uncovers left to right, line by line in reading order
// (spaces stay outside the words, so a long clause still wraps between them; each word's marker reaches over the space after it, and
// overlaps its neighbour by a pixel, so the marker reads as one stroke with no seams)
const words = (s, cls) => { const w = s.split(/\s+/).filter(Boolean).flatMap(x => x.split(/(?<=-)(?=\w)/)); let o = '';
  w.forEach((x, i) => { const sp = i < w.length - 1 && !x.endsWith('-'); o += `<span class="hw${sp ? ' sp' : ''}">${AN.esc(x)}<i class="${cls || ''}">${AN.esc(x)}</i></span>${sp ? ' ' : ''}` }); return o };
AN.quote = (keep, hl, cls) => { const i = keep.indexOf(hl); if (i < 0) throw new Error('highlight not in text: ' + hl);
  return AN.esc(keep.slice(0, i)) + `<span class="hlc">${words(hl, cls)}</span>` + AN.esc(keep.slice(i + hl.length)) };
// the X posts drop every punctuation mark from the AI's words and break at its sentences (x2p-post-a1/a2); prove the words are the same words
AN.strip = s => s.replace(/(\w)-(\w)/g, '$1 $2').replace(/[.,;:!?'"“”‘’()]/g, '').replace(/\s+/g, ' ').trim();
AN.checkLines = (why, lines) => { const a = AN.strip(why), b = lines.map(l => l.replace(/[\[\]]/g, '')).join(' ').replace(/\s+/g, ' ').trim();
  if (a !== b) throw new Error('post words differ from the AI\'s words:\n' + a + '\n' + b) };
// lines with one [bracketed] span = the highlighted clause
AN.lines = (lines, cls) => lines.map(l => { const m = l.match(/^(.*)\[(.*)\](.*)$/); return `<p>${m ? AN.esc(m[1]) + `<span class="hlc">${words(m[2], cls)}</span>` + AN.esc(m[3]) : AN.esc(l)}</p>` }).join('');
// a marker sweep: p from 0 to 1 over the clause's letters, word by word
AN.sweep = (el, p) => { const ln = w => w.firstChild.textContent.length + (w.classList.contains('sp') ? 1 : 0), ws = [...el.querySelectorAll('.hw')], n = ws.reduce((s, w) => s + ln(w), 0); let c = 0;
  ws.forEach(w => { const L = ln(w), x = Math.min(1, Math.max(0, (p * n - c) / L)); c += L;
    w.lastChild.style.clipPath = `inset(-12% ${((1 - x) * 100).toFixed(2)}% -12% 0)`; w.lastChild.style.opacity = x > 0 ? 1 : 0 }) };
// a cubic Hermite step from (p0, slope v0) to (p1, slope v1) over T seconds; x in seconds from its start
AN.herm = (p0, v0, p1, v1, T, x) => { const s = Math.min(1, Math.max(0, x / T)), s2 = s * s, s3 = s2 * s;
  return (2 * s3 - 3 * s2 + 1) * p0 + (s3 - 2 * s2 + s) * T * v0 + (-2 * s3 + 3 * s2) * p1 + (s3 - s2) * T * v1 };
// the terminal's night ground with slow brand light (green from the top, red from the bottom: the long and the short), drawn on #gnd
AN.ground = (el, k = 1) => { const bl = [['85,214,162', 980, 230, 120, 160, 70, 17, 0, .34], ['3,200,112', 760, 900, 260, 140, 90, 13, 1.7, .2], ['232,87,107', 900, 840, 1330, 170, 60, 15, 3.1, .3], ['253,188,42', 640, 520, 700, 260, 120, 19, 4.4, .1]]
    .map(([c, sz, x, y, ax, ay, per, ph, a]) => { const d = document.createElement('div'); d.className = 'bl';
      d.style.cssText = `width:${sz}px;height:${sz}px;margin:${-sz / 2}px 0 0 ${-sz / 2}px;background:radial-gradient(closest-side,rgba(${c},${a * k}),rgba(${c},${a * k * .4}) 40%,rgba(${c},0) 75%)`; el.appendChild(d); return { d, x, y, ax, ay, per, ph } });
  return t => bl.forEach(o => { const a = 2 * Math.PI * t / o.per + o.ph; o.d.style.transform = `translate(${(o.x + o.ax * Math.sin(a)).toFixed(1)}px,${(o.y + o.ay * Math.cos(a * .8)).toFixed(1)}px) scale(${(1 + .08 * Math.sin(a * 1.3)).toFixed(3)})` }) };
AN.css = `
#gnd{position:absolute;inset:0;overflow:hidden;background:radial-gradient(70% 24% at 50% 0%,rgba(46,190,122,.20),transparent 70%),linear-gradient(180deg,#0e5a3a 0%,#0b3d29 8%,#0a2e20 15%,#08190f 27%,#07120e 35%,#060a08 46%,#060a08 84%,#0d0808 95%,#140909 100%)}
#gnd .bl{position:absolute;left:0;top:0;border-radius:50%;mix-blend-mode:screen}
.aim{border-radius:50%;display:inline-grid;place-items:center;flex:none;box-shadow:0 0 0 2px rgba(242,237,230,.14)}.aim svg{display:block}
.fl{display:inline-block;flex:none;border-radius:3px;vertical-align:middle}
.col{display:block;flex:none}
.tb{position:absolute;left:44px;right:44px;top:30px;height:96px;display:flex;align-items:center;gap:20px;z-index:20}
.tb .nmx{font:800 44px/1 Inter;letter-spacing:.005em;white-space:nowrap}.tb i{font-style:normal}.tb .e{color:#03c870}.tb .z{color:#ff3a31}
.tb .ssn{margin-left:auto;font:600 27px/1 'Geist Mono';letter-spacing:.1em;color:#fdbc2a;padding:15px 20px 13px;border-radius:14px;background:rgba(253,188,42,.1);box-shadow:inset 0 0 0 2px rgba(253,188,42,.35)}
.hlc{white-space:normal}
.hw{position:relative;white-space:nowrap}
.hw i{position:absolute;left:0;right:-1.5px;top:-.1em;bottom:-.1em;padding:.1em 0 0;font-style:normal;white-space:pre;line-height:normal;color:#1a1405;background:#f3c04a;opacity:0}
.hw.sp i{right:-.3em}
.hw:first-child i{left:-.1em;padding-left:.1em;border-radius:.1em 0 0 .1em}.hw:last-child i{right:-.1em;border-radius:0 .1em .1em 0}
.hw i.pg{background:#fdbc2a;color:#1a1300}
.pvt{font:700 22px/1 'Geist Mono';letter-spacing:.1em;color:#fdbc2a;padding:9px 12px 7px;border:2px dashed #fdbc2a;border-radius:9px;background:#1a160f;white-space:nowrap}
`;
AN.load = async () => { AN.D = await fetch('w6/an/data.json').then(r => r.json()); const st = document.createElement('style'); st.textContent = L.css + AN.css; document.head.prepend(st) };
AN.ready = async () => { await document.fonts.load('800 44px Inter'); await document.fonts.load('500 40px Inter'); await document.fonts.load('900 100px Inter'); await document.fonts.load('600 30px "Geist Mono"'); await document.fonts.ready;
  await Promise.all(L.$$('img').map(i => i.decode().catch(() => 0)));
};
// the end of a page's setup: draw two frames, then READY (the first frame drawn after load came out shifted in a test: feed-1's headline
// 66 px right of where every later frame, and the same frame drawn second, put it)
AN.go = async () => { const raf = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  window.R(0); await raf(); window.R(.5); await raf(); window.READY = 1 };
