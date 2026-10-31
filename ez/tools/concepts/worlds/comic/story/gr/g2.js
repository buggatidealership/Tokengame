/* G2 interior page: the four as one comic page of panels, the leader's panel biggest; numbers in caption boxes at panel corners; one sound effect. */
(function(){const G=GR,O=G.ORD,d=O.map(G.D);
/* crops of the 854x480 source, chosen so no founder plate shows half-cut and every face stays clear of the captions */
const CROP={GROK:{x:0,y:0,w:700,h:480},CLAUDE:{x:242,y:0,w:360,h:480},GPT:{x:318,y:95,w:330,h:330},KIMI:{x:290,y:0,w:500,h:480}};
/* caption corner per model: the side away from the face */
const CORNER={GROK:'br',CLAUDE:'bl',GPT:'bl',KIMI:'tr'};
const cap=(x,one)=>`<p class="g2-cap g2-${CORNER[x.m]}${one?' gr-leaf':''}"><b class="g2-nm">${x.nm}<small>${x.ver}</small></b><span>${one?'Golden ticket · ':''}No. ${x.rank}</span><span class="g2-pl"><small>Season P&amp;L</small> <b class="${one?'':x.up?'g2-u':'g2-d'}">${x.pm}</b></span><span><small>W-L</small> <b>${x.W}-${x.L}</b></span></p>`;
const pan=(x,i)=>`<figure class="g2-pn g2-pn${i+1}" data-m="${x.m}">${G.vid(x.m,CROP[x.m])}${cap(x,i===0)}${i===0?'<b class="g2-sfx" aria-hidden="true">KA-CHING!</b>':''}</figure>`;
const head=`<h2 class="wc-h2"><span>Meet the models</span><small>Ranked by season P&amp;L on a pretend $100,000 each.</small></h2>`;
const s=G.mount(head+`<div class="g2-page">${d.map(pan).join('')}</div>`,'gr-g2');
/* exact layout: panels keep their crops' shapes and fill the page with 6px gutters, no dead space */
const pg=s.querySelector('.g2-page'),P=[...pg.children],ar=P.map(p=>{const c=CROP[p.dataset.m];return c.w/c.h});
function lay(){const W=pg.clientWidth,g=6,[a1,a2,a3,a4]=ar;
  /* the right column: panels 3 and 4 stacked; its width w: heights w/a3 + w/a4 + g = H */
  if(W<760){const h1=W/a1;const w=(W-g-a2*g)/(1+a2*(1/a3+1/a4));const H=w/a3+w/a4+g,w2=W-g-w;
    pg.style.cssText=`height:${h1+g+H}px`;place(P[0],0,0,W,h1);place(P[1],0,h1+g,w2,H);place(P[2],w2+g,h1+g,w,w/a3);place(P[3],w2+g,h1+g+w/a3+g,w,w/a4);}
  else{/* one row: leader, Claude, then the stacked pair */const k=1/a3+1/a4;const H=(W-2*g+ (g/k))/(a1+a2+1/k);const w=(H-g)/k;
    pg.style.cssText=`height:${H}px`;place(P[0],0,0,a1*H,H);place(P[1],a1*H+g,0,a2*H,H);place(P[2],a1*H+a2*H+2*g,0,w,w/a3);place(P[3],a1*H+a2*H+2*g,w/a3+g,w,w/a4);}}
function place(p,x,y,w,h){Object.assign(p.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'})}
lay();addEventListener('resize',lay);document.documentElement.classList.add('gr-ready');})();
