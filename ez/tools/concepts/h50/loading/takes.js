/* H50 loading cover, three takes for the Saturday-morning show (X6+). Mockups only: run.js swaps each take into the built
   v50-live-x6plus.html in the browser (route), nothing in the repo's build changes.
   Every word on a cover is drawn from the page's own fonts as SVG outlines (glyphs.json, made by glyphs.py from media/h48-*.woff2),
   so the cover paints before any web font is in. */
const fs=require('fs'),path=require('path');
const G=JSON.parse(fs.readFileSync(path.join(__dirname,'glyphs.json'),'utf8'));
const LOGO=fs.readFileSync(path.join(__dirname,'../../../v22/x2p-logo.svg'),'utf8').trim()
  .replace('<svg ','<svg class="ld-logo" ');
const INK='#24140c';
/* the page's paper (its lettering and every chapter ground multiply it in), asked for early; no extra bytes, it is on the first screen anyway */
const PAPER='<link rel="preload" as="image" href="media/h48-paper.jpg">\n';
const r3=x=>Math.round(x*1000)/1000;

/* the page's own lettering jitter (h48_ui.js letter()), so take A's title is the page's title letter for letter */
function rnd(i,s){var x=Math.sin(i*12.9898+s*78.233)*43758.5453;return x-Math.floor(x)}

/* one line of text as a single SVG (font units), with letter-spacing ls (em) and an optional per-letter jitter seed */
function line(text,font,o){o=o||{};const F=G[font],u=F.upm,ls=(o.ls||0)*u;let x=0,ps=[];let k=o.k0||0;
  for(const ch of text){const g=F.g[ch]||F.g[' '];k++;
    if(ch!==' '&&g.d){let tr='translate('+r3(x)+' 0)';
      if(o.seed){const a=o.amp||1,r=(rnd(k,o.seed)-.5)*9*a,y=(rnd(k+40,o.seed)-.5)*.11*a*u,s=1+(rnd(k+80,o.seed)-.5)*.1*a;
        const cx=x+g.adv/2,cy=u*.33;tr='translate('+r3(cx)+' '+r3(cy-y)+') rotate('+r3(-r)+') scale('+r3(s)+') translate('+r3(-g.adv/2)+' '+r3(-u*.33)+')'}
      ps.push('<path transform="'+tr+'" d="'+g.d+'"/>')}
    x+=g.adv+ls}
  return {w:x,asc:F.asc,desc:-F.desc,u,paths:ps.join('')}}
/* an SVG of a line, laid out at font size 1em = u units; y is flipped (font units are y-up) */
function svgLine(text,font,o){o=o||{};const L=line(text,font,o),pad=(o.pad||.08)*L.u,h=L.asc+L.desc+2*pad;
  return {w:L.w,h,u:L.u,svg:'<svg class="'+(o.cls||'')+'" viewBox="'+r3(-pad)+' '+r3(-L.asc-pad)+' '+r3(L.w+2*pad)+' '+r3(h)+'" style="width:'+r3((L.w+2*pad)/L.u)+'em;height:'+r3(h/L.u)+'em" aria-hidden="true">'+
    (o.defs||'')+'<g transform="scale(1,-1)" '+(o.attrs||'')+'>'+L.paths+'</g></svg>'}}

/* ---------- take A's title: the page's h1 rebuilt letter by letter (same boxes, same jitter, same wrap) ---------- */
function titleLetters(text,seed,amp){const F=G.cap,u=F.upm,LH=1.02,asc=F.asc/u,desc=-F.desc/u,hl=(LH-(asc+desc))/2,base=hl+asc;
  let k=0;const a=amp||1;
  const words=text.split(' ').map(w=>'<span class="ldw">'+[...w].map(ch=>{k++;const g=F.g[ch];
      const r=(rnd(k,seed)-.5)*9*a,y=(rnd(k+40,seed)-.5)*.11*a,s=1+(rnd(k+80,seed)-.5)*.1*a;
      const W=g.adv/u+.005+.02,VW=W*u,VH=LH*u;
      return '<svg class="ldl" viewBox="0 0 '+r3(VW)+' '+r3(VH)+'" style="width:'+r3(W)+'em;--t:translateY('+y.toFixed(3)+'em) rotate('+r.toFixed(2)+'deg) scale('+s.toFixed(3)+');--i:'+k+'">'+
        '<path transform="translate('+r3(.01*u)+' '+r3(base*u)+') scale(1,-1)" d="'+g.d+'"/></svg>'}).join('')+'</span>');
  return {html:words.join('<span class="ldsp"> </span>'),space:(F.g[' '].adv/u+.005),base,LH}}

/* the show's lettering gradient (h8-let: l1, l2, l3 top to bottom), as SVG defs */
const grad=(id,a,b,c)=>'<linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+a+'"/><stop offset=".55" stop-color="'+b+'"/><stop offset="1" stop-color="'+c+'"/></linearGradient>';

/* ============ TODAY ============ */
function today(){return {name:'today',html:null,css:'',head:''}}

