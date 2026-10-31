/* Concept 1 · Film, then a chip strip (mock injector, round 2; eval on the loaded X2+ page, then call window.__fit())
   Phone: the hero on two lines, the film ticket full bleed (scallops at the screen edges, the gold tag on the 16px gutter line),
   then one slim strip in the cel look: an ink label panel ("Bet #1:" over a gold "NVIDIA", the page's own .x2p-cdh head moved
   in, "Countdown to" dropped) and a window onto the real chip (the img and the live svg#gpuCore, moved together, never redrawn).
   Round 2: no 100vw anywhere in the strip or the ticket (a desktop scrollbar no longer pushes them off); the window is sized by
   aspect-ratio and the chip inside it by percentages, so the panel and the window always fill the strip at every width; a pale
   gold package rim and a sliver of black substrate around the dies (the chip's own frame, echoed); bigger DAYS/HRS/MIN/SEC.
   Crop, in the chip's own 2000 x 1500 units: x 372-1629 (the two dies, 412-1589, plus 40 units of black substrate each side),
   y 586-890 (the clean band between the image's dark core-block rows, which end at 585 and start at 898). */
window.__fit = function () {
  var d = document, H = d.documentElement;
  if (H.classList.contains('c1fit')) return;
  H.classList.add('c1fit');
  var P = 'html.x2p.x2d.c1fit';
  var CX = 1000.5, CW = 1257, CY = 738, CH = 304;          /* crop centre and size, image units */
  var pc = function (n) { return 'calc(100% * ' + n + ')'; };
  var css = [
    /* ---- the strip: one ink-outlined card with a hard shadow; label panel + chip window; its height comes from the window ---- */
    P + ' #gpu{display:flex;align-items:stretch;position:relative;margin:24px 0 0;max-width:560px;' +
      'border:3px solid #000;border-radius:4px;box-shadow:6px 6px 0 #000;background:#141217;overflow:visible}',
    P + ' #gpu .gpu-c{position:relative;flex:1 1 0;min-width:0;align-self:flex-start;aspect-ratio:' + CW + '/' + CH + ';' +
      'overflow:hidden;border-radius:0 2px 2px 0}',
    /* the chip's pale gold package edge, echoed as a rim inside the window (over the black substrate, never over a digit) */
    P + ' #gpu .gpu-c::after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;border:3px solid #ecd58e;' +
      'border-left-width:2px;border-radius:0 2px 2px 0;box-shadow:inset 0 0 0 1px rgba(0,0,0,.55)}',
    P + '[data-theme] #gpu .gpu-img{position:absolute!important;margin:0!important;max-width:none!important;aspect-ratio:auto!important;clip-path:none!important;' +
      'border:0!important;border-radius:0!important;box-shadow:none!important;' +
      'width:' + pc(2000 / CW) + ';height:' + pc(1500 / CH) + ';' +
      'left:calc(50% - 100% * ' + (CX / CW) + ');top:calc(50% - 100% * ' + (CY / CH) + ')}',
    P + ' #gpu .gpu-img img,' + P + ' #gpu .gpu-img .gpu-core{inset:0!important;left:0!important;top:0!important;width:100%!important;height:100%!important}',
    /* DAYS / HRS / MIN / SEC are now the only words that say "countdown": up from 25 to 36 svg units (still clear of the digits) */
    P + ' #gpuCore .gc-u{font-size:36px;letter-spacing:.24em;stroke-width:5px}',
    /* the label panel: ink, "Bet #1:" small cream over "NVIDIA" in gold (both Anton); it takes 27.3% of the strip */
    P + ' #gpu .x2p-cdh{flex:0 0 27.3%;box-sizing:border-box;min-width:0;margin:0;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:0;' +
      'padding:0 12px 0 22px;background:#141217;border-right:3px solid #000;position:relative;z-index:1}',
    P + ' #gpu .x2p-cdh .k{display:none}',
    P + ' #gpu .x2p-cdh b{display:block;font:400 19px/1 Anton,Impact,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#f3ead6;text-shadow:none;white-space:nowrap}',
    P + ' #gpu .x2p-cdh b i{color:#f3ead6}',
    P + ' #gpu .x2p-cdh b em{display:block;margin-top:3px;font-size:38px;line-height:.9;letter-spacing:.02em;color:#f2b632;text-shadow:2px 2px 0 #000}',
    '@media (max-width:599.98px){',
    /* hero: two lines; "We're putting buybacks" measures 9.5 to 9.8em in Anton, so a 10em divisor leaves 2 to 5% to spare */
    P + '[data-theme] section.hero{padding-top:20px}',
    P + '[data-theme] section.hero h1{font-size:calc((100vw - 32px) / 10)!important;line-height:.94!important}',
    /* the film ticket: full bleed over the page's known 16px gutters; its shadow is clipped at the right screen edge */
    P + ' section.x2o-bet:has(>.x2p-vt){padding-top:6px;margin-top:8px}',
    P + ' .x2p-vt{margin:22px -16px 0;max-width:none;overflow-x:clip}',
    /* the tag keeps to the gutter line the hero and the strip start on, and so laps over the green band */
    P + ' .x2p-vt .vt-tag{left:16px}',
    /* the strip on phones: the panel is a quarter of the strip (88px at most), the window takes the rest at every width */
    P + ' #gpu{max-width:none}',
    P + ' #gpu .x2p-cdh{flex-basis:min(88px,26%);padding:0 6px 0 10px}',
    P + ' #gpu .x2p-cdh b{font-size:clamp(12px,3.6vw,14px)}',
    P + ' #gpu .x2p-cdh b em{font-size:clamp(19px,6.4vw,25px)}',
    /* the next section comes up 40px so the record's head starts to show under the strip */
    P + ' section.x2o-bet + section.x2o-rc{padding-top:48px}',
    '}',
    /* wider phones (430 to 599): the label grows with the strip, so it meets the 600px+ strip (27.3%, 19/38px) without a jump */
    '@media (min-width:430px) and (max-width:599.98px){',
    P + ' #gpu .x2p-cdh{flex-basis:26%;padding:0 8px 0 clamp(10px,2.4vw,14px)}',
    P + ' #gpu .x2p-cdh b{font-size:clamp(14px,3.2vw,19px)}',
    P + ' #gpu .x2p-cdh b em{font-size:clamp(25px,6.35vw,38px)}',
    '}',
    /* desktop (a later pass): 4px less above the strip, so it clears a 1024x768 window too */
    '@media (min-width:600px){' + P + ' #gpu{margin-top:20px}}'
  ].join('\n');
  var st = d.createElement('style'); st.id = 'c1fit-css'; st.textContent = css; d.head.appendChild(st);
  /* the real head moves into the strip, ahead of the chip window */
  var g = d.getElementById('gpu'), h = d.querySelector('.x2p-cdh');
  if (g && h) g.insertBefore(h, g.firstChild);
};
