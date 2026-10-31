/* U3 · The box office (second reading of "the tab's top": the night street outside the arena, the ring at dusk inside the tickets'
   own picture window). The marquee carries "Next on the card" and the side board the count; every round is a risograph fight
   ticket overprinted in the company's own colour; the main event is the big ticket in the window, the undercard torn from the same roll. */
(async function(){const U=HU,S=U.S,e=U.esc,I=U.IMG;const root=U.mount('u3');const T=U.tot();
const stamp=(m,c)=>`<i class="u3-st ${c?(c.dir==='UP'?'up':'dn'):'q'}" style="--mc:${S.col(m)}">${U.face(m,'u3-sf')}<b>${c?(c.dir==='UP'?'▲ ':'▼ ')+Math.abs(+c.mag)+'%':'?'}</b></i>`;
const tk=(x,big)=>`<a class="hu-it u3-tk ${big?'u3-big':''}" ${U.itAttr(x)} style="${S.bvars(S.brand(x.ticker))}"><span class="u3-tp">
   <span class="u3-stub"><b>${x.n}</b><i>${big?'Main event':'Admit one'}</i></span>
   <span class="u3-body"><span class="u3-hd">${U.logoEl(x.ticker,'u3-lg','own',big?120:60)}<span class="u3-nmw"><b class="u3-nm hu-t">${e(U.nm(x.ticker))}</b><small>${e(S.tk(x.ticker))}${x.m7?' · Mag 7':''}${x.ai?' · AI':''}</small></span></span>
   <span class="u3-sts">${U.calls(x).map(({m,c})=>stamp(m,c)).join('')}</span>
   ${big?`<span class="u3-due">${x.locked?'Graded at the close':'Calls due '+e(S.wd(x.day,1))}</span>`:''}</span></span></a>`;
const day=d=>{const [m,...rest]=d.items;return `<section class="hu-day u3-day" aria-label="${e(d.lab.a+' '+d.lab.b)}">
  <header class="u3-dh"><b>${e(d.lab.a)}</b><span>${e(d.lab.b)}</span><i>${d.items.length} on the roll</i></header>
  ${tk(m,1)}<div class="u3-roll">${rest.map(x=>tk(x,0)).join('')}</div></section>`};
const fr=U.frame('u3top',{j:.5,n:4});
root.innerHTML=`<header class="u3-top"><div class="u3-sw" style="clip-path:${fr.clip}"><img class="u3-bg" src="${I}booth-night.jpg" alt="The arena's box office at night, its marquee lit">
  <p class="u3-mq" data-q="675,250,1005,220,1005,352,675,392"><span>Next on</span><span>the card</span></p>
  <p class="u3-sb" data-q="1042,225,1146,240,1146,340,1042,328"><b>${T.u}</b><span>to call</span></p>
  <p class="u3-win" data-q="890,455,1058,455,1058,705,890,705"><img src="hedra/openers/o3-tonight-gpt-image-2.jpg" alt=""></p>
  </div>${fr.svg}<p class="u3-ln">Each AI calls the stock <b>before</b> it reports. The next close grades it. <b>${T.l}</b> locked in so far.</p></header>
 <nav class="u3-flt" aria-label="Show">${U.FLT.map(([k,l])=>`<button type="button" data-hf="${k}" aria-pressed="${!k}">${l}</button>`).join('')}<span>Tap a ticket to open its card</span></nav>
 ${U.days().filter(d=>d.k!=='wait').map(day).join('')}`;
/* place the lettering on the painted boards: image coords -> the rendered (cropped) image */
const place=()=>{const im=root.querySelector('.u3-bg'),sw=im.parentElement.getBoundingClientRect(),r=im.getBoundingClientRect(),k=r.width/1920;
  root.querySelectorAll('[data-q]').forEach(el=>{const q=el.dataset.q.split(',').map(Number);const X=i=>r.left-sw.left+q[i]*k,Y=i=>r.top-sw.top+q[i]*k;
    const l=X(0),t=Y(1),w=X(2)-X(0),h=Math.max(Y(5),Y(7))-Math.min(Y(1),Y(3));const sk=Math.atan2(q[3]-q[1],q[2]-q[0])*180/Math.PI;
    Object.assign(el.style,{left:l+'px',top:Math.min(Y(1),Y(3))+'px',width:w+'px',height:h+'px',transform:`skewY(${sk.toFixed(1)}deg)`,transformOrigin:'0 0',fontSize:(h*(el.classList.contains('u3-mq')?.3:.36))+'px'})})};
U.wireFilter(root);await U.paint(root);await document.fonts.ready;place();addEventListener('resize',place);U.fit(root,'.u3-nm',13);
document.documentElement.classList.add('hu-ready')})();
