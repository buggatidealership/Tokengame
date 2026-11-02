/* Round H36 `cardback`: the back of a graded round card as a painted object (Hedra plates in img/), the live text printed into its
   blank fields. Mounted over X2+'s certificate inside the opened round (#x2pRm .face.back .fin); the certificate stays underneath,
   hidden, and its own flip button is proxied. Every word and number from ROUNDS and the card's own grade (its aria-label). */
(function(){
const D=document,IMG='tools/concepts/worlds/comic/story/h/cardback/img/';
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},MC={GROK:'#e4e0d6',CLAUDE:'#ef8a55',GPT:'#b18cff',KIMI:'#58b7ff'},CC={GPT:'US',CLAUDE:'US',GROK:'US',KIMI:'CN'};
const MO=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],md=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?MO[+m[1]]+' '+(+m[2]):'?'};
function star(cx,cy,r,rot=0){let p='';for(let i=0;i<10;i++){const a=rot-Math.PI/2+i*Math.PI/5,rr=i%2?r*.4:r;p+=(i?'L':'M')+(cx+Math.cos(a)*rr).toFixed(2)+' '+(cy+Math.sin(a)*rr).toFixed(2)}return p+'Z'}
function flag(c){let s='<svg class="cb-fl" viewBox="0 0 30 20" preserveAspectRatio="none" aria-hidden="true">';
  if(c==='US'){s+='<rect width="30" height="20" fill="#f4efe2"/>';for(let i=0;i<7;i++)s+=`<rect y="${i*40/13}" width="30" height="${20/13}" fill="#b22234"/>`;s+='<rect width="13" height="10.77" fill="#3c3b6e"/>';for(let r=0;r<5;r++)for(let k=0;k<(r%2?4:5);k++)s+=`<path d="${star(1.4+k*2.55+(r%2)*1.27,1.3+r*2.05,.62)}" fill="#fff"/>`}
  else{s+='<rect width="30" height="20" fill="#de2910"/>'+`<path d="${star(5,5,3)}" fill="#ffde00"/>`;[[10,2,.9],[12,4,.5],[12,7,.1],[10,9,-.3]].forEach(([a,b,r])=>s+=`<path d="${star(a,b,1,r)}" fill="#ffde00"/>`)}
  return s+'</svg>'}
function mark(m){let h='';try{h=(logo(m).match(/<svg[\s\S]*<\/svg>/)||[''])[0]}catch(e){}return `<span class="cb-mk" style="--mc:${MC[m]}" aria-hidden="true">${h}</span>`}
const crown='<svg class="cb-cr" viewBox="0 0 40 26" aria-hidden="true"><path d="M3.5 22.5 L2.2 6.8 L11.4 14 L19.6 2.3 L28.4 13.6 L37.6 6 L36.2 22.8 C25 24.4 14 24.2 3.5 22.5Z" fill="currentColor"/></svg>';
/* one round as the page knows it */
function data(n){const g=ROUNDS.find(r=>r.n===n);const W=g.win?g.win.split(' & '):[];const up=g.a>0;
  let rows=g.calls.map(([m,c,off])=>{const u=!/DOWN/.test(c),v=parseFloat(String(c).replace(/[^\d.]/g,''));return {m,up:u,v,off:+off,ok:u===up,win:W.includes(m)}});
  rows=rows.filter(r=>r.ok).sort((a,b)=>a.off-b.off).concat(rows.filter(r=>!r.ok).sort((a,b)=>a.off-b.off));
  const al=(D.querySelector('#x2pRm .card')||{}).getAttribute?D.querySelector('#x2pRm .card').getAttribute('aria-label'):'';
  const G=(al.match(/Grade: (\w+) ([\d.]+) of 10/)||[]);
  return {n,co:g.co,t:g.ticker,a:g.a,up,rows,W,filed:md(g.called),graded:md(g.resolves),ds:G[1]||'',gr:G[2]||'',right:rows.filter(r=>r.ok).length,total:rows.length}}
