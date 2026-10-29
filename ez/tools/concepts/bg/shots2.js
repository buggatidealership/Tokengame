// node shots2.js now,P1,P2,P3 [390x844|1536x864] : consecutive screens from the top for every take (OUT=dir, SCREENS=n),
// plus checks: page errors, sideways scroll, text drawn straight on the paper below 4.5:1 (CHECK=1 lists them).
// A take's JS runs after window.__npCfg is set by it; _np.js (the shared newspaper builder) runs right after the take's own JS.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const T=process.argv[2].split(','),[VW,VH]=(process.argv[3]||'390x844').split('x').map(Number),OUT=process.env.OUT||'.',N=+(process.env.SCREENS||(VW<600?4:3));
const rd=k=>{const f=path.join(__dirname,k);return fs.existsSync(f)?fs.readFileSync(f,'utf8'):''};
(async()=>{const b=await chromium.launch();for(const t of T){const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:VW<600?2:1});await FONTS(p);const er=[];
 p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::/.test(m.text()))er.push('console: '+m.text())});
 const css=t==='now'?'':rd(t+'.css'),js=t==='now'?'':rd(t+'.js')+(/^P/.test(t)?'\n'+rd('_np.js'):'');
 await p.addInitScript(([c,j])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=c;document.head.appendChild(s);if(j)try{(new Function(j))()}catch(e){console.error(e)}})},[css,js]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForTimeout(1500);const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(80)}await p.waitForTimeout(4000);
 const hh=await p.evaluate(()=>document.querySelector('header.top').getBoundingClientRect().height);
 for(let i=0;i<N;i++){await p.evaluate(y=>scrollTo(0,y),i*(VH-hh));await p.waitForTimeout(1200);await p.screenshot({path:`${OUT}/np-${t}-${VW}-${i}.png`})}
 const chk=await p.evaluate(()=>{const paper=(getComputedStyle(document.documentElement).backgroundColor.match(/[\d.]+/g)||[11,10,20]).slice(0,3).map(Number);let checked=0;const lum=c=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2])};
  const rgb=s=>{const m=s.match(/[\d.]+/g);return m?m.map(Number):[0,0,0,0]};const bad=[];
  const tw=document.createTreeWalker(document.querySelector('main#top').parentNode,NodeFilter.SHOW_TEXT);let n;const seen=new Set();
  while(n=tw.nextNode()){if(!n.textContent.trim())continue;const e=n.parentElement;if(!e||seen.has(e))continue;seen.add(e);{const q=e.closest('header,.x2p-crawl,#x2pLoad,noscript,script,style,svg,.sr,[aria-hidden="true"]');if(q&&q!==document.documentElement)continue;}
   const r=e.getBoundingClientRect();if(r.width<1||r.height<1)continue;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||+cs.opacity===0)continue;
   let a=e,onPaper=true;while(a&&a!==document.body){const c=getComputedStyle(a);const bg=rgb(c.backgroundColor);if((bg[3]===undefined||bg[3]>.4)&&c.backgroundColor!=='rgba(0, 0, 0, 0)'||c.backgroundImage!=='none'&&!a.classList.contains('np-paperok')){onPaper=false;break}if(+c.opacity<.05){onPaper=false;break}a=a.parentElement}
   if(!onPaper)continue;checked++;let fc=cs.webkitTextFillColor;if(!fc||/currentcolor/i.test(fc))fc=cs.color;const c=rgb(fc);if(c[3]===0)continue;let op=1;for(let q=e;q;q=q.parentElement)op*=+getComputedStyle(q).opacity;
   const al=(c[3]===undefined?1:c[3])*op,mix=[0,1,2].map(i=>c[i]*al+paper[i]*(1-al));const L1=lum(mix),L2=lum(paper),cr=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
   if(cr<4.5)bad.push(cr.toFixed(2)+' '+e.tagName.toLowerCase()+'.'+String(e.className).slice(0,30)+' "'+n.textContent.trim().slice(0,40)+'"')}
  const sw=document.documentElement.scrollWidth;const ov=[...document.querySelectorAll('.np-mh,.np-top,.np-hd,.np-cap,.np-ag,.np-dl,.np-kick')].filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>e.className.slice(0,30));
  return {sw,bad,ov,checked,paper}});
 console.log(t,VW,'errors:',er.join(' | ')||'none','scrollW:',chk.sw,'lowContrast:',chk.bad.length,'overflow:',chk.ov.join(',')||'none','checked:',chk.checked,'paper:',chk.paper.join(','));if(process.env.CHECK)console.log(chk.bad.join('\n'));await p.close()}await b.close()})();
