/* U1 · Fight-night posters: one pop module per night on the cover's orange rays. The main event is its company's own card:
   the blown-up mark extruded and drifting on its brand rays, the name extruded under it (never over it), the four AIs as coins
   saying their calls in extruded balloons (bulls against bears once the calls are in). The undercard as brand slabs, each logo on a coin. */
(function(){const U=UU,{P,S,esc,X}=U,TAKE='u1';
async function build(){const L=U.list(),DS=U.days(L),C=U.counts(L);await Promise.all(L.map(x=>U.brand(x.ticker)));const B={};for(const x of L)B[x.ticker]=(await U.brand(x.ticker)).hx||'#2b2733';
  const root=U.mount('uu1');const W0=root.clientWidth,desk=matchMedia('(min-width:1000px)').matches,sm=W0<360;
  const bg=h=>{const [a,b]=U.tones(h);return `--b1:${a};--b2:${b};--bs:${U.shOf(h)}`};
  const cover=`<section class="pp-mod uu1-mod uu1-cv" aria-label="Next on the card"><div class="uu1-cvg">
      <div class="uu1-ttl" aria-hidden="true">${X('NEXT ON THE',{size:desk?54:40,fill:'gold',shade:'#7a0c06',rot:-3,cls:'uu1-t1'})}${X('CARD',{size:desk?96:74,fill:'red',shade:'#7a0c06',depth:8,rot:-3})}</div>
      <span class="uu1-iss" aria-hidden="true" style="width:${desk?128:104}px;height:${desk?118:96}px">${P.burstSvg(desk?128:104,desk?118:96,{n:13,dp:5,c1:'#ffd21f',c2:'#fff3a0',k:.78,seed:5})}<span class="uu1-isn">${X(String(C.all),{size:desk?44:36,fill:'red',shade:'#5e0703',depth:4})}<b>to come</b></span></span></div>
      <h1 class="pp-sr">Next on the card. ${C.all} rounds to come: ${C.lk} with calls in, ${C.tc} still to call.</h1>
      <p class="pp-tag uu1-tag">Every AI calls each stock <em>before</em> it reports.<br>The next close grades it. ${C.lk?`${C.lk} locked · `:''}${C.tc} still to call.</p>${U.FLT}</section>`;
  const under=x=>`<a class="uu1-u" href="#/round/${x.n}" data-n="${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" style="${bg(B[x.ticker])}">
      <span class="pp-sr">${esc(x.co)} (${esc(x.ticker)}), round ${x.n}.</span>
      ${desk?`<span class="uu-art uu1-ua uu1-sa" data-t="${esc(x.ticker)}"></span>`:`<i class="uu-lc" data-t="${esc(x.ticker)}" style="--lc:${sm?40:46}px"></i>`}
      <span class="uu1-un">${X(x.co.toUpperCase(),nm(B[x.ticker],{size:desk?26:sm?20:23,depth:4,fit:1,min:12}))}<span class="uu-tk">(${esc(x.ticker)}) · R${x.n}</span></span>${U.badge(x,58,34)}
      <span class="uu1-uc">${U.calls(x,desk?26:sm?20:x.locked?22:23)}</span></a>`;
  const main=x=>`<a class="uu1-m" href="#/round/${x.n}" data-n="${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" style="${bg(B[x.ticker])}">
      <span class="pp-sr">Main event: ${esc(x.co)} (${esc(x.ticker)}), round ${x.n}. ${x.locked?'Calls locked. '+esc(U.bell(x))+'.':'Calls due '+esc(U.due(x))+'.'}</span>
      <span class="uu-art uu1-art" data-t="${esc(x.ticker)}"></span>
      <span class="uu1-me" aria-hidden="true">${X(x.nv?'BET #1 · MAIN EVENT':'MAIN EVENT',{font:'Bangers',size:15,fill:'gold',shade:'#3d0a07',depth:2,sw:2.4,hl:false})}</span>
      <span class="uu1-mb"><span class="uu1-mn">${X(x.co.toUpperCase(),nm(B[x.ticker],{size:desk?50:sm?32:38,depth:6,fit:1,min:16}))}${U.badge(x,desk?78:66,desk?44:38)}</span>
      <span class="uu1-mt"><span class="uu-tk">(${esc(x.ticker)}) · Round ${x.n}</span>${U.foot(x)}</span>
      <span class="uu1-mc">${U.calls(x,desk?36:sm?27:31,{vs:true})}</span></span></a>`;
  const day=({k,items})=>{const l=S.dayLab(k),lk=items.filter(x=>x.locked).length,m=items[0],rest=k==='wait'?items:items.slice(1);
    return `<section class="pp-mod uu1-mod uu1-day" data-day="${esc(k)}" aria-label="${esc(l.a+' '+l.b)}"><header class="uu1-h">
      <span class="uu1-fn" aria-hidden="true">${X(k==='wait'?'ON HOLD':'FIGHT NIGHT',{font:'Bangers',size:15,fill:'cream',shade:'#3d0a07',depth:2,sw:2.4,hl:false})}</span>
      <span class="uu1-dn" aria-hidden="true">${X(l.a.toUpperCase(),{size:desk?60:sm?38:46,fill:'gold',shade:'#7a0c06',depth:6,rot:-2})}${k==='wait'?'':X(S.md(k).toUpperCase(),{size:desk?30:22,fill:'cream',shade:'#3d0a07',depth:3,rot:-2})}</span>
      <h2 class="pp-sr">${esc(l.a)}, ${esc(l.b)}</h2>
      <span class="uu-cnt uu1-cnt">${lk?lk+' locked':''}${lk&&items.length>lk?' · ':''}${items.length>lk?(items.length-lk)+' to call':''}</span></header>
      ${k==='wait'?'':main(m)}${rest.length?`<div class="uu1-ug" style="--n:${rest.length}">${rest.map(under).join('')}</div>`:''}</section>`};
  root.innerHTML=cover+DS.map(day).join('');
  U.fillX(root);U.filter(root);
  await Promise.all([...root.querySelectorAll('.uu1-ua')].map(a=>U.paintArt(a,a.dataset.t,{still:1,kw:.72,kh:.66,cx:.5,cy:.5,rx:.5,ry:.5,ol:5,n:24})).concat([...root.querySelectorAll('.uu1-art')].map(a=>U.paintArt(a,a.dataset.t,{kw:.8,kh:.74,cx:.58,cy:.5,rx:.6,ry:.5})).concat([...root.querySelectorAll('.uu-lc')].map(c=>U.paintCoin(c,c.dataset.t)))));
  /* the slabs' extrusions, in each brand's dark */
  root.querySelectorAll('.uu1-mod').forEach(n=>n.style.boxShadow=P.xbox(7,'#6e1e04',{bw:3,cast:4,hl:3}));
  root.querySelectorAll('.uu1-m').forEach(n=>n.style.boxShadow=P.xbox(6,getComputedStyle(n).getPropertyValue('--bs').trim(),{bw:2.5,cast:4,hl:2}));
  root.querySelectorAll('.uu1-u').forEach(n=>n.style.boxShadow=P.xbox(5,getComputedStyle(n).getPropertyValue('--bs').trim(),{bw:2.5,cast:3,hl:2}));
  U.run(root);U.tickBells(root)}
const nm=(h,o)=>U.nmO(h,o);
window.Ucheck=()=>U.check('.uu1-m,.uu1-u');
U.boot(TAKE,build)})();