/* ============ A: THE TITLE CARD (the show's open, held; the page lifts in around it) ============ */
function takeA(){
  const T=titleLetters('Four AIs Trade Earnings',7,1);
  const pres=svgLine('PRESENTS','lil',{ls:.12,pad:0,cls:'ldA-pt'});
  const html='<div id="x2pLoad" class="ldA" aria-hidden="true">'+
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>'+
      '<linearGradient id="ldAg" gradientUnits="userSpaceOnUse" x1="0" y1="'+r3(T.base*G.cap.upm)+'" x2="0" y2="'+r3(-(T.LH-T.base)*G.cap.upm)+'"><stop offset="0" stop-color="#f7d9a1"/><stop offset=".55" stop-color="#f76f3b"/><stop offset="1" stop-color="#d12e15"/></linearGradient></defs></svg>'+
    '<div class="ldA-band"></div>'+
    '<div class="ldA-card"><picture><source media="(min-width:1000px),(orientation:landscape) and (max-height:500px)" srcset="media/h48-title-169.jpg"><img class="ldA-art" alt="" src="media/h48-title-34.jpg" decoding="sync" onload="this.classList.add(\'on\')"></picture>'+
      '<div class="ldA-in"><div class="ldA-pres"><span class="ldA-plg">'+LOGO+'</span>'+pres.svg+'</div>'+
      '<div class="ldA-h1">'+T.html+'</div><div class="ldA-ep"></div><div class="ldA-pm"></div><div class="ldA-fm"></div></div></div>'+
    '<div class="ldA-g"></div></div>'+
    /* the lift: the card slides onto the page's own title card (its top may differ by the header's height), the band and the
       green fade into the header and the next chapter, then the card fades over its identical twin */
    '<script>(function(){var H=document.documentElement,L=document.getElementById("x2pLoad"),o=new MutationObserver(function(){if(!H.classList.contains("x2p-rv"))return;o.disconnect();'+
      'var c=document.querySelector("#h48ov .h8-tc"),k=L.querySelector(".ldA-card");if(!c||!k)return;var a=c.getBoundingClientRect(),b=k.getBoundingClientRect(),d=a.top-b.top;'+
      'if(a.bottom<0||a.top>innerHeight||Math.abs(a.width-b.width)>2||Math.abs(a.height-b.height)>2)L.classList.add("ldA-fade");else k.style.setProperty("--dy",d+"px")});o.observe(H,{attributes:true,attributeFilter:["class"]})})()</script>';
  const css=`
/* ---- A: the title card ---- */
#x2pLoad.ldA{display:block;opacity:1;animation:none;overflow:hidden;background:#000;color:${INK};font-family:serif}
#x2pLoad.ldA svg{height:auto}
#x2pLoad.ldA .ldA-band{position:absolute;left:0;right:0;top:0;height:var(--hb,110px);background:#000}
@media (min-width:1000px){#x2pLoad.ldA{--hb:61px}}
@media (max-height:500px) and (orientation:landscape){#x2pLoad.ldA{--hb:95px}}
#x2pLoad.ldA .ldA-card{position:absolute;left:0;right:0;top:var(--hb,110px);aspect-ratio:3/4;border-bottom:3px solid ${INK};overflow:hidden;
  background:radial-gradient(70% 28% at 50% 30%,rgba(255,246,200,.75),rgba(255,246,200,0) 70%),
    radial-gradient(40% 8% at 22% 9%,rgba(255,255,240,.55),rgba(255,255,240,0) 70%),radial-gradient(36% 7% at 82% 22%,rgba(255,255,240,.5),rgba(255,255,240,0) 70%),
    linear-gradient(180deg,#f7d061 0%,#f0bf3f 46%,#7fa04a 74%,#4e7a33 100%);box-sizing:border-box}
#x2pLoad.ldA .ldA-card .ldA-art{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;opacity:0;transition:opacity .25s;display:block}
#x2pLoad.ldA .ldA-card .ldA-art.on{opacity:1}
#x2pLoad.ldA .ldA-in{position:absolute;left:0;right:0;top:0;height:46%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:12px 16px 0;box-sizing:border-box}
#x2pLoad.ldA .ldA-pres{display:flex;align-items:center;gap:8px;height:30px;margin:0 0 6px;font-size:15px;color:#7a2e12;fill:#7a2e12}
#x2pLoad.ldA .ldA-plg{display:block;width:30px;height:30px;flex:none}
#x2pLoad.ldA .ldA-plg svg{width:30px!important;height:30px!important;display:block}
#x2pLoad.ldA .ldA-pt{display:block;height:1.35em!important}
#x2pLoad.ldA .ldA-h1{--fs:clamp(40px,12.2vw,78px);font-size:var(--fs);line-height:0;width:100%;
  filter:drop-shadow(2px 2px 0 ${INK}) drop-shadow(3px 4px 0 rgba(36,20,12,.55))}
#x2pLoad.ldA .ldw{white-space:nowrap}
#x2pLoad.ldA .ldsp{font-size:0;word-spacing:calc(var(--fs) * ${r3(T.space)})}
#x2pLoad.ldA .ldl{display:inline-block;height:1.02em!important;vertical-align:-${r3(T.LH-T.base)}em;overflow:visible;transform:var(--t);
  fill:url(#ldAg);stroke:${INK};stroke-width:2px;paint-order:stroke;vector-effect:non-scaling-stroke}
#x2pLoad.ldA .ldl path{vector-effect:non-scaling-stroke}
#x2pLoad.ldA .ldA-ep{height:30.6px;margin:8px 0 0;flex:none}
#x2pLoad.ldA :is(.ldA-pm,.ldA-fm){display:none}
#x2pLoad.ldA .ldA-g{position:absolute;left:0;right:0;bottom:0;top:calc(var(--hb,110px) + 133.333vw);background-color:#41702e;
  background-image:radial-gradient(120% 70% at 22% 0%,rgba(255,238,196,.42),rgba(255,238,196,0) 62%),radial-gradient(150% 90% at 60% 110%,rgba(10,4,0,.45),rgba(10,4,0,0) 62%),url(media/h48-paper.jpg);background-size:100% 100%,100% 100%,560px auto;background-blend-mode:soft-light,multiply,multiply}
@media (min-width:1000px){
  #x2pLoad.ldA .ldA-card{aspect-ratio:auto;height:min(56.25vw,760px);border-bottom:3px solid ${INK}}
  #x2pLoad.ldA .ldA-card .ldA-art{object-position:center 78%}
  #x2pLoad.ldA .ldA-in{right:auto;width:52%;height:100%;align-items:flex-start;text-align:left;padding:40px 0 40px max(32px,calc((100% - 1200px)/2 + 32px))}
  #x2pLoad.ldA .ldA-h1{--fs:clamp(70px,7.2vw,112px);text-align:left}
  #x2pLoad.ldA .ldA-pm{display:block;flex:none;margin:22px 0 0;height:clamp(80.6px,calc(80.6px + (100vw - 1000px) * .0196),86.7px)}
  #x2pLoad.ldA .ldA-fm{display:block;flex:none;margin:18px 0 0;height:44px}
  #x2pLoad.ldA .ldA-g{top:calc(var(--hb) + min(56.25vw,760px))}}
/* a phone on its side: the page's own card is taller than the screen there (its title runs off it), so the cover takes the wide
   composition, sized to the screen, and the lift is a plain fade */
@media (max-height:500px) and (orientation:landscape) and (max-width:999px){
  #x2pLoad.ldA .ldA-card{aspect-ratio:auto;height:calc(100vh - var(--hb))}
  #x2pLoad.ldA .ldA-card .ldA-art{object-position:center 78%}
  #x2pLoad.ldA .ldA-in{right:auto;width:58%;height:100%;align-items:flex-start;text-align:left;padding:10px 0 10px 24px}
  #x2pLoad.ldA .ldA-h1{--fs:clamp(30px,13vh,60px);text-align:left}
  #x2pLoad.ldA .ldA-ep{display:none}
  #x2pLoad.ldA .ldA-g{display:none}}
/* the title is put up letter by letter as the cover first shows (once, .7 s), then holds still: the show's open, held */
@media (prefers-reduced-motion:no-preference){
  #x2pLoad.ldA .ldl{animation:ldAput .42s cubic-bezier(.3,1.6,.5,1) both;animation-delay:calc(var(--i) * 22ms + 80ms)}
  @keyframes ldAput{from{transform:var(--t) translateY(.5em) scale(.2);opacity:0}to{transform:var(--t);opacity:1}}
  /* the one quiet idle: the gold dot of the EZ. mark glows like a studio's on-air lamp warming up */
  #x2pLoad.ldA .ld-logo path[fill="#fdbc2a"],#x2pLoad.ldA .ld-logo circle[fill="#fdbc2a"]{animation:ldAlamp 1.6s ease-in-out infinite alternate}
  @keyframes ldAlamp{from{opacity:.55}to{opacity:1}}}
/* the lift: the band and the green go to the header and the next chapter, the card slides onto its twin, then fades */
html.x2p-rv #x2pLoad.ldA{display:block;animation:none;background:transparent}
html.x2p-rv #x2pLoad.ldA :is(.ldA-band,.ldA-g){opacity:0;transition:opacity .18s ease-out}
html.x2p-rv #x2pLoad.ldA .ldA-card{transform:translateY(var(--dy,0px));transition:transform .24s cubic-bezier(.3,0,.2,1);animation:ldAoff .38s linear forwards}
html.x2p-rv #x2pLoad.ldA.ldA-fade .ldA-card{transform:none}
@keyframes ldAoff{0%,62%{opacity:1}100%{opacity:0}}
`;
  return {name:'A',html,css,head:'<link rel="preload" as="image" href="media/h48-title-34.jpg" media="(max-width:999px)" fetchpriority="high">\n<link rel="preload" as="image" href="media/h48-title-169.jpg" media="(min-width:1000px)" fetchpriority="high">\n'+PAPER}}

