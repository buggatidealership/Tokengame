/* Concept 2, "One ticket with a chip stub" (fit2, 2026-10-22), round 2 after the critic. Mock only: eval on the built X2+ page, then
   call window.__fit(). The film and the countdown read as one full-bleed ticket: the film on top (tag on its top edge), a perforation
   with a notch at each end, then a short stub with "Bet #1: NVIDIA" on the left and the real #gpu, cropped to both dies, on the right.
   The scallops, the green and red bands, the staple and the hard shadow run down the whole ticket.
   Round 2:
   - the chip window is sized content-box free (rim drawn with box-shadow), so photo and live digits scale alike (no 6% stretch);
   - the crop shows both whole dies with their core blocks and a sliver of gold HBM, so it still reads as the Blackwell;
   - the window's width follows the room the small viewport (svh) leaves under the stub's top, so the ticket ends above the fold,
     capped at 210px on phones;
   - the stub sits right after .x2p-vt (not inside it): the page's corner-player observer (x2plus.js, observe(vt)) then still watches
     only the film. Port note: if the stub goes inside .x2p-vt, observe vt.querySelector(".vt-p") instead, and in both cases add
     rootMargin:"-<header height>px 0px 0px 0px" so the corner player takes over as the film slides under the sticky header. */
(function(){
  var O=window.__c2opt||{};
  /* the crop of the chip photo in the image's own units (2000 x 1500): both dies whole (x 410-1590, y 390-1036) with a sliver of the
     gold HBM above and below, the core blocks and the four digit pairs */
  var CX0=O.cx0||392,CX1=O.cx1||1608,CY0=O.cy0||370,CY1=O.cy1||1056,CW=CX1-CX0,CH=CY1-CY0,A=(CW/CH).toFixed(4);
  var CAP=O.cap||210;
  var pc=function(n){return (+n.toFixed(3))+"%"};
  /* scallops: the ticket's own pattern (7px bites every 18px); Y is the tile origin, so a tooth (not a bite) sits on the perforation */
  function sc(Y){return "radial-gradient(circle 7px at 0 9px,#0000 96%,#000) 0 "+Y+"/51% 18px repeat-y,radial-gradient(circle 7px at 100% 9px,#0000 96%,#000) 100% "+Y+"/51% 18px repeat-y"}
  /* the perforation's notches, 16px: big enough to swallow the half bites on either side of the tooth they sit on */
  function nt(Y){return "radial-gradient(circle 16px at 0 "+Y+",#0000 96%,#000) 0 0/100% 100% no-repeat,radial-gradient(circle 16px at 100% "+Y+",#0000 96%,#000) 0 0/100% 100% no-repeat"}
  function mk(Y,NY){var m=nt(NY)+","+sc(Y);return "-webkit-mask:"+m+";mask:"+m+";-webkit-mask-composite:source-in,source-in,source-over,source-over;mask-composite:intersect,intersect,add,add;"}
  var CSS=[
  /* ---- all sizes ---- */
  /* the film part loses its bottom ink line (the perforation takes its place) and gets the notches' top halves */
  "html.x2p .x2p-vt.c2t{margin-bottom:0}",
  "html.x2p .x2p-vt.c2t .vt-p{border-bottom:0;"+mk("var(--B,0px)","100%")+"}",
  /* in a column (from 641px) the ticket keeps its down-right shadow, scalloped in phase; the stub's shadow continues it */
  "html.x2p .x2p-vt.c2t::before{-webkit-mask:"+sc("var(--B,0px)")+";mask:"+sc("var(--B,0px)")+"}",
  /* the progress line: no dark track over the perforation, and the gold clears the bands */
  "html.x2p .x2p-vt.c2t .vt-bar{background:transparent;left:19px;right:19px}",
  "html.x2p .c2-stub{position:relative;isolation:isolate}",
  "html.x2p .c2-stub::before{content:'';position:absolute;inset:0;transform:translate(6px,6px);background:#000;z-index:-1;-webkit-mask:"+sc("0px")+";mask:"+sc("0px")+"}",
  /* the stub: the film's own dark stock, bands printed down both edges, a cream dashed perforation along the top, an ink line at the bottom */
  "html.x2p .c2-sb{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;column-gap:clamp(12px,4vw,22px);",
  " padding:12px 33px 13px 34px;border-bottom:3px solid #000;",
  " background:linear-gradient(90deg,#1f7a45 0 12px,transparent 12px 15px,#1f7a45 15px 19px,transparent 19px),linear-gradient(270deg,#c8372a 0 12px,transparent 12px 15px,#c8372a 15px 19px,transparent 19px),",
  "  radial-gradient(rgba(243,234,214,.045) 1px,transparent 1.4px) 0 0/5px 5px,#16131c;"+mk("0px","0px")+"}",
  "html.x2p .c2-sb::before{content:'';position:absolute;left:18px;right:18px;top:0;border-top:2px dashed rgba(243,234,214,.5);pointer-events:none}",
  /* the label: X2+'s "Bet #1: NVIDIA", moved here from its own head and set small, NVIDIA in gold on its own line */
  "html.x2p .c2-sb .c2-lab b{display:block;font:400 clamp(25px,7.4vw,34px)/.94 Anton,Impact,sans-serif;text-transform:uppercase;letter-spacing:.01em;color:#f3ead6;",
  " text-shadow:.05em .05em 0 #000,.09em .09em 0 #b3261e;white-space:nowrap}",
  "html.x2p .c2-sb .c2-lab i{font-style:normal;color:#f3ead6}html.x2p .c2-sb .c2-lab em{display:block;font-style:normal;color:#f2b632}",
  /* the chip: the page's own #gpu (photo + live svg countdown) in a small window; the ink rim and the hard shadow are box-shadows, so the
     window's box is exactly the crop's ratio and the photo and the digits scale alike */
  "html.x2p .c2-sb #gpu{margin:0!important;max-width:100%!important;justify-self:end}",
  "html.x2p .c2-sb #gpu .gpu-c{border:0;border-radius:0;box-shadow:none;background:none;overflow:visible}",
  "html.x2p.x2d[data-theme=dark] .c2-sb #gpu .gpu-img{aspect-ratio:"+CW+"/"+CH+";clip-path:none;margin:0;max-width:none;border:0!important;border-radius:3px!important;box-shadow:0 0 0 2px #000,3px 3px 0 2px #000!important}",
  "html.x2p .c2-sb #gpu .gpu-img img,html.x2p .c2-sb #gpu .gpu-img .gpu-core{left:"+pc(-CX0/CW*100)+";top:"+pc(-CY0/CH*100)+";width:"+pc(2000/CW*100)+";height:"+pc(1500/CH*100)+"}",
  /* the unit labels (the svg's own DAYS HRS MIN SEC): with "Countdown to" gone they say what the digits are, so larger, in Barlow Condensed */
  "html.x2p .c2-sb #gpuCore .gc-u{font:800 58px 'Barlow Condensed',Barlow,sans-serif;letter-spacing:.12em;stroke-width:9px;transform:translateY(12px)}",
  "html.x2p .c2-sb #gpu :is(.gpu-t,.gpu-n){display:none}",
  /* the old head is gone (its words now live on the stub) */
  "html.x2p .x2o-bet>.x2p-cdh{display:none}",
  /* ---- phones: full bleed ---- */
  "@media(max-width:640px){html.x2p.x2d[data-theme=dark] section.hero{padding-top:14px}",
  /* hero: two lines, a little smaller */
  " html.x2p.x2d[data-theme=dark] section.hero h1{font-size:min(9.05vw,40px)!important;line-height:.95}",
  " html.x2p section.x2o-bet:has(>.x2p-vt){margin-top:0;padding-top:0}",
  /* the ticket's scalloped edges are the screen's edges */
  " html.x2p .x2p-vt.c2t{margin:27px -16px 0;max-width:none}",
  " html.x2p .c2-stub{margin:0 -16px 8px}",
  /* one hard shadow, straight down at full bleed (4px: with the 3px ink line it stays a line, not a bar); a plain block behind film and
     stub, so every bite and both notches read as the same black */
  " html.x2p body .x2p-vt.c2t::before,html.x2p .c2-stub::before{transform:translateY(4px);-webkit-mask:none;mask:none}",
  " html.x2p .x2p-vt.c2t .vt-tag{left:30px}",
  /* the chip window: as tall as the small viewport (svh: with the browser's bars showing) leaves below the stub's top (--c2y, measured by
     __fit) after 36px of stub padding, ink, shadow and a little air; never wider than CAP; the first screen always ends on the whole ticket */
  " html.x2p .c2-sb #gpu{width:clamp(120px,calc((100svh - var(--c2y,440px) - 36px) * "+A+"),"+CAP+"px)}",
  /* the next section follows closer, so its head peeks in at the fold instead of an empty band */
  " html.x2p section.x2o-bet:has(>.c2-stub)+section{padding-top:38px}}",
  /* ---- wide phones and small tablets in portrait (480 to 640px): label and window side by side in the middle, not at opposite ends ---- */
  "@media(min-width:480px) and (max-width:640px){html.x2p .c2-sb{grid-template-columns:auto auto;justify-content:center;column-gap:36px}html.x2p .c2-sb #gpu{justify-self:start}}",
  /* ---- desktop for now (a later pass): the ticket keeps a column, label and window side by side, the window sized to the height left ---- */
  "@media(min-width:641px){html.x2p .x2p-vt.c2t,html.x2p .c2-stub{max-width:640px}html.x2p .c2-stub{margin-bottom:10px}",
  " html.x2p .c2-sb{padding:10px 40px 12px 40px;grid-template-columns:auto auto;justify-content:center;column-gap:36px}",
  " html.x2p .c2-sb #gpu{width:clamp(140px,calc((100svh - var(--c2y,680px) - 35px) * "+A+"),260px);justify-self:start}html.x2p .c2-sb .c2-lab b{font-size:40px}html.x2p .c2-sb .c2-lab em{display:inline}}"
  ].join("\n");
  window.__fit=function(){
    var d=document,vt=d.querySelector(".x2p-vt"),vtp=vt&&vt.querySelector(".vt-p"),g=d.querySelector("#gpu"),cdh=d.querySelector(".x2p-cdh");
    if(!vt||!vtp||!g)return "missing";
    if(!d.getElementById("c2css")){var s=d.createElement("style");s.id="c2css";s.textContent=CSS;d.head.appendChild(s)}
    if(!d.querySelector(".c2-stub")){
      /* outer (unmasked, carries the shadow) + inner (masked: scallops, notches, bands) */
      var st=d.createElement("div");st.className="c2-stub";var sb=d.createElement("div");sb.className="c2-sb";st.appendChild(sb);
      var lab=d.createElement("div");lab.className="c2-lab";
      var b=cdh&&cdh.querySelector("b");if(b)lab.appendChild(b);
      sb.appendChild(lab);sb.appendChild(g);vt.classList.add("c2t");
      vt.parentNode.insertBefore(st,vt.nextSibling);
      var im=g.querySelector("img");if(im){im.loading="eager";im.sizes="(max-width:640px) 350px, 430px"}
      /* the perforation sits where the film part ends: its height drives the scallop phase of the film part and its shadow */
      /* and its top on the page (= on the first screen) sizes the chip window, so the ticket ends above the fold whatever sits above it */
      var setB=function(){vt.style.setProperty("--B",vtp.offsetHeight+"px");st.style.setProperty("--c2y",Math.round(st.getBoundingClientRect().top+scrollY)+"px")};setB();
      if("ResizeObserver" in window){var ro=new ResizeObserver(setB);ro.observe(vtp);var h=d.querySelector("section.hero");if(h)ro.observe(h)}
      addEventListener("resize",setB);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(setB)}
    return "ok"};
})();
