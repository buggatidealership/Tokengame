/* G2 interior page: the four as one comic page of panels, the leader's panel biggest; numbers in caption boxes at panel corners; one sound effect. */
(function(){const G=GR,O=G.ORD,d=O.map(G.D);
/* crops of the 854x480 source, chosen so no founder plate shows half-cut and every face stays clear of the captions */
const CROP={GROK:{x:0,y:0,w:700,h:480},CLAUDE:{x:0,y:0,w:854,h:480},GPT:{x:330,y:95,w:288,h:384},KIMI:{x:300,y:0,w:360,h:480}};
/* caption corner per model: the side away from the face */
const CORNER={GROK:'bl',CLAUDE:'tr',GPT:'bl',KIMI:'bl'};
const cap=(x,one)=>`<p class="g2-cap g2-${CORNER[x.m]}${one?' gr-leaf':''}"><b class="g2-nm">${x.nm}<small>${x.ver}</small></b><span class="g2-pl"><small>Season P&amp;L</small> <b class="${one?'':x.up?'g2-u':'g2-d'}">${x.pm}</b></span><span><small>W-L</small> <b>${x.W}-${x.L}</b></span><span class="g2-no">${one?'Golden ticket · ':''}No. ${x.rank}</span></p>`;
const pan=(x,i)=>`<figure class="g2-pn g2-pn${i+1}" data-m="${x.m}">${G.vid(x.m,CROP[x.m])}${cap(x,i===0)}${i===0?'<b class="g2-sfx" aria-hidden="true">KA-<br>CHING!</b>':''}</figure>`;
const head=`<h2 class="wc-h2"><span>Meet the models</span><small>Ranked by season P&amp;L on a pretend $100,000 each.</small></h2>`;
const s=G.mount(head+`<div class="g2-page">${d.map(pan).join('')}</div>`,'gr-g2');
/* exact layout: panels keep their crops' shapes and fill the page with 6px gutters, no dead space */
const pg=s.querySelector('.g2-page'),P=[...pg.children],ar=P.map(p=>{const c=CROP[p.dataset.m];return c.w/c.h});
function lay(){const W=pg.clientWidth,g=6,[a1,a2,a3,a4]=ar;
  if(W<760){const h1=W/a1,h2=W/a2,hp=(W-g)/(a3+a4);pg.style.cssText=`height:${h1+h2+hp+2*g}px`;
    place(P[0],0,0,W,h1);place(P[1],0,h1+g,W,h2);place(P[2],0,h1+h2+2*g,a3*hp,hp);place(P[3],a3*hp+g,h1+h2+2*g,a4*hp,hp);}
  else{/* the leader down the left; Claude across the right, the pair under it */const c=1/a2+1/(a3+a4),d=g-g/(a3+a4);const R=(W-g-a1*d)/(a1*c+1),H=R*c+d,h2=R/a2,hp=(R-g)/(a3+a4),x=a1*H+g;
    pg.style.cssText=`height:${H}px`;place(P[0],0,0,a1*H,H);place(P[1],x,0,R,h2);place(P[2],x,h2+g,a3*hp,hp);place(P[3],x+a3*hp+g,h2+g,a4*hp,hp);}}
function place(p,x,y,w,h){Object.assign(p.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'})}
lay();addEventListener('resize',lay);document.documentElement.classList.add('gr-ready');})();
