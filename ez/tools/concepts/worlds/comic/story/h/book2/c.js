/* Take C · The long drop: a phone-native vertical comic (webtoon). No page turns: the cover is the top of one tall
   painting, and scrolling is the camera descending it: from the rooftop where the four founders stand, down the
   building, to the ring in the street where chapter 1 (Meet the models) begins. The masthead holds on the sky and lets
   go; chapters hand over through a long gutter where the next scene bleeds up into the last one, with one narration
   lettered in the gutter. The header hides while you read down and comes back when you scroll up, as an episode bar;
   the tabs are episodes; at the end a "next episode" bar names the next bell. Order: the descent ends in the vault. */
(function(){const SL=(t,x,y,w,h,fs,r,o)=>Object.assign({t,x,y,w,h,fs,r},o||{});
const nm=m=>`<span class="b2-nm">${m}</span>`;
B2T.c={
 p:{ar:'9/16',slots:[
  SL('mast',36,1.4,62,15,9.6,-2),
  SL('bb',4,11.5,28,9.5,3.3,6,{html:`<span class="b2c-bb"><b>4 AI<span class="wc-lc">s</span> trade earnings</b><i>Who calls it best?</i></span>`}),
  SL('n',17,45.6,14,3,3.4,0,{html:nm('Kimi')}),SL('n',33,45.6,16,3,3.4,0,{html:nm('Claude')}),SL('n',49,45.6,14,3,3.4,0,{html:nm('GPT')}),SL('n',64,45.6,14,3,3.4,0,{html:nm('Grok')}),
  ...[0,1,2,3].map(i=>SL('step:'+i,6,54+i*7.2,46,6,3.6,0)),
  SL('ring',44,82,26,4,3.4,0,{html:`<span class="b2c-ring">Ch. 1 · Meet the models ↓</span>`})]},
 l:{ar:'16/9',slots:[
  SL('mast',76,3,23,24,3.4,-2),
  SL('bb',10.5,8.5,14.5,14,1.4,4,{html:`<span class="b2c-bb"><b>4 AI<span class="wc-lc">s</span> trade earnings</b><i>Who calls it best?</i></span>`}),
  SL('n',27,34.6,10,3,1.25,0,{html:nm('Kimi')}),SL('n',38,34.6,10,3,1.25,0,{html:nm('Claude')}),SL('n',50,34.6,10,3,1.25,0,{html:nm('GPT')}),SL('n',61,34.6,10,3,1.25,0,{html:nm('Grok')}),
  ...[0,1,2,3].map(i=>SL('step:'+i,i<2?6:62,i%2?60:48,30,8,1.5,0)),
  SL('ring',39,84,22,4,1.3,0,{html:`<span class="b2c-ring">Ch. 1 · Meet the models ↓</span>`})]},
 order:null,
 run({cover,ch,B2}){const D=document,H=D.documentElement;
  const bk=D.querySelector('#wc-book');bk.parentElement.insertBefore(cover,bk);cover.classList.add('b2c-cv');
  /* the masthead holds on the sky while the building scrolls past, then lets go */
  const m=cover.querySelector('.b2s-mast');
  /* the film: the first stop on the way down, set into the building's lit window band */
  const fw=D.createElement('div');fw.className='b2c-filmrow';fw.innerHTML=`<div class="b2-film b2c-film"></div><span class="b2c-cap">How it works · 1:20</span>`;cover.after(fw);
  const f=B2.film();if(f)fw.querySelector('.b2c-film').append(f);
  /* gutters between chapters: the next scene bleeds up; one narration lettered on the ground */
  const NAR=['','Meanwhile, '+B2.graded+' rounds later…','So… smart, or just lucky?','Down in the vault…','To be continued…'];
  ch.forEach((c,i)=>{if(!i)return;const g=D.createElement('div');g.className='b2c-gut';g.dataset.ch=c.i;g.innerHTML=`<span>${NAR[i]||''}</span>`;c.s.parentElement.insertBefore(g,c.s)});
  /* the episode bar (header) hides on the way down, returns on the way up */
  const hd=D.querySelector('header.top'),links=[...hd.querySelectorAll('nav a')].slice(0,3);
  const bar=D.createElement('div');bar.className='b2c-bar';
  bar.innerHTML=`<div class="b2c-r1"><img src="tools/v22/x2p-logo.svg" alt=""><b>Ep. ${B2.graded}</b><span class="b2c-ct"></span></div><nav>${links.map((a,i)=>`<a href="${a.getAttribute('href')||'#'}"${i===0?' class="on"':''}>${['This episode','Rankings','Next episode'][i]}</a>`).join('')}</nav><i class="b2c-pr"></i>`;
  const nx=D.createElement('a');nx.className='b2c-next';nx.href=links[2]?links[2].getAttribute('href'):'#';nx.innerHTML=`<em>Next episode</em><b>Ep. ${B2.graded+1}${B2.nextBell()?' · '+B2.nextBell():''}</b><span>at the close ›</span>`;
  D.body.append(bar,nx);H.classList.add('b2c-nohd');
  let ly=scrollY;const set=()=>{const y=scrollY,dn=y>ly+2,up=y<ly-2;ly=y;
   if(dn&&y>200)H.classList.add('b2c-hide');if(up||y<60)H.classList.remove('b2c-hide');
   const r=cover.getBoundingClientRect(),k=Math.max(0,Math.min(1,-r.top/(r.height*.45)));m.style.transform=`translateY(${k*r.height*.18}px) rotate(-2deg)`;m.style.opacity=1-Math.max(0,(k-.6)/.4);
   let cur=null;for(const c of ch)if(c.s.getBoundingClientRect().top<innerHeight*.4)cur=c;
   bar.querySelector('.b2c-ct').textContent=cur?`Ch. ${cur.i}/${ch.length} · ${cur.t}`:'The cover';
   const sh=D.documentElement.scrollHeight-innerHeight;bar.querySelector('.b2c-pr').style.transform=`scaleX(${y/sh})`;
   H.classList.toggle('b2c-end',y>sh-innerHeight*1.2)};
  addEventListener('scroll',set,{passive:true});set();
  window.__b2.turn='continuous descent; gutters bleed the next scene up (no pin)'}};
})();
