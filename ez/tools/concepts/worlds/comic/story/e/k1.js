/* K1 · Next issue: the classic "next issue" box. An alarm clock whose second hand really runs counts down to the next close
   that grades a round; tomorrow's companies wait in their own colours behind a "?". The follow link is how you get it first. */
(function(){const S=SE,m=S.backMount('se-k1');if(!m)return S.ready();const nc=S.nextClose();if(!nc)return S.ready();
  const lg=nc.items.slice(0,5).map(x=>`<i class="se-k1co" style="${S.bvars(S.brand(x.ticker))}">${S.coImg(x.ticker)}</i>`).join('')+(nc.items.length>5?`<i class="se-k1more">+${nc.items.length-5}</i>`:'');
  const box=S.D.createElement('div');box.className='se-k1box';
  box.innerHTML=`<p class="se-k1tag">Next issue</p>
    <div class="se-k1row"><svg class="se-k1clk" viewBox="0 0 100 100" aria-hidden="true"><path d="M18 22l12-12M82 22L70 10" stroke="#15121a" stroke-width="7" stroke-linecap="round"/><circle cx="24" cy="16" r="10" fill="#fdbc2a" stroke="#15121a" stroke-width="4"/><circle cx="76" cy="16" r="10" fill="#fdbc2a" stroke="#15121a" stroke-width="4"/>
      <circle cx="50" cy="56" r="38" fill="#fffaf0" stroke="#15121a" stroke-width="5"/><path d="M50 56L82 56A32 32 0 0 1 77.7 72Z" fill="#fdbc2a"/><g transform="translate(86 76) rotate(-20)"><path d="M0-7c-4 0-5.5 3.5-5.5 7v3l-2 3h15l-2-3V0c0-3.5-1.5-7-5.5-7z" fill="#e0352d" stroke="#15121a" stroke-width="2"/><circle cy="8" r="1.8" fill="#15121a"/></g>${[...Array(12)].map((_,i)=>`<path d="M50 22v6" stroke="#15121a" stroke-width="${i%3?2:4}" transform="rotate(${i*30} 50 56)"/>`).join('')}
      <path class="se-k1hh" d="M50 56V36" stroke="#15121a" stroke-width="5" stroke-linecap="round"/><path class="se-k1mh" d="M50 56V27" stroke="#15121a" stroke-width="3.5" stroke-linecap="round"/><path class="se-k1sh" d="M50 62V24" stroke="#e0352d" stroke-width="2" stroke-linecap="round"/><circle cx="50" cy="56" r="4" fill="#e0352d" stroke="#15121a" stroke-width="2"/></svg>
      <div class="se-k1tx"><b class="se-k1t"></b><span>${nc.items.length} round${nc.items.length===1?'':'s'} graded at ${nc.rel==='Tomorrow'?"tomorrow's":nc.rel==='Today'?"today's":S.wd(nc.day)+"'s"} close.</span><span class="se-k1cos">${lg}<b class="se-k1q" aria-hidden="true">?</b></span></div></div>`;
  m.motto.after(box);box.append(m.follow);m.follow.textContent='Get it first on X';
  const tEl=box.querySelector('.se-k1t'),sh=box.querySelector('.se-k1sh'),mh=box.querySelector('.se-k1mh'),hh=box.querySelector('.se-k1hh');
  const tick=()=>{const ms=Math.max(0,nc.at-Date.now()),s=Math.floor(ms/1e3),h=Math.floor(s/3600),mi=Math.floor(s%3600/60),se=s%60;
    tEl.textContent=ms?`${h}h ${String(mi).padStart(2,'0')}m ${String(se).padStart(2,'0')}s`:'The bell has rung';
    /* the hands show the time in New York now; the gold wedge is the hour before the 4 pm bell */
    const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hourCycle:'h23',hour:'numeric',minute:'numeric',second:'numeric'}).formatToParts(new Date()),G=k=>+p.find(z=>z.type===k).value,H=G('hour')%12,M=G('minute'),Sx=G('second');
    hh.setAttribute('transform',`rotate(${H*30+M/2} 50 56)`);mh.setAttribute('transform',`rotate(${M*6+Sx/10} 50 56)`);sh.setAttribute('transform',`rotate(${Sx*6} 50 56)`)};
  tick();if(!S.rm())setInterval(tick,1000);else setInterval(tick,60000);
  S.once(box,.4);S.ready()})();
