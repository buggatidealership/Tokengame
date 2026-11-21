/* T3 The night soaks through: before the vault arrives, its rain is already falling on the page. It starts in the gold ground
   beside and below Smart or lucky's panel, thickens toward the seam, and the gold ink of the page runs: drips hang from the
   seam into the black, each its own length with a wet bead and a lit edge, and lengthen as you scroll on. The rain sits
   behind the panels (it falls on the ground, never on words). Drips grow by scaleY, rain by transform; reduced motion keeps
   the drips at full length and the rain still. */
H7.ready(()=>{const ov=H7.over('t3-ov');let G=null;
 const build=()=>{const g=H7.geo(),W=g.vw,top=Math.round(g.seam-Math.min(260,g.vh*.32)),H=Math.round(g.W.t+14-top),sy=g.seam-top,r=H7.rng(29);
   let dr='';for(let x=6+r()*14;x<W-4;x+=14+r()*38){const l=6+r()*r()*48,w=2.2+r()*3.4;
     dr+=`<g class="t3-d" style="--l:${l.toFixed(0)}"><path d="M${(x-w).toFixed(1)} ${sy-1}c${(w*.3).toFixed(1)} ${(l*.45).toFixed(1)} ${(w*.55).toFixed(1)} ${(l*.7).toFixed(1)} ${(w*.45).toFixed(1)} ${l.toFixed(1)}a${(w*.8).toFixed(1)} ${(w*.8).toFixed(1)} 0 1 0 ${(w*1.1).toFixed(1)} 0c${(-w*.05).toFixed(1)} ${(-l*.3).toFixed(1)} ${(w*.25).toFixed(1)} ${(-l*.6).toFixed(1)} ${(w*.45).toFixed(1)} ${(-l).toFixed(1)}z" fill="#1d1505"/>
      <path d="M${(x-w*.55).toFixed(1)} ${sy+1}c${(w*.2).toFixed(1)} ${(l*.4).toFixed(1)} ${(w*.4).toFixed(1)} ${(l*.65).toFixed(1)} ${(w*.4).toFixed(1)} ${(l*.95).toFixed(1)}" stroke="#7a5f26" stroke-width=".9" fill="none"/>
      <circle cx="${(x+w*.25).toFixed(1)}" cy="${(sy+l+w*.15).toFixed(1)}" r="${(w*.25).toFixed(1)}" fill="#c9a24e"/></g>`}
   const rn=H7.rain(W,H,Math.round(W*H/2600),9,.5).replace(/^<svg[^>]*>|<\/svg>$/g,'');
   ov.style.cssText=`top:${top}px;width:${W}px;height:${H}px;--h:${H}px`;
   ov.innerHTML=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><linearGradient id="t3f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="${(sy/H*.6).toFixed(2)}" stop-color="#fff" stop-opacity=".45"/><stop offset="${(sy/H).toFixed(2)}" stop-color="#fff" stop-opacity="1"/></linearGradient><mask id="t3m"><rect width="${W}" height="${H}" fill="url(#t3f)"/></mask></defs>
    <g mask="url(#t3m)"><g class="t3-ra"><g class="t3-rn">${rn}<g transform="translate(0 -${H})">${rn}</g></g></g></g><g class="t3-dr" style="--sy:${sy}px">${dr}</g></svg>`;G={...g,top}};
 build();addEventListener('resize',()=>{clearTimeout(build.t);build.t=setTimeout(build,150)});
 const ra=()=>ov.querySelector('.t3-ra'),dg=()=>ov.querySelectorAll('.t3-d');
 H7.scroll(Y=>{if(!G)return;const p=H7.RM?1:H7.clamp((Y-(G.seam-G.vh*.95))/(G.vh*.5),0,1);
   ra().style.opacity=.25+p*.75;dg().forEach((d,i)=>{const q=H7.clamp(p*1.25-(i%5)*.05,0,1);d.style.transform=`scaleY(${(.12+q*.88).toFixed(3)})`})});
 window.__h7Range=()=>[G.seam-G.vh*1.05,G.seam-G.vh*.35];window.__h7Still=()=>Math.round(G.W.t+G.G.h+90-G.vh)});
