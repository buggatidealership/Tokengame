/* Round H4 · cover3: today's live cover layout (helper h's H1: issue strip, Starring corner box + headline, the four-step loop, the film),
   every element inside it reinvented. Laid over the built X3+ page (it carries SE and SH). Shared builder for takes T1 to T4.
   The four marks are the four founder characters (media/founder-<m>-*), one consistent object per take.
   Words and numbers are page text, every number from the page's data: ROUNDS, __x2pPnl, SE (next report day, leader). */
window.T3=(function(){
  const S=window.SE,X=window.SH,D=document,H=D.documentElement,esc=S.esc,NM=S.NM,STAR=S.STAR;
  const IMG='tools/concepts/worlds/comic/story/h/cover3/img/',CUT=IMG+'cut/';
  const lead=S.lead();
  const pnl=m=>{const A=(window.__x2pPnl&&__x2pPnl().A)||{};return A[m]?A[m].bal-100000:0};
  const money=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
  /* ---- the example round. Step 1: the newest round with calls in, else the newest graded round. Step 2 needs a move, so it is the newest graded round
     (today both are round 80, Exxon Mobil: no calls are in for Monday yet) ---- */
  const pc=c=>{if(Array.isArray(c)){const s=String(c[1]);return {m:c[0],up:/^UP/i.test(s),sz:parseFloat(s.replace(/[^0-9.]/g,''))||0,miss:parseFloat(c[2])}}
    return {m:c.m,up:String(c.dir||'').toUpperCase()==='UP',sz:parseFloat(c.size||c.pct||c.sz||c.v||0)||0}};
  const order=cs=>STAR.map(m=>cs.find(c=>c.m===m)).filter(Boolean);
  const graded=()=>{const g=ROUNDS[ROUNDS.length-1];return {n:g.n,t:g.ticker,co:g.co,calls:order((g.calls||[]).map(pc)),a:+g.a,win:String(g.win||''),pending:0}};
  const pending=()=>{const f=X&&X.fight&&X.fight();if(!f||!f.r||!f.r.calls||!f.r.calls.length)return null;return {n:f.r.n,t:f.r.ticker,co:f.r.co,calls:order(f.r.calls.map(pc)),pending:1}};
  const ex1=pending()||graded(),ex2=graded();
  const pass=(c,a)=>(c.up&&a>0)||(!c.up&&a<0);
  /* ---- the next report day (no calls are locked on a weekend: then the next day on the card) ---- */
  const nextDay=()=>{const nc=S.nextClose();if(nc)return nc.day;const L=S.toCome().filter(x=>x.day).sort((a,b)=>S.pd(a.day).t-S.pd(b.day).t);return L.length?L[0].day:null};
  const dayWord=d=>{if(!d)return 'soon';const r=S.rel(d);return r==='Today'||r==='Tomorrow'?r:S.wd(d)};
  const nd=nextDay();
  /* ---- lettering by hand: every glyph its own size, angle and baseline (lesson 70); words stay whole so lines wrap between words ---- */
  const hash=(s,i)=>{let h=2166136261;for(const c of s+'|'+i)h=Math.imul(h^c.charCodeAt(0),16777619);return ((h>>>0)%1000)/1000};
  const letters=(txt,amp)=>{amp=amp||1;let k=0;return String(txt).split(' ').map(w=>`<span class="t3-wd">${[...w].map(c=>{k++;return `<i style="--r:${((hash(txt,k)-.5)*7*amp).toFixed(1)}deg;--y:${((hash(txt,k+31)-.5)*.12*amp).toFixed(3)}em;--k:${(.92+hash(txt,k+7)*.16*amp).toFixed(2)}">${esc(c)}</i>`}).join('')}</span>`).join(' ')};
  /* a caption: segments [text, keyword?] -> lettered html, the plain words kept for screen readers */
  const cap=segs=>`<span class="t3-cl" aria-hidden="true">${segs.map(([t,kw])=>kw?`<b>${letters(t)}</b>`:letters(t)).join(' ')}</span><span class="t3-sr">${esc(segs.map(s=>s[0]).join(' '))}</span>`;
  /* ---- hand-tuned shapes ---- */
  const R=s=>()=>{s=(s*16807)%2147483647;return s/2147483647};
  /* an irregular slab outline in a 100x100 box (stretched to its element; strokes do not scale) */
  const slab=(seed,j)=>{const r=R(seed*97+11),q=()=>(r()-.5)*(j||1.6);const pts=[[2+q(),2+q()],[35+q(),1.5+q()],[68+q(),2.3+q()],[98+q(),2+q()],[98.3+q(),50+q()],[98+q(),98+q()],[64+q(),98.4+q()],[30+q(),97.8+q()],[2+q(),98+q()],[1.6+q(),50+q()]];
    return 'M'+pts.map(p=>p.map(v=>v.toFixed(2)).join(' ')).join('L')+'Z'};
  let uid=0;
  /* a plate: a hand-tuned slab behind its content, two-tone fill, a thick outer ink, a thin inner line and a light edge. Colours from CSS (--f1 --f2 --ink --hl) */
  const plate=(inner,cls,seed,tag)=>{const id='t3g'+(++uid),d=slab(seed||uid,1.8),t=tag||'span';
    return `<${t} class="t3-pl ${cls||''}"><svg class="t3-plbg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="s1"/><stop offset=".62" class="s2"/><stop offset="1" class="s3"/></linearGradient></defs>
      <path d="${d}" fill="url(#${id})"/><path class="hl" d="M5 7 L60 5.5"/><path class="ln" d="${d}" transform="translate(4.5 6) scale(.91 .88)"/><path class="ok" d="${d}"/></svg><span class="t3-plc">${inner}</span></${t}>`};
  /* a panel's ink frame: a hand line round the panel (thick outer, thin inner), laid on top of the painted ground */
  const frame=seed=>`<svg class="t3-fr" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="o" d="${slab(seed,1.1)}"/><path class="i" d="${slab(seed+5,.8)}" transform="translate(3 3.4) scale(.94 .932)"/></svg>`;
  /* a hand-tuned burst for the move: inner and outer layers, irregular points */
  const burst=(seed,n)=>{const r=R(seed),pts=[],m=n||13;for(let i=0;i<m*2;i++){const a=i/(m*2)*Math.PI*2-Math.PI/2,o=i%2?30+r()*6:47+r()*5;pts.push([(50+Math.cos(a)*o*1.18).toFixed(1),(50+Math.sin(a)*o*.82).toFixed(1)])}return 'M'+pts.map(p=>p.join(' ')).join('L')+'Z'};
  /* a speech balloon holding a call (drawn: irregular oval, a tail aimed at the speaker, two-tone fill, ink); text is page text */
  const balloon=(c,i,side)=>{const r=R(11+i*13),j=()=>(r()-.5)*3,up=c.up;
    const b=`M${8+j()} ${6+j()} Q50 ${-3+j()} ${92+j()} ${6+j()} Q${101+j()} 20 ${92+j()} ${33+j()} Q50 ${41+j()} ${8+j()} ${33+j()} Q${-1+j()} 20 ${8+j()} ${6+j()}Z`;
    const tail={l:'M14 30 L-4 44 L28 34',r:'M86 30 L104 44 L72 34',tl:'M14 9 L-4 -6 L28 6',tr:'M86 9 L104 -6 L72 6',b:'M40 34 L46 50 L60 35'}[side];
    return `<span class="t3-bl t3-bl-${side} ${up?'up':'dn'}"><svg viewBox="-6 -8 112 56" preserveAspectRatio="none" aria-hidden="true"><path d="${b}" transform="translate(2 3)" class="sh"/><path d="${tail}" class="f"/><path d="${tail}" class="o"/><path d="${b}" class="f"/><path d="M8 22 Q50 36 92 20 L92 40 L8 40Z" class="dk" clip-path="path('${b}')"/><path d="${b}" class="o"/><path d="M16 9 Q30 4 44 5" class="hi"/></svg><b>${up?'▲':'▼'}${c.sz}%</b><span class="t3-sr">${esc(NM[c.m])} predicts ${up?'up':'down'} ${c.sz}%</span></span>`};
  /* a hand-tuned arrow band for the loop's gutters (two-tone fill, a light edge, thick outer ink) */
  const arrow=i=>{const r=R(5+i*7),j=()=>(r()-.5)*2.4,id='t3a'+(++uid);
    const d=`M4 ${16+j()} Q26 ${8+j()} 44 ${12+j()} L43 ${4+j()} L64 ${18+j()} L43 ${32+j()} L44 ${24+j()} Q26 ${22+j()} 4 ${27+j()}Z`;
    return `<svg class="t3-ar" viewBox="-2 -2 70 40" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="s1"/><stop offset="1" class="s2"/></linearGradient></defs><path d="${d}" transform="translate(2.2 2.8)" class="sh"/><path d="${d}" fill="url(#${id})"/><path class="hl" d="M8 18 Q26 12 42 15"/><path d="${d}" class="o"/></svg>`};
  /* a tick or cross, stamped by hand */
  const stamp=ok=>`<svg class="t3-stp ${ok?'ok':'no'}" viewBox="0 0 24 24" aria-hidden="true"><path class="b" d="M3 4.5 Q12 2 21 3.8 Q22.4 12 20.6 20.5 Q12 22.3 3.6 20.8 Q1.7 12 3 4.5Z"/><path class="m" d="${ok?'M6.5 12.5 L10.3 16.2 L17.6 7.6':'M7.2 7.4 L16.8 16.6 M16.6 7.2 L7.4 16.8'}"/></svg>`;
  /* the founders' own painted portraits (the poster frame of each animated portrait) */
  const fsrc=m=>`media/founder-${m.toLowerCase()}-anim.jpg`;
  const com=t=>S.coImg(t,'t3-lg');
  const coName=e=>`${esc(e.co)} (${esc(S.tk?S.tk(e.t):e.t)})`;
  /* ---- mount: keep helper h's live structure; replace what is inside each piece ---- */
  const build=(id,P)=>{const cv=D.querySelector('#wc-book .wc-cover.sh-h1');if(!cv)return null;H.classList.add('t3-on','t3-'+id+'-on');cv.classList.add('t3','t3-'+id);
    const T={lead,ex1,ex2,nd,pnl,money,dayWord,letters,cap,plate,frame,burst,balloon,arrow,stamp,fsrc,com,coName,esc,NM,STAR,IMG,CUT,S,pass,uid:()=>++uid,R,slab};
    /* the issue strip */
    const iss=cv.querySelector('.sh-iss');iss.className='sh-iss t3-is';iss.innerHTML=P.issue(T);
    /* Starring: the four founders as one object family; names only, never numbers */
    const cb=cv.querySelector('.sh-cb');cb.className='sh-cb t3-st';
    cb.innerHTML=`<p class="t3-sth">${P.starH?P.starH(T):letters('Starring')}</p><ul class="t3-stl">${STAR.map((m,i)=>`<li class="t3-stm${m===lead?' is-ld':''}">${P.token(T,m,'st')}<b class="t3-stn">${esc(NM[m])}</b></li>`).join('')}</ul>`;
    /* the headline: same words; the loudest treatment of the section */
    const h1=cv.querySelector('.wc-h1');h1.classList.add('t3-h1');h1.setAttribute('aria-label','4 AIs trade earnings. Who calls it best?');h1.innerHTML=P.head(T);
    /* the loop: four steps (owner, 31 Oct: predict before earnings, the bell grades them, top P&L gets the golden ticket, we follow its call on the bet) */
    const CAPS=[[['Each AI predicts the move'],['before','kw'],['earnings']],[['The closing bell grades every prediction']],[['Top P&L wins the golden ticket']],[['We follow its call on the bet']]];
    const pics=[P.p1(T),P.p2(T),P.p3(T),P.p4(T)];
    cv.querySelectorAll('.sh-p').forEach((p,i)=>{p.classList.add('t3-p','t3-p'+(i+1));p.innerHTML=`<p class="sh-c t3-c">${P.num(T,i+1)}${P.capbox?P.capbox(T,cap(CAPS[i]),i):`<span class="t3-ct">${cap(CAPS[i])}</span>`}</p><div class="sh-vw t3-vw">${pics[i]}</div>${frame(30+i*17)}`});
    cv.querySelectorAll('.sh-ar').forEach((a,i)=>{a.className='sh-ar t3-arw t3-arw-'+['r','d','l','u'][i];a.innerHTML=arrow(i)});
    const hub=cv.querySelector('.sh-hub');hub.className='sh-hub t3-hub';hub.innerHTML=P.hub(T);
    /* the film stays as it is live (F3 frame); the button is the last beat */
    cv.querySelectorAll('.sh-nxb').forEach(b=>{b.classList.add('t3-btn');b.innerHTML=P.btn(T)});
    if(P.after)P.after(T,cv);
    window.__t3={take:id,lead,ex1:ex1.t+'#'+ex1.n+(ex1.pending?' pending':' graded'),calls:ex1.calls.map(c=>c.m+(c.up?'+':'-')+c.sz).join(' '),ex2:ex2.t+' '+ex2.a,pass:ex2.calls.map(c=>c.m+(pass(c,ex2.a)?':P':':F')).join(' '),leadPnl:pnl(lead),next:nd,graded:ROUNDS.length};
    return cv};
  const ready=()=>{H.classList.add('t3-ready')};
  /* the page's fonts for the takes (loaded before the headline is measured) */
  const font=(fams)=>new Promise(res=>{const l=D.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?'+fams.map(f=>'family='+f).join('&')+'&display=block';l.onload=()=>Promise.all(fams.map(f=>D.fonts.load('40px "'+f.split(':')[0].replace(/\+/g,' ')+'"'))).then(res,res);l.onerror=res;D.head.append(l)});
  return {build,ready,font,lead,pnl,money}})();
