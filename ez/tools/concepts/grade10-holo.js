// Four "10" treatments on the TSMC slab, rendered as a looping video. No dots or glitter: smooth light only.
const fs=require('fs'),path=require('path');const R=__dirname;
const G=require('./gen-x.js') /* grade-mock.js plus module.exports={css,slab,by,poster} */;const x=G.by(30);
const base=G.slab({n:30,co:x.r.co,tk:x.r.ticker,g:x.g,pr:x.pr,img:G.poster(30),cap:''}).replace(/<p class="cap">.*?<\/p>/,'');
const card=(v,name,line)=>`<div class="opt ${v}"><div class="k">${v.toUpperCase()}</div><div class="hold">${base.replace('<div class="slab">','<div class="slab"><i class="fx10"></i>')}</div><p class="nm2"><b>${name}</b><br>${line}</p></div>`;
const RB='rgba(255,111,174,.9) 18%,rgba(242,182,50,.9) 30%,rgba(159,240,196,.9) 42%,rgba(111,211,255,.9) 54%,rgba(196,155,255,.9) 66%';
const css=G.css+`
body{background:#0d0b12}.pg2{display:grid;grid-template-columns:repeat(2,auto);justify-content:center;gap:34px 46px;padding:30px 30px 34px}
.opt{display:grid;justify-items:center}.opt .hold{zoom:1.42}.k{font:400 22px/1 Anton;color:#f2b632;margin-bottom:12px;letter-spacing:.04em}
.nm2{margin:14px 0 0;font:600 15px/1.35 Barlow;color:#a49fb4;text-align:center;max-width:360px}.nm2 b{font:400 19px/1.2 Anton;color:#f3ead6;letter-spacing:.02em;text-transform:uppercase}
.slab .face{position:relative}.fx10{position:absolute;inset:0;border-radius:12px;pointer-events:none;z-index:3}
@property --a{syntax:'<angle>';initial-value:0deg;inherits:false}
/* A · foil sweep: a band of light crosses the whole slab, as when a foil card catches the light; the film keeps the soft wash */
.a .fx10{background:linear-gradient(115deg,transparent 38%,rgba(255,111,174,.55) 44%,rgba(255,240,190,.85) 48%,rgba(159,240,196,.6) 52%,rgba(111,211,255,.45) 56%,transparent 62%) no-repeat;background-size:300% 100%;mix-blend-mode:overlay;animation:sweep 5s ease-in-out infinite}
@keyframes sweep{0%{background-position:100% 0}55%,100%{background-position:0 0}}
.a .face::after,.c .face::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(120deg,rgba(255,111,174,0) 0%,${RB},rgba(255,111,174,0) 84%);background-size:260% 260%;mix-blend-mode:soft-light;opacity:.55;animation:zs 6s ease-in-out infinite alternate}
@keyframes zs{0%{background-position:100% 0}100%{background-position:0 100%}}
/* B · prism holder: the holder's rim turns from gold through the colours, slowly, all the way round */
.b .fx10{inset:-4px;border-radius:15px;padding:4px;background:conic-gradient(from var(--a),#f2b632,#ffe28a,#9ff0c4,#6fd3ff,#c49bff,#ff6fae,#f2b632);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:spin 7s linear infinite}
.b .slab{box-shadow:0 0 0 2.5px #000,inset 1.5px 1.5px 0 rgba(255,255,255,.75),inset -1.5px -1.5px 0 rgba(255,255,255,.25),6px 7px 0 0 #000,0 0 26px rgba(242,182,50,.28)}
@keyframes spin{to{--a:360deg}}
/* C · tilt: the slab turns a little in the hand and the light slides with it (on the site: follows your finger or the scroll) */
.c .hold{perspective:900px}.c .slab{animation:tilt 6s ease-in-out infinite;transform-style:preserve-3d}
@keyframes tilt{0%,100%{transform:rotateY(-10deg) rotateX(4deg)}50%{transform:rotateY(10deg) rotateX(-3deg)}}
.c .fx10{background:linear-gradient(105deg,transparent 30%,rgba(255,111,174,.5) 40%,rgba(255,240,190,.7) 47%,rgba(159,240,196,.55) 53%,rgba(111,211,255,.45) 60%,transparent 70%) no-repeat;background-size:260% 100%;mix-blend-mode:overlay;animation:tiltl 6s ease-in-out infinite}
@keyframes tiltl{0%,100%{background-position:95% 0}50%{background-position:5% 0}}
/* D · foil stamp: only the 10 and the $EZ chip are foil; a glint passes through them, the rest stays still */
.d .lab .r .gr{background:linear-gradient(100deg,#141217 0 36%,#6b4706 42%,#fff4c4 47%,#9ff0c4 50%,#6fd3ff 53%,#141217 60%) no-repeat;background-size:320% 100%;-webkit-background-clip:text;background-clip:text;color:transparent!important;animation:glint 4s ease-in-out infinite}
.d .lab .r .ds{background:linear-gradient(100deg,#141217 0 36%,#6b4706 42%,#fff4c4 47%,#9ff0c4 50%,#6fd3ff 53%,#141217 60%) no-repeat;background-size:320% 100%;-webkit-background-clip:text;background-clip:text;color:transparent!important;animation:glint 4s ease-in-out infinite;animation-delay:-.25s}
@keyframes glint{0%{background-position:100% 0}50%,100%{background-position:0 0}}
.d .holo{background-size:300% 100%!important;animation:chip 3s linear infinite}
@keyframes chip{to{background-position:300% 0}}
`;
const page=`<div class="pg2">${card('a','Foil sweep','A band of light crosses the slab every few seconds. The film keeps the soft wash.')}${card('b','Prism holder','The holder rim cycles from gold through the colours, all the way round.')}${card('c','In the hand','The slab tilts and the light slides with it. On the site: follows your finger.')}${card('d','Foil stamp','Only the 10, PRISTINE and the $EZ chip shine. Quietest.')}</div>`;
fs.writeFileSync(path.join(R,'h10.html'),`<!doctype html><meta charset="utf-8"><style>${css}</style>${page}`);
