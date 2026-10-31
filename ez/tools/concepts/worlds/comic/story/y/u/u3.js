/* U3 · The fight bill: the tab as one printed boxing bill on purple rays, no boxes. At the top the next main event at level 5:
   its blown-up mark drifting inside a jagged burst, the name extruded huge in the brand's own colours, the four AIs below it
   (bulls against bears once the calls are in). Then each night as a ribbon and its rounds as lines of the bill, headliner first:
   every company's name extruded in its own brand colour, its logo on a coin before it, the four AIs' calls under it. */
(function(){const U=UU,{P,S,esc,X}=U,TAKE='u3';
const STARS=(W,H,n,sd)=>{let s='';const r=(k=>()=>(k=(k*9301+49297)%233280)/233280)(sd||3);for(let i=0;i<n;i++){const x=r()*W,y=r()*H,rr=5+r()*7;s+=P.star(x,y,rr,i%3?'#ffd21f':'#fff3d0')}return `<svg class="uu3-st" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">${s}</svg>`};
async function build(){const L=U.list(),DS=U.days(L),C=U.counts(L);await Promise.all(L.map(x=>U.brand(x.ticker)));const B={};for(const x of L)B[x.ticker]=(await U.brand(x.ticker)).hx||'#2b2733';
  const root=U.mount('uu3');const W0=root.clientWidth,desk=matchMedia('(min-width:1000px)').matches,sm=W0<360;
  const nf=h=>({fill:U.fillOf(h),shade:U.shOf(h)});
  const head=DS.find(d=>d.k!=='wait'),hx=head.items[0],hl=S.dayLab(head.k);
  /* the burst that holds the main event's art: the same jagged polygon as an svg underlay and as the art's clip */
  const BW=desk?440:Math.min(W0-24,360),BH=desk?330:Math.round(BW*.78),pts=P.burst(0,0,1,.8,14,hx.n).split(' ').map(p=>p.split(',').map(Number));
  const clip='polygon('+pts.map(([x,y])=>`${(50+x*50).toFixed(2)}% ${(50+y*50).toFixed(2)}%`).join(',')+')';
  const pin=pts.map(([x,y])=>`${(BW/2+x*BW/2*.98).toFixed(1)},${(BH/2+y*BH/2*.98).toFixed(1)}`).join(' ');
  const top=`<section class="uu3-top" aria-label="Next main event"><div class="uu3-tt" aria-hidden="true">${X(hl.a==='Today'?'TONIGHT':hl.a==='Tomorrow'?'TOMORROW':hl.a.toUpperCase(),{size:desk?40:30,fill:'cream',shade:'#3b0b5c',depth:4,rot:-3})}${X('MAIN EVENT',{size:desk?60:44,fill:'gold',shade:'#7a0c06',depth:7,rot:-3,fit:1})}</div>
      <div class="uu3-hero"><div class="uu3-bw" style="width:${BW}px;height:${BH}px"><svg class="uu3-bu" viewBox="0 0 ${BW} ${BH}" aria-hidden="true"><polygon points="${pin}" transform="translate(9 9)" fill="#0d0b10"/><polygon points="${pin}" fill="#0d0b10"/></svg>
        <span class="uu-art uu3-art" data-t="${esc(hx.ticker)}" style="clip-path:${clip}"></span><svg class="uu3-st" viewBox="0 0 ${BW} ${BH}" aria-hidden="true">${[[.07,.1,11],[.93,.12,9],[.05,.86,8],[.95,.88,12],[.16,.03,6]].map(([a,b,r],i)=>P.star(a*BW,b*BH,r,i%2?'#fff3d0':'#ffd21f')).join('')}</svg></div>
      <div class="uu3-hn"><a class="uu3-hl" href="#/round/${hx.n}" data-n="${hx.n}" data-m7="${hx.m7?1:0}" data-ai="${hx.ai?1:0}"><span class="pp-sr">Next main event: ${esc(hx.co)} (${esc(hx.ticker)}), round ${hx.n}. ${hx.locked?'Calls locked. '+esc(U.bell(hx))+'.':'Calls due '+esc(U.due(hx))+'.'}</span>
        <span class="uu3-hnm" aria-hidden="true">${X(hx.co.toUpperCase(),{size:desk?70:52,...nf(B[hx.ticker]),depth:8,fit:1,min:20})}</span>
        <span class="uu3-hm"><span class="uu-tk">(${esc(hx.ticker)}) · Round ${hx.n} · ${esc(hl.b)}</span>${U.badge(hx,62,36)}</span>
        <span class="uu3-hc">${U.calls(hx,desk?38:sm?28:32,{vs:true})}</span><span class="uu3-hf">${U.foot(hx)}</span></a></div></div></section>`;
  const line=(x,big)=>`<a class="uu3-ln${big?' uu3-big':''}" href="#/round/${x.n}" data-n="${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" style="--b:${B[x.ticker]}">
      <span class="pp-sr">${esc(x.co)} (${esc(x.ticker)}), round ${x.n}.</span>
      <i class="uu-lc" data-t="${esc(x.ticker)}" style="--lc:${big?(desk?60:50):(desk?44:sm?34:38)}px"></i>
      <span class="uu3-lt"><span class="uu3-lnm" aria-hidden="true">${X(x.co.toUpperCase(),{size:big?(desk?44:sm?28:33):(desk?30:sm?20:23),...nf(B[x.ticker]),depth:big?6:4,fit:1,min:12})}</span>
        <span class="uu3-lm"><span class="uu-tk">(${esc(x.ticker)}) · R${x.n}</span>${U.badge(x,big?56:48,big?32:28)}</span>
        <span class="uu3-lc">${U.calls(x,big?(desk?28:24):(desk?22:sm?18:20),{vs:x.locked&&big})}</span></span></a>`;
  const day=({k,items:all})=>{const items=k===head.k?all.slice(1):all,isHead=k===head.k;if(!items.length)return '';const l=S.dayLab(k),lk=items.filter(x=>x.locked).length,first=items.find(x=>x.locked);
    const ft=lk?U.bell(first):k==='wait'?'Waiting on calls':'Calls due '+U.due(items[0]);
    return `<section class="uu3-day" data-day="${esc(k)}" aria-label="${esc(l.a+' '+l.b)}"><header class="uu3-rb"><span class="uu3-rd" aria-hidden="true">${X(l.a.toUpperCase(),{size:desk?36:sm?24:28,fill:'gold',shade:'#7a0c06',depth:5})}${k==='wait'?'':X(S.md(k).toUpperCase(),{size:desk?22:17,fill:'cream',shade:'#3d0a07',depth:3})}</span><h2 class="pp-sr">${esc(l.a)}, ${esc(l.b)}</h2><span class="uu-cnt uu3-cnt">${esc(ft)}</span></header>
      <div class="uu3-ls">${items.map((x,i)=>line(x,i===0&&k!=='wait'&&!isHead)).join('')}</div></section>`};
  root.innerHTML=`<section class="pp-mod uu3-mod">${top}
      <div class="uu3-bh"><span class="uu3-bt" aria-hidden="true">${X('THE CARD',{size:desk?64:46,fill:'pink',shade:'#4a0420',depth:7,rot:-2})}</span><h1 class="pp-sr">The card. ${C.all} rounds to come: ${C.lk} with calls in, ${C.tc} still to call.</h1>
        <p class="pp-tag uu3-tag">${C.all} rounds to come. Every AI calls before the report.<br>The close grades it. Headliners first.</p>${U.FLT}</div>
      ${DS.map(day).join('')}</section>`;
  U.fillX(root);U.filter(root);
  await Promise.all([...root.querySelectorAll('.uu3-art')].map(a=>U.paintArt(a,a.dataset.t,{kw:.6,kh:.56,cx:.5,cy:.5,rx:.5,ry:.5,ol:9,n:34})).concat([...root.querySelectorAll('.uu-lc')].map(c=>U.paintCoin(c,c.dataset.t))));
  root.querySelector('.uu3-mod').style.boxShadow=P.xbox(7,'#2a0a52',{bw:3,cast:4,hl:3});
  U.run(root);U.tickBells(root)}
window.Ucheck=()=>U.check('.uu3-ln,.uu3-hl');
U.boot(TAKE,build)})();
