/* Round H6 · cover4: the X3+ first screen, five simpler takes. Each take replaces the cover's issue strip, masthead and loop
   with one comic object (a cover, a page, a splash, a strip, a scene); the film (live F3 frame) and its button stay.
   Words and numbers are page text; every number from ROUNDS, __x2pPnl, SE. The four steps are the owner's own words (31 Oct). */
window.C4=(function(){
  const S=window.SE,D=document,H=D.documentElement,esc=S.esc,NM=S.NM;
  const IMG='tools/concepts/worlds/comic/story/h/cover4/img/',CAST='tools/concepts/worlds/comic/story/h/cast2/img/';
  const lead=S.lead(),ld=lead.toLowerCase();
  const A=(window.__x2pPnl&&__x2pPnl().A)||{};
  const pnl=m=>A[m]?A[m].bal-100000:0;
  const money=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
  /* the example: the newest round with calls in (pending), else the newest graded round. Today: round 80, Exxon Mobil, graded */
  const pc=c=>{const s=String(c[1]);return {m:c[0],up:/^UP/i.test(s),sz:parseFloat(s.replace(/[^0-9.]/g,''))||0,miss:parseFloat(c[2])}};
  const g=ROUNDS[ROUNDS.length-1];
  let ex={n:g.n,t:g.ticker,co:g.co,calls:(g.calls||[]).map(pc),a:+g.a,win:String(g.win||'').toUpperCase(),pending:0};
  try{const f=window.SH&&SH.fight&&SH.fight();if(f&&f.r&&f.r.calls&&f.r.calls.length)ex={n:f.r.n,t:f.r.ticker,co:f.r.co,calls:f.r.calls.map(c=>Array.isArray(c)?pc(c):{m:c.m,up:/up/i.test(c.dir),sz:+c.size}),pending:1}}catch(e){}
  const pass=c=>!ex.pending&&((c.up&&ex.a>0)||(!c.up&&ex.a<0));
  const won=m=>!ex.pending&&ex.win.split(/[^A-Z]+/).includes(m);
  const call=(m)=>ex.calls.find(c=>c.m===m);
  const arrow=c=>c.up?'▲':'▼';
  const mv=v=>(v>0?'+':v<0?'−':'')+Math.abs(v).toFixed(2)+'%';
  const graded=ROUNDS.length;
  const tk=t=>(S.tk?S.tk(t):t);
  const coName=`${esc(ex.co)} (${esc(tk(ex.t))})`;
  const STEPS=['They predict the move before earnings','The market close grades every prediction','#1 on the leaderboard holds the golden ticket','We follow its call on every bet'];
  /* the owner's words, with "before" kept as the one keyword */
  const step=(i,cls)=>`<p class="c4-cap ${cls||''}"><b class="c4-n">${i+1}</b><span>${esc(STEPS[i]).replace('before','<em>before</em>')}</span></p>`;
  /* a hand-tuned outline (100x100 box, stretched), seeded */
  const R=s=>()=>{s=(s*16807)%2147483647;return s/2147483647};
  const slab=(seed,j)=>{const r=R(seed*97+11),q=()=>(r()-.5)*(j||1.6);return 'M'+[[2,2],[35,1.5],[68,2.3],[98,2],[98.3,50],[98,98],[64,98.4],[30,97.8],[2,98],[1.6,50]].map(p=>(p[0]+q()).toFixed(2)+' '+(p[1]+q()).toFixed(2)).join('L')+'Z'};
  /* a panel: painted picture with a hand ink frame (thick outer, thin inner) */
  const frame=seed=>`<svg class="c4-fr" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="o" d="${slab(seed,1.2)}"/><path class="i" d="${slab(seed+5,.8)}" transform="translate(2.4 2.6) scale(.952 .948)"/></svg>`;
  /* a speech balloon (irregular oval, tail toward the speaker) holding a real call */
  const balloon=(c,tail,seed)=>{const r=R(seed||7),j=()=>(r()-.5)*4;
    const b=`M${8+j()} ${8+j()} Q50 ${-2+j()} ${92+j()} ${8+j()} Q${102+j()} 22 ${92+j()} ${34+j()} Q50 ${44+j()} ${8+j()} ${34+j()} Q${-2+j()} 22 ${8+j()} ${8+j()}Z`;
    const T={b:'M40 36 L34 56 L58 38',bl:'M22 33 L6 54 L36 37',br:'M78 33 L94 54 L64 37',t:'M42 8 L44 -12 L58 8',l:'M10 24 L-10 30 L12 31',r:'M90 24 L110 30 L88 31'}[tail||'b'];
    return `<span class="c4-bl ${c.up?'up':'dn'}${pass(c)?' ok':''}${won(c.m)?' win':''}"><svg viewBox="-12 -14 124 72" preserveAspectRatio="none" aria-hidden="true"><path class="f" d="${T}"/><path class="o" d="${T}"/><path class="f" d="${b}"/><path class="o" d="${b}"/></svg><b><i>${arrow(c)}</i>${c.sz}%</b><span class="c4-sr">${esc(NM[c.m])} predicts ${c.up?'up':'down'} ${c.sz}%</span></span>`};
  /* a stamp: pass or fail, struck at an angle */
  const stamp=(c,rot)=>ex.pending?'':`<span class="c4-stamp ${pass(c)?'ok':'no'}" style="--r:${rot||-8}deg">${pass(c)?'Pass':'Fail'}</span>`;
  /* comic burst for the move (hand-tuned points) */
  const burst=(seed,n)=>{const r=R(seed),pts=[],m=n||12;for(let i=0;i<m*2;i++){const a=i/(m*2)*Math.PI*2-Math.PI/2,o=i%2?31+r()*7:46+r()*5;pts.push((50+Math.cos(a)*o).toFixed(1)+' '+(50+Math.sin(a)*o).toFixed(1))}return 'M'+pts.join('L')+'Z'};
  const bang=(txt,seed,cls)=>`<span class="c4-bang ${cls||''}"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="s" d="${burst(seed)}" transform="translate(3 4)"/><path class="f" d="${burst(seed)}"/><path class="f2" d="${burst(seed+3)}" transform="translate(50 50) scale(.72) translate(-50 -50)"/></svg><b>${txt}</b></span>`;
  /* the headline, in the bet section's own lettering (Bangers, gold, ink stroke, red extrusion) */
  const head=(cls)=>`<h1 class="c4-h1 ${cls||''}" aria-label="4 AIs trade earnings. Who calls it best?"><span class="c4-k">4 AI<span class="wc-lc">s</span></span><span class="c4-m">Trade earnings</span><span class="c4-sub">Who calls it best?</span></h1>`;
  const issue=(cls)=>`<span class="c4-iss ${cls||''}"><b>Season 1</b><span>No. ${graded}</span></span>`;
  const bet=(cls)=>`<p class="c4-bet ${cls||''}"><span class="c4-bt">Bet #1:</span> <span class="c4-bt c4-bt2">NVIDIA</span><small>The first bet, not the last.</small></p>`;
  const img=(src,cls,alt,pos)=>`<img class="${cls||''}" src="${src}" alt="${esc(alt||'')}" ${pos?`style="object-position:${pos}"`:''} decoding="async">`;
  const ldName=esc(NM[lead]);
  /* mount: hide the live issue strip, masthead and loop; put the take before the film */
  const build=(id,html,extra)=>{const cv=D.querySelector('#wc-book .wc-cover.sh-h1');if(!cv)return null;H.classList.add('c4-on','c4-'+id+'-on');cv.classList.add('c4-cv','c4-'+id);
    const box=D.createElement('div');box.className='c4 c4-'+id+'-b';box.innerHTML=html;cv.insertBefore(box,cv.querySelector('.sh-film'));if(extra){const x=D.createElement('div');x.className='c4-x c4-'+id+'-x';x.innerHTML=extra;box.after(x)}
    window.__c4={take:id,lead,ex:ex.t+'#'+ex.n+(ex.pending?' pending':' graded '+ex.a),calls:ex.calls.map(c=>c.m+(c.up?'+':'-')+c.sz+(pass(c)?':P':':F')).join(' '),win:ex.win,leadPnl:pnl(lead),graded};
    return box};
  const ready=()=>H.classList.add('t3-ready');
  const font=fams=>new Promise(res=>{const l=D.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?'+fams.map(f=>'family='+f).join('&')+'&display=block';l.onload=()=>Promise.all(fams.map(f=>D.fonts.load('40px "'+f.split(':')[0].replace(/\+/g,' ')+'"'))).then(res,res);l.onerror=res;D.head.append(l)});
  /* the bet time: h_bet.js betAt (world-comic.js), verbatim */
  function betAt(){const md2=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
   const nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
   const S=window.SIM||{},C=window.CONFIG||{},bd=md2(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
   const nv=[].concat(window.UPCOMING||[],window.PENDING||[]).find(u=>u.ticker==='NVDA'),c0=nv&&md2(nv.called);if(!c0)return null;
   let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}
  function left(){const at=betAt();if(!at)return null;const s=Math.max(0,Math.floor((at-Date.now())/1e3));return {s,d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),x:s%60}}
  /* a live countdown set into an element's [data-u] cells, ticking each second (still with reduced motion: it is a clock, not decoration) */
  const tick=root=>{const set=()=>{const L=left();if(!L)return;const v={d:L.d,h:L.h,m:L.m,x:L.x};root.querySelectorAll('[data-u]').forEach(n=>{const t=String(v[n.dataset.u]).padStart(2,'0');if(n.textContent!==t)n.textContent=t})};set();setInterval(set,1000)};
  return {left,tick,S,IMG,CAST,lead,ld,ldName,pnl,money,ex,pass,won,call,arrow,mv,graded,coName,STEPS,step,frame,balloon,stamp,bang,head,issue,bet,img,build,ready,font,esc,NM}})();