const pct=v=>(Math.round(v*100)/100)+'%';
function trade(r){return `<span class="cb-tr"><i>${r.up?'Long':'Short'}</i> <b>${pct(r.v)}</b></span>`}
function stamp(r,i){return `<span class="cb-pf ${r.ok?'p':'f'}" style="--rot:${[-6,-3,-7,-4][i%4]}deg;filter:url(#x2pcw${i%4})">${r.ok?'PASS':'FAIL'}</span>`}
function off(r){return `<small class="cb-off">${r.ok?pct(r.off)+' off':'wrong way'}</small>`}
function winLine(d){if(!d.W.length)return `<span class="cb-wn none"><em>No winner</em> <small>${d.right?'':'all '+d.total+' wrong way'}</small></span>`;
  return `<span class="cb-wn">${crown}<em>${d.W.length>1?'Winners':'Winner'}</em> <b>${d.W.map(m=>NM[m]).join(' & ')}</b></span>`}
function move(d){return `<b class="cb-mv"><span aria-hidden="true">${d.a<0?'−':'+'}</span><span class="sr">${d.a<0?'Down ':'Up '}</span>${Math.abs(d.a).toFixed(2)}%</b>`}
const box=b=>`left:${b[0]}%;top:${b[1]}%;width:${b[2]}%;height:${b[3]}%`;
/* each take: its painted plate, the measured fields (percent of the plate), and the AI cells' layout */
const T={
 a:{img:'a3.jpg',name:'The note',title:[14,6.3,72,10.4],ai:[[13,23.2,30,6.8],[57,23.2,30,6.8],[13,34.8,30,7.4],[57,34.8,30,7.4]],cell:'cart',mkt:[25,51.5,50,16],dates:[[11.5,75.6,29,6.6],[11.5,85.6,29,6.6]],seal:[77.5,84.5],sr:10.4},
 b:{img:'b2.jpg',name:'The share',title:[14.5,9,71,9],rows:[26.4,36.6,46.9,57],circ:19.6,cr:4.6,bar:[27.5,44],chk:[74,12.5],mkt:[15,65.2,70,8.3],dates:[[13.8,80.2,19.5,8.6],[37.6,80.2,19.5,8.6]],seal:[73.3,84.4],sr:8.6,cell:'row'},
 c:{img:'c3.jpg',name:'The die',title:[11.5,3.6,78,9.6],ai:[[14,23,29,19.6],[57,23,29,19.6],[14,50.2,29,19.8],[57,50.2,29,19.8]],cell:'die',mkt:[11,76.4,78,5.6],dates:[[9.5,87.8,13.8,8.6],[30,87.8,13.8,8.6]],seal:[80.3,90.75],sr:6.6},
 d:{img:'d1.jpg',name:'The plate',title:[11,8.8,78,7.6],rows:[24.4,34.1,43.6,53.1],circ:13,cr:3.5,bar:[19.5,55],chk:[77,12.6],mkt:[11,61.4,78,10.2],dates:[[9.8,81.3,21.6,7.6],[37.3,81.3,21.6,7.6]],seal:[76.3,85],sr:9.2,cell:'row'}};
function cellHtml(k,r,i){const nm=`<span class="cb-nm" style="--mc:${MC[r.m]}">${NM[r.m]}</span>${flag(CC[r.m])}`;
  if(k==='cart')return `<span class="cb-l1"><b class="cb-rk">${i+1}</b>${mark(r.m)}${nm}${r.win?`<span class="cb-wt">${crown}</span>`:''}</span><span class="cb-l2">${trade(r)}${stamp(r,i)}</span>`;
  if(k==='die')return `<span class="cb-dh"><b class="cb-rk">${i+1}</b>${mark(r.m)}${stamp(r,i)}</span><span class="cb-l1">${r.win?`<span class="cb-wt">${crown}</span>`:''}${nm}</span><span class="cb-l2">${trade(r)}</span>${off(r)}`;
  return ''}
