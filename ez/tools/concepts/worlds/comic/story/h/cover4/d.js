/* D · One beat at a time: the four steps as four big panels you swipe through (the next one peeks in at the right edge),
   each panel one picture and one caption: 1 the four founders thinking, their real calls in balloons; 2 the four under the bell,
   stamped pass or fail, the move as the bell's sound; 3 the leader holds the golden ticket (#1 printed on it); 4 the leader before
   the chip, the countdown to Bet #1 in its dies, and the empty slots for bets #2 to #4. */
(function(){const C=C4,e=C.esc,ex=C.ex,K=C.CAST,ORD=['GPT','KIMI','CLAUDE','GROK'];
 const q=(m,kind,inner)=>`<div class="d-q d-q-${m.toLowerCase()}${kind==='predict'&&C.call(m)&&!C.call(m).up?' d-mir':''}">${C.img(K+'a-'+m.toLowerCase()+'-'+kind+'.jpg','',C.NM[m])}${inner}<b class="d-nm">${e(C.NM[m])}</b></div>`;
 const p1=ORD.map(m=>{const c=C.call(m);return q(m,'predict',c?C.balloon(c,'b',m.length*3):'')}).join('');
 const p2=ORD.map(m=>{const c=C.call(m);return q(m,ex.pending?'wait':C.won(m)?'win':C.pass(c)?'wait':'lose',c?`<span class="d-st">${C.stamp(c,m.length%2?-8:7)}</span>`:'')}).join('');
 const dies=`<div class="e-dies" aria-label="Countdown to Bet #1"><span><b data-u="h">--</b><small>hrs</small></span><span><b data-u="x">--</b><small>sec</small></span><span><b data-u="d">--</b><small>days</small></span><span><b data-u="m">--</b><small>min</small></span></div>`;
 const pans=[
  `<div class="d-g">${p1}</div>`,
  `<div class="d-g">${p2}</div>${ex.pending?'':C.bang('<small>Dong!</small> '+C.mv(ex.a),21,'d-mv '+(ex.a>=0?'up':''))}`,
  `${C.img(K+'a-'+C.ld+'-ticket.jpg','d-full',C.ldName+' holds up the golden ticket')}<div class="d-tk" aria-hidden="true"><small>Golden ticket</small><b>#1</b><span>${C.ldName}</span></div>`,
  `<div class="d-f">${C.img(C.IMG+'e-follow.jpg','',C.ldName+' with the golden ticket in front of a GPU chip')}${dies}</div>${C.bet('d-bet')}<div class="d-nx" aria-label="Bets 2 to 4 to come"><i>#2</i><i>#3</i><i>#4</i></div>`];
 const html=`<div class="d-wr">
  <div class="d-top">${C.issue('d-iss')}${C.head('d-h1')}</div>
  <div class="d-strip" tabindex="0" aria-label="How it works, four panels">${pans.map((h,i)=>`<section class="d-p d-p${i+1}"><div class="d-pn c4-pn">${h}</div>${C.step(i,'d-c').replace('</span></p>',i===0?`<small class="d-cr">Round ${ex.n} · ${C.coName}</small></span></p>`:'</span></p>')}</section>`).join('')}</div>
  <div class="d-dots" aria-hidden="true">${[1,2,3,4].map(i=>`<i class="${i===1?'on':''}">${i}</i>`).join('')}<span>Swipe</span></div>
 </div>`;
 const box=C.build('d',html);C.tick(box);
 const st=box.querySelector('.d-strip'),dots=[...box.querySelectorAll('.d-dots i')];
 st.addEventListener('scroll',()=>{const i=Math.round(st.scrollLeft/(st.querySelector('.d-p').offsetWidth+8));dots.forEach((d,k)=>d.classList.toggle('on',k===i))},{passive:true});
 dots.forEach((d,k)=>d.parentNode&&d.addEventListener('click',()=>st.scrollTo({left:k*(st.querySelector('.d-p').offsetWidth+8),behavior:'smooth'})));
 /* ticket on panel 3 (a-<lead>-ticket: centre .361,.586, .235 x .29, -6.5deg) and the dies on panel 4 (e-follow.jpg, 1280x720) */
 const p3=box.querySelector('.d-p3 .d-pn'),tk=box.querySelector('.d-tk'),f=box.querySelector('.d-f'),dz=f.querySelector('.e-dies');
 const place=()=>{const W=p3.clientWidth,H=p3.clientHeight,sq=Math.max(W,H),ox=(W-sq)/2,oy=(H-sq)*.3;
   Object.assign(tk.style,{left:(ox+sq*.361)+'px',top:(oy+sq*.586)+'px',width:sq*.235+'px',height:sq*.29+'px',fontSize:sq*.034+'px'});
   const FW=f.clientWidth,FH=f.clientHeight,k=Math.max(FW/1280,FH/720),fx=(FW-1280*k)*.75,fy=(FH-720*k)*.5,s=100,a=[114,41],b=[-85,43],c1=[916,349],o=[c1[0]-(a[0]+b[0])/2,c1[1]-(a[1]+b[1])/2];
   Object.assign(dz.style,{width:2*s+'px',height:2*s+'px',left:(fx+o[0]*k)+'px',top:(fy+o[1]*k)+'px',transform:`matrix(${a[0]*k/s},${a[1]*k/s},${b[0]*k/s},${b[1]*k/s},0,0)`})};
 place();new ResizeObserver(place).observe(st);C.ready()})();
