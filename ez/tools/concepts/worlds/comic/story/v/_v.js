/* story mockups, helper "v" (2026-10-30): "One round, start to finish" as one comic card you step through.
   Laid over the built X3+ page. Shared data and the stepper. Every name, call, move, P&L, date, count and logo comes from the
   page's data (ROUNDS, PENDING, UPCOMING, FILMS, MODELS, CO_LOGOS, __x2pPnl); nothing is typed by hand. */
window.VV=window.VV||(function(){
  const D=document,H=D.documentElement,ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const col=m=>m==='GROK'?'#15121a':MODELS[m].c;
  const face=(m,cls)=>`<i class="wc-face ${cls||''}" style="--mc:${col(m)}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${MODELS[m].d}"/></svg></i>`;
  const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const md=s=>{if(!s)return '';const [m,d]=s.split('/').map(Number);return MON[m-1]+' '+d};
  const pct=v=>Math.abs(v).toFixed(2).replace(/\.?0+$/,'')+'%';
  const $f=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
  const k$=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
  const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
  const film=n=>{const f=(window.FILMS||{})[n];return f?{mp4:'media/'+f.f+'.mp4',webm:'media/'+f.f+'.webm',p:'media/'+f.p+'.jpg'}:null};
  const sfx=a=>{const x=Math.abs(a),up=a>0;if(x<1.5)return up?'Blip!':'Tick!';if(x<4)return up?'Pop!':'Thud!';if(x<8)return up?'Zoom!':'Crash!';return up?'Ka-pow!':'Ka-boom!'};
  /* the example: round 56 (Robinhood), kept from today's section. It is calm and typical: a mid-sized move (3.31%), a clean 1 vs 3
     split, three right and one wrong, and the closest right call 0.11% off, so every rule shows. Without it: the newest graded
     round with a film where exactly one AI stood on the wrong side. */
  const ok1=x=>{const up=x.a>0,cs=x.calls.map(c=>call(c[1])).filter(Boolean),ok=cs.filter(c=>c.up===up).length;return cs.length===4&&ok===3};
  let R=ROUNDS.find(x=>x.n===56&&film(56));if(!R)R=ROUNDS.filter(x=>film(x.n)&&ok1(x)).sort((a,b)=>b.n-a.n)[0]||ROUNDS[ROUNDS.length-1];
  const n=R.n,up=R.a>0,W=R.win?R.win.split(' & '):[],F=film(n);
  const A=window.__x2pPnl().A,per=(m,k)=>A[m]&&A[m].per[k]?A[m].per[k].v:0;
  const cs=ORDER.map(m=>{const row=R.calls.find(c=>c[0]===m);const c=row&&call(row[1]);return c?{m,up:c.up,v:c.v,sv:c.up?c.v:-c.v,ok:c.up===up,off:+row[2],win:W.includes(m),pnl:per(m,n)}:null}).filter(Boolean);
  const right=cs.filter(x=>x.ok).sort((a,b)=>a.off-b.off),wrong=cs.filter(x=>!x.ok).sort((a,b)=>a.off-b.off),graded=right.concat(wrong);
  const cum=(m,u)=>ROUNDS.reduce((t,x)=>x.n<=u?t+per(m,x.n):t,0);
  const rank=u=>ORDER.slice().sort((a,b)=>cum(b,u)-cum(a,u)),before=rank(n-1),after=rank(n);
  const G=ROUNDS.length,TT=G+(window.PENDING||[]).length+(window.UPCOMING||[]).length;
  const L=(window.CO_LOGOS||{})[R.ticker]||{},logo=L.f?'media/'+L.f:'',brand=L.c||'#2b2733';
  const coImg=cls=>logo?`<img class="${cls||''}" src="${logo}" alt="">`:`<b class="${cls||''}">${esc(R.ticker)}</b>`;
  /* who passed whom in the season P&L because of this round */
  const passes=after.map((m,i)=>{const was=before.indexOf(m);return was>i?{m,over:before.filter((x,j)=>j<was&&after.indexOf(x)>i)}:null}).filter(Boolean);
  const ticket=after[0]===before[0]?{m:after[0],w:'keeps'}:{m:after[0],w:'takes'};
  /* the beats' lines: one short line each, the picture says the rest */
  const LINE={
    1:`Before earnings, four AIs predict the move.`,
    2:`${esc(R.co)} reports. By the next close, it is ${up?'up':'down'} ${pct(R.a)}.`,
    3:right.length?(W.length>1?`The bell. Wrong way fails. The closest right calls share the round.`:`The bell. Wrong way fails. The closest right call wins.`):`The bell. Nobody got the direction.`,
    4:wrong.length&&right.length?`Each AI trades its call. Right way makes money. Wrong way loses it.`:`Each AI trades its call.`,
  };
  const FINE='Pretend $100,000 accounts, the whole balance on every call.';
  const VERB=['Predict','Report','Bell','Paid','Record'];

  /* mount: keep the section's head, hide today's panels (kept in the DOM), add the take's root */
  const mount=cls=>{const sec=D.querySelector('#wc-book .wc-lr');if(!sec)return null;const h2=sec.querySelector('.wc-h2');
    [...sec.children].forEach(c=>{if(c!==h2)c.classList.add('vv-hide')});
    sec.classList.add('vv-on');const root=D.createElement('div');root.className='vv-root '+cls;sec.appendChild(root);return {sec,root}};

  /* the film, cut to the moment the beat is about: the calls are already up, the market board is still blank (lesson 56).
     webm first here only because the test browser has no H.264; a build keeps mp4 first. */
  const CLIP={from:10.4,rev:13.25,to:14.4};  /* the market board fills at 13.2 s; the gold crown starts at 14.6 s, which is step 3's news */
  const video=cls=>F?`<video class="${cls}" muted playsinline preload="auto" aria-hidden="true" tabindex="-1"><source src="${F.webm}" type="video/webm"><source src="${F.mp4}" type="video/mp4"></video>`:'';
  const clip=(v,onRev,inst)=>{if(!v){onRev&&onRev(true);return ()=>{}}let done=false;const rev=()=>{if(!done){done=true;onRev&&onRev()}};
    const seek=t=>{try{v.currentTime=t}catch(e){}};
    if(inst||RM()){v.pause();const s=()=>{seek(CLIP.to);rev()};v.readyState>=1?s():v.addEventListener('loadedmetadata',s,{once:true});return ()=>{}}
    const tu=()=>{if(v.currentTime>=CLIP.rev)rev();if(v.currentTime>=CLIP.to){v.pause();v.removeEventListener('timeupdate',tu)}};
    const go=()=>{seek(CLIP.from);v.addEventListener('timeupdate',tu);v.play().catch(()=>{seek(CLIP.to);rev()})};
    v.readyState>=1?go():v.addEventListener('loadedmetadata',go,{once:true});
    return ()=>{v.pause();v.removeEventListener('timeupdate',tu)}};

  /* count a figure up from 0 (money accruing); instant with reduced motion */
  const count=(el,to,dur,fmt)=>{fmt=fmt||$f;if(RM()||!dur){el.textContent=fmt(to);return}const t0=performance.now();
    const f=t=>{const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=fmt(to*e);if(k<1)requestAnimationFrame(f)};el.textContent=fmt(0);requestAnimationFrame(f)};

  /* the stepper every take shares: one beat at a time, never by itself. Next and Back buttons, a tap on the picture (not on a
     button, link or the film), a sideways swipe, the arrow keys, Home and End. Screen readers get the step and its line. */
  const stepper=o=>{const N=o.N||5,{root,go}=o;let cur=0,x0=null,y0=0,swiped=false;
    const ctl=o.ctl;ctl.classList.add('vv-ctl');
    ctl.innerHTML=`<button type="button" class="vv-bk"><span aria-hidden="true">◂</span> Back</button>
      <p class="vv-ct"><span class="vv-pips" aria-hidden="true">${[...Array(N)].map((_,i)=>`<i data-i="${i}"></i>`).join('')}</span><b>Step <span class="vv-ci">1</span> of ${N}</b></p>
      <button type="button" class="vv-nx"><span class="vv-nxl">Next</span> <span aria-hidden="true" class="vv-nxa">▸</span></button>`;
    const live=D.createElement('p');live.className='wc-sr';live.setAttribute('aria-live','polite');root.appendChild(live);
    const bk=ctl.querySelector('.vv-bk'),nx=ctl.querySelector('.vv-nx'),pips=[...ctl.querySelectorAll('.vv-pips i')];
    const beats=()=>[...root.querySelectorAll('[data-vb]')];
    const mark=(say)=>{bk.disabled=cur===0;ctl.querySelector('.vv-ci').textContent=cur+1;pips.forEach((p,i)=>{p.classList.toggle('vv-on',i===cur);p.classList.toggle('vv-dn',i<cur)});
      ctl.querySelector('.vv-nxl').textContent=cur===N-1?'Again':'Next';ctl.querySelector('.vv-nxa').textContent=cur===N-1?'↺':'▸';
      nx.setAttribute('aria-label',cur===N-1?'Start again from step 1':'Next step, '+(cur+2)+' of '+N);
      beats().forEach(b=>{const on=+b.dataset.vb===cur;b.setAttribute('aria-hidden',on?'false':'true');if(on)b.removeAttribute('inert');else b.setAttribute('inert','')});
      root.dataset.cur=cur;if(say)live.textContent=`Step ${cur+1} of ${N}. `+(o.say?o.say(cur):'')};
    const show=(i,dir,inst)=>{if(i<0||i>=N)return;const from=cur;cur=i;go(i,from,dir,inst||RM());mark(!inst)};
    nx.addEventListener('click',()=>show(cur===N-1?0:cur+1,1));
    bk.addEventListener('click',()=>show(cur-1,-1));
    const tap=o.tap||root;
    tap.addEventListener('pointerdown',e=>{x0=e.clientX;y0=e.clientY;swiped=false});
    tap.addEventListener('pointerup',e=>{if(x0==null)return;const dx=e.clientX-x0,dy=e.clientY-y0;x0=null;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.3){swiped=true;if(dx<0&&cur<N-1)show(cur+1,1);else if(dx>0&&cur>0)show(cur-1,-1)}});
    tap.addEventListener('click',e=>{if(swiped){swiped=false;return}if(e.target.closest('button,a,video,.vv-notap'))return;if(cur<N-1)show(cur+1,1)});
    root.addEventListener('keydown',e=>{if(e.target.closest('input,textarea'))return;const k={ArrowRight:cur+1,ArrowLeft:cur-1,Home:0,End:N-1}[e.key];if(k==null||k<0||k>=N)return;e.preventDefault();show(k,k>cur?1:-1)});
    root.tabIndex=0;root.setAttribute('role','group');root.setAttribute('aria-roledescription','step by step');root.setAttribute('aria-label',`Round ${n}, ${R.co}, start to finish. Use Next and Back, or the arrow keys.`);
    go(0,0,1,true);mark(false);
    window.__vvGo=(i)=>{show(i,i>=cur?1:-1,true)};
    window.__vvStep=(i)=>{show(i,i>=cur?1:-1,false)};
    return {show,get cur(){return cur}}};
  return {D,H,ORDER,NM,esc,RM,col,face,md,pct,$f,k$,sfx,R,n,up,W,F,cs,right,wrong,graded,cum,before,after,G,TT,logo,brand,coImg,passes,ticket,LINE,FINE,VERB,
    mount,video,clip,CLIP,count,stepper,film,ready:()=>H.classList.add('vv-ready')};
})();
