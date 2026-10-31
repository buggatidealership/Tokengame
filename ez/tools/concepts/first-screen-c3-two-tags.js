/* Concept 3 · Two tags (mock, 2026-10-22). The film ticket is the whole stage, full bleed on phones. It wears two tags:
   top left the gold "How it works 1:07" tag (as today), bottom right the real #gpu, re-cropped tight around the lit dies,
   as a small sticker stuck across the ticket's bottom edge, tilted +3deg, with "Bet #1: NVIDIA" on a slab on top of it.
   "Countdown to" stays in the DOM for screen readers only. The countdown is the page's own svg#gpuCore, moved, never rebuilt. */
(function(){
  var CSS = [
  /* hero: the same words on two lines (the first line sets the size) */
  'html.x2p section.hero{padding-top:16px}',
  'html.x2p.x2d[data-theme="dark"] section.hero h1{font-size:min(clamp(38px,10.4vw,84px),calc((100vw - 32px) / 10.1))!important}',
  'html.x2p section.x2o-bet:has(>.x2p-vt){padding-top:6px}',

  /* the ticket: full bleed on phones, the scallops at the screen edges; the hard shadow drops straight down */
  'html.x2p .x2p-vt{--stw:clamp(150px,46vw,190px);margin-top:22px}',
  '@media(max-width:599px){html.x2p .x2p-vt{margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);max-width:none}',
  ' html.x2p .x2p-vt::before{transform:translate(0,6px)}}',
  '@media(min-width:600px){html.x2p .x2p-vt{--stw:200px;max-width:min(700px,100%)}}',

  /* the second tag: the chip sticker. A flex column: the "Bet #1: NVIDIA" tab sits on its top right and crosses the
     ticket's bottom edge (well right of "Tap to play" and under the captions' line); the chip hangs below the ticket */
  'html.x2p .x2p-vt>#gpu.x3s{position:absolute;right:8px;top:calc(100% - var(--ov,7.5px));left:auto;width:var(--stw);max-width:none;margin:0;z-index:7;',
  ' display:flex;flex-direction:column;align-items:flex-end;transform:rotate(3deg);transform-origin:100% 0;filter:drop-shadow(4px 4px 0 #000)}',
  /* it swallows taps (it sits beside the film, not in it, so a tap on the label never starts the film) */
  /* on phones the ticket's hard shadow drops straight down (a right offset would fill the scallops): the sticker follows it */
  '@media(max-width:599px){html.x2p .x2p-vt>#gpu.x3s{filter:drop-shadow(0 4px 0 #000)}}',
  /* the progress line ends left of the slab, so its last third never runs under "Bet #1: NVIDIA" */
  'html.x2p .x2p-vt .vt-bar{right:132px}',
  /* the slab: "Bet #1: NVIDIA", small; "Countdown to" for screen readers only */
  'html.x2p .x2p-vt #gpu.x3s .x2p-cdh{display:block;margin:0 0 -2px;padding:5px 8px 5px 7px;background:#141217;border:2px solid #000;position:relative;z-index:1}',
  'html.x2p .x2p-vt #gpu.x3s .x2p-cdh .k{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}',
  'html.x2p .x2p-vt #gpu.x3s .x2p-cdh b{display:block;font:400 16px/1 Anton,Impact,sans-serif;letter-spacing:.04em;text-transform:uppercase;color:#f3ead6;text-shadow:1px 1px 0 #b3261e;white-space:nowrap}',
  'html.x2p .x2p-vt #gpu.x3s .x2p-cdh i{font-style:normal;color:#f3ead6}html.x2p .x2p-vt #gpu.x3s .x2p-cdh em{font-style:normal;color:#f2b632}',
  /* the chip, cropped tight on the two dies: viewBox x 450-1550, y 590-875 (the countdown is x 478-1522, y 628-842) */
  /* a gold keyline for the package: it keeps the strip reading as the Blackwell (not as holo foil) and gives it an edge on the navy page */
  'html.x2p .x2p-vt #gpu.x3s .gpu-c{align-self:stretch;border:2px solid #000;border-radius:0;box-shadow:0 0 0 2px #d9b45a;background:#000;overflow:hidden}',
  'html.x2p.x2d[data-theme="dark"] .x2p-vt #gpu.x3s .gpu-img{position:relative;width:100%;max-width:none;margin:0;aspect-ratio:1100/285;overflow:hidden;clip-path:none;border:0!important;border-radius:0!important;box-shadow:none!important}',
  'html.x2p .x2p-vt #gpu.x3s .gpu-img img,html.x2p .x2p-vt #gpu.x3s .gpu-img .gpu-core{position:absolute;inset:auto;left:-40.909%;top:-207.018%;width:181.818%;height:526.316%;max-width:none}',
  /* the unit labels: a touch larger so they survive the smaller chip, lowered to keep clear of the digits */
  'html.x2p .x2p-vt #gpu.x3s .gc-u{font-size:44px;letter-spacing:.24em;transform:translateY(14px);paint-order:stroke;stroke:#000;stroke-width:6px;stroke-linejoin:round}',
  'html.x2p .x2p-vt #gpu.x3s .gc-blk{filter:none}',
  /* under 390px the slab steps down to 14px so it keeps a clear gap from "Tap to play" */
  '@media(max-width:389px){html.x2p .x2p-vt #gpu.x3s .x2p-cdh b{font-size:14px}html.x2p .x2p-vt #gpu.x3s .x2p-cdh{padding:4px 6px}}',
  /* under 360px "Tap to play" reaches the slab's column: the slab only bites the ticket's edge there */
  '@media(max-width:359px){html.x2p .x2p-vt{--ov:2px}}',
  /* phones: the next section starts closer, so its head peeks above the fold instead of a blank band under the sticker */
  '@media(max-width:599px){html.x2p section.x2o-bet+section.x2o-rc{padding-top:44px}}'
  ].join('\n');

  window.__fit = function(){
    var vt = document.querySelector('.x2p-vt'), g = document.querySelector('#gpu'), cdh = document.querySelector('.x2p-cdh');
    if(!vt || !g) return 'missing';
    if(!document.getElementById('x3s-css')){var st=document.createElement('style');st.id='x3s-css';st.textContent=CSS;document.head.appendChild(st)}
    if(cdh && cdh.parentNode !== g) g.insertBefore(cdh, g.firstChild);
    if(g.parentNode !== vt){ vt.appendChild(g); }
    g.classList.add('x3s');
    /* reserve the room the sticker hangs into under the ticket (it is absolute, so the ticket keeps its own height and shadow) */
    vt.style.marginBottom = '0px';
    var vb = vt.getBoundingClientRect().bottom, sb = g.getBoundingClientRect().bottom;
    vt.style.marginBottom = Math.ceil(sb - vb + 4 + 14) + 'px';
    return 'ok';
  };
})();
