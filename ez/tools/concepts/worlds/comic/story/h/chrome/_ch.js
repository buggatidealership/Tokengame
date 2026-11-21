/* Round H chrome: shared helpers. Mockup only. */
window.CH=(()=>{const I='tools/concepts/worlds/comic/story/h/chrome/img/';
 const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
 const rnd=s=>()=>{s=(s*16807)%2147483647;return s/2147483647};
 const logo=()=>{const s=$('header.top .brand svg');return s?s.outerHTML:''};
 const n=()=>(window.ROUNDS||[]).length;                              /* issue = rounds graded (cover's own rule) */
 const next=()=>{const e=$('#liveTxt');return e?e.textContent.trim():''};/* the page's own In play / Next words */
 const dur=()=>{const e=$('.vt-s');return e?e.textContent.trim():''};
 const lead=()=>{try{const A=window.__x2pPnl().A;return Object.keys(A).sort((a,b)=>A[b].bal-A[a].bal)[0]}catch(e){return ''}};
 /* a hand-tuned ink box: a wobbly outline (thick outer ink, thin inner line), a two-tone fill with a shade band, redrawn on resize */
 const ro=new ResizeObserver(es=>es.forEach(e=>e.target.__ib&&e.target.__ib()));
 const inkBox=(el,o={})=>{const R=rnd(o.seed||7);[...el.childNodes].forEach(t=>{if(t.nodeType===3&&t.textContent.trim()){const sp=document.createElement('span');sp.className='ch-tx';t.replaceWith(sp);sp.append(t)}});const sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('class','ch-ib');sv.setAttribute('aria-hidden','true');el.prepend(sv);if(getComputedStyle(el).position==='static')el.style.position='relative';
  const j=[...Array(16)].map(()=>R()-.5);
  el.__ib=()=>{const w=el.offsetWidth,h=el.offsetHeight;if(!w)return;const a=o.amp||2.2,p=o.pad||0;
   const pt=(x,y,k)=>`${(x+j[k%16]*a).toFixed(1)},${(y+j[(k+5)%16]*a).toFixed(1)}`;
   const c=[[p,p],[w*.34,p],[w*.7,p],[w-p,p],[w-p,h*.5],[w-p,h-p],[w*.62,h-p],[w*.28,h-p],[p,h-p],[p,h*.48]];
   const d='M'+c.map((q,k)=>pt(q[0],q[1],k)).join(' L')+'Z';const ins=Math.max(3,Math.min(5,h*.08));
   const c2=c.map(([x,y])=>[x+(x<w/2?ins:-ins),y+(y<h/2?ins:-ins)]);const d2='M'+c2.map((q,k)=>pt(q[0],q[1],k+3)).join(' L')+'Z';
   sv.setAttribute('viewBox',`-4 -4 ${w+8} ${h+8}`);sv.setAttribute('width',w+8);sv.setAttribute('height',h+8);
   const sh=o.shade||'rgba(0,0,0,.16)';const id='cb'+Math.round(R()*1e6);
   sv.innerHTML=`<defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs>${o.drop!==0?`<path d="${d}" transform="translate(${o.dx??3} ${o.dy??3.5})" fill="#15121a"/>`:''}<path d="${d}" fill="${o.fill||'#fdbc2a'}"/><g clip-path="url(#${id})"><path d="M0 ${h*.64} Q ${w*.5} ${h*.56} ${w} ${h*.7} L ${w} ${h+9} L 0 ${h+9}Z" fill="${sh}"/><path d="M${w*.06} ${h*.2} L ${w*.22} ${h*.16}" stroke="rgba(255,255,255,.5)" stroke-width="1.6" stroke-linecap="round"/></g><path d="${d}" fill="none" stroke="#15121a" stroke-width="${o.sw||2.6}" stroke-linejoin="round"/>${o.inner!==0?`<path d="${d2}" fill="none" stroke="#15121a" stroke-width=".8" opacity=".55"/>`:''}`};
  el.__ib();ro.observe(el);return sv};
 /* letters each at their own angle and baseline (hand lettering, lesson 70) */
 const jig=(el,o={})=>{const R=rnd(o.seed||3);const t=el.textContent;el.setAttribute('aria-label',t);el.innerHTML=t.split(' ').map(w=>'<span class="ch-w">'+[...w].map(ch=>`<i class="ch-l" aria-hidden="true" style="--r:${((R()-.5)*(o.rot||7)).toFixed(1)}deg;--y:${((R()-.5)*(o.y||3)).toFixed(1)}px;--s:${(1+(R()-.5)*(o.sc||.12)).toFixed(2)}">${ch}</i>`).join('')+'</span>').join('<i class="ch-sp"> </i>');return el};
 /* a painting with a flat black screen cut out: the film plays through the hole, the frame keeps the film near today's size */
 const frame=(cfg)=>{const vt=$('.sh-film .x2p-vt');if(!vt)return;const slot=$('.sh-film');slot.classList.add('chf-on');
  const f=document.createElement('div');f.className='chf';f.setAttribute('aria-hidden','true');f.innerHTML=`<div class="chf-c"><img class="chf-p" src="${I+cfg.img}" alt=""></div>`;vt.append(f);
  const lay=()=>{const v=$('.vt-f',vt);v.style.transform='none';const vr=v.getBoundingClientRect(),tr=vt.getBoundingClientRect();v.style.transform='';if(!vr.width)return;const [x0,y0,x1,y1,W,H]=cfg.hole;
   const mob=innerWidth<600,keep=mob?cfg.keepM||.92:cfg.keepD||.9;          /* film width kept vs today */
   const fw=vr.width*keep,pw=fw/((x1-x0)/100),ph=pw*H/W;const cx=vr.left-tr.left+vr.width/2,cy=vr.top-tr.top+vr.height/2;
   const left=cx-((x0+x1)/200)*pw+(cfg.dx||0)*pw,top=cy-((y0+y1)/200)*ph+(cfg.dy||0)*ph;const M=mob?cfg.mM||22:cfg.mD||48,mS=M*(mob?(cfg.mx||1):Math.min(cfg.mx||1,.8)),mT=M*(cfg.mt||1),mB=M*(cfg.mb||1);slot.style.paddingTop=(mT+6)+'px';slot.style.paddingBottom=(mB+6+(cfg.eb||0))+'px';
   const holeH=(y1-y0)/100*ph,fh=fw*9/16;
   vt.style.setProperty('--chfs',(fw/vr.width).toFixed(4));
   const cl=vr.left-tr.left-mS,ct=vr.top-tr.top-mT;const c=$('.chf-c',f);c.style.cssText=`left:${cl}px;top:${ct}px;width:${vr.width+2*mS}px;height:${vr.height+mT+mB}px`;
   $('.chf-p',f).style.cssText=`left:${left-cl}px;top:${top-ct}px;width:${pw}px`;
   window.__chChk={film:Math.round(fw)+'x'+Math.round(fh),holeH:Math.round(holeH)};cfg.after&&cfg.after(f,{M,mS,mT,mB,cl,ct,cw:vr.width+2*mS,chh:vr.height+mT+mB,pw,ph,left,top,vl:vr.left-tr.left,vtop:vr.top-tr.top,vw:vr.width,vh:vr.height})};
  lay();addEventListener('resize',lay);return f};
 const go=()=>{};return {I,$,$$,rnd,logo,n,next,dur,lead,inkBox,jig,frame,go}})();
