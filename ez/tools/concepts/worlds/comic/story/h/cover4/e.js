/* E · The close, then the ticket: two panels that tell the round as scenes, every word lettered into the place it belongs.
   Panel one: the four founders at the exchange rail hold cardboard signs with their real calls in marker; the bell rings the move;
   each sign is stamped pass or fail, the winner's sign crowned. Panel two: the leader holds the golden ticket (#1 and his name
   printed on it) in front of the GPU chip; the live countdown to Bet #1 sits in the chip's four dies. */
(function(){const C=C4,e=C.esc,ex=C.ex;
 /* sign rects measured in e-close.jpg (fractions): GPT, KIMI, CLAUDE, GROK, left to right */
 const SG={GPT:[.023,.466,.218,.214,-1],KIMI:[.275,.475,.201,.211,0],CLAUDE:[.517,.484,.205,.211,.5],GROK:[.757,.491,.212,.202,1]};
 const crown=`<svg class="e-cr" viewBox="0 0 40 22" aria-hidden="true"><path d="M3 19 L5 5 L13 13 L20 2 L27 13 L35 5 L37 19Z"/></svg>`;
 const sign=m=>{const c=C.call(m),r=SG[m];if(!c)return '';return `<div class="e-sg ${c.up?'up':'dn'}${C.won(m)?' win':''}" style="left:${r[0]*100}%;top:${r[1]*100}%;width:${r[2]*100}%;height:${r[3]*100}%;--r:${r[4]}deg">
   ${C.won(m)?crown:''}<small>${e(C.NM[m])}</small><b><i>${C.arrow(c)}</i>${c.sz}%</b>${C.stamp(c,m==='KIMI'||m==='GROK'?9:-9)}<span class="c4-sr">${e(C.NM[m])} predicts ${c.up?'up':'down'} ${c.sz}%${ex.pending?'':C.pass(c)?', pass':', fail'}${C.won(m)?', closest: wins the round':''}</span></div>`};
 const dies=`<div class="e-dies" aria-label="Countdown to Bet #1"><span><b data-u="h">--</b><small>hrs</small></span><span><b data-u="x">--</b><small>sec</small></span><span><b data-u="d">--</b><small>days</small></span><span><b data-u="m">--</b><small>min</small></span></div>`;
 const html=`<div class="e-wr">
  <div class="e-top">${C.issue('e-iss')}${C.head('e-h1')}</div>
  <div class="e-p e-p1">
   <div class="e-pn c4-pn">${C.img(C.IMG+'e-close.jpg','','The four models at the exchange rail under the bell, each holding a sign with its prediction')}
    ${['GPT','KIMI','CLAUDE','GROK'].map(sign).join('')}
    
    ${ex.pending?'':C.bang('<small>Dong!</small> '+C.mv(ex.a),21,'e-mv '+(ex.a>=0?'up':''))}
   </div>${C.step(0,'e-c1')}<div class="e-foot"><p class="e-co">Round ${ex.n} · ${C.coName}</p>${C.step(1,'e-c2')}</div>
  </div>
  <div class="e-p e-p2">
   <div class="e-pn c4-pn">${C.img(C.IMG+'e-follow.jpg','',C.ldName+' holds up the golden ticket in front of a GPU chip')}
    <div class="e-tk" aria-hidden="true"><small>Golden ticket</small><b>#1</b><span>${C.ldName}</span></div>
    ${dies}
    ${C.bet('e-bet')}
   </div>${C.step(2,'e-c3')}${C.step(3,'e-c4')}
  </div>
 </div>`;
 const box=C.build('e',html);C.tick(box);
 /* the ticket and the dies sit in the picture's own geometry (measured in e-follow.jpg, 1280x720) */
 const pn=box.querySelector('.e-p2 .e-pn'),tk=box.querySelector('.e-tk'),dz=box.querySelector('.e-dies');
 const place=()=>{const W=pn.clientWidth,k=W/1280,H=pn.clientHeight,oy=(H-720*k)/2;
  Object.assign(tk.style,{left:187*k+'px',top:(242*k+oy)+'px',width:236*k+'px',height:330*k+'px',fontSize:(19*k)+'px'});
  const s=100,a=[114,41],b=[-85,43],c1=[916,349],o=[c1[0]-(a[0]+b[0])/2,c1[1]-(a[1]+b[1])/2];
  Object.assign(dz.style,{width:2*s+'px',height:2*s+'px',left:o[0]*k+'px',top:(o[1]*k+oy)+'px',transform:`matrix(${a[0]*k/s},${a[1]*k/s},${b[0]*k/s},${b[1]*k/s},0,0)`})};
 place();new ResizeObserver(place).observe(pn);
 C.font(['Permanent+Marker']).then(C.ready)})();
