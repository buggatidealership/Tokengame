/* helper o (2026-10-30): living pictures. Shared bits. Each film's "one living thing" was picked by hand (cg.py: a box with
   no words or numbers in it); cg/ holds per round the settled board (still), the thing moving (a clear-outside-the-box
   animated layer) and the same spot lit (O1). Every layer has the still's own crop (object-fit:cover), so it lands exactly. */
window.SO=window.SO||(function(){
  const D=document,H=D.documentElement,B='tools/concepts/worlds/comic/story/o/cg/',M=window.__oCG||{};
  const rm=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const now=()=>window.__oT!=null?window.__oT:performance.now();
  const LOOP=24/9*1000;                      /* 24 frames at 9 fps: the film's own motion at three quarters of its speed */
  const blobs={};
  async function blob(k){if(!blobs[k])blobs[k]=fetch(B+'r'+k+'.webp').then(r=>r.blob());return blobs[k]}
  /* every living picture on the page: the round tiles with a picked thing, and the walkthrough's film panel */
  function pics(){const out=[];
    D.querySelectorAll('.wc-bi').forEach(a=>{const n=(a.getAttribute('href')||'').replace(/\D/g,'');if(!M[n])return;
      const art=a.querySelector('.wc-bi-art'),im=art&&art.querySelector('img');if(!im)return;im.loading='eager';im.src=B+'r'+n+'-still.jpg';
      art.classList.add('so-pic');out.push({el:a,art,key:n,tile:true})});
    const fa=D.querySelector('.sd2-p2 .sd-film .wc-lr-art'),pg=D.querySelector('.wc-lr-pg'),k=pg&&pg.dataset.n+'P';
    if(fa&&M[k]){const v=fa.querySelector('video'),bt=fa.querySelector('.wc-snd');
      /* the film rests on its final board and plays only when asked (today it loops on its own as soon as it is on screen) */
      if(v){v.pause();const pl=v.play.bind(v);v.play=()=>v.__soUser?pl():Promise.resolve();
        if(bt)bt.addEventListener('click',()=>{v.__soUser=1;fa.classList.add('so-played')},{capture:true});
        v.addEventListener('pause',()=>{})}
      fa.insertAdjacentHTML('afterbegin',`<img class="so-still" src="${B}r${k}-still.jpg" alt="">`);
      fa.addEventListener('click',e=>{if(e.target.closest('.wc-snd')||fa.classList.contains('so-played'))return;bt&&bt.click()});
      fa.classList.add('so-pic','so-panel');out.push({el:fa,art:fa,key:k,tile:false})}
    return out}
  function layer(p,kind){const i=D.createElement('img');i.className='so-pt so-'+kind;i.alt='';i.setAttribute('aria-hidden','true');i.decoding='async';p.art.appendChild(i);return i}
  /* plays the thing once from its first frame (a fresh object URL restarts an animated image), fading in and out */
  async function once(p,lay,{fin=350,fout=700}={}){if(p.busy||rm())return;p.busy=1;const b=await blob(p.key),u=URL.createObjectURL(b);
    lay.style.transition='none';lay.style.opacity=0;lay.src=u;await lay.decode().catch(()=>{});
    lay.style.transition=`opacity ${fin}ms ease`;requestAnimationFrame(()=>lay.style.opacity=1);
    await new Promise(r=>setTimeout(r,LOOP-fout*.5));lay.style.transition=`opacity ${fout}ms ease`;lay.style.opacity=0;
    await new Promise(r=>setTimeout(r,fout+50));URL.revokeObjectURL(u);lay.removeAttribute('src');p.last=now();p.busy=0}
  /* on-screen bookkeeping, one observer for every picture */
  function watch(ps,cb){const io=new IntersectionObserver(es=>es.forEach(e=>{const p=ps.find(x=>x.art===e.target);if(!p)return;p.vis=e.isIntersecting;p.art.classList.toggle('so-off',!e.isIntersecting);cb&&cb(p)}),{rootMargin:'80px 0px'});
    ps.forEach(p=>io.observe(p.art));return io}
  /* the board's map view: every living spot in gold, the rest dimmed */
  function map(ps){H.classList.add('so-map');ps.forEach(p=>{let l=p.art.querySelector('.so-mapl');if(!l){l=layer(p,'mapl');l.src=B+'r'+p.key+'-lit.webp'}})}
  /* D2's panel 3, read from its own DOM and the page's data: who stood in which corner, who was right, who won */
  function p3(){const pn=D.querySelector('.sd2-p3');if(!pn)return null;const d=window.SD&&SD.data();if(!d)return null;
    const ring=pn.querySelector('.sd2-ring'),cu=ring.querySelector('.sd2-cu'),cd=ring.querySelector('.sd2-cd');
    const fs=[...ring.querySelectorAll('.sd2-ft')].map(el=>{const nm=el.querySelector('.sd2-nm').textContent,x=d.cs.find(c=>SD.NM[c.m]===nm);return {el,x,pf:el.querySelector('.sd2-pf'),cr:el.querySelector('.sd2-crown'),ok:el.classList.contains('sd2-ok'),win:el.classList.contains('sd2-win')}});
    const order=fs.filter(f=>f.ok).concat(fs.filter(f=>!f.ok));   /* the right corner is stamped first */
    return {pn,d,ring,cu,cd,fs,order,up:d.up,win:d.up?cu:cd,lose:d.up?cd:cu,says:pn.querySelector('.sd2-says'),rule:pn.querySelector('.sd2-rule')}}
  const cl=x=>Math.max(0,Math.min(1,x)),out=x=>1-Math.pow(1-x,3);
  /* play a panel timeline once when it comes on screen; replay on tap; reduced motion: the graded end at once */
  function timeline(el,draw,dur,tapEl){let t0=0,raf=0;const play=()=>{t0=performance.now();cancelAnimationFrame(raf);(function f(){const t=(performance.now()-t0)/1000;draw(t);if(t<dur)raf=requestAnimationFrame(f)})()};
    window.__oDraw=draw;if(rm()){draw(99);return}draw(-1);
    const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();if(!window.__oHold)play()}},{threshold:.55});io.observe(el);
    if(tapEl)tapEl.addEventListener('click',e=>{e.preventDefault();play()})}
  return {p3,cl,out,timeline,D,H,B,M,rm,now,LOOP,pics,layer,once,watch,map,blob,ready:k=>H.classList.add('so-ready','so-ready-'+k)};
})();
