/* Take B · Through the panel: the cover is a door. Its four founders guard one gold-framed panel; scrolling flies the
   camera through that panel and the panel's inside is the first page (the film, the four steps). Every chapter ends on
   a small gold panel showing the next chapter, and the camera flies through it again. Inside the book the header is the
   masthead plus a strip of six panel thumbnails (where you are); the tabs are three panels: this issue, standings, next issue.
   Order: the cast, then the stakes (the vault), then the evidence (every round, smart or lucky), then next issue. */
(function(){const SL=(t,x,y,w,h,fs,r,o)=>Object.assign({t,x,y,w,h,fs,r},o||{});
const nm=m=>`<span class="b2-nm">${m}</span>`;
const win=()=>`<div class="b2b-win"><span class="b2b-iss">Season 1 · No. ${B2.graded}</span><span class="b2b-h1">4 AI<span class="wc-lc">s</span> trade earnings</span><span class="b2b-h2">Who calls it best?</span><div class="b2-film b2b-film"></div><ol class="b2b-steps">${B2.STEPS.map((s,i)=>`<li>${B2.T.step(i)}</li>`).join('')}</ol><span class="b2b-go">Step inside ↓</span></div>`;
B2T.b={
 p:{ar:'9/16',slots:[
  SL('mast',8,1.2,84,13,11,-2),
  SL('w',30,29,40,55,3,0,{html:''}),
  SL('n',4,51.5,21,3.5,3.8,0,{html:nm('Kimi')}),SL('n',73,51.5,23,3.5,3.8,0,{html:nm('Claude')}),
  SL('n',5,92,26,4,3.8,0,{html:nm('GPT')}),SL('n',67,92,28,4,3.8,0,{html:nm('Grok')})]},
 l:{ar:'16/9',slots:[
  SL('mast',35,1.5,34,27,4.6,-2),
  SL('w',25,34,49,48,1.15,0,{html:''}),
  SL('n',1,93,12,6,1.6,0,{html:nm('GPT')}),SL('n',31,93,13,6,1.6,0,{html:nm('Kimi')}),
  SL('n',56,93,13,6,1.6,0,{html:nm('Claude')}),SL('n',75,93,12,6,1.6,0,{html:nm('Grok')})]},
 order:[B2.CH[0],B2.CH[3],B2.CH[1],B2.CH[2],B2.CH[4]],
 run({cover,ch,B2}){const D=document,H=D.documentElement,L=innerWidth>=900;
  const w=cover.querySelector('.b2s-w');w.innerHTML=win();
  const st=D.createElement('div');st.className='b2-stage b2b-stage';st.style.setProperty('--run','240vh');
  st.innerHTML=`<div class="b2-sticky"><div class="b2b-cam"></div></div>`;st.querySelector('.b2b-cam').append(cover);
  const bk=D.querySelector('#wc-book');bk.parentElement.insertBefore(st,bk);
  const f=B2.film();if(f)w.querySelector('.b2b-film').append(f);
  const cam=st.querySelector('.b2b-cam');
  /* fly through the window: scale about its centre until it fills the screen */
  const set=()=>{const p=B2.prog(st,0,1),pl=cover.querySelector('.b2-pl');
   const r={x:pl.offsetLeft+w.offsetLeft,y:pl.offsetTop+w.offsetTop,w:w.offsetWidth,h:w.offsetHeight};
   const S=Math.min(innerWidth/r.w,innerHeight/r.h)*1.02,e=p<.08?0:Math.min(1,(p-.08)/.62),k=1+(S-1)*(e*e*(3-2*e));
   const cx=r.x+r.w/2,cy=r.y+r.h/2;cam.style.transformOrigin=`${cx}px ${cy}px`;
   cam.style.transform=`translate(${(innerWidth/2-cx)*e}px,${(innerHeight/2-cy)*e}px) scale(${k})`;
   H.style.setProperty('--b2b-in',Math.max(0,Math.min(1,(e-.45)/.4)));
   H.classList.toggle('b2b-deep',st.getBoundingClientRect().bottom<innerHeight*.6);upd()};
  /* the next-chapter panel at the end of each chapter, which the camera flies through */
  ch.slice(1).forEach(c=>{const d=D.createElement('div');d.className='b2b-door';d.innerHTML=`<div class="b2b-ds"><div class="b2b-dp"><img src="${B2.IMG}b-p.jpg" alt=""><span><em>Chapter ${c.i}</em><b>${c.t}</b></span></div></div>`;c.s.parentElement.insertBefore(d,c.s)});
  /* header: masthead + six panel thumbnails; tabs as three panels */
  const hd=D.querySelector('header.top'),links=[...hd.querySelectorAll('nav a')].slice(0,3);
  const bar=D.createElement('div');bar.className='b2b-bar';
  bar.innerHTML=`<span class="b2b-mk">Earnings <i>Zeason</i></span><span class="b2b-th">${['Cover',...ch.map(c=>c.t)].map((t,i)=>`<i title="${t}" data-i="${i}"></i>`).join('')}</span><nav>${links.map((a,i)=>`<a href="${a.getAttribute('href')||'#'}"${i===0?' class="on"':''}>${['This issue','Standings','Next issue'][i]}</a>`).join('')}</nav>`;
  D.body.append(bar);H.classList.add('b2b-nohd');
  const th=[...bar.querySelectorAll('.b2b-th i')];
  function upd(){let cur=0;ch.forEach((c,i)=>{if(c.s.getBoundingClientRect().top<innerHeight*.4)cur=i+1});th.forEach((t,i)=>t.classList.toggle('on',i===cur))}
  addEventListener('scroll',set,{passive:true});addEventListener('resize',set);set();
  window.__b2.turn='fly through the next chapter\'s panel (scroll-driven)'}};
})();
