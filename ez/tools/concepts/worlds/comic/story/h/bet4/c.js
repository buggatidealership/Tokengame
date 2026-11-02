/* bet4 take C, "Today, trimmed": the live chapter's own pictures, fewer of them. No vault and no date line: the heading, then the
   chip with its date tab and countdown, then board D (media/bet-board-d-*.jpg, its fees, pool, call and fork, animated as live)
   cropped above the sockets, so it ends on RIGHT and WRONG; one closing line. Stacked at every width
   (side by side at 1280 the board's captions and RIGHT/WRONG were too small to read). The live board node is moved in (its own code keeps it), re-cropped here. */
(function(){
B4.after=function(box){const bd=document.querySelector('#x2pSt .hb-wrap>.bd');const slot=box.querySelector('.b4c-bd');if(!bd||!slot)return;
  slot.appendChild(bd);const p=bd.querySelector('.bd-p');p.dataset.bdp='[40,150,640,836]';p.dataset.bdd='[0,40,1066,600]';
  const place=()=>{const a=p.querySelector('.bd-a'),s=a.querySelector('.bd-s'),dk=B4.desk(),c=JSON.parse(dk?p.dataset.bdd:p.dataset.bdp),pk=v=>{const q=String(v).split('|');return dk?q[1]:q[0]},
    iw=+pk(p.dataset.iw),ih=+pk(p.dataset.ih),w=a.clientWidth,k=w/c[2];if(!w)return;
    p.classList.toggle('dk',dk);a.style.height=Math.round(c[3]*k)+'px';a.style.backgroundImage=`url(${pk(p.dataset.src)})`;a.style.backgroundSize=`${iw*k}px ${ih*k}px`;a.style.backgroundPosition=`${-c[0]*k}px ${-c[1]*k}px`;
    s.setAttribute('viewBox',c.join(' '));p.style.setProperty('--k',k);
    p.querySelectorAll('[data-at]').forEach(n=>{const [x,y]=JSON.parse(pk(n.dataset.at));n.style.left=((x-c[0])*k+a.offsetLeft)+'px';n.style.top=((y-c[1])*k+a.offsetTop)+'px'})};
  place();let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;place()}});document.fonts&&document.fonts.ready.then(place)};
B4.mount(Dt=>`<div class="b4c">
   <h2 class="hb-h" id="b4H"><span class="hb-w">Bet #1:</span> <span class="hb-w hb-w2">NVIDIA</span></h2>
   <div class="b4c-two">
    <div class="b4-art b4-bleed b4c-chip" data-src="media/bet-chip-h2.jpg" data-iw="2048" data-ih="1152" data-crop="[596,318,896,430]|[300,240,1440,640]" role="timer" aria-live="off">
     ${B4.dies()}
     <div class="b4-at" data-at="[612,330]|[330,262]"><span class="b4a-tab">At the close · ${Dt.dayS}</span></div>
    </div>
    <div class="b4c-bd"></div>
   </div>
   <p class="b4-cl b4c-cl">NVIDIA is the first bet, <b>not the last.</b></p>
  </div>`);
})();