function build(k,n){const t=T[k],d=data(n);let h=`<div class="cb-p" style="--img:url(${IMG+t.img})"><i class="cb-bg"></i>`;
  h+=`<div class="cb-f cb-ti" style="${box(t.title)}"><small>Season 1 · Round ${d.n}</small><b class="cb-co">${d.co} <span class="cb-tk">(${d.t})</span></b></div>`;
  if(t.ai)d.rows.forEach((r,i)=>{h+=`<div class="cb-f cb-ai ${t.cell} ${r.ok?'ok':'no'} ${r.win?'win':''}" style="${box(t.ai[i])}">${cellHtml(t.cell,r,i)}${r.win&&t.cell==='none'?`<span class="cb-wt">${crown}</span>`:''}</div>`});
  if(t.rows)d.rows.forEach((r,i)=>{const y=t.rows[i];
    h+=`<div class="cb-f cb-cc" style="${box([t.circ-t.cr,y-t.cr*.75,2*t.cr,2*t.cr*.75])}">${mark(r.m)}</div>`;
    h+=`<div class="cb-f cb-ai row ${r.ok?'ok':'no'} ${r.win?'win':''}" style="${box([t.bar[0],y-3.3,t.bar[1],6.6])}"><span class="cb-l1"><b class="cb-rk">${i+1}</b><span class="cb-nm" style="--mc:${MC[r.m]}">${NM[r.m]}</span>${flag(CC[r.m])}${r.win?`<span class="cb-wt">${crown}</span>`:''}</span><span class="cb-l2">${trade(r)}${off(r)}</span></div>`;
    h+=`<div class="cb-f cb-ck" style="${box([t.chk[0],y-2.6,t.chk[1],5.2])}">${stamp(r,i)}</div>`});
  h+=`<div class="cb-f cb-mk2" style="${box(t.mkt)}"><span class="cb-ml"><small>${d.co} at the close</small>${move(d)}</span>${winLine(d)}</div>`;
  h+=`<div class="cb-f cb-dt" style="${box(t.dates[0])}"><small>Trades filed</small><b>${d.filed}</b></div><div class="cb-f cb-dt" style="${box(t.dates[1])}"><small>Graded on</small><b>${d.graded}</b></div>`;
  h+=`<div class="cb-f cb-sl" style="left:${t.seal[0]-t.sr}%;top:${t.seal[1]-t.sr*.75}%;width:${2*t.sr}%;height:${2*t.sr*.75}%"><small>Grade</small><b>${d.gr}</b><em>${d.ds}</em></div>`;
  h+='</div><button type="button" class="cb-flip"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8a5 5 0 1 1-1.6-3.7M13 2.5v3h-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>See the film</button>';
  return h}
/* shrink a line until it fits its field (one line), never below a floor */
function fit(root){root.querySelectorAll('.cb-ti .cb-co,.cb-l1,.cb-l2,.cb-ml,.cb-wn,.cb-dt b').forEach(e=>{e.style.zoom='';const z=e.clientWidth/e.scrollWidth;if(z<.999)e.style.zoom=Math.max(.5,z*.98).toFixed(3)})}
window.CB={T,show(k,n){const fin=D.querySelector('#x2pRm .face.back .fin');if(!fin)throw new Error('no back');const old=fin.querySelector('.cb');if(old)old.remove();
  if(window.__x2pXdefs)window.__x2pXdefs();
  const o=D.createElement('div');o.className='cb cb-'+k;o.innerHTML=build(k,n);fin.appendChild(o);fin.classList.add('cb-on');
  o.querySelector('.cb-flip').onclick=e=>{e.stopPropagation();const b=fin.querySelector('.xc [data-flip]')||D.querySelector('#x2pRm .card [data-flip]');b&&b.click()};
  const f=()=>fit(o);f();D.fonts&&D.fonts.ready.then(f);return o}};
})();
