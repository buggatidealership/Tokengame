/* Round H11, area sol4: "Smart or lucky?" in three beats, Silver Age flat print, bright.
   Beat 1, the establishing picture (four ideas: e1 the robot whose nose grows, e2 the confident mouth over a blank page, e3 the coin
   spinning behind a mask, e4 the coin-op oracle), the title in the Overview's one heading face breaking its bottom border and one
   lettered caption with live counts.
   Beat 2, the instrument: the lie detector, redrawn in the flat print (i1 on the desk with onlookers' hands, chalk tallies;
   i2 in the exchange room among traders, the chart on the board behind the machine), drawn by sol3's renderer (S3World: hit rate
   round by round, (right + 1) / (calls + 2), the switch to P&L Season / 7 days / 24h, the small W-L / P&L table under the chart).
   Beat 3, why it matters: two panels, the same microphone (the AI's voice) saying two calls of the same size, one right, one wrong
   (a real pair from ROUNDS, the hit-rate leader's), then one line.
   Every number from ROUNDS and __x2pPnl (via PN / S3). Classes s4-. */
(function(){
const NM=PN.NM,RS=PN.RS,S3=window.S3;const esc=S3.esc;
const IMG=window.S4IMG;
const S4=window.S4={};
/* counts */
let calls=0;RS.forEach(r=>calls+=(r.calls||[]).length);S4.n=RS.length;S4.calls=calls;
/* beat 3: the hit-rate leader's right call and wrong call of the closest size (same direction first, then the bigger miss) */
S4.pair=(m)=>{m=m||S3.hit.rank[0];const key=m;const cs=[];
  RS.forEach(r=>(r.calls||[]).forEach(c=>{if(c[0]!==key)return;const [d,mg]=c[1].split(' '),v=parseFloat(mg),ok=(d==='UP')===(r.a>0);cs.push({r,d,v,ok})}));
  const R=cs.filter(c=>c.ok),W=cs.filter(c=>!c.ok);let best=null;
  R.forEach(a=>W.forEach(b=>{const sc=Math.abs(a.v-b.v)*10+(a.d===b.d?0:3)-Math.abs(b.r.a)*.01-a.r.n*.0001;if(!best||sc<best.sc)best={sc,right:a,wrong:b}}));
  return best&&Object.assign(best,{m})};
const say=c=>`${c.r.co} ${c.d==='UP'?'rises':'falls'} ${c.v}%.`;
const did=c=>`${c.r.a>0?'Rose':'Fell'} ${Math.abs(c.r.a).toFixed(2).replace(/0$/,'')}%.`;
/* geometry of the painted blanks, in painting px (1024 square), measured on the grid (sol4/REPORT.md) */
const MIC={a:{src:'w1-a.jpg',bal:[190,42,830,282],cap:[75,885,955,975]},b:{src:'w1-b.jpg',bal:[290,58,890,300],cap:[100,880,975,970]}};
const pct=(q,i,W)=>(q[i]/W*100).toFixed(2)+'%';
const box=(q,cls,inner)=>`<div class="${cls}" style="left:${pct(q,0,1024)};top:${pct(q,1,1024)};width:${((q[2]-q[0])/1024*100).toFixed(2)}%;height:${((q[3]-q[1])/1024*100).toFixed(2)}%">${inner}</div>`;
const panel=(k,c,ok)=>{const P=MIC[k];return `<figure class="s4-mic s4-mic-${k}"><img src="${IMG+P.src}" alt="" decoding="async">
  ${box(P.bal,'s4-bal',`<small>${esc(NM[S4.P.m])}, round ${c.r.n}:</small><b>“${esc(say(c))}”</b>`)}
  ${box(P.cap,'s4-capb',`<span>${esc(did(c))}</span><b class="${ok?'s4-ok':'s4-no'}">${ok?'Right':'Wrong'}</b>`)}</figure>`};
S4.est={e1:'e1-nose',e2:'e2-mouth',e3:'e3-mask',e4:'e4-oracle',eh:'e3-mask-hd'};
S4.html=(est)=>{const p=S4.P=S4.pair();const e=S4.est[est];
 return `<div class="s4-b1"><figure class="s4-est"><picture><source media="(min-width:900px)" srcset="${IMG+e}-16x9.jpg"><img src="${IMG+e}-3x4.jpg" alt="" decoding="async"></picture></figure>
  <h2 class="s3-h s4-h"><span class="s3-w">Smart or</span> <span class="s3-w s3-w2">lucky?</span></h2>
  <p class="s4-cap">Four AIs, ${calls} graded calls. A coin flip gets 50%.</p></div>
 <div class="s4-b2"></div>
 <div class="s4-b3">${p?`<p class="s4-cap s4-cap3">Same AI. Same voice.</p>
  <div class="s4-strip">${panel('a',p.right,true)}${panel('b',p.wrong,false)}</div>
  <p class="s4-cap s4-cap3b">Only the record shows which call was the guess.</p>`:''}</div>`};
/* beat 2 worlds, on sol3's renderer (S3World) and its lie detector material */
const chalk=Object.assign({},polyM,{font:'"Shantell Sans",system-ui',txt:'#f4f1e6',dim:'#c9c4b6',grid:'#3d4a66',gridDash:'2 4',tabHead:''});
S4.worlds={
 i1:()=>S3World({id:'i1',kind:'top',img:IMG,mat:polyM,alwaysTable:1,
   phone:{src:'i1-desk-3x4.jpg',iw:768,ih:1024,crop:[100,236,768,792],surf:[140,272,452,752],pen:458,ctl:'header',fk:.041,ins:.02},
   wide:{src:'i1-desk-16x9.jpg',iw:1280,ih:720,crop:[0,0,1280,720],maxW:1180,surf:[350,210,800,548],pen:806,ctl:'header',fk:.036,fmax:20,ins:.015}}),
 i2:()=>S3World({id:'i2',kind:'top',img:IMG,mat:chalk,
   phone:{src:'i2-floor-3x4.jpg',iw:768,ih:1024,crop:[100,0,700,640],surf:[184,56,620,400],ctl:'header',fk:.05,ins:.02},
   wide:{src:'i2-floor-16x9.jpg',iw:1280,ih:720,crop:[0,0,1280,720],maxW:1180,surf:[380,40,900,332],ctl:'header',fk:.034,ins:.015}}),
 /* the pick painted at 2K (high) */
 ih:()=>S3World({id:'ih',kind:'top',img:IMG,mat:chalk,
   phone:{src:'i2-floor-hd-3x4.jpg',iw:1536,ih:2048,crop:[200,0,1400,1280],surf:[368,116,1240,800],ctl:'header',fk:.05,ins:.02},
   wide:{src:'i2-floor-hd-16x9.jpg',iw:2048,ih:1152,crop:[0,0,2048,1152],maxW:1180,surf:[608,64,1440,532],ctl:'header',fk:.034,ins:.015}})};
window.S4mount=function(est,inst){const sp=document.querySelector('.wc-splash');if(!sp)return;document.documentElement.classList.add('pn-on','s3-on','s4-on');
  sp.setAttribute('aria-label','Smart or lucky?');sp.querySelectorAll(':scope>.hs-wrap').forEach(e=>e.style.setProperty('display','none','important'));
  sp.insertAdjacentHTML('beforeend',`<div class="s4 s3">${S4.html(est)}</div>`);sp.querySelector(':scope>.s4').style.setProperty('display','block','important');const W=S4.worlds[inst]();
  const b2=sp.querySelector('.s4-b2');b2.insertAdjacentHTML('beforeend',`<div class="pn s3-root">${W.html()}</div>`);const root=b2.querySelector('.s3-root');root.style.setProperty('display','block','important');
  const set=(wid,anim)=>{root.dataset.win=wid;W.draw(root,wid,anim)};
  root.addEventListener('click',e=>{const b=e.target.closest('[data-win]');if(b){root.dataset.used='1';set(b.dataset.win,true)}});
  set(window.S3_WIN||'hit',false);let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;set(root.dataset.win,false)}});
  window.S3set=set};
})();
