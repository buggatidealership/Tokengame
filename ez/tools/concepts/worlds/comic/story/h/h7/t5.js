/* T5 The next page lands: the bet's whole page arrives hinged at the seam, tipped away from you like a page still falling
   onto the stack, and lies down flat as you scroll it up the screen; while it is still tipped, Smart or lucky's page throws
   its shadow across its top. A page turn told by the page itself, no caption. One transform on the bet's wrap (and an
   opacity on the shadow), driven by scroll. Reduced motion: the page is simply flat. */
H7.ready(()=>{if(H7.RM)return;const w=document.querySelector('.wc-bet.hb-on .hb-wrap');if(!w)return;w.classList.add('t5-w');
 const sh=document.createElement('i');sh.className='t5-sh';sh.setAttribute('aria-hidden','true');w.appendChild(sh);let G=null;
 const set=()=>{w.style.transform='none';G=H7.geo()};set();addEventListener('resize',set);
 H7.scroll(Y=>{if(!G)return;const t=H7.clamp((G.W.t-Y)/G.vh,0,1.2),p=H7.clamp((1-t)/0.42,0,1),e=1-Math.pow(1-p,3);
   /* t: where the wrap's top sits on the screen (1 = bottom edge, .58 = settled) */
   w.style.transform=e>=1?'none':`perspective(${Math.round(G.vw*2.2)}px) rotateX(${(26*(1-e)).toFixed(2)}deg)`;sh.style.opacity=(1-e).toFixed(3)});
 window.__h7Range=()=>[G.W.t-G.vh*1.05,G.W.t-G.vh*.5];window.__h7Still=()=>Math.round(G.W.t-G.vh*.8)});
