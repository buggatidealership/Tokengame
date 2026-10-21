// Foil sweep, continuous versions (owner, 2026-10-21: "just continuous, like a Pokemon card"). A = the current sweep for reference.
const fs=require('fs'),path=require('path');const R=__dirname;
const G=require('./gen-x.js');const x=G.by(30);
const base=G.slab({n:30,co:x.r.co,tk:x.r.ticker,g:x.g,pr:x.pr,img:G.poster(30),cap:''}).replace(/<p class="cap">.*?<\/p>/,'');
const card=(v,k,name,line)=>`<div class="opt ${v}"><div class="k">${k}</div><div class="hold">${base.replace('<div class="slab">','<div class="slab"><i class="fx10"><i></i></i>')}</div><p class="nm2"><b>${name}</b><br>${line}</p></div>`;
const RB='rgba(255,111,174,.9) 18%,rgba(242,182,50,.9) 30%,rgba(159,240,196,.9) 42%,rgba(111,211,255,.9) 54%,rgba(196,155,255,.9) 66%';
// A3: a soft glare that circles the card while the colour bands drift, one 8 s loop, smooth
let kf='';for(let i=0;i<=36;i++){const t=i/36*2*Math.PI;kf+=`${(i/36*100).toFixed(2)}%{background-position:${(50+38*Math.cos(t)).toFixed(1)}% ${(50+38*Math.sin(t)).toFixed(1)}%,${(50+35*Math.sin(t)).toFixed(1)}% 50%}`}
const P=110,DX=(P/Math.sin(115*Math.PI/180)).toFixed(2);
const css=G.css+`
body{background:#0d0b12}.pg2{display:grid;grid-template-columns:repeat(2,auto);justify-content:center;gap:34px 46px;padding:30px 30px 34px}
.opt{display:grid;justify-items:center}.opt .hold{zoom:1.42}.k{font:400 22px/1 Anton;color:#f2b632;margin-bottom:12px;letter-spacing:.04em}
.nm2{margin:14px 0 0;font:600 15px/1.35 Barlow;color:#a49fb4;text-align:center;max-width:360px}.nm2 b{font:400 19px/1.2 Anton;color:#f3ead6;letter-spacing:.02em;text-transform:uppercase}
.slab .face{position:relative}.fx10{position:absolute;inset:0;border-radius:12px;pointer-events:none;z-index:3;overflow:hidden}.fx10>i{position:absolute;display:block}
.face::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(120deg,rgba(255,111,174,0) 0%,${RB},rgba(255,111,174,0) 84%);background-size:260% 260%;mix-blend-mode:soft-light;opacity:.55;animation:zs 6s ease-in-out infinite alternate}
@keyframes zs{0%{background-position:100% 0}100%{background-position:0 100%}}
/* A · today's sweep: one pass, then a pause */
.a .fx10{background:linear-gradient(115deg,transparent 38%,rgba(255,111,174,.55) 44%,rgba(255,240,190,.85) 48%,rgba(159,240,196,.6) 52%,rgba(111,211,255,.45) 56%,transparent 62%) no-repeat;background-size:300% 100%;mix-blend-mode:overlay;animation:sweep 5s ease-in-out infinite}
@keyframes sweep{0%{background-position:100% 0}55%,100%{background-position:0 0}}
/* B · the same band, never leaves: it glides from one side to the other and back */
.b .fx10{background:linear-gradient(115deg,transparent 30%,rgba(255,111,174,.45) 40%,rgba(255,240,190,.75) 47%,rgba(159,240,196,.5) 53%,rgba(111,211,255,.4) 60%,transparent 70%) no-repeat;background-size:240% 100%;mix-blend-mode:overlay;animation:glide 4.5s ease-in-out infinite alternate}
@keyframes glide{0%{background-position:92% 0}100%{background-position:8% 0}}
/* C · rainbow foil: soft colour bands roll across without end, like a holo card's foil */
.c .fx10>i{inset:-60% -60% -60% calc(-60% - ${DX}px);background:repeating-linear-gradient(115deg,rgba(255,111,174,.55) 0,rgba(242,182,50,.55) ${P*.2}px,rgba(159,240,196,.55) ${P*.4}px,rgba(111,211,255,.55) ${P*.6}px,rgba(196,155,255,.55) ${P*.8}px,rgba(255,111,174,.55) ${P}px);mix-blend-mode:overlay;animation:roll 3.2s linear infinite}
.c .fx10{mix-blend-mode:overlay;opacity:.7}.c .fx10>i{mix-blend-mode:normal}
@keyframes roll{to{transform:translateX(${DX}px)}}
/* D · Pokemon-style: colour bands drift while a soft glare circles the card, as if you were turning it under a lamp */
.d .fx10{background:radial-gradient(circle at center,rgba(255,250,225,.85) 0,rgba(255,240,200,.35) 18%,transparent 42%) no-repeat,linear-gradient(115deg,rgba(255,111,174,.5),rgba(242,182,50,.5),rgba(159,240,196,.5),rgba(111,211,255,.5),rgba(196,155,255,.5),rgba(255,111,174,.5)) no-repeat;background-size:220% 220%,300% 100%;mix-blend-mode:overlay;opacity:.85;animation:orbit 8s linear infinite}
@keyframes orbit{${kf}}
`;
const page=`<div class="pg2">${card('a','A · TODAY','Foil sweep','One pass, then a pause. For reference.')}${card('b','B','Glide','The same band, always on the card, gliding side to side.')}${card('c','C','Rolling foil','Soft colour bands roll across without end.')}${card('d','D','Under the lamp','Colour drifts while a soft glare circles the card. The Pokémon one.')}</div>`;
fs.writeFileSync(path.join(R,'h10.html'),`<!doctype html><meta charset="utf-8"><style>${css}</style>${page}`);