/* ============ B: SIGN-ON (the set warms up on the network's test card; the cast are its colour bars) ============ */
function takeB(){
  const t1=svgLine('Four AIs','cap',{seed:7,pad:.12,cls:'ldB-t'}),t2=svgLine('Trade Earnings','cap',{seed:7,k0:8,pad:.12,cls:'ldB-t'});
  const st=svgLine('STAY TUNED','lil',{ls:.14,pad:.05});
  const nm=['GPT','Claude','Grok','Kimi'].map(n=>line(n,'lil',{ls:.04}));
  const col=['#b18cff','#ef8a55','#e4e0d6','#58b7ff'];
  /* the test card, 640 x 480 (a 4:3 tube), drawn in the show's gouache and ink */
  let rings='';for(let i=0;i<5;i++)rings+='<circle cx="320" cy="214" r="'+(70+i*30)+'" fill="none" stroke="'+INK+'" stroke-width="'+(i==0?4:2)+'" opacity="'+(i==0?1:.55-.08*i)+'"/>';
  let ticks='';for(let a=0;a<360;a+=15){const R=a%45?156:150,R2=172,c=Math.cos(a*Math.PI/180),s=Math.sin(a*Math.PI/180);ticks+='<line x1="'+r3(320+R*c)+'" y1="'+r3(214+R*s)+'" x2="'+r3(320+R2*c)+'" y2="'+r3(214+R2*s)+'" stroke="'+INK+'" stroke-width="'+(a%45?1.5:3)+'"/>'}
  let grid='';for(let x=40;x<640;x+=40)grid+='<line x1="'+x+'" y1="0" x2="'+x+'" y2="480" stroke="'+INK+'" stroke-width="1" opacity=".09"/>';for(let y=14;y<480;y+=40)grid+='<line x1="0" y1="'+y+'" x2="640" y2="'+y+'" stroke="'+INK+'" stroke-width="1" opacity=".09"/>';
  const bw=128,bx=64;let bars='';
  nm.forEach((L,i)=>{const x=bx+i*bw,sc=26/L.u,tw=L.w*sc;
    bars+='<rect x="'+x+'" y="392" width="'+bw+'" height="62" fill="'+col[i]+'"/>'+
      '<g transform="translate('+r3(x+bw/2-tw/2)+' 432) scale('+r3(sc)+','+r3(-sc)+')" fill="'+INK+'">'+L.paths+'</g>'});
  bars+='<rect x="'+bx+'" y="392" width="'+(bw*4)+'" height="62" fill="url(#ldBsh)"/><path d="M'+bx+' 392h'+(bw*4)+'v62h-'+(bw*4)+'z'+[1,2,3].map(i=>'M'+(bx+i*bw)+' 392v62').join('')+'" fill="none" stroke="'+INK+'" stroke-width="3"/>';
  const scr='<svg class="ldB-card" viewBox="0 0 640 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>'+
    '<radialGradient id="ldBpaper" cx=".3" cy=".2" r="1"><stop offset="0" stop-color="#fff6dc"/><stop offset=".6" stop-color="#f3e2bb"/><stop offset="1" stop-color="#d9c08e"/></radialGradient>'+
    '<linearGradient id="ldBsh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>'+
    grad('ldBg','#fff1e2','#ff7b52','#d8331d')+
    '<filter id="ldBgr" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .14 0 0 0 0 .08 0 0 0 0 .05 0 0 0 .55 -.18"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>'+
    '<rect width="640" height="480" fill="url(#ldBpaper)"/>'+grid+
    '<rect width="640" height="480" filter="url(#ldBgr)" fill="#000"/>'+
    '<circle cx="320" cy="214" r="172" fill="#f9ecd0" stroke="'+INK+'" stroke-width="3"/>'+ticks+rings+
    '<path d="M148 214H492M320 42V386" stroke="'+INK+'" stroke-width="1.5" opacity=".5"/>'+
    '<g transform="translate(262 156) scale(.29)">'+LOGO.replace(/<svg[^>]*>/,'').replace('</svg>','')+'</g>'+
    '<circle cx="320" cy="214" r="62" fill="none" stroke="'+INK+'" stroke-width="5"/>'+
    bars+'</svg>';
  const html='<div id="x2pLoad" class="ldB" aria-hidden="true"><div class="ldB-room"></div><div class="ldB-col">'+
    '<div class="ldB-cap"><div class="ldB-title"><svg width="0" height="0" style="position:absolute"><defs>'+grad('ldBt','#fff1e2','#ff7b52','#d8331d')+'</defs></svg>'+t1.svg+t2.svg+'</div>'+st.svg+'</div>'+
    '<div class="ldB-set"><div class="ldB-ant"><i></i><i></i><b></b></div>'+
      '<div class="ldB-box"><div class="ldB-tube">'+scr+'<div class="ldB-roll"></div><div class="ldB-glass"></div></div>'+
      '<div class="ldB-low"><div class="ldB-grille"></div><div class="ldB-knobs"><i></i><i></i></div></div></div>'+
      '<div class="ldB-feet"><i></i><i></i></div></div></div></div>';
  const css=`
/* ---- B: sign-on ---- */
#x2pLoad.ldB{display:block;opacity:1;animation:none;overflow:hidden;background:#0b0a14;--w:min(86vw,calc((100vh - 300px) * .86),560px)}
#x2pLoad.ldB svg{height:auto}
/* the room: the wall of a living room before the sun is up, gouache on board, lit from the set */
#x2pLoad.ldB .ldB-room{position:absolute;inset:0;background:
  radial-gradient(60% 46% at 50% 44%,rgba(120,190,230,.34),rgba(120,190,230,0) 70%),
  radial-gradient(120% 60% at 20% 0%,rgba(255,226,170,.10),rgba(255,226,170,0) 60%),
  linear-gradient(180deg,#0b0a14 0,#0b0a14 7%,#1b2a40 22%,#22344f 60%,#3a2b22 82%,#2a1d16 100%),url(media/h48-paper.jpg) 0 0/560px auto;background-blend-mode:normal,normal,normal,multiply}
#x2pLoad.ldB .ldB-room::after{content:"";position:absolute;left:0;right:0;top:78%;bottom:0;background:repeating-linear-gradient(90deg,rgba(0,0,0,.0) 0 46px,rgba(0,0,0,.22) 46px 48px),linear-gradient(180deg,rgba(255,200,140,.08),rgba(0,0,0,.35));border-top:3px solid #120c09}
/* the set, sized to the screen: a 1960s console, wood cabinet, the tube, the grille, two knobs, rabbit ears */
#x2pLoad.ldB .ldB-col{position:absolute;inset:0;padding:max(44px,env(safe-area-inset-top,0px)) 16px 24px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(10px,3vh,34px)}
#x2pLoad.ldB .ldB-set{position:relative;width:var(--w);flex:none}
#x2pLoad.ldB .ldB-ant{position:relative;height:calc(var(--w) * .16);margin:0 auto}
#x2pLoad.ldB .ldB-ant i{position:absolute;bottom:0;left:50%;width:3px;height:calc(var(--w) * .22);background:linear-gradient(90deg,#c9c2b0,#f2ead8,#8d8574);border:1px solid #120c09;transform-origin:50% 100%;border-radius:2px}
#x2pLoad.ldB .ldB-ant i:first-child{transform:translateX(-50%) rotate(-31deg)}#x2pLoad.ldB .ldB-ant i:nth-child(2){transform:translateX(-50%) rotate(24deg)}
#x2pLoad.ldB .ldB-ant b{position:absolute;bottom:-6px;left:50%;width:calc(var(--w) * .11);height:calc(var(--w) * .05);transform:translateX(-50%);border-radius:50% 50% 8px 8px;background:radial-gradient(60% 80% at 35% 25%,#7a5636,#3b2516);border:3px solid #120c09}
#x2pLoad.ldB .ldB-box{position:relative;padding:calc(var(--w) * .055);border-radius:calc(var(--w) * .07);border:4px solid #120c09;
  background:radial-gradient(90% 60% at 25% 10%,rgba(255,214,150,.38),rgba(255,214,150,0) 60%),
    repeating-linear-gradient(92deg,rgba(60,30,12,.0) 0 7px,rgba(60,30,12,.16) 7px 9px,rgba(255,220,170,.05) 9px 15px),
    linear-gradient(180deg,#9a5a2c,#7a4220 60%,#5b2f17);box-shadow:inset 0 0 0 2px rgba(255,220,170,.25),inset 0 -10px 18px rgba(0,0,0,.35),6px 8px 0 rgba(0,0,0,.45)}
#x2pLoad.ldB .ldB-tube{position:relative;aspect-ratio:4/3;border-radius:14% / 18%;overflow:hidden;border:4px solid #120c09;background:#141018;box-shadow:0 0 0 calc(var(--w) * .018) #2a2620,0 0 0 calc(var(--w) * .022) #120c09}
#x2pLoad.ldB .ldB-card{position:absolute;inset:0;width:100%;height:100%!important;display:block}
#x2pLoad.ldB .ldB-glass{position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:radial-gradient(70% 55% at 30% 22%,rgba(255,255,255,.28),rgba(255,255,255,0) 55%),radial-gradient(120% 120% at 50% 50%,rgba(0,0,0,0) 58%,rgba(10,6,4,.55) 100%),
    repeating-linear-gradient(180deg,rgba(0,0,0,0) 0 2px,rgba(0,0,0,.07) 2px 3px)}
#x2pLoad.ldB .ldB-roll{position:absolute;left:0;right:0;top:-30%;height:30%;background:linear-gradient(180deg,rgba(255,255,255,0),rgba(255,250,230,.16) 50%,rgba(255,255,255,0));pointer-events:none}
#x2pLoad.ldB .ldB-low{display:flex;align-items:center;gap:calc(var(--w) * .05);margin-top:calc(var(--w) * .04);height:calc(var(--w) * .13)}
#x2pLoad.ldB .ldB-grille{flex:1;height:100%;border:3px solid #120c09;border-radius:10px;background:repeating-linear-gradient(90deg,#2b1a10 0 5px,#c9a06a 5px 7px);box-shadow:inset 0 3px 6px rgba(0,0,0,.45)}
#x2pLoad.ldB .ldB-knobs{display:flex;gap:calc(var(--w) * .03)}
#x2pLoad.ldB .ldB-knobs i{display:block;width:calc(var(--w) * .1);aspect-ratio:1;border-radius:50%;border:3px solid #120c09;background:radial-gradient(60% 60% at 35% 30%,#f6e7c4,#c9a06a 60%,#7a5636);position:relative}
#x2pLoad.ldB .ldB-knobs i::after{content:"";position:absolute;left:50%;top:8%;width:3px;height:40%;background:#120c09;transform:translateX(-50%) rotate(28deg);transform-origin:50% 100%}
#x2pLoad.ldB .ldB-feet{display:flex;justify-content:space-between;padding:0 14%}
#x2pLoad.ldB .ldB-feet i{display:block;width:6%;height:calc(var(--w) * .06);background:linear-gradient(90deg,#3b2516,#6b4428);border:3px solid #120c09;border-top:0;border-radius:0 0 6px 6px}
/* the caption under the set: the show's name in its own lettering, and the station's line */
#x2pLoad.ldB .ldB-cap{position:relative;text-align:center;font-size:min(10.5vw,52px,7.4vh);flex:none}
#x2pLoad.ldB .ldB-title{display:flex;flex-wrap:wrap;justify-content:center;column-gap:.18em;filter:drop-shadow(2px 2px 0 ${INK}) drop-shadow(3px 4px 0 rgba(0,0,0,.55))}
#x2pLoad.ldB .ldB-t{display:block;height:1.24em!important;width:auto;fill:url(#ldBt);stroke:${INK};stroke-width:2px;paint-order:stroke}
#x2pLoad.ldB .ldB-t path{vector-effect:non-scaling-stroke}
@media (orientation:landscape) and (max-height:600px){#x2pLoad.ldB{--w:min(44vw,calc((100vh - 64px) * .8),560px)}#x2pLoad.ldB .ldB-col{flex-direction:row;padding:20px 24px}#x2pLoad.ldB .ldB-cap{font-size:min(5vw,9vh,52px)}}
#x2pLoad.ldB .ldB-cap>svg{display:block;margin:.35em auto 0;height:.36em!important;width:auto;fill:#f6e7c4;opacity:.92}
@media (prefers-reduced-motion:no-preference){
  /* the tube warms up once (a line opens to the picture), then the signal rolls through, slowly: the station is signing on */
  #x2pLoad.ldB .ldB-tube>:is(.ldB-card,.ldB-roll){animation:ldBon .55s cubic-bezier(.2,.9,.3,1) both .1s}
  @keyframes ldBon{0%{transform:scale(.9,.008);filter:brightness(3)}45%{transform:scale(1,.02);filter:brightness(2.4)}100%{transform:none;filter:none}}
  #x2pLoad.ldB .ldB-roll{animation:ldBon .55s both .1s,ldBroll 3.2s linear .7s infinite}
  @keyframes ldBroll{to{transform:translateY(430%)}}}
/* the lift: the camera pushes into the screen and the show comes on */
html.x2p-rv #x2pLoad.ldB{display:block;animation:ldBout .38s ease-in forwards;background:transparent}
html.x2p-rv #x2pLoad.ldB .ldB-room{opacity:0;transition:opacity .2s}
html.x2p-rv #x2pLoad.ldB .ldB-cap{opacity:0;transition:opacity .12s}
html.x2p-rv #x2pLoad.ldB .ldB-set{transform:scale(3.2);transform-origin:50% 42%;transition:transform .38s cubic-bezier(.6,0,.9,.5)}
@keyframes ldBout{0%,40%{opacity:1}100%{opacity:0}}
`;
  return {name:'B',html,css,head:PAPER}}

