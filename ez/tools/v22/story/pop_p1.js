/* X3+ pop look P1 (owner, 2026-10-31: "pop ticket, P1 level 4. Pop stub as well."; from tools/concepts/worlds/comic/story/y/p/p1.js).
   Meet the models: today's Season 1 ticket and waving flag, every element rebuilt in the pop cover's recipe (extruded, lit, outlined)
   on the cover's orange rays. Every round so far: the art whole on top, the move extruded on a green or red ray stub, the winner's
   coin, the company with its ticker, on electric blue rays. The flag pops too (owner: "make the animated flag in the background
   also pop"): flat bright stripes, a bold ink outline, halftone only in the folds' shade, a lit edge on the crests; it waves with the
   page's own transform loop (no new loop). Built when the comic is up; rebuilt when the book is redrawn, the width changes, or
   "Show all" opens more tiles. Everything that touches the page's own elements is gated by html.p1-on (set here, X3+ only). */
(function(){const H=document.documentElement,P=POP,INK=P.INK,TAKE='p1';
const GOLD=P.G.gold,REDF=P.G.red,GRN=P.G.green;
function el(h){const t=document.createElement('template');t.innerHTML=h.trim();return t.content.firstChild}

/* the flags in the pop recipe: the page's own wave (stripes 160px wide, a sine of 6px, slid by world-comic.css) redrawn flat and bright with a bold ink outline */
let FV='';
function flagVars(){if(FV)return FV;const enc=x=>"url('data:image/svg+xml,"+encodeURIComponent(x)+"')",FP=160,FA=6;
  const stripes=(cols,n,Hh)=>{const h=Hh/n;let x=`<svg xmlns="http://www.w3.org/2000/svg" width="${FP}" height="${Hh}" viewBox="0 ${-FA} ${FP} ${Hh+2*FA}" preserveAspectRatio="none">`;
    const wy=(px,k)=>k*h+FA*Math.sin(2*Math.PI*px/FP);
    for(let k=-1;k<=n;k++){let d='';for(let px=0;px<=FP;px+=4)d+=(px?'L':'M')+px+' '+wy(px,k).toFixed(2);for(let px=FP;px>=0;px-=4)d+='L'+px+' '+wy(px,k+1).toFixed(2);
      x+=`<path d="${d}Z" fill="${cols[(k+n*2)%cols.length]}" stroke="#0d0b10" stroke-width="2.6" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`}
    return enc(x+'</svg>')};
  const st=(cx,cy,r,f,w)=>{const q=[];for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.42:r;q.push((cx+rr*Math.cos(a)).toFixed(2)+','+(cy+rr*Math.sin(a)).toFixed(2))}return `<polygon points="${q.join(' ')}" fill="${f}" stroke="#0d0b10" stroke-width="${w}" stroke-linejoin="round"/>`};
  let us=`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="140" viewBox="0 0 200 140"><defs><linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f86ff"/><stop offset="1" stop-color="#1f4fd6"/></linearGradient></defs><rect x="2" y="2" width="196" height="136" fill="url(#c)" stroke="#0d0b10" stroke-width="5"/>`;
  for(let r=0;r<5;r++)for(let c=0;c<6;c++){const px=18+c*33+(r%2?16:0),py=16+r*27;if(px<192)us+=st(px,py,9,'#ffffff',2.2)}
  const cn=`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="140" viewBox="0 0 200 140">${st(50,50,32,'#ffd21f',3.4)}${st(100,18,11,'#ffd21f',2.4)}${st(122,40,11,'#ffd21f',2.4)}${st(122,70,11,'#ffd21f',2.4)}${st(100,92,11,'#ffd21f',2.4)}</svg>`;
  return FV=`--fl-us:${stripes(['#ff3a31','#ffffff'],13,260)};--fl-cn:${stripes(['#ff3a31','#f0261d'],13,260)};--fl-usc:${enc(us+'</svg>')};--fl-cnc:${enc(cn)}`}

/* ---------------- Meet the models ---------------- */
function chars(D){const sec=document.querySelector('.wc-chars');if(!sec)return;const old=sec.querySelector('.wc-ch-grid'),h2=sec.querySelector('h2');
  sec.querySelectorAll('.pp1-ttl,.pp1-grid').forEach(n=>n.remove());
  sec.classList.add('pp-mod','pp1-mm');h2.classList.add('pp-sr');old.classList.add('pp-sr');old.setAttribute('aria-hidden','false');old.style.display='none';
  const W=sec.clientWidth-24;
  const ttl=el(`<div class="pp-ttl pp1-ttl" aria-hidden="true"></div>`);
  ttl.insertAdjacentHTML('beforeend',P.ext('MEET THE',{size:44,fill:'gold',shade:'#7a0c06',max:W*.72,rot:-3,cls:'pp1-t1'}));
  ttl.insertAdjacentHTML('beforeend',P.ext('MODELS',{size:74,fill:'red',shade:'#7a0c06',max:W*.86,rot:-3,depth:8,cls:'pp1-t2'}));
  ttl.insertAdjacentHTML('beforeend',`<p class="pp-tag pp1-tag">Not the Instagram kind.<br>Ranked by P&amp;L: $100K on every call.</p>`);
  sec.insertBefore(ttl,old);
  const grid=el(`<div class="pp1-grid" style="${flagVars()}"></div>`);sec.insertBefore(grid,old);
  D.models.forEach((x,i)=>{const fl=old.querySelector(`article[data-m="${x.m}"] .wc-flg`);
    const c=el(`<article class="pp1-c pp1-r${i+1}" data-m="${x.m}"><div class="pp1-stub"><span class="pp1-rk"></span><span class="pp1-adm"></span></div><div class="pp1-fl"></div>
      <div class="pp1-top"><span class="pp1-coin"></span><div class="pp1-nm"><span class="pp1-name"></span><span class="pp1-ver">${P.esc(x.ver)}</span><span class="pp1-role"></span></div></div>
      <div class="pp1-cap"><div class="pp1-pl"><span class="pp1-lab">Current P&amp;L</span><span class="pp1-plv"></span></div>
        <div class="pp1-row"><div class="pp1-rw pp1-chipx"><span class="pp1-lab">Right way</span><span class="pp1-rwv"></span></div><div class="pp1-best pp1-chipx"></div></div>
        <div class="pp1-l5"><span class="pp1-lab">Last 5</span><span class="pp1-tiles"></span></div></div></article>`);
    if(fl)c.querySelector('.pp1-fl').appendChild(fl.cloneNode(true));grid.appendChild(c)});
  /* second pass: sized to the boxes the layout gave */
  [...grid.children].forEach((c,i)=>{const x=D.models[i],cw=c.querySelector('.pp1-cap').clientWidth,top=c.querySelector('.pp1-top').clientWidth,sm=cw<240;
    c.querySelector('.pp1-rk').innerHTML=P.ext('#'+(i+1),{size:sm?26:30,fill:i===0?'gold':'cream',shade:i===0?'#7a2a06':'#3d0a07',depth:4});
    c.querySelector('.pp1-adm').innerHTML=P.ext(i===0?'GOLDEN TICKET':'SEASON 1',{font:'Bangers',size:sm?13:15,fill:i===0?'gold':'cream',shade:'#3d0a07',depth:2,sw:2.2,hl:false});
    const csz=sm?56:66;c.querySelector('.pp1-coin').innerHTML=P.coin(x.m,csz,{holo:i===0});
    const stack=matchMedia('(min-width:1000px)').matches,nmax=stack?top-6:top-csz-18;const mc=P.mcol(x.m),nf=x.m==='GROK'?['#8d8796','#3a3540','#15121a']:[P.lighten(mc,.55),mc,P.shade(mc,.72)];
    c.querySelector('.pp1-name').innerHTML=P.ext(x.name.toUpperCase(),{size:stack?52:(sm?34:40),fill:nf,shade:x.m==='GROK'?'#000':P.shade(mc,.4),max:nmax,depth:5});
    const roles=['WE BET ON ITS CALL','IN THE HUNT','IN THE HUNT','LAST PLACE'];
    c.querySelector('.pp1-role').innerHTML=`<b class="pp1-chip pp1-chip${i===0?'g':i===3?'r':'k'}">${roles[i]}</b>`;
    const up=x.pnl>=0;const pl=P.ext(P.pm(x.pnl),{size:sm?36:42,fill:up?'green':'red',shade:up?'#053b20':'#5e0703',max:cw-28,depth:6,cls:'pp1-cnt'});
    c.querySelector('.pp1-plv').innerHTML=pl;P.countUp(c.querySelector('.pp1-plv svg'),Math.abs(x.pnl),up?'+':'−',x.m);
    c.querySelector('.pp1-rwv').innerHTML=P.ext(`${x.W}/${x.tot}`,{size:sm?24:28,max:stack?(cw-7)/2-18:cw*.42,fill:'gold',shade:'#7a0c06',depth:3});
    c.querySelector('.pp1-tiles').innerHTML=x.last5.map(s=>`<i class="pp1-t ${s==='W'?'pp1-tw':'pp1-tl'}"><svg viewBox="0 0 20 20" aria-hidden="true">${s==='W'?'<path d="M4.5 10.5l3.8 3.8L15.8 6" fill="none" stroke="#0d0b10" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 10.5l3.8 3.8L15.8 6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M5.5 5.5l9 9M14.5 5.5l-9 9" fill="none" stroke="#0d0b10" stroke-width="5.4" stroke-linecap="round"/><path d="M5.5 5.5l9 9M14.5 5.5l-9 9" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>'}</svg></i>`).join('');
    const b=x.best,bu=b.v>=0;
    c.querySelector('.pp1-best').innerHTML=`<span class="pp1-lab">Best call</span>${P.ext(P.pm(b.v),{size:sm?20:24,fill:bu?'green':'red',shade:bu?'#053b20':'#5e0703',depth:3,max:stack?(cw-7)/2-18:cw*.52})}<span class="pp1-bc">${P.esc(b.r.co)} (${P.esc(b.r.ticker)})</span>`;
    c.insertAdjacentHTML('afterbegin',`<p class="pp-sr">#${i+1} ${x.name}, ${P.esc(x.ver)}. ${roles[i].toLowerCase()}. Current P&amp;L ${P.pm(x.pnl)}. Right way on ${x.W} of ${x.tot} calls. Highest P&amp;L ${P.pm(b.v)} on ${P.esc(b.r.co)}. Last five: ${x.last5.map(s=>s==='W'?'right':'wrong').join(', ')}.</p>`);
  })}

/* ---------------- Every round so far ---------------- */
function season(D){const sec=document.querySelector('.wc-season');if(!sec)return;const h2=sec.querySelector('h2'),bis=sec.querySelector('.wc-bis'),more=sec.querySelector('.wc-more');
  sec.querySelectorAll('.pp1-ttl').forEach(n=>n.remove());sec.classList.add('pp-mod','pp1-ms');h2.classList.add('pp-sr');
  const W=sec.clientWidth-24,ttl=el(`<div class="pp-ttl pp1-ttl" aria-hidden="true"></div>`);
  ttl.insertAdjacentHTML('beforeend',P.ext('EVERY ROUND',{size:50,fill:'gold',shade:'#0b2366',max:W*.8,rot:-3,depth:6}));
  ttl.insertAdjacentHTML('beforeend',P.ext('SO FAR',{size:66,fill:'pink',shade:'#4a0420',max:W*.6,rot:-3,depth:8}));
  ttl.insertAdjacentHTML('beforeend',`<p class="pp-tag pp1-tag">Newest first. Tap one to open its graded card.</p>`);sec.insertBefore(ttl,bis);
  bis.classList.add('pp1-bis');const RR={};D.rounds.forEach(r=>RR[r.n]=r);
  bis.querySelectorAll('.wc-bi').forEach(a=>{a.querySelectorAll('.pp1-stb').forEach(n=>n.remove());const r=RR[+(a.getAttribute('href')||'').replace(/\D/g,'')];if(!r)return;a.classList.add('pp1-bi');
    const up=r.a>0;a.classList.toggle('pp1-up',up);a.classList.toggle('pp1-dn',!up);
    a.insertAdjacentHTML('beforeend',`<span class="pp1-stb" data-n="${r.n}"><span class="pp1-sh"><span class="pp1-no"></span><span class="pp1-won"></span></span><span class="pp1-mv"></span><span class="pp1-co">${P.esc(r.co)} <small>(${P.esc(r.ticker)})</small></span></span>`)});
  if(more&&!more.dataset.pp1){more.dataset.pp1=1;more.classList.add('pp1-more');more.addEventListener('click',()=>requestAnimationFrame(()=>fillTiles(RRm())))}
  fillTiles(RR)}
function fillTiles(RR){document.querySelectorAll('.pp1-bis .pp1-stb').forEach(s=>{if(s.dataset.ok||!s.offsetParent)return;const r=RR[s.dataset.n],w=s.clientWidth,sm=w<150,xs=w<110;s.dataset.ok=1;
  const up=r.a>0,Wn=P.winners(r),cs=Wn.length>1?(xs?17:sm?19:26):(xs?20:sm?23:30),ls=xs?10.5:sm?12:14;
  s.querySelector('.pp1-no').innerHTML=P.ext('#'+r.n,{size:xs?15:sm?17:21,fill:'gold',shade:'#7a2a06',depth:xs?2:3});
  s.querySelector('.pp1-won').innerHTML=Wn.length?`<span class="pp1-ws">${Wn.map(m=>P.coin(m,cs,{dp:2})).join('')}</span>${P.ext(Wn.length>1?'TIE':'WON',{font:'Bangers',size:ls,fill:'cream',shade:'#3d0a07',depth:2,sw:xs?1.8:2,hl:false})}`
    :`<i class="pp1-nob"><svg viewBox="0 0 20 20"><path d="M5 5l10 10M15 5L5 15" stroke="#0d0b10" stroke-width="6" stroke-linecap="round"/><path d="M5 5l10 10M15 5L5 15" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg></i>${P.ext('NOBODY',{font:'Bangers',size:ls-1,fill:'cream',shade:'#3d0a07',depth:2,sw:2,hl:false})}`;
  s.querySelector('.pp1-mv').innerHTML=P.ext((up?'+':'−')+P.pct(r.a),{size:sm?24:30,fill:'white',shade:up?'#053b20':'#5e0703',depth:xs?3:4,max:w-14})})}
function depth(){const X=(sel,dp,sh,o)=>document.querySelectorAll(sel).forEach(n=>n.style.boxShadow=P.xbox(dp,sh,o));
  X('.pp1-mm',7,'#6e1e04',{bw:3,cast:4,hl:3});X('.pp1-ms',7,'#0b2366',{bw:3,cast:4,hl:3});
  X('.pp1-c',6,'#3a0a05',{bw:2.5,cast:4});X('.pp1-cap',4,'#8a5200',{bw:2});X('.pp1-chip',3,'#3d0a07',{bw:1.5,hl:1.5,lo:2});
  X('.pp1-rw',3,'#0b2366',{bw:2,hl:1.5,lo:2});X('.pp1-best',3,'#4a0420',{bw:2,hl:1.5,lo:2});X('.pp1-t',3,'#3d0a07',{bw:1.5,hl:1.5,lo:2});
  X('.pp1-bi',5,'#071640',{bw:2.5,cast:3,hl:0,ha:0,la:0})}
let D0=null;
function data(){return D0||(D0=P.data())}
function sizeOk(n){return n&&n.offsetParent&&n.clientWidth>0}
/* build what is missing: the cast grid, the stubs on any tile without one (the book redrawn, "Show all"), then the visible tiles' faces */
function ensure(force){const ch=document.querySelector('#wc-book .wc-chars'),se=document.querySelector('#wc-book .wc-season');let did=false;
  if(ch&&sizeOk(ch)&&ch.querySelector('.wc-ch-grid .wc-flg')&&(force||!ch.querySelector('.pp1-grid'))){chars(data());did=true}
  if(se&&sizeOk(se)&&se.querySelector('.wc-bis .wc-bi')){if(force||se.querySelector('.wc-bis .wc-bi:not(.pp1-bi)')||!se.querySelector('.pp1-ttl')){season(data());did=true}else fillTiles(RRm())}
  if(did)depth()}
let RRc=null;function RRm(){if(!RRc){RRc={};data().rounds.forEach(r=>RRc[r.n]=r)}return RRc}
function start(){H.classList.add('p1-on');ensure(true);H.classList.add('p1-ready');
  const book=document.getElementById('wc-book');let t=0;
  const mine=n=>n&&n.nodeType===1?!!(n.closest&&n.closest('.pp1-grid,.pp1-ttl,.pp1-stb')):!!(n&&n.parentElement&&n.parentElement.closest('.pp1-grid,.pp1-ttl,.pp1-stb'));
  if(book)new MutationObserver(rs=>{if(rs.every(r=>mine(r.target)))return;clearTimeout(t);t=setTimeout(()=>ensure(false),120)}).observe(book,{childList:true,subtree:true,attributes:true,attributeFilter:['data-all']});
  /* back on the Overview, or the book shown again */
  new MutationObserver(()=>{clearTimeout(t);t=setTimeout(()=>ensure(false),120)}).observe(H,{attributes:true,attributeFilter:['data-sec']});
  addEventListener('hashchange',()=>setTimeout(()=>ensure(false),300));
  let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth===w0)return;w0=innerWidth;clearTimeout(start.r);start.r=setTimeout(()=>ensure(true),250)})}
/* wait for the comic: the world drawn, the cast grid with its flags, the round tiles */
(function wait(n){if(H.classList.contains('x2p-world')&&!H.classList.contains('cd-on')&&document.querySelector('#wc-book .wc-chars .wc-ch-grid .wc-flg')&&document.querySelector('#wc-book .wc-season .wc-bis .wc-bi')&&window.__x2pPnl&&window.ROUNDS)P.fonts().then(start,e=>{console.error(e);start()});else if(n<480)setTimeout(()=>wait(n+1),250)})(0);
})();
