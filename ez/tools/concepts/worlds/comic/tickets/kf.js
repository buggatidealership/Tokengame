/* Flag round (owner, 2026-10-29: K3 is the favourite; no cream in the body, a cartoon flag behind each model: US for Grok,
   Claude, GPT; China for Kimi; "Season 1" in place of "Admit one"; a living comic: motion, fluidity, effects).
   Builds the flag layers from SVG drawn here; kf1..kf4.css pick the look. */
(function(){
  const D=document,el=(t,c,h)=>{const e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
  const enc=s=>'url("data:image/svg+xml,'+encodeURIComponent(s)+'")';
  const P=160,A=6; // wave period and amplitude (px of the tile)
  const wy=(x,k,h)=>k*h+A*Math.sin(2*Math.PI*x/P);
  function stripes(cols,n,H){ // a wavy-striped tile, one wave period wide, n stripes over H
    const h=H/n;let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${P}" height="${H}" viewBox="0 ${-A} ${P} ${H+2*A}" preserveAspectRatio="none">`;
    for(let k=-1;k<=n;k++){let d='';for(let x=0;x<=P;x+=4)d+=(x?'L':'M')+x+' '+wy(x,k,h).toFixed(2);for(let x=P;x>=0;x-=4)d+='L'+x+' '+wy(x,k+1,h).toFixed(2);
      s+=`<path d="${d}Z" fill="${cols[(k+n*2)%cols.length]}" stroke="#15121a" stroke-width="1.4" vector-effect="non-scaling-stroke"/>`}
    return enc(s+'</svg>')}
  const star=(cx,cy,r,f)=>{let p=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.42:r;p.push((cx+rr*Math.cos(a)).toFixed(2)+','+(cy+rr*Math.sin(a)).toFixed(2))}return `<polygon points="${p.join(' ')}" fill="${f}" stroke="#15121a" stroke-width="1.2" stroke-linejoin="round"/>`};
  function canton(blue,starC){let s=`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="140" viewBox="0 0 200 140"><rect width="200" height="140" fill="${blue}" stroke="#15121a" stroke-width="3"/>`;
    for(let r=0;r<5;r++)for(let c=0;c<6;c++){const x=18+c*33+(r%2?16:0),y=16+r*27;if(x<192)s+=star(x,y,8,starC)}return enc(s+'</svg>')}
  function cnStars(gold){return enc(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="140" viewBox="0 0 200 140">${star(50,50,30,gold)}${star(100,18,10,gold)}${star(120,40,10,gold)}${star(120,70,10,gold)}${star(100,92,10,gold)}</svg>`)}
  const PAL={
    bold:{us:['#d63a3a','#f8f0d9'],blue:'#2c4fa8',star:'#f8f0d9',cn:['#d63a3a'],gold:'#fdbc2a'},
    night:{us:['#5e1a24','#2a2433'],blue:'#16245a',star:'#e9dcae',cn:['#5e1a24'],gold:'#d6a531'},
    print:{us:['#e9a39c','#f3ead3'],blue:'#9fb0d9',star:'#f3ead3',cn:['#e9a39c'],gold:'#f0cf7a'}};
  const pal=PAL[window.__kfPal||'bold'];
  const T={us:stripes(pal.us,13,260),cn:stripes(pal.cn,13,260)};
  D.querySelectorAll('.wc-ch').forEach((c,i)=>{
    const m=c.dataset.m||'',cn=m==='KIMI';
    const stub=c.querySelector('.tk-stub i');if(stub&&i>0)stub.textContent='Season 1';
    const f=el('div','kf-flag '+(cn?'kf-cn':'kf-us'));
    f.style.setProperty('--kf-st',T[cn?'cn':'us']);
    f.style.setProperty('--kf-ca',cn?cnStars(pal.gold):canton(pal.blue,pal.star));
    f.append(el('i','kf-st'),el('i','kf-ca'),el('i','kf-fold'),el('i','kf-dots'));
    c.prepend(f);
    // the money counts up when the card comes into view
    const big=c.querySelector('.wc-ch-big');if(big){const tn=[...big.childNodes].find(n=>n.nodeType===3&&/\$/.test(n.textContent));if(tn){const t=tn.textContent,v=+t.replace(/[^\d]/g,''),sg=/[−-]/.test(t)?'−':'+';const sp=el('span','kf-cnt',t);sp.dataset.v=v;sp.dataset.s=sg;big.replaceChild(sp,tn)}}
  });
  // a living comic: cards punch in, counters roll, as they come into view
  const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const c=e.target;c.classList.add('kf-in');io.unobserve(c);
    const n=c.querySelector('.kf-cnt');if(!n||rm)return;const v=+n.dataset.v,s=n.dataset.s,t0=performance.now(),d=900;
    (function f(t){const k=Math.min(1,(t-t0)/d),e2=1-Math.pow(1-k,3);n.textContent=s+'$'+Math.round(v*e2).toLocaleString('en-US');if(k<1)requestAnimationFrame(f)})(t0)}),{threshold:.35});
  D.querySelectorAll('.wc-ch').forEach(c=>io.observe(c));
})();
