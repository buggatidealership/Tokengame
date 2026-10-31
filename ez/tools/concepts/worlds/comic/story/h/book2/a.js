/* Take A · The Issue: a printed comic you hold. The cover swings open on its spine as you scroll; the inside front
   cover is the first spread (the film on the left page, the four steps told by the four founders on the right);
   every chapter lands like a turned page; inside the book the header is the running head and the tabs are ribbons. */
(function(){const SL=(t,x,y,w,h,fs,r,o)=>Object.assign({t,x,y,w,h,fs,r},o||{});
const line=(s,c)=>`<span class="b2-line ${c||''}">${s}</span>`;
B2T.a={
 p:{ar:'9/16',slots:[
  SL('box',3,2,15,9.6,3.1),
  SL('mast',21,1,54,16,10.5,-3),
  SL('tk',76,7,16,9,4.2,12),
  SL('x',10,69.5,80,7,7,-11,{html:line('4 AI<span class="wc-lc">s</span> trade earnings!')}),
  SL('x',8,83.5,70,7,7,-12,{html:line('Who calls it <u>best?</u>')}),
  SL('seal',77,88.5,18,10,4.4)]},
 l:{ar:'16/9',slots:[
  SL('box',19.6,7,7.4,14.5,1.4,-1.5),
  SL('mast',40,2,34,13,4.4,-3),
  SL('tk',30.2,9.5,5.6,12,1.45,-10),
  SL('x',49.5,78,33,8,2.8,-12,{html:line('4 AI<span class="wc-lc">s</span> trade earnings!')}),
  SL('x',51.5,88.4,26,6,2.05,-11,{html:line('Who calls it <u>best?</u>')}),
  SL('seal',80,85,7.4,12,1.6,-2)]},
 order:null,
 run({cover,ch,B2}){const D=document,H=D.documentElement,L=innerWidth>=900;
  /* the stage: cover over the inside spread */
  const st=D.createElement('div');st.className='b2-stage b2a-stage';st.style.setProperty('--run',L?'230vh':'260vh');
  st.innerHTML=`<div class="b2-sticky"><div class="b2a-spread"><div class="b2a-sp"><img src="${B2.IMG}a-in.jpg" alt=""><div class="b2-film b2a-film"></div>
   <div class="b2a-pg">p. 1 · Inside front cover</div>
   ${['kimi','claude','gpt','grok'].map((m,i)=>`<div class="b2a-say" style="top:${[5,28.3,51.4,74.4][i]}%"><em>${B2.NM[m.toUpperCase()]}</em>${B2.T.step(i)}</div>`).join('')}
   <div class="b2a-pay"><em>Then, on page ${ch.find(c=>/NVIDIA/.test(c.t))?.s.dataset.pg||'?'}</em><b>Bet #1: NVIDIA</b></div></div></div>
   <div class="b2a-cvw"></div><div class="b2a-hint">Scroll to open</div></div>`;
  st.querySelector('.b2a-cvw').append(cover);
  const bk=D.querySelector('#wc-book');bk.parentElement.insertBefore(st,bk);
  const f=B2.film();if(f)st.querySelector('.b2a-film').append(f);
  const sp=st.querySelector('.b2a-sp'),cw=st.querySelector('.b2a-cvw'),hint=st.querySelector('.b2a-hint');
  /* running head + ribbons (the tabs) */
  const hd=D.querySelector('header.top'),links=[...hd.querySelectorAll('nav a')].slice(0,3);
  const rh=D.createElement('div');rh.className='b2a-rh';
  rh.innerHTML=`<span class="b2a-rl"><img src="tools/v22/x2p-logo.svg" alt="">Earnings Zeason <i>· No. ${B2.graded}</i></span><span class="b2a-rc"></span><span class="b2a-rp"></span>`;
  const rb=D.createElement('nav');rb.className='b2a-rib';rb.setAttribute('aria-label','Tabs');
  rb.innerHTML=links.map((a,i)=>`<a href="${a.getAttribute('href')||'#'}" class="r${i}${i===0?' on':''}"><span>${['This issue','Standings','Next bell'][i]}</span></a>`).join('');
  D.body.append(rh,rb);H.classList.add('b2a-nohd');
  const set=()=>{const p=B2.prog(st,0,1);
   if(L){const z=Math.min(1,p/.32),fl=Math.max(0,Math.min(1,(p-.32)/.48));
     cw.style.transform=`scale(${1+.42*z}) translateX(${-6*z}%) rotateY(${-112*fl}deg)`;cw.style.opacity=fl>.85?(1-(fl-.85)/.15):1;
     sp.style.opacity=Math.min(1,Math.max(0,(p-.3)/.2));sp.style.transform=`scale(${.9+.1*Math.min(1,Math.max(0,(p-.3)/.4))})`}
   else{const fl=Math.min(1,p/.5);cw.style.transform=`rotateY(${-118*fl}deg)`;cw.style.opacity=fl>.85?(1-(fl-.85)/.15):1;
     const pan=Math.max(0,Math.min(1,(p-.55)/.4));sp.style.setProperty('--pan',pan)}
   hint.style.opacity=p<.04?1:0;
   const out=st.getBoundingClientRect().bottom<innerHeight*.5;H.classList.toggle('b2a-in',out);
   let cur=null;for(const c of ch){if(c.s.getBoundingClientRect().top<innerHeight*.4)cur=c}
   rh.querySelector('.b2a-rc').textContent=cur?`Ch. ${cur.i} · ${cur.t}`:'Inside front cover';
   rh.querySelector('.b2a-rp').textContent='p. '+(cur?(+cur.s.dataset.pg+Math.max(0,Math.floor(-cur.s.getBoundingClientRect().top/innerHeight))):1)};
  addEventListener('scroll',set,{passive:true});addEventListener('resize',set);set();
  /* each chapter lands like a turned page, and ends on its folio */
  ch.forEach((c,i)=>{c.s.classList.add('b2a-turn');const fo=D.createElement('div');fo.className='b2-folio';fo.innerHTML=`<span>Earnings Zeason · No. ${B2.graded}</span><span>Ch. ${c.i} · ${c.t}</span><b>p. ${c.s.dataset.pg}</b>`;c.s.append(fo)});
  window.__b2.turn='page lands on its spine (scroll-driven view timeline)'}};
})();
