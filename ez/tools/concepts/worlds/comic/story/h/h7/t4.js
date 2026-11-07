/* T4 The vault's light reaches up: before you see the vault, its light gets to you. A beam leaves the painting's top edge
   above the vault's mouth and climbs into the gutter, and you see it only where it lands: the rain in its path turns gold
   (the rain outside it stays cream), and Smart or lucky's last panel and its caption catch a warm rim of light on their
   bottom edges, brightest straight above the vault. No glow blob, no rays: lit things only. It brightens as the vault comes
   up the screen (opacity only), the gold rain falls by transform. Reduced motion: the light is on, the rain still. */
H7.ready(()=>{const ov=H7.over('t4-ov');let G=null;
 const build=()=>{const g=H7.geo(),W=g.vw,top=Math.round(g.S.b-Math.min(150,g.vh*.2)),H=Math.round(g.G.t+6-top),mx=g.mouth.x,sb=g.S.b-top,cb=g.C.b-top,gt=g.G.t-top;
   const rn=H7.rain(W,H,Math.round(W*H/450),13,1).replace(/^<svg[^>]*>|<\/svg>$/g,'');
   const beam=`M${(mx-40).toFixed(0)} ${gt}L${(mx+48).toFixed(0)} ${gt}L${(mx+170).toFixed(0)} 0L${(mx-180).toFixed(0)} 0Z`;
   ov.style.cssText=`top:${top}px;width:${W}px;height:${H}px;--h:${H}px`;
   ov.innerHTML=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>
     <linearGradient id="t4b" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
     <mask id="t4m"><path d="${beam}" fill="url(#t4b)"/></mask>
     <radialGradient id="t4r" cx="${mx}" cy="${sb}" r="${Math.max(220,W*.42)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffd36a"/><stop offset=".55" stop-color="#ffb43a" stop-opacity=".55"/><stop offset="1" stop-color="#ff9a20" stop-opacity="0"/></radialGradient><linearGradient id="t4v" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity="1"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient><mask id="t4w"><rect x="0" y="${sb-34}" width="${W}" height="32" fill="#fff"/></mask><radialGradient id="t4u" cx="${mx}" cy="${sb}" r="${Math.max(200,W*.4)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffc24a" stop-opacity=".5"/><stop offset="1" stop-color="#ff9a20" stop-opacity="0"/></radialGradient></defs>
    <g class="t4-l"><g mask="url(#t4m)"><g class="t4-rn" stroke="#ffcf5a">${rn.replace(/stroke="#efe7cf"/,'')}<g transform="translate(0 -${H})">${rn}</g></g></g>
     <rect x="${g.S.l}" y="${sb-2.5}" width="${g.S.w}" height="3" fill="url(#t4r)"/>
     <rect x="${g.S.l}" y="${sb-34}" width="${g.S.w}" height="32" fill="url(#t4u)" class="t4-wash"/><ellipse cx="${mx}" cy="${(sb+(g.seam-top))/2}" rx="${Math.max(120,W*.3)}" ry="${Math.max(8,(g.seam-top-sb)/2)}" fill="url(#t4r)" opacity=".28"/>
     <rect x="${g.C.l}" y="${cb-2}" width="${g.C.w}" height="2.5" fill="url(#t4r)" opacity=".9"/></g></svg>`;G={...g,top}};
 build();addEventListener('resize',()=>{clearTimeout(build.t);build.t=setTimeout(build,150)});
 H7.scroll(Y=>{if(!G)return;const p=H7.RM?1:H7.clamp((Y-(G.seam-G.vh*.95))/(G.vh*.55),0,1);ov.querySelector('.t4-l').style.opacity=p.toFixed(3)});
 window.__h7Range=()=>[G.seam-G.vh*1.05,G.seam-G.vh*.3];window.__h7Still=()=>Math.round(G.W.t+G.G.h+90-G.vh)});