/* labels laid in the frame (page text): builds once, placed by each take's after() */
CH.lab=(f,cls,html)=>{let e=f.querySelector('.'+cls);if(!e){e=document.createElement('div');e.className='chf-t '+cls;e.innerHTML=html;f.append(e)}return e};
/* header helpers: the name re-lettered (E green, Z red kept), tabs as hand-cut shapes */
CH.name=(o)=>{const b=CH.$('header.top .brand b');if(!b||b.__j)return b;b.__j=1;CH.jig(b,o);CH.$$('.ch-l',b).forEach((l,i)=>{if(i===0)l.classList.add('ch-e');if(l.textContent==='Z')l.classList.add('ch-z')});return b};
CH.tabs=(o)=>CH.$$('header.top .nav a').forEach((a,i)=>{if(a.__ib)return;CH.inkBox(a,Object.assign({seed:31+i*7,amp:1.8,dx:2,dy:2.5,sw:2.2,inner:0},o,{fill:a.getAttribute('aria-current')==='page'?(o.on||'#fdbc2a'):(o.fill||'#f8f0d9')}))});
/* back cover: the section becomes a painted closing panel; the motto, the follow link and the fine print stay page text */
CH.back=(img,pos)=>{const s=CH.$('.wc-back');if(!s||s.__b)return s;s.__b=1;s.classList.add('chb');
 const p=document.createElement('div');p.className='chb-p';p.setAttribute('aria-hidden','true');p.style.backgroundImage=`url(${CH.I+img})`;if(pos)p.style.backgroundPosition=pos;s.prepend(p);
 CH.inkBox(p,{fill:'none',shade:'transparent',drop:0,seed:41,amp:2,sw:3.2,pad:1.5});
 const m=CH.$('.wc-motto',s);p.append(m);const f=CH.$('.wc-follow',s);p.append(f);return s};
/* the crawl: keep the page's live rows; a take re-dresses the bar and its three ends */
CH.cw=()=>CH.$('.x2p-cw');
