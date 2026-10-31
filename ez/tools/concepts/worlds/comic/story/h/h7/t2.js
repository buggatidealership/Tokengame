/* T2 The page tears: Smart or lucky's gold page ends in a torn edge instead of a ruled seam; through the tear the black night
   of the next page shows, with its rain already falling. As you scroll on, the strip below the tear comes away and drops into
   the rain: you are tearing into the next page. The torn edge is hand-cut (a seeded jagged line, every tooth its own size),
   with the paper's lighter core showing along it and loose fibres. The falling strip moves by transform and opacity only;
   the rain loops by transform. Reduced motion: the page stays torn, nothing falls or rains. */
H7.ready(()=>{const ov=H7.over('t2-ov');let G=null,strip=null;
 const build=()=>{const g=H7.geo(),W=g.vw,top=Math.round(g.S.b-4),H=Math.round(g.W.t+2-top),r=H7.rng(17);
   /* the tear: x steps of 5..17px, y wandering in a 13px band below the panel */
   const pts=[];let x=-4,y=8+r()*6;while(x<W+20){pts.push([x,y]);x+=5+r()*12;y=H7.clamp(y+(r()-.5)*11+(r()<.12?(r()-.5)*14:0),4,19)}
   const line=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join('');
   const core=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+(p[1]-1.6-r()*2.4).toFixed(1)).join('')+pts.slice().reverse().map(p=>'L'+p[0].toFixed(1)+' '+p[1].toFixed(1)).join('')+'Z';
   let hairs='';pts.forEach(p=>{if(r()<.55){const l=2+r()*5,a=(r()-.5)*1.6;hairs+=`<path d="M${p[0].toFixed(1)} ${p[1].toFixed(1)}l${(a*l).toFixed(1)} ${l.toFixed(1)}"/>`}});
   const rn=H7.rain(W,H,Math.round(W/9),5,.42).replace(/^<svg[^>]*>|<\/svg>$/g,''),black=line+`L${W+20} ${H}L-4 ${H}Z`,seam=g.seam-top,piece=line+`L${W+20} ${seam+1}L-4 ${seam+1}Z`;
   ov.style.cssText=`top:${top}px;width:${W}px;height:${H}px;--h:${H}px`;
   ov.innerHTML=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><clipPath id="t2c"><path d="${black}"/></clipPath></defs>
    <path d="${black}" fill="#04070e"/>
    <g clip-path="url(#t2c)"><g class="t2-rn">${rn}<g transform="translate(0 -${H})">${rn}</g></g></g>
    <g class="t2-pc"><path d="${piece}" fill="#1d1505"/><path d="M-4 ${seam}H${W+20}" stroke="#000" stroke-width="2"/></g>
    <path d="${core}" fill="#5e4a1c"/><g stroke="#8a6d2c" stroke-width=".8" fill="none" opacity=".9">${hairs}</g></svg>`;
   strip=ov.querySelector('.t2-pc');G=g};
 build();addEventListener('resize',()=>{clearTimeout(build.t);build.t=setTimeout(build,150)});
 H7.scroll(Y=>{if(!G)return;const p=H7.RM?1:H7.clamp((Y-(G.seam-G.vh*.78))/(G.vh*.3),0,1);
   strip.style.transform=`translate(${p*14}px,${p*p*70}px) rotate(${p*3.5}deg)`;strip.style.opacity=1-p*p});
 window.__h7Range=()=>[G.seam-G.vh*.95,G.seam-G.vh*.3];window.__h7Still=()=>Math.round(G.W.t+G.G.h+90-G.vh)});