/* ============ C: CURTAIN UP (the stage before the show; the lift is the curtain going up) ============ */
function takeC(){
  const t1=svgLine('Four AIs','cap',{seed:7,pad:.12,cls:'ldC-t'}),t2=svgLine('Trade Earnings','cap',{seed:7,k0:8,pad:.12,cls:'ldC-t'});
  const pr=svgLine('PRESENTS','lil',{ls:.12,pad:.05,cls:'ldC-pr'});
  /* one curtain half, 500 x 1000 units, its folds as hand-cut panels; stretched to the screen */
  function half(side){let p='',x=0;const n=7,seed=side=='L'?3:9;
    for(let i=0;i<n;i++){const w=500/n,x0=i*w,x1=x0+w,j=(rnd(i,seed)-.5)*10,hem=980+(rnd(i+20,seed)-.5)*22;
      p+='<path d="M'+r3(x0)+' 0 C'+r3(x0+w*.2+j)+' 300 '+r3(x0-w*.12)+' 700 '+r3(x0+j*.4)+' '+r3(hem)+' Q'+r3(x0+w/2)+' '+r3(hem+18)+' '+r3(x1+j*.3)+' '+r3(hem-6)+' C'+r3(x1-w*.1)+' 700 '+r3(x1+w*.12)+' 300 '+r3(x1)+' 0Z" fill="url(#ldCf)"/>'+
        '<path d="M'+r3(x0+w*.72)+' 0 C'+r3(x0+w*.8+j)+' 320 '+r3(x0+w*.62)+' 700 '+r3(x0+w*.7+j*.4)+' '+r3(hem+4)+'" stroke="#2a0606" stroke-opacity=".55" stroke-width="3" fill="none"/>'+
        '<path d="M'+r3(x0+w*.3)+' 0 C'+r3(x0+w*.34+j)+' 320 '+r3(x0+w*.24)+' 700 '+r3(x0+w*.3+j*.4)+' '+r3(hem+6)+'" stroke="#ffb59a" stroke-opacity=".28" stroke-width="5" fill="none"/>'}
    return '<div class="ldC-h ldC-'+side+'"><svg viewBox="0 0 500 1000" preserveAspectRatio="none" aria-hidden="true">'+(side=='L'?'':'<g transform="translate(500 0) scale(-1 1)">')+p+
      '<path d="M500 0V1000" stroke="'+INK+'" stroke-width="6"/>'+(side=='L'?'':'</g>')+'</svg></div>'}
  const html='<div id="x2pLoad" class="ldC" aria-hidden="true"><svg width="0" height="0" style="position:absolute"><defs>'+
      '<linearGradient id="ldCf" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a0d0b"/><stop offset=".22" stop-color="#9c1c16"/><stop offset=".5" stop-color="#d23a24"/><stop offset=".7" stop-color="#a81f18"/><stop offset="1" stop-color="#4d0a09"/></linearGradient>'+
      grad('ldCt','#fff1e2','#ff7b52','#d8331d')+'</defs></svg>'+
    '<div class="ldC-stage"></div>'+half('L')+half('R')+'<div class="ldC-shade"></div>'+
    '<div class="ldC-val"><div class="ldC-fr"></div><div class="ldC-plate"><span class="ldC-lg">'+LOGO+'</span>'+pr.svg+'</div></div>'+
    '<div class="ldC-card"><div class="ldC-title">'+t1.svg+t2.svg+'</div></div></div>';
  const css=`
/* ---- C: curtain up ---- */
#x2pLoad.ldC{display:block;opacity:1;animation:none;overflow:hidden;background:#07050a}
#x2pLoad.ldC svg{height:auto}
#x2pLoad.ldC .ldC-stage{position:absolute;inset:0;background:radial-gradient(60% 40% at 50% 100%,rgba(255,200,120,.35),rgba(255,200,120,0) 70%),linear-gradient(180deg,#07050a,#1a0d08 70%,#3a2214)}
#x2pLoad.ldC .ldC-h{position:absolute;top:0;bottom:0;width:51%;isolation:isolate}
#x2pLoad.ldC .ldC-h svg{display:block;width:100%;height:100%!important}
#x2pLoad.ldC .ldC-h::after{content:"";position:absolute;inset:0;background:url(media/h48-paper.jpg) 0 0/420px auto;mix-blend-mode:multiply;opacity:.8}
#x2pLoad.ldC .ldC-L{left:0;transform-origin:0 0}#x2pLoad.ldC .ldC-R{right:0;transform-origin:100% 0}
/* the house lights: a warm key from the top left falling off down the cloth, the hem in shadow */
#x2pLoad.ldC .ldC-shade{position:absolute;inset:0;pointer-events:none;background:
  radial-gradient(90% 60% at 18% 6%,rgba(255,206,150,.30),rgba(255,206,150,0) 62%),radial-gradient(70% 35% at 50% 104%,rgba(0,0,0,.55),rgba(0,0,0,0) 70%),
  linear-gradient(90deg,rgba(0,0,0,.35),rgba(0,0,0,0) 14%,rgba(0,0,0,0) 86%,rgba(0,0,0,.35))}
/* the valance: a dark proscenium at the very top (the phone's top bar stays dark), a scalloped red pelmet, a gold fringe, the plate */
#x2pLoad.ldC .ldC-val{position:absolute;z-index:2;left:0;right:0;top:0;height:calc(env(safe-area-inset-top,0px) + clamp(92px,15vh,132px));
  background:radial-gradient(80% 120% at 30% 0%,rgba(255,190,140,.22),rgba(255,190,140,0) 60%),linear-gradient(180deg,#0b0a14 0,#0b0a14 24%,#7a1410 26%,#b7271b 60%,#7d150f 100%);
  -webkit-mask:radial-gradient(28px 20px at 50% 0,#000 98%,transparent) 0 100%/56px 20px repeat-x,linear-gradient(#000,#000) 0 0/100% calc(100% - 19px) no-repeat;
          mask:radial-gradient(28px 20px at 50% 0,#000 98%,transparent) 0 100%/56px 20px repeat-x,linear-gradient(#000,#000) 0 0/100% calc(100% - 19px) no-repeat}
#x2pLoad.ldC .ldC-fr{position:absolute;left:0;right:0;bottom:19px;height:7px;background:repeating-linear-gradient(90deg,#ffd877 0 3px,#c48a1c 3px 5px,#8a5a10 5px 6px);border-top:2px solid #4a2a06}
#x2pLoad.ldC .ldC-plate{position:absolute;left:50%;bottom:30px;transform:translateX(-50%) rotate(-1.2deg);display:flex;align-items:center;gap:8px;padding:5px 14px 5px 6px;border-radius:12px 9px 13px 10px;
  background:radial-gradient(90% 120% at 25% 10%,#fffaf0,#f6e7c4 60%,#e2c993);border:2.5px solid ${INK};box-shadow:3px 3px 0 ${INK};font-size:15px;fill:#7a2e12}
#x2pLoad.ldC .ldC-lg svg{width:28px!important;height:28px!important;display:block}
#x2pLoad.ldC .ldC-pr{display:block;height:1.3em!important;width:auto}
/* the show's name, painted on a cream card hung where the two halves meet */
#x2pLoad.ldC .ldC-card{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-1.6deg);width:min(84vw,620px);padding:.5em .6em .6em;font-size:min(11.2vw,64px);
  border-radius:18px 14px 20px 15px / 15px 19px 14px 18px;border:3px solid ${INK};box-shadow:5px 6px 0 ${INK},0 18px 40px rgba(0,0,0,.45);
  background:radial-gradient(100% 90% at 22% 8%,#fffaf0,#f6e7c4 56%,#ddc28a)}
#x2pLoad.ldC .ldC-card::before,#x2pLoad.ldC .ldC-card::after{content:"";position:absolute;top:-56vh;width:2px;height:56vh;background:linear-gradient(#0000,#c9b88f 30%,#e9dcb8)}
#x2pLoad.ldC .ldC-card::before{left:18%}#x2pLoad.ldC .ldC-card::after{right:18%}
#x2pLoad.ldC .ldC-title{display:flex;flex-direction:column;align-items:center;filter:drop-shadow(2px 2px 0 ${INK}) drop-shadow(3px 4px 0 rgba(36,20,12,.45))}
#x2pLoad.ldC .ldC-t{display:block;height:1.24em!important;width:auto;max-width:100%;fill:url(#ldCt);stroke:${INK};stroke-width:2px;paint-order:stroke}
#x2pLoad.ldC .ldC-t path{vector-effect:non-scaling-stroke}
@media (max-height:500px) and (orientation:landscape){#x2pLoad.ldC .ldC-card{font-size:min(9vh,64px);top:58%;width:auto}#x2pLoad.ldC .ldC-title{flex-direction:row;gap:.25em}}
@media (prefers-reduced-motion:no-preference){
  /* someone moves behind the curtain: the cloth sways, slowly, out of step; the show is about to start */
  #x2pLoad.ldC .ldC-L svg{transform-origin:0 0;animation:ldCsw 3.4s ease-in-out infinite alternate}
  #x2pLoad.ldC .ldC-R svg{transform-origin:100% 0;animation:ldCsw2 3.9s ease-in-out infinite alternate}
  @keyframes ldCsw{from{transform:skewX(0)}to{transform:skewX(.9deg)}}
  @keyframes ldCsw2{from{transform:skewX(0)}to{transform:skewX(-.8deg)}}}
/* the lift: curtain up. The halves part, the valance and the card fly out, the show is behind them */
html.x2p-rv #x2pLoad.ldC{display:block;animation:none;background:transparent}
html.x2p-rv #x2pLoad.ldC .ldC-stage{opacity:0}
html.x2p-rv #x2pLoad.ldC .ldC-shade{opacity:0;transition:opacity .15s}
html.x2p-rv #x2pLoad.ldC .ldC-L{transform:translateX(-101%);transition:transform .38s cubic-bezier(.55,0,.35,1)}
html.x2p-rv #x2pLoad.ldC .ldC-R{transform:translateX(101%);transition:transform .38s cubic-bezier(.55,0,.35,1)}
html.x2p-rv #x2pLoad.ldC .ldC-val{transform:translateY(-100%);transition:transform .3s cubic-bezier(.6,0,.4,1) .05s}
html.x2p-rv #x2pLoad.ldC .ldC-card{transform:translate(-50%,-50%) translateY(-60vh) rotate(-4deg);opacity:0;transition:transform .3s cubic-bezier(.6,0,.6,1),opacity .3s}
`;
  return {name:'C',html,css,head:PAPER}}

module.exports={today,A:takeA,B:takeB,C:takeC,LOGO};
if(require.main===module){for(const k of ['A','B','C']){const t=module.exports[k]();console.log(k,'html',t.html.length,'css',t.css.length)}}
