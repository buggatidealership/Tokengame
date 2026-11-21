// Round H24 · ground4: the page's own ground on X2+. window.__G4 = 'g1'..'g5' picks the take; window.__G4M = base url of the tiles.
(function(){const id=window.__G4;if(!id)return;const M=window.__G4M||'tools/concepts/worlds/comic/story/h/ground4/out/';
const T={g1:{k:'g1-board',s:'s1-fingers',nm:'The board'},g2:{k:'g2-wafer',s:'s2-scribe',nm:'The wafer'},g3:{k:'g3-rack',s:'s3-blank',nm:'The rack'},g4:{k:'g4-bus',s:'s4-junction',nm:'The bus',bus:1},g5:{k:'g5-void',s:null,nm:'The void'}}[id];
const D=document.documentElement;D.classList.add('g4',...('g4-'+id).split(' '));
const css=`
html.g4.x2p.x2d[data-theme="dark"] body::before{background:none!important}
html.g4{background:#030408 url(${M}gr4-${T.k}-p.jpg) 50% 0/100% auto repeat-y!important}
@media (min-width:760px){html.g4{background-image:url(${M}gr4-${T.k}-l.jpg)!important}}
${T.s?`
html.g4 .t5-bg{height:auto!important;margin:22px 0 24px;aspect-ratio:2400/var(--g4sh,150);max-height:64px;min-height:26px;filter:drop-shadow(0 3px 0 #000) drop-shadow(0 0 14px rgba(0,0,0,.9));background:url(${M}gr4-${T.s}.jpg) 50% 50%/cover no-repeat}
html.g4 .t5-bg>*{visibility:hidden}
html.g4 .g4-gut{display:block;width:100vw;margin:0 0 0 calc(50% - 50vw);height:clamp(26px,8vw,64px);background:url(${M}gr4-${T.s}.jpg) 50% 50%/cover no-repeat;filter:drop-shadow(0 3px 0 #000) drop-shadow(0 0 14px rgba(0,0,0,.9))}
`:''}
${T.bus?`
html.g4 .g4-bus{position:absolute;z-index:-1;left:0;top:0;width:100%;height:var(--g4h,0px);overflow:hidden;pointer-events:none}
html.g4 .g4-bus i{position:absolute;left:calc(50% - 2px);top:-140px;width:4px;height:140px;border-radius:3px;background:linear-gradient(180deg,transparent,rgba(255,214,110,.0) 20%,rgba(255,222,140,.85) 85%,#fff6d8);box-shadow:0 0 8px 2px rgba(255,190,60,.45);will-change:transform;animation:g4run 14s linear infinite}
html.g4 .g4-bus i:nth-child(2){left:calc(50% - 26px);animation-delay:-5s;animation-duration:17s}
html.g4 .g4-bus i:nth-child(3){left:calc(50% + 22px);animation-delay:-10s;animation-duration:15s}
@keyframes g4run{to{transform:translateY(calc(var(--g4h,8000px) + 140px))}}
@media (prefers-reduced-motion:reduce){html.g4 .g4-bus i{animation:none;display:none}}
`:''}`;
const st=document.createElement('style');st.id='g4-css';st.textContent=css;document.head.appendChild(st);
if(T.s){const im=new Image();im.onload=()=>D.style.setProperty('--g4sh',im.naturalHeight);im.src=M+'gr4-'+T.s+'.jpg';
 if(!matchMedia('(min-width:1200px)').matches)['record','learn','highlights','x2pSt','get'].forEach(i=>{const s=document.getElementById(i);if(s&&s.offsetHeight&&!(s.previousElementSibling||{}).classList?.contains('g4-gut')){const d=document.createElement('div');d.className='g4-gut';d.setAttribute('aria-hidden','true');s.before(d)}})}
if(T.bus){const b=document.createElement('div');b.className='g4-bus';b.setAttribute('aria-hidden','true');b.innerHTML='<i></i><i></i><i></i>';document.body.prepend(b);
 const tint=()=>{const mn=document.querySelector('main');D.style.setProperty('--g4h',Math.round(mn.getBoundingClientRect().bottom+scrollY)+'px');const H=D.scrollHeight,y=i=>{const e=document.getElementById(i);return e?Math.round((e.getBoundingClientRect().top+scrollY)/H*1000)/10:null};
  const r=y('record')||40,l=y('learn')||55,b2=y('x2pSt')||80;
  D.style.setProperty('background-image',`linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0) ${r}%,rgba(70,22,8,.32) ${r+3}%,rgba(70,22,8,.32) ${l}%,rgba(60,44,6,.30) ${l+3}%,rgba(60,44,6,.3) ${b2-2}%,rgba(0,0,0,.72) ${b2+2}%,rgba(0,0,0,.72) 100%),url(${M}gr4-${T.k}-${innerWidth>=760?'l':'p'}.jpg)`,'important');
  D.style.setProperty('background-size','100% 100%,100% auto','important');D.style.setProperty('background-repeat','no-repeat,repeat-y','important')};
 tint();addEventListener('load',tint);let w=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w){w=innerWidth;tint()}});setTimeout(tint,3000)}
})();
