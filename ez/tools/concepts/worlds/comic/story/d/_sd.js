/* story mockups, helper "d" (2026-10-30): the whole "One round, start to finish" section, panels 1 to 4 and the head.
   Shared bits. Laid over the built X3+ page after helper a's P3 (panel 5). Every number from the page's data. */
window.SD=window.SD||(function(){
  const D=document,H=D.documentElement,ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const col=m=>m==='GROK'?'#15121a':MODELS[m].c;
  const face=(m,cls)=>`<i class="wc-face ${cls||''}" style="--mc:${col(m)}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${MODELS[m].d}"/></svg></i>`;
  const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const md=s=>{if(!s)return '';const [m,d]=s.split('/').map(Number);return MON[m-1]+' '+d};
  const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
  const pct=v=>(Math.round(Math.abs(v)*100)/100)+'%';
  const sg=v=>(v>=0?'+':'−');
  const $=v=>'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
  const $k=v=>{const a=Math.abs(v);return a>=1000?'$'+(a/1000).toFixed(1)+'K':'$'+Math.round(a)};
  const rm=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const and=a=>a.length<2?a[0]||'':a.slice(0,-1).join(', ')+' and '+a[a.length-1];
  const sfx=a=>{const x=Math.abs(a),up=a>0;if(x<1.5)return up?'blip':'tick';if(x<4)return up?'POP!':'THUD!';if(x<8)return up?'ZOOM!':'CRASH!';return up?'KA-POW!':'KA-BOOM!'};
  /* the example round: the one the page already walks through (lastRound(): newest graded round with a film where exactly one AI got the direction) */
  function data(){
    const pg=D.querySelector('.wc-lr-pg');if(!pg)return null;const n=+pg.dataset.n,r=ROUNDS.find(x=>x.n===n);if(!r)return null;
    const P=window.__x2pPnl().A,up=r.a>0,W=r.win?r.win.split(' & '):[];
    const cs=ORDER.map(m=>{const row=r.calls.find(c=>c[0]===m);if(!row)return null;const c=call(row[1]);if(!c)return null;
      return {m,c,ok:c.up===up,off:+row[2],win:W.includes(m),v:(P[m].per[n]||{}).v||0,sv:c.up?c.v:-c.v}}).filter(Boolean);
    /* the season P&L race just before and just after this round (each model's per-round dollars summed, rounds in order) */
    const cum=(m,upto)=>Object.entries(P[m].per).filter(([k])=>+k<=upto).reduce((t,[,x])=>t+x.v,0);
    const rank=upto=>ORDER.slice().sort((a,b)=>cum(b,upto)-cum(a,upto));
    const before=rank(n-1),after=rank(n);
    const graded=cs.map(x=>x).sort((a,b)=>(b.ok-a.ok)||(a.off-b.off));
    const lg=(window.CO_LOGOS||{})[r.ticker],f=(window.FILMS||{})[n];
    /* the company's own colour (CO_LOGOS) and an ink that reads on it (WCAG contrast) */
    const bc=(lg&&lg.c)||'#4f4955',L=v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4},bn=parseInt(bc.slice(1),16),Y=.2126*L(bn>>16)+.7152*L(bn>>8&255)+.0722*L(bn&255),bink=1.05/(Y+.05)>=4.5?'#fff':'#15121a';
    return {n,r,up,W,cs,graded,right:cs.filter(x=>x.ok),wrong:cs.filter(x=>!x.ok),before,after,cum,
      logo:lg?'media/'+lg.f:'',dk:!!(lg&&lg.dark),brand:bc,bink,film:f?{v:'media/'+f.f+'.mp4',p:'media/'+f.p+'.jpg'}:null,
      called:md(r.called),graded_on:md(r.resolves),tk:String(r.ticker).replace(/\..*$/,''),nR:ROUNDS.length}}
  /* mount: hide the page's panels 1 to 4 (kept in the DOM: the film and its wiring move into the take), drop the head's sentence
     (the panels carry round, company and dates), and put the take's own strip between the head and panel 5 */
  let _d=null;const d0=()=>_d||(_d=data());
  function mount(html,cls){
    const sec=D.querySelector('.wc-lr'),pg=sec.querySelector('.wc-lr-pg');if(sec.querySelector('.sd-st'))return null;
    pg.querySelectorAll('.wc-lr-1,.wc-lr-2,.wc-lr-3,.wc-lr-4').forEach(li=>li.classList.add('sd-h'));pg.classList.add('sd-p5only');sec.classList.add('sd-on',cls);
    const sm=sec.querySelector('.wc-h2 small');if(sm)sm.classList.add('sd-h');
    const w=D.createElement('div');w.className='sd-st '+cls;w.style.setProperty('--br',d0().brand);w.style.setProperty('--bri',d0().bink);w.innerHTML=html;sec.insertBefore(w,pg);
    /* the page's own film element (its sound button and tap-to-open stay wired) */
    const slot=w.querySelector('.sd-film'),art=pg.querySelector('.wc-lr-2 .wc-lr-art');if(slot&&art)slot.appendChild(art);
    const v=art&&art.querySelector('video');if(v&&!rm()){new IntersectionObserver(es=>{const e=es[0];if(e.isIntersecting&&e.intersectionRatio>.35)v.play().catch(()=>{});else if(!e.isIntersecting)v.pause()},{threshold:[0,.4]}).observe(slot)}
    return w}
  /* play once on view (reduced motion: the end state at once) */
  const once=(el,th,cb)=>{if(!el)return;if(rm()||window.__sdStill){el.classList.add('sd-go','sd-done');cb&&cb(true);return}
    const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();el.classList.add('sd-go');cb&&cb(false)}},{threshold:th||.5});io.observe(el)};
  /* money accruing: a dollar figure counts up from 0 */
  const count=(n,delay)=>{if(!n||rm()||window.__sdStill)return;const v=+n.dataset.v,s=n.dataset.s||'',fin=n.textContent;n.textContent=s+'$0';
    setTimeout(()=>{const t0=performance.now(),d=900;(function f(t){const k=Math.min(1,(t-t0)/d),e=1-Math.pow(1-k,3);n.textContent=k<1?s+'$'+Math.round(v*e).toLocaleString('en-US'):fin;if(k<1)requestAnimationFrame(f)})(t0)},delay||0)};
  const money=(v,cls)=>`<b class="${cls||''}" data-v="${Math.round(Math.abs(v))}" data-s="${sg(v)}">${sg(v)}${$(v)}</b>`;
  return {D,H,ORDER,NM,esc,col,face,md,call,pct,sg,$,$k,rm,and,sfx,data,mount,once,count,money,ready:()=>H.classList.add('sd-ready')};
})();
