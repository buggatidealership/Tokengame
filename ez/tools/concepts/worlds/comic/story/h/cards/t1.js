/* T1 Doors: each card is its own dressing-room door from the backstage opener (Hedra seedream), open; the founder stands in the doorway.
   Rank = the number painted on the door (#1 a gold dressing-room star); name = gaffer tape with marker; role = a door hanger on the knob;
   P&L, right way, best call and last five chalked on the wet concrete in front of the door. */
(function(){const {d,P,INK,ROLE,money,pct,mark,flag,port,sr,mount,brush}=HC;const I='tools/concepts/worlds/comic/story/h/cards/img/';
const DOOR={CLAUDE:{img:'door-claude-2k',c:[23,95,10,86],way:[45.3,20.6,73.2,85.5],leaf:[27,18,45,88],kn:[42.6,57]},
 GPT:{img:'door-gpt-2k',c:[23,95,10,86],way:[45.4,14.8,73.4,85.5],leaf:[20,13,44,89],kn:[43.6,54.5]},
 GROK:{img:'door-grok-2k',c:[20,92,10,86],way:[41.8,15,70.1,84.5],leaf:[22.5,13,41.6,90],kn:[26,54.5]},
 KIMI:{img:'door-kimi-2k',c:[22,94,10,86],way:[54.8,24.4,73.6,84.5],leaf:[28,25,52.5,87],kn:[52.6,56]}};
const {sec,g}=mount('hc-t1');
if(!document.getElementById('hcChalk'))document.body.insertAdjacentHTML('beforeend',`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="hcChalk" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.55"/><feComposite in="SourceGraphic" operator="in" result="c"/><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="1" seed="9" result="w"/><feDisplacementMap in="c" in2="w" scale="1.6"/></filter></svg>`);
const pos=(D,[x0,y0,x1,y1])=>{const [X0,X1,Y0,Y1]=D.c;return `left:${((x0-X0)/(X1-X0)*100).toFixed(2)}%;top:${((y0-Y0)/(Y1-Y0)*100).toFixed(2)}%;width:${((x1-x0)/(X1-X0)*100).toFixed(2)}%;height:${((y1-y0)/(Y1-Y0)*100).toFixed(2)}%`};
const pt=(D,[x,y])=>{const [X0,X1,Y0,Y1]=D.c;return `left:${((x-X0)/(X1-X0)*100).toFixed(2)}%;top:${((y-Y0)/(Y1-Y0)*100).toFixed(2)}%`};
function star(n,gold){const R=30,r=13;let q=[];for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5+(k%3?.03:-.02),rr=(k%2?r:R)*(1+(k*7%3-1)*.025);q.push((34+rr*Math.cos(a)).toFixed(1)+' '+(34+rr*Math.sin(a)).toFixed(1))}
  return gold?`<svg class="t1-star" viewBox="0 0 68 68" aria-hidden="true"><defs><linearGradient id="t1g" x1="0" y1="0" x2=".7" y2="1"><stop offset="0" stop-color="#fff3a0"/><stop offset=".45" stop-color="#ffc21a"/><stop offset="1" stop-color="#b86a00"/></linearGradient></defs><path d="M${q.join(' L')}Z" fill="${INK}" transform="translate(2.5 3)"/><path d="M${q.join(' L')}Z" fill="url(#t1g)" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M${q.slice(9).concat(q.slice(0,3)).join(' L')}" fill="none" stroke="#fffbe0" stroke-width="1.4" stroke-linecap="round" opacity=".8" transform="translate(-1 1.5) scale(.96)"/><text x="34" y="44" text-anchor="middle" font-family="Anton" font-size="27" fill="${INK}">${n}</text></svg>`
  :`<svg class="t1-num" viewBox="0 0 40 52" aria-hidden="true"><text x="20" y="44" text-anchor="middle" font-family="Anton" font-size="46" fill="#f4ead2" stroke="${INK}" stroke-width="3" paint-order="stroke" opacity=".92">${n}</text></svg>`}
function hanger(t,i){const w=96,h=40;const pth=`M8 4 Q48 1 90 5 L92 34 Q50 38 6 35 Z`;
  return `<div class="t1-hang t1-h${i}"><svg viewBox="0 0 ${w} ${h+16}" aria-hidden="true"><path d="M40 16 Q48 2 56 16" fill="none" stroke="${INK}" stroke-width="2.4"/><g transform="translate(0 14)"><path d="${pth}" fill="${INK}" transform="translate(2 2.5)"/><path d="${pth}" fill="${i===0?'#ffd21f':i===3?'#e3342b':'#f4ead2'}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/><path d="M12 9 Q48 6 86 10" fill="none" stroke="#fff" stroke-width="1.2" opacity=".55"/></g></svg><b>${P.esc(t)}</b></div>`}
d.models.forEach((x,i)=>{const D=DOOR[x.m],[X0,X1,Y0,Y1]=D.c,b=x.best;
  const c=document.createElement('article');c.className='hc-card t1-c'+(i===0?' t1-lead':'');c.dataset.m=x.m;
  c.style.setProperty('--ar',((X1-X0)*1080/((Y1-Y0)*1620)).toFixed(4));
  c.style.setProperty('--bg',`url(${I}${D.img}.jpg)`);c.style.setProperty('--bs',(100/(X1-X0)*100).toFixed(2)+'%');
  c.style.setProperty('--bp',`${(X0/(100-(X1-X0))*100).toFixed(2)}% ${(Y0/(100-(Y1-Y0))*100).toFixed(2)}%`);
  c.style.setProperty('--fx',`${(X0/(100-(X1-X0))*100).toFixed(2)}%`);
  c.innerHTML=sr(x,i)+`<div class="t1-door" aria-hidden="true">
     <div class="t1-way" style="${pos(D,D.way)}">${port(x.m)}<i class="t1-dark"></i></div>
     <i class="t1-spill" style="${pos(D,[D.way[0]-4,D.way[3]-3,D.way[2]+4,D.way[3]+9])}"></i>
     <div class="t1-leaf" style="${pos(D,D.leaf)}">${star(i+1,i===0)}</div>
     <div class="t1-tape" style="${pt(D,[(D.leaf[0]+D.leaf[2])/2,D.leaf[1]+(D.leaf[3]-D.leaf[1])*.14])}"><span class="t1-nm">${P.esc(x.name)}</span><span class="t1-ver">${P.esc(x.ver)} ${flag(x.flag,20,13)}</span></div>
     <div class="t1-kn${D.kn[0]-D.c[0]<12?' t1-knr':''}" style="${pt(D,D.kn)}">${hanger(ROLE[i],i)}</div>
   </div>
   <div class="t1-floor" aria-hidden="true"><div class="t1-ch">
     <div class="t1-pl"><span class="t1-lb">Current P&amp;L</span><b class="${x.pnl>=0?'t1-up':'t1-dn'}">${money(x.pnl)}</b></div>
     <div class="t1-row"><span><span class="t1-lb">Right way</span><b>${x.W}<small>/${x.tot}</small></b></span>
      <span><span class="t1-lb">Best call</span><b class="${b.v>=0?'t1-up':'t1-dn'}">${money(b.v)}</b><small class="t1-co">${P.esc(b.r.co)} (${P.esc(b.r.ticker)})</small></span></div>
     <div class="t1-l5"><span class="t1-lb">Last 5</span>${x.last5.map(s=>mark(s,22,{w:'#7dffb4',l:'#ff7a70'})).join('')}</div>
     <svg class="t1-ul" viewBox="0 0 200 8" preserveAspectRatio="none">${brush([[4,5],[60,3.4],[130,4.6],[196,3]],3.2,'#f4ead2')}</svg>
   </div></div>`;
  g.appendChild(c)});
})();
