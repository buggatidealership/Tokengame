/* H24 film2: the explainer beat redesigned (round H24, task film). Laid over the built v46-live-x2plus.html after x2p_top.js has built .t4.
   window.__F2 = take id: 'A' die display (after the frames), 'B' the fifth die (after the hero), 'C' now showing (after the hero), 'D' model picking (after the frames).
   window.__F2place = 'before' | 'after' overrides the take's place (before = right after the hero, before "How a round works").
   The film plays in the painted glass (16:9, whole, contained); the running time is lit in the painted LED window (counting down while it plays);
   the painted gold dome is the play/pause key (an etched mark that changes with the state); a tap on the glass does the same. Data: MODELS, __x2pPnl (B only). */
(function(){const D=document;let n=0;(function go(){const sec=D.querySelector('section.t4');if(!sec||!sec.querySelector('.t4-b3')||!window.__x2pPnl){if(++n<400)return setTimeout(go,50);return}
try{
const IMG=window.__F2img||'tools/concepts/worlds/comic/story/h/film2/img/';
const GEO={"t1b":{"iw":3840,"ih":2160,"glass":[1057,474,1720,961],"led":[1499,1674,753,190],"btn":[2540,1770,92],"dies":[],"ph":[957,384,1920,1580],"dt":[957,384,1920,1580],"f":"t1b"},"t2e":{"iw":3840,"ih":2160,"glass":[1057,494,1720,952],"led":[1499,1674,752,190],"btn":[2540,1758,92],"dies":[[1253,191,154,123],[1613,191,154,123],[1981,191,154,123],[2328,191,154,123]],"ph":[957,120,1920,1830],"dt":[957,120,1920,1830],"f":"t2e"},"t3e":{"iw":3840,"ih":2160,"glass":[929,288,1974,1176],"led":[1497,1565,587,102],"btn":[2266,1620,72],"dies":[],"ph":[819,130,2194,1640],"dt":[819,130,2194,1640],"f":"t3e"},"t4a":{"iw":3840,"ih":2160,"glass":[1178,454,1473,833],"led":[1472,1456,678,139],"btn":[2340,1524,92],"dies":[],"ph":[1078,354,1673,1330],"dt":[1078,354,1673,1330],"f":"t4a"}};
const TK={A:{f:'t1b',head:'Roll the tape',place:'after'},B:{f:'t2e',head:'Start here',place:'before'},C:{f:'t3e',head:'Now showing',place:'before'},D:{f:'t4a',head:'Model picking',place:'after'}};
const id=window.__F2||'C',T=TK[id],g=GEO[T.f],place=window.__F2place||T.place;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let b3=null;
function frame(wide){const[cx,cy,cw,ch]=wide?g.dt:g.ph,P=(r)=>`left:${((r[0]-cx)/cw*100).toFixed(3)}%;top:${((r[1]-cy)/ch*100).toFixed(3)}%;width:${(r[2]/cw*100).toFixed(3)}%;height:${(r[3]/ch*100).toFixed(3)}%`;
  const[gx,gy,gw,gh]=g.glass,ins=gw*.006,aw=gw-2*ins,ah=gh-2*ins,vw=Math.min(aw,ah*16/9),vh=vw*9/16,vr=[gx+ins+(aw-vw)/2,gy+ins+(ah-vh)/2,vw,vh];
  const clip=(r)=>{const[x,y,w,h]=r;return `polygon(${[[x,y],[x+w,y],[x+w,y+h],[x,y+h]].map(([a,b])=>`${((a-cx)/cw*100).toFixed(2)}% ${((b-cy)/ch*100).toFixed(2)}%`).join(',')})`};
  const FLAT=window.__F2flat,src=FLAT?`media/top-h24-film-${id.toLowerCase()}${wide?'-w':''}.jpg`:IMG+g.f+'.jpg';
  /* flat: the exported crop itself (media/top-h24-film-<id>-ph|dt.jpg); else the 4K master, cropped by position */
  const im=FLAT?'style="width:100%;left:0;top:0"':`style="width:${(g.iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%"`;
  const[bx,by,br]=g.btn,led=g.led,lf=(led[3]/ch*100*.78).toFixed(3);
  let dies='';if(g.dies&&g.dies.length){const A=__x2pPnl().A,rk=Object.keys(A).sort((a,b)=>A[b].bal-A[a].bal),MD=window.MODELS||{};
    dies=rk.slice(0,4).map((m,i)=>{const M=MD[m]||{},c=/^#(0|1)/.test(M.c||'')||m==='GPT'?'#f8f0d9':M.c;return `<i class="f2-die${i===0?' f2-lead':''}" style="${P(g.dies[i])}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d||''}" fill="${c}"/></svg></i>`}).join('')}
  return `<div class="f2-pic f2-${id}" style="aspect-ratio:${cw}/${ch};--lf:${lf}cqh">
   <img class="f2-art" src="${src}" alt="" draggable="false" ${im}>
   ${dies}
   <div class="f2-v" style="${P(vr)}"><video playsinline preload="metadata" poster="media/ez-landing-v4-poster-ez.jpg"><source src="media/ez-landing-v4.mp4" type="video/mp4"><source src="media/ez-landing-v4.webm" type="video/webm"></video></div>
   <img class="f2-gl" src="${src}" alt="" draggable="false" ${im.replace('style="','style="clip-path:'+clip(g.glass)+';')}>
   <div class="f2-led" style="${P(led)}"><b class="f2-t">1:20</b></div>
   <img class="f2-gl f2-gl2" src="${src}" alt="" draggable="false" ${im.replace('style="','style="clip-path:'+clip(led)+';')}>
   <button class="f2-btn" style="${P([bx-br,by-br,br*2,br*2])}" aria-label="Play the explainer, 1 minute 20"><svg viewBox="0 0 40 40" aria-hidden="true"><path class="f2-pl" d="M15 11 L30 20 L15 29Z"/><path class="f2-pa" d="M13 11h5v18h-5zM22 11h5v18h-5z"/></svg></button>
  </div>`}
function mount(){const wide=innerWidth>=1000;b3=sec.querySelector('.t4-b3');if(!b3)return;
  b3.className='t4-b3 f2-b3 f2-'+id;b3.innerHTML=`<h2 class="t4-h2 f2-h"><span class="t4-hw">${esc(T.head)}</span></h2><div class="t4-bleed f2-bl">${frame(wide)}</div>`;
  const b1=sec.querySelector('.t4-b1'),b2=sec.querySelector('.t4-b2'),gs=[...sec.querySelectorAll(':scope>.t5-bg')];
  /* before: b1 g b3 g b2 (the film right after the hero); after: b1 g b2 g b3 (today) */
  if(place==='before'){gs[0].after(b3);b3.after(gs[1]);gs[1].after(b2)}
  fitH();wire();window.__t5&&__t5.place()}
function fitH(){const h=b3.querySelector('.f2-h'),w=h.querySelector('.t4-hw'),ref=sec.querySelector('.t4-b2 .t4-h2');if(ref)h.style.setProperty('font-size',getComputedStyle(ref).fontSize,'important');
  const cs=getComputedStyle(h),av=h.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);if(w.scrollWidth>av){h.style.setProperty('font-size',(parseFloat(cs.fontSize)*av/w.scrollWidth*.98).toFixed(1)+'px','important')}}
const mmss=s=>{s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
function wire(){const pic=b3.querySelector('.f2-pic'),v=pic.querySelector('video'),t=pic.querySelector('.f2-t'),b=pic.querySelector('.f2-btn');let dur=80;
  const show=()=>{t.textContent=mmss(v.currentTime&&!v.ended?dur-v.currentTime:dur)};
  v.addEventListener('loadedmetadata',()=>{dur=v.duration||80;show()});v.addEventListener('timeupdate',show);
  v.addEventListener('playing',()=>{pic.classList.add('f2-on');pic.classList.remove('f2-wt');b.setAttribute('aria-label','Pause the explainer')});
  v.addEventListener('waiting',()=>pic.classList.add('f2-wt'));
  v.addEventListener('pause',()=>{pic.classList.remove('f2-on');b.setAttribute('aria-label','Play the explainer, '+t.textContent+' left')});
  v.addEventListener('ended',()=>{pic.classList.remove('f2-on');v.currentTime=0;v.load();show()});
  const tog=()=>{if(v.paused||v.ended){v.muted=false;pic.classList.add('f2-wt');const p=v.play();p&&p.catch(()=>pic.classList.remove('f2-wt'))}else v.pause()};
  b.addEventListener('click',tog);pic.querySelector('.f2-v').addEventListener('click',tog)}
mount();
/* x2p_top rebuilds its section (sec.innerHTML) when the width crosses 1000 px: mount again on every fresh film beat */
new MutationObserver(()=>{const x=sec.querySelector('.t4-b3');if(x&&!x.classList.contains('f2-b3'))mount()}).observe(sec,{childList:true});
addEventListener('resize',()=>b3&&fitH());D.fonts&&D.fonts.ready.then(()=>b3&&fitH());
window.__f2={id,place,mount};
}catch(e){window.__f2Err=e;console.error(e)}})()})();
