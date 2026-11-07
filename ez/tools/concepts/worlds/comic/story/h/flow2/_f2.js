/* flow2 (round H27) common: laid over the built v46-live-x2plus.html after x2p_top.js has built section.t4.
   window.__F2O = 'today' (headline, How a round works, the whole game, Meet the models; as live)
                | 'friend' (headline, Meet the models, How a round works, the whole game).
   The four frames stay inside section.t4 (x2p_top.js's place() lays their surfaces out from there), so a take only moves them.
   Exposes window.F2 for the take files; a take calls F2.done() at its end. Data: ROUNDS, MODELS, __x2pPnl (nothing typed). */
(function(){
const D=document;
const sec=D.querySelector('section.t4'),b1=sec.querySelector('.t4-b1'),b2=sec.querySelector('.t4-b2'),b3=sec.querySelector('.t4-b3'),frs=b2.querySelector('.t4-frs');
const KEYS=['call','close','ledger','board'];
const FR={};KEYS.forEach(k=>FR[k]=frs.querySelector('.q4-'+k));
/* the trade's own words (BRIEF-H Round H27: keep them unless a take shows a better line) */
const LINES={call:'Each AI goes long or short before the report.',close:'The next market close ends every trade.',ledger:'Every trade is written to the ledger.',board:'The ledger ranks the board.'};
const VERB={call:'Call',close:'Close',ledger:'Ledger',board:'Board'};
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* the example round: the same rule as x2p_top.js (the newest graded Mag 7 round split two right, two wrong, one winner) */
const R=window.ROUNDS||[],G=R.filter(r=>r.a!=null&&r.out);
const m7=n=>!!((window.RMETA||{})[n]||{}).mag7;
const ok=(c,a)=>/^UP/i.test(c)===(a>0);
const EX=[...G].reverse().find(r=>m7(r.n)&&r.calls.length===4&&r.calls.filter(([m,c])=>ok(c,r.a)).length===2&&r.win&&!/,|&| /.test(r.win))||G[G.length-1];
const calls=EX.calls.map(([m,c])=>{const up=/^UP/i.test(c),v=(c.match(/[\d.]+/)||[''])[0];return {m,up,v,ok:up===(EX.a>0)}});
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*/).filter(m=>NM[m]);
const A=window.__x2pPnl().A,rank=Object.keys(A).sort((a,b)=>A[b].bal-A[a].bal);
const $=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const mn=s=>String(s).replace(/^-/,'−').replace(/^(\d)/,'+$1');
const MD=window.MODELS||{};
const mark=(m,cls)=>{const M=MD[m]||{},c=(/^#(0|1)/.test(M.c||'')||m==='GPT')?'#f8f0d9':M.c;return `<svg class="${cls||'f2-mk'}" viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d||''}" fill="${c}"/></svg>`};
/* the instance facts of each step, computed (used by takes that put the round's facts in words) */
const W=wins(EX);
const FACT={
 call:calls.map(c=>({m:c.m,t:(c.up?'+':'−')+c.v+'%',up:c.up})),
 close:{co:EX.co,ticker:EX.ticker,mv:mn(EX.out),up:EX.a>0,win:W},
 ledger:{n:EX.n,co:EX.co,right:calls.filter(c=>c.ok).map(c=>c.m),wrong:calls.filter(c=>!c.ok).map(c=>c.m)},
 board:rank.map((m,i)=>({m,i:i+1,p:$(A[m].bal-100000)}))
};
function order(){if(window.__F2O!=='friend')return;
  const ch=D.querySelector('section.ch');if(!ch)return;
  /* Meet the models moves up to right after the headline beat; How a round works and the film follow it in a second section.t4 (same styles).
     A clone of the torn paper (drawn already) leads into How a round works. Frame surfaces are re-laid by placePics() below, not x2p_top's place(). */
  const tear=b1.nextElementSibling&&b1.nextElementSibling.classList.contains('t5-bg')?b1.nextElementSibling:null;
  const s2=D.createElement('section');s2.className='t4 t5 t5-s3 t5-g2 f2-t4b';
  if(tear){const t2=tear.cloneNode(true);t2.classList.add('f2-tear2');s2.appendChild(t2)}
  let n=b2;while(n){const nx=n.nextElementSibling;s2.appendChild(n);n=nx}
  const stub=D.createElement('p');stub.className='t4-ln f2-stub';stub.hidden=true;sec.appendChild(stub);/* x2p_top's own place(sec) reads a .t4-ln in sec */
  const main=sec.parentElement,grid=getComputedStyle(main).display==='grid';
  if(grid){/* desktop: main is a grid with explicit rows from 3 on (record = row 3); the moved sections take rows 1 to 3 and the rest move down one */
    [...main.children].forEach(e=>{const g=parseInt(getComputedStyle(e).gridRowStart);if(g>=3)e.style.setProperty('grid-row',String(g+1),'important')})}
  sec.after(ch);ch.after(s2);
  if(grid){[[sec,'1'],[ch,'2'],[s2,'3']].forEach(([e,r])=>{e.style.setProperty('grid-row',r,'important');e.style.setProperty('grid-column','1 / -1','important')})}sec.classList.add('f2-friend');s2.classList.add('f2-friend')}
/* x2p_top.js's surface placement (MEM rule kept: a surface is laid out at its on-screen size times the pixel ratio, at most 3) */
function m3d(w,h,q){const s=[[0,0],[w,0],[w,h],[0,h]],A=[],B=[];
  for(let i=0;i<4;i++){const[x,y]=s[i],[u,v]=q[i];A.push([x,y,1,0,0,0,-u*x,-u*y]);B.push(u);A.push([0,0,0,x,y,1,-v*x,-v*y]);B.push(v)}
  const n=8;for(let c=0;c<n;c++){let p=c;for(let r=c+1;r<n;r++)if(Math.abs(A[r][c])>Math.abs(A[p][c]))p=r;[A[c],A[p]]=[A[p],A[c]];[B[c],B[p]]=[B[p],B[c]];
    for(let r=0;r<n;r++)if(r!==c){const f=A[r][c]/A[c][c];for(let k=c;k<n;k++)A[r][k]-=f*A[c][k];B[r]-=f*B[c]}}
  const X=B.map((b,i)=>b/A[i][i]);const[a,b,c,d,e,f,g,hh]=X;return `matrix3d(${a},${d},0,${g},${b},${e},0,${hh},0,0,1,0,${c},${f},0,1)`}
function placePics(root){root.querySelectorAll('.t4-pic').forEach(p=>{if(!p.clientWidth)return;const k=p.clientWidth/+p.dataset.iw,cx=+p.dataset.cx,cy=+p.dataset.cy;
  p.querySelectorAll('.t4-sf').forEach(s=>{const q=JSON.parse(s.dataset.q).map(([x,y])=>[(x-cx)*k,(y-cy)*k]),R=Math.min(3,Math.max(1,window.devicePixelRatio||1)),w=+s.dataset.bw*k*R,h=+s.dataset.bh*k*R;
    s.style.width=w+'px';s.style.height=h+'px';s.style.setProperty('--r',R);s.style.transform=m3d(w,h,q)});
  p.querySelectorAll('.t4-at').forEach(e=>{const[x,y,w,h]=e.dataset.r.split(',').map(Number);Object.assign(e.style,{left:(x-cx)*k+'px',top:(y-cy)*k+'px',width:w*k+'px',height:h*k+'px'})})})}
function place(){try{if(window.__F2O!=='friend'&&window.__t4)window.__t4.place()}catch(e){window.__f2err=String(e)}try{D.querySelectorAll('.f2-pp').forEach(placePics);placePics(b2)}catch(e){window.__f2err=String(e)}if(window.__f2placeTake)try{window.__f2placeTake()}catch(e){window.__f2err=String(e)}}
window.__f2place=place;
let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;requestAnimationFrame(place)}});
window.F2={placePics,D,sec,b1,b2,b3,frs,KEYS,FR,LINES,VERB,NM,esc,EX,calls,FACT,rank,A,$,mn,mark,
  done(){try{order()}catch(e){window.__f2err=String(e)}requestAnimationFrame(()=>{place();setTimeout(()=>{place();window.__f2done=true},120)})}};
})();
/* the step sentences with their key words coloured: long green, short red, the close / ledger / board in gold */
window.F2.sayHTML=function(k){const L=F2.LINES[k];return F2.esc(L).replace(/\blong\b/,'<span class="up">long</span>').replace(/\bshort\b/,'<span class="dn">short</span>')
  .replace(/(market close)/,'<span class="gd">$1</span>').replace(/(the ledger)\.$/,'<span class="gd">$1</span>.').replace(/(the board)\.$/,'<span class="gd">$1</span>.')};
