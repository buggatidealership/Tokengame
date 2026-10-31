/* T4 The vault's light reaches up: before you see the vault, its light gets to you. A beam leaves the painting's top edge
   above the vault's mouth and climbs into the gutter, and you see it only where it lands: the rain in its path turns gold
   (the rain outside it stays cream), and Smart or lucky's last panel and its caption catch a warm rim of light on their
   bottom edges, brightest straight above the vault. No glow blob, no rays: lit things only. It brightens as the vault comes
   up the screen (opacity only), the gold rain falls by transform. Reduced motion: the light is on, the rain still. */
H7.ready(()=>{const ov=H7.over('t4-ov');let G=null;
 const build=()=>{const g=H7.geo(),W=g.vw,top=Math.round(g.S.b-Math.min(150,g.vh*.2)),H=Math.round(g.G.t+6-top),mx=g.mouth.x,sb=g.S.b-top,cb=g.C.b-top,gt=g.G.t-top;
   const rn=H7.rain(W,H,Math.round(W*H/1500),13,.9).replace(/^<svg[^>]*>|<\/svg>$/g,'');
   const beam=`M${(mx-26).toFixed(0)} ${gt}L${(mx+34).toFixed(0)} ${gt}L${(mx+150).toFixed(0)} ${sb-30}L${(mx-160).toFixed(0)} ${sb-30}Z`;
   ov.style.cssText=`top:${top}px;width:${W}px;height:${H}px;--h:${H}px`;
   ov.innerHTML=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>
     <linearGradient id="t4b" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
     <mask id="t4m"><path d="${beam}" fill="url(#t4b)"/></mask>
     <radialGradient id="t4r" cx="${mx}" cy="${sb}" r="${Math.max(220,W*.42)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffd36a"/><stop offset=".55" stop-color="#ffb43a" stop-opacity=".55"/><stop offset="1" stop-color="#ff9a20" stop-opacity="0"/></radialGradient></defs>
    <g class="t4-l"><g mask="url(#t4m)"><g class="t4-rn" stroke="#ffcf5a">${rn.replace(/stroke="#efe7cf"/,'')}<g transform="translate(0 -${H})">${rn}</g></g></g>
     <rect x="${g.S.l}" y="${sb-2.5}" width="${g.S.w}" height="3" fill="url(#t4r)"/>
     <rect x="${g.S.l}" y="${sb-26}" width="${g.S.w}" height="24" fill="url(#t4r)" opacity=".18" class="t4-wash"/>
     <rect x="${g.C.l}" y="${cb-2}" width="${g.C.w}" height="2.5" fill="url(#t4r)" opacity=".9"/></g></svg>`;G={...g,top}};
 build();addEventListener('resize',()=>{clearTimeout(build.t);build.t=setTimeout(build,150)});
 H7.scroll(Y=>{if(!G)return;const p=H7.RM?1:H7.clamp((Y-(G.seam-G.vh*.95))/(G.vh*.55),0,1);ov.querySelector('.t4-l').style.opacity=p.toFixed(3)});
 window.__h7Range=()=>[G.seam-G.vh*1.05,G.seam-G.vh*.3];window.__h7Still=()=>Math.round(G.W.t+G.G.h+90-G.vh)});
