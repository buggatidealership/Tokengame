/* Concept 5 (owner, 2026-10-22): the bet as its own paper ticket, the one "Every graded round" uses on Results (cream paper with grain,
   scalloped edges, green band and stripe left, red right, ink lines top and bottom, a staple, a hard shadow), set apart from the film
   ticket above (not glued to it). The ticket body carries concept 2's "Bet #1: NVIDIA" type (Anton, both lines the same size): "Bet #1:" in
   ink (cream would vanish on paper), "NVIDIA" in gold with concept 2's black and red drop plus a thin ink outline so it reads on cream. A
   dashed perforation with a notch top and bottom, then the stub: the real #gpu (photo + live svg countdown) at concept 2's crop (both dies
   whole, x 392-1608, y 370-1056) in an ink frame, like the round's film on the Results ticket. Hero on two lines and the film full bleed, as
   in concepts 1 and 2. Mock injector: eval on the loaded X2+ page, then call window.__fit(). */
window.__fit=function(){
  var d=document,H=d.documentElement;if(H.classList.contains('c5fit'))return 'already';H.classList.add('c5fit');
  var P='html.x2p.x2d.c5fit';
  var CX0=392,CX1=1608,CY0=370,CY1=1056,CW=CX1-CX0,CH=CY1-CY0,pct=function(n){return (n*100).toFixed(4)+'%'};
  var MASK='radial-gradient(circle 7px at 0 9px,#0000 96%,#000) 0 0/51% 18px repeat-y,radial-gradient(circle 7px at 100% 9px,#0000 96%,#000) 100% 0/51% 18px repeat-y';
  var css=[
    /* the bet ticket: outer box carries the shadow (masked like the paper), inner box is the paper */
    P+' .x2p-bt{position:relative;isolation:isolate;margin:22px 0 0;max-width:560px}',
    P+' .x2p-bt::before{content:"";position:absolute;inset:0;transform:translate(6px,6px);background:#000;z-index:-1;-webkit-mask:'+MASK+';mask:'+MASK+'}',
    P+' .bt-p{position:relative;display:flex;align-items:center;padding:14px 34px;border-top:3px solid #000;border-bottom:3px solid #000;color:#141217;'+
      'background:linear-gradient(90deg,#1f7a45 0 16px,transparent 16px 22px,#1f7a45 22px 28px,transparent 28px),linear-gradient(270deg,#c8372a 0 16px,transparent 16px 22px,#c8372a 22px 28px,transparent 28px),'+
      'radial-gradient(rgba(60,40,10,.06) 1px,transparent 1.4px) 0 0/4px 4px,radial-gradient(130% 110% at 50% 45%,transparent 58%,rgba(120,85,30,.17)),#efe5cf;-webkit-mask:'+MASK+';mask:'+MASK+'}',
    /* the staple, as on the Results tickets */
    P+' .bt-p::after{content:"";position:absolute;right:46px;top:-2px;width:5px;height:24px;border-radius:3px;background:linear-gradient(90deg,#6d6f73,#d5d7da 45%,#7d7f83);transform:rotate(-38deg);box-shadow:0 0 0 1px rgba(0,0,0,.35);z-index:4}',
    /* the ticket body: concept 2's label */
    P+' .bt-p .x2p-cdh{flex:0 0 auto;margin:0;display:block;padding:0 14px 0 2px}',
    P+' .bt-p .x2p-cdh .k{display:none}',
    P+'[data-theme] .bt-p .x2p-cdh b{display:block;font:400 clamp(25px,7.4vw,34px)/.94 Anton,Impact,sans-serif!important;text-transform:uppercase;letter-spacing:.01em;color:#141217;text-shadow:none;white-space:nowrap}',
    P+' .bt-p .x2p-cdh b i{font-style:normal;color:#141217}',
    P+' .bt-p .x2p-cdh b em{display:block;margin-top:.04em;font-style:normal;color:#f2b632;-webkit-text-stroke:1px #141217;text-shadow:.05em .05em 0 #141217,.09em .09em 0 #b3261e}',
    /* the stub: perforation (dashed) with a notch at each end, cut from the paper */
    P+' .bt-s{position:relative;flex:1 1 0;min-width:0;align-self:stretch;display:flex;align-items:center;margin:-14px 0;padding:14px 0 14px 14px;border-left:3px dashed rgba(0,0,0,.5)}',
    P+' .bt-s::before,'+P+' .bt-s::after{content:"";position:absolute;left:-15.5px;width:28px;height:28px;border-radius:50%;background:#0b0a14;z-index:3}',
    P+' .bt-s::before{top:-17px}',P+' .bt-s::after{bottom:-17px}',
    /* the chip window: concept 2's crop, the photo and the live digits scaled alike, an ink frame like the round's film on Results */
    P+' .bt-s #gpu{margin:0!important;width:100%;max-width:none!important;min-width:0}',
    P+' .bt-s #gpu .gpu-c{border:0!important;border-radius:0!important;box-shadow:none!important;background:none!important;overflow:visible;width:100%}',
    P+'[data-theme] .bt-s #gpu .gpu-img{position:relative!important;width:100%!important;aspect-ratio:'+CW+'/'+CH+'!important;clip-path:none!important;margin:0!important;max-width:none!important;overflow:hidden!important;'+
      'border:0!important;border-radius:2px!important;box-shadow:0 0 0 3px #000!important;background:#000}',
    P+' .bt-s #gpu .gpu-img img,'+P+' .bt-s #gpu .gpu-img .gpu-core{position:absolute!important;inset:auto!important;left:'+pct(-CX0/CW)+'!important;top:'+pct(-CY0/CH)+'!important;width:'+pct(2000/CW)+'!important;height:'+pct(1500/CH)+'!important;max-width:none!important}',
    P+' .bt-s #gpuCore .gc-u{font:800 58px "Barlow Condensed",Barlow,sans-serif;letter-spacing:.12em;stroke-width:9px;transform:translateY(12px)}',
    P+' .bt-s #gpu :is(.gpu-t,.gpu-n){display:none}',
    /* ---- phones: hero on two lines, the film and the bet ticket full bleed, a gap between them ---- */
    '@media (max-width:599.98px){',
    P+'[data-theme] section.hero{padding-top:20px}',
    P+'[data-theme] section.hero h1{font-size:calc((100vw - 32px) / 10)!important;line-height:.94!important}',
    P+' section.x2o-bet:has(>.x2p-vt){padding-top:6px;margin-top:8px}',
    P+' .x2p-vt{margin:22px -16px 0;max-width:none;overflow-x:clip}',
    P+' .x2p-vt .vt-tag{left:16px}',
    P+' .x2p-bt{margin:26px -16px 0;max-width:none;overflow-x:clip}',
    P+' section.x2o-bet + section.x2o-rc{padding-top:22px}',
    '}'
  ].join('\n');
  var st=d.createElement('style');st.id='c5fit-css';st.textContent=css;d.head.appendChild(st);
  var g=d.getElementById('gpu'),h=d.querySelector('.x2p-cdh');if(!g||!h)return 'missing';
  var bt=d.createElement('div');bt.className='x2p-bt';var p=d.createElement('div');p.className='bt-p';var s=d.createElement('div');s.className='bt-s';
  bt.appendChild(p);g.parentNode.insertBefore(bt,g);p.appendChild(h);p.appendChild(s);s.appendChild(g);
  var im=g.querySelector('img');if(im){im.loading='eager'}
  return 'ok'};
