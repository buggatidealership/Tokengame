/* helper q (2026-10-30): shared bits for the "One round, start to finish" takes, laid over the live R11 walkthrough.
   Every number is read from ROUNDS, FILMS, MODELS, CO_LOGOS and __x2pPnl(); the only constants are the film's own timings,
   measured on its frames (round 56: all four calls on their screens from 10.0 s, the market lands at 13.2 s, the crown 14.8 s). */
window.SQ=(function(){
  const D=document,H=D.documentElement;
  const ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
  const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const md=s=>{if(!s)return '';const [m,d]=s.split('/').map(Number);return MON[m-1]+' '+d};
  const pct=v=>Math.abs(v).toFixed(2).replace(/\.?0+$/,'')+'%';
  const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
  const col=m=>MODELS[m].c==='#111'?'#15121a':MODELS[m].c;
  const face=(m,cls)=>`<i class="wc-face ${cls||''}" style="--mc:${col(m)}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${MODELS[m].d}"/></svg></i>`;
  const mark=(m,cls)=>`<svg class="${cls||''}" viewBox="0 0 24 24" aria-hidden="true"><path d="${MODELS[m].d}" style="fill:${col(m)}"/></svg>`;
  const logo=(t,cls)=>{const c=(window.CO_LOGOS||{})[t];return c?`<img class="${cls||''}${c.dark?' sq-lgdk':''}" src="media/${c.f}" alt="">`:''};
  const $f=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
  const k$=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
  const sv=c=>(c.up?'+':'−')+c.v+'%';
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  /* the film's own timings (measured on the frames, not sheet numbers) */
  const FT={56:{t0:10.0,rev:13.2,crown:14.8,end:20.06}};
  function data(){const P=window.__x2pPnl().A,RS=ROUNDS.slice().sort((a,b)=>a.n-b.n);
    const r=ROUNDS.find(x=>x.n===56);const n=r.n,up=r.a>0,A=r.a,W=r.win?r.win.split(' & '):[];
    const per=(m,x)=>P[m]&&P[m].per[x.n]?P[m].per[x.n].v:0;
    const cs=ORDER.map(m=>{const row=r.calls.find(c=>c[0]===m);const c=row&&call(row[1]);return c?{m,up:c.up,v:c.v,s:sv(c),sv:c.up?c.v:-c.v,ok:c.up===up,off:+row[2],win:W.includes(m),pl:per(m,r)}:null}).filter(Boolean);
    const cum=(m,upto)=>RS.reduce((t,x)=>x.n<=upto?t+per(m,x):t,0);
    const rk=upto=>ORDER.slice().sort((a,b)=>cum(b,upto)-cum(a,upto));
    const before=rk(n-1),after=rk(n);
    const bulls=cs.filter(x=>x.up),bears=cs.filter(x=>!x.up).sort((a,b)=>a.v-b.v);
    const best=cs.filter(x=>x.ok).sort((a,b)=>a.off-b.off)[0];
    const pay=cs.find(x=>x.win)||cs.slice().sort((a,b)=>b.pl-a.pl)[0];
    const F=(window.FILMS||{})[n];
    const film=F?{v:'media/'+F.f+'.mp4',p:'media/'+F.p+'.jpg',calls:'tools/concepts/worlds/comic/story/q/r'+n+'-calls.jpg',...(FT[n]||{t0:0,rev:0,crown:0})}:null;
    const season=after.map((m,i)=>({m,rank:i+1,v:cum(m,n),mv:before.indexOf(m)-i}));
    return {r,n,co:r.co,ticker:r.ticker,up,A,W,cs,bulls,bears,best,pay,film,season,called:md(r.called),graded:md(r.resolves)}}
  const cap=(k,t)=>`<b class="wc11s-n" aria-hidden="true">${k}</b><p class="wc11s-c">${t}</p>`;
  /* the dial's geometry (helper o's O5, as live): 320 x 190, 10% each way */
  const G={cx:160,cy:140,R:104,MX:10};
  G.clp=v=>Math.max(-G.MX,Math.min(G.MX,v));G.ang=v=>90+G.clp(v)*(90/G.MX);
  G.pt=(v,rr)=>{const a=G.ang(v)*Math.PI/180;return [G.cx+rr*Math.cos(a),G.cy-rr*Math.sin(a)]};
  G.ptA=(a,rr)=>{a=a*Math.PI/180;return [G.cx+rr*Math.cos(a),G.cy-rr*Math.sin(a)]};
  G.arc=(v0,v1,rr)=>{const [x0,y0]=G.pt(v0,rr),[x1,y1]=G.pt(v1,rr);return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${rr} ${rr} 0 0 ${v0>v1?1:0} ${x1.toFixed(1)} ${y1.toFixed(1)}`};
  /* the four calls spread on the arc so their marks never touch (at least `gap` degrees) */
  G.spread=(cs,gap)=>{const dl=cs.map(x=>({...x})).sort((a,b)=>b.sv-a.sv);let pa=null;dl.forEach(x=>{x.a=G.ang(x.sv);if(pa!=null&&pa-x.a<gap)x.a=pa-gap;pa=x.a});return dl};
  function ticks(){let s='';for(let v=-G.MX;v<=G.MX;v+=2.5){const [a,b]=G.pt(v,G.R-11),[g,h]=G.pt(v,G.R-(v%5===0?19:15));s+=`<path class="sq-tk${v===0?' sq-tk0':''}" d="M${g.toFixed(1)} ${h.toFixed(1)}L${a.toFixed(1)} ${b.toFixed(1)}"/>`}return s}
  /* panel 2: a square film box. Poster = the frame where all four calls are up; play starts there (t0); the market's
     move lands on the picture when the film reaches it (rev). Shown on the poster too, so an unplayed panel still answers. */
  /* the page's own comic move stamp (world-comic.js sfx() word rule, .wc-sfx look), given in every take (owner, 2026-10-30) */
  const sfxW=a=>{const x=Math.abs(a),up=a>0;if(x<1.5)return up?'blip':'tick';if(x<4)return up?'POP!':'THUD!';if(x<8)return up?'ZOOM!':'CRASH!';return up?'KA-POW!':'KA-BOOM!'};
  const stamp=d=>`<span class="wc-sfx wc-lr-sfx sq-sfx ${d.up?'wc-up':'wc-dn'}" aria-label="The close: ${d.up?'up':'down'} ${pct(d.A)}"><em aria-hidden="true">${sfxW(d.A)}</em><b aria-hidden="true">${d.up?'+':'−'}${pct(d.A)}</b></span>`;
  function tv(d,o){o=o||{};const f=d.film;return `<div class="sq-tvw"><div class="sq-tv${o.cls?' '+o.cls:''}"><img class="sq-po" src="${f.calls}" alt="" decoding="async">
      <button type="button" class="sq-play" aria-label="Play the round ${d.n} film from the calls, with sound"><i aria-hidden="true"></i></button>
      ${o.tag||''}</div>${stamp(d)}</div>`}
  function wireTv(d,root,o){o=o||{};const tvb=root.querySelector('.sq-tv'),pb=tvb.querySelector('.sq-play'),f=d.film;let v=null;tvb.classList.add('sq-rev');
    const mk=()=>{if(v)return v;v=D.createElement('video');v.className='sq-v';v.playsInline=true;v.preload='auto';v.src=f.v+'#t='+f.t0;tvb.insertBefore(v,pb);
      v.addEventListener('loadedmetadata',()=>{if(v.currentTime<f.t0-.05)v.currentTime=f.t0});
      v.addEventListener('timeupdate',()=>{tvb.classList.toggle('sq-rev',v.currentTime>=f.rev-.02);o.time&&o.time(v.currentTime)});
      v.addEventListener('playing',()=>tvb.classList.add('sq-on'));v.addEventListener('pause',()=>tvb.classList.remove('sq-on'));
      v.addEventListener('ended',()=>{tvb.classList.remove('sq-on');tvb.classList.add('sq-rev')});
      v.addEventListener('click',()=>{if(v.paused)v.play().catch(()=>{});else v.pause()});return v};
    const play=(muted)=>{const x=mk();if(x.ended||x.currentTime>=x.duration-.1)x.currentTime=f.t0;else if(x.currentTime<f.t0-.05)x.currentTime=f.t0;x.muted=!!muted;tvb.classList.remove('sq-rev');tvb.classList.add('sq-pl');x.play().catch(()=>{})};
    pb.addEventListener('click',()=>play(false));
    /* the stepped recorder: a paused video seeked frame by frame */
    window.__sqPlay=()=>{mk();v.muted=true;v.pause();tvb.classList.add('sq-pl','sq-on');tvb.classList.remove('sq-rev');return {t0:f.t0,t1:Math.min(f.t0+10,20)}};
    window.__sqSeek=t=>new Promise(res=>{v.currentTime=t;v.addEventListener('seeked',()=>{tvb.classList.toggle('sq-rev',t>=f.rev);o.time&&o.time(t);setTimeout(res,30)},{once:true})});
    return {play,tv:tvb}}
  /* a panel's timeline starts when the element is fully on screen and its top half sits in the upper 70% of the screen,
     then waits a beat so the eye has landed; a tap or Enter plays it again. Reduced motion: the end state, no motion. */
  function stage(el,hit,opt){opt=opt||{};if(RM()){el.classList.add('sq-done','sq-go');opt.on&&opt.on();return}
    let fired=false;const fire=()=>{if(fired)return;fired=true;setTimeout(()=>{el.classList.add('sq-go');opt.on&&opt.on()},opt.dwell==null?350:opt.dwell)};
    const io=new IntersectionObserver(es=>{const e=es[0];if(!e.isIntersecting)return;const r=e.boundingClientRect,vh=innerHeight;
      if(r.top>=-2&&r.bottom<=vh*(opt.bottom||.86)&&r.top<=vh*.5){io.disconnect();removeEventListener('scroll',chk);fire()}},{threshold:[0,.25,.5,.75,.9,1]});
    const chk=()=>{const r=el.getBoundingClientRect(),vh=innerHeight;if(r.top>=-2&&r.bottom<=vh*(opt.bottom||.86)&&r.top<=vh*.5){io.disconnect();removeEventListener('scroll',chk);fire()}};
    io.observe(el);addEventListener('scroll',chk,{passive:true});
    if(hit){const rp=()=>{if(RM())return;const p=el;p.classList.remove('sq-go');void p.offsetWidth;p.classList.add('sq-go')};hit.addEventListener('click',rp);
      hit.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();rp()}})}}
  /* money accruing: a one-shot count (instant with reduced motion) */
  const fins=[];
  function count(el,to,dur,fmt){fmt=fmt||$f;fins.push(()=>{el.textContent=fmt(to)});if(RM()){el.textContent=fmt(to);return}const t0=performance.now();
    (function f(t){const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=fmt(to*e);if(k<1)requestAnimationFrame(f)})(t0)}
  function once(el,th,f){const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();f()}},{threshold:th||.5});io.observe(el)}
  window.__sqFin=()=>fins.forEach(f=>f());
  /* replaces panels 1 to 4 of the live walkthrough with a take's own sections (panel 5 stays) */
  function mount(build){const sec=D.querySelector('#wc-book .wc-lr'),pg=sec&&sec.querySelector('.wc11d-pg');if(!pg)throw new Error('no walkthrough');
    const d=data(),html=build(d);[1,2,3,4].forEach(k=>{const old=pg.querySelector('.wc11d-p'+k);const t=D.createElement('div');t.innerHTML=html[k-1].trim();const nw=t.firstElementChild;old.replaceWith(nw)});
    pg.classList.add('sq-pg');return {d,pg}}
  return {D,H,ORDER,NM,RM,md,pct,col,face,mark,logo,$f,k$,esc,data,cap,G,ticks,tv,wireTv,stage,count,once,mount}
})();
