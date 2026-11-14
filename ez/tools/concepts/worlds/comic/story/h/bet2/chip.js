/* bet2 shared: the 2K chip with live rolling digits in its dies, the section ground, the sockets closer */
(function(){
const p2=BT.p2,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* the four dies' glass, measured on chip2k-sd.jpg (2048x1152) */
const Q=[[[650,494],[781,471],[858,610],[719,631]],[[842,465],[981,440],[1064,579],[918,602]],[[1043,431],[1172,410],[1262,547],[1121,568]],[[1229,403],[1358,383],[1453,514],[1316,535]]];
const lq=q=>{const [tl,tr,br,bl]=q,m=(p,o,t)=>[p[0]+(p[0]-o[0])*t,p[1]+(p[1]-o[1])*t];return [m(bl,tl,.13),m(br,tr,.13),m(br,tr,.36),m(bl,tl,.36)]};
const K=['d','h','m','x'],LAB=['days','hrs','min','sec'];
function chip(){const die=i=>`<div class="c2-die" data-q='${JSON.stringify(Q[i])}'><span class="c2-glow"></span><b class="c2-num" data-r="${K[i]}" aria-hidden="true"></b><i class="c2-glass"></i></div><div class="c2-lab" data-q='${JSON.stringify(lq(Q[i]))}'>${LAB[i]}</div>`;
 return `<div class="bt-shd c2-fr"><div class="bt-ink"><div class="bt-art c2-art" role="timer" aria-live="off"><span class="c2-sr" data-sr></span>${[0,1,2,3].map(die).join('')}</div></div></div>`}
/* reel digits: each character its own slot; a changed slot rolls the old digit down and the new one in from above (counting down) */
function setReel(el,str){const slots=[...el.children];
 while(slots.length<str.length){const s=document.createElement('span');s.className='c2-sl';s.innerHTML='<i></i>';el.prepend(s);slots.unshift(s)}
 while(slots.length>str.length){slots.shift().remove()}
 [...str].forEach((ch,i)=>{const s=slots[i],cur=s.lastElementChild;if(cur.textContent===ch)return;
  if(!cur.textContent||RM){cur.textContent=ch;return}
  const n=document.createElement('i');n.textContent=ch;s.appendChild(n);
  const o={duration:420,easing:'cubic-bezier(.3,.9,.3,1.15)',fill:'forwards'};
  cur.animate([{transform:'translateY(0)',opacity:1,filter:'blur(0)'},{transform:'translateY(78%)',opacity:0,filter:'blur(1.5px)'}],{...o,easing:'cubic-bezier(.5,0,.8,.4)',duration:300}).onfinish=()=>cur.remove();
  n.animate([{transform:'translateY(-80%)',opacity:0,filter:'blur(1.5px)'},{transform:'translateY(0)',opacity:1,filter:'blur(0)'}],o);
  const die=el.closest('.c2-die');die&&die.animate([{'--fl':1},{'--fl':0}],{duration:520,easing:'ease-out'})})}
function tick(root){const set=()=>{if(window.__freeze)return;const L=BT.left();if(!L)return;const v={d:String(L.d).padStart(2,'0'),h:p2(L.h),m:p2(L.m),x:p2(L.x)};
  root.querySelectorAll('[data-r]').forEach(e=>setReel(e,v[e.dataset.r]));
  const sr=root.querySelector('[data-sr]');if(sr&&L.x%30===0||sr&&!sr.textContent)sr.textContent=`${L.d} days, ${L.h} hours, ${L.m} minutes until the NVIDIA bet`;};
 set();const loop=()=>{set();setTimeout(loop,1000-(Date.now()%1000)+5)};setTimeout(loop,1000-(Date.now()%1000)+5)}
function crop(){return innerWidth<1000?[600,330,890,410]:[260,250,1520,680]}
/* the sockets: bets still to come, drawn as empty chip footprints on the board */
function sock(n,lab){const pads=(x0,y0,dx,dy,k)=>Array.from({length:k},(_,i)=>`<rect x="${x0+dx*i}" y="${y0+dy*i}" width="${dx?4:9}" height="${dx?9:4}" rx="1"/>`).join('');
 return `<svg class="c2-sk c2-sk${n}" viewBox="0 0 110 96" aria-hidden="true"><path class="o" d="M9 13 L101 9 L104 85 L7 88Z"/><path class="i" d="M20 22 L90 19.5 L92 76 L19 78Z"/>
 <g class="p">${pads(24,3.5,9,0,8)}${pads(23,87,9,0,8)}${pads(-1,24,0,9,7)}${pads(103,22,0,9,7)}</g><path class="c" d="M20 22 l9 -.4 l-9 9z"/><text x="55" y="56">${lab}</text></svg>`}
function close(){return `<div class="c2-close"><div class="c2-socks">${sock(1,'#2')}${sock(2,'#3')}${sock(3,'#4')}</div>
 <p class="c2-cl"><span>NVIDIA is the first bet, not the last.</span> <b>Season 2 brings more.</b></p></div>`}
function build(sec,D,stakes,cls){
 sec.insertAdjacentHTML('beforeend',`<div class="bt-wrap b2 ${cls||''}"><div class="b2-gr" aria-hidden="true"><i></i></div>
  ${BT.head(D,'It goes on at the close, '+D.day+'.')}
  ${chip()}
  <div class="b2-st">${stakes}</div>
  ${close()}</div>`);
 BT.art(sec.querySelector('.c2-art'),'chip2k-sd.jpg',2048,1152,crop);tick(sec)}
window.BT2={build,Q};
})();
(function(){
/* a gutter caption: lettered on the board between panels, a drawn gold trace drops from it into the panel below */
BT2.gut=(html,cls)=>`<div class="g2 ${cls||''}"><p>${html}</p><svg class="g2-tr" viewBox="0 0 40 30" preserveAspectRatio="none" aria-hidden="true"><path d="M6 0 V12 L18 22 V30"/><circle cx="6" cy="2.5" r="2.6"/></svg></div>`;
BT2.panel=(cls,inner)=>`<div class="bt-shd p2 ${cls}"><div class="bt-ink"><div class="bt-art p2-art">${inner||''}</div></div></div>`;
BT2.lead=(D)=>`${BT.face(D.lead,'g2-face')}<b class="g2-ld">${D.leadName}</b>`;
})();
