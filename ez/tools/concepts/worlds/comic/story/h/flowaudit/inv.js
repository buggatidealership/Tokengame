const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const W=+process.argv[2],H=+process.argv[3],URL=process.argv[4],OUT=process.argv[5];
const b=await chromium.launch({proxy:{server:'http://127.0.0.1:46741',bypass:'localhost'},args:['--ignore-certificate-errors']});
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:1,ignoreHTTPSErrors:true});
await p.goto(URL,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(2000);
const SH=await p.evaluate(()=>document.documentElement.scrollHeight);
for(let y=0;y<SH;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(150)}
await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out=[];
 const vis=el=>{for(let e=el;e&&e!==document.documentElement;e=e.parentElement){const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<0.05)return false;if(cs.clip&&/rect\(0/.test(cs.clip))return false;const r=e.getBoundingClientRect();if((cs.overflow==='hidden'||cs.overflow==='clip')&&(r.width<=2||r.height<=2))return false}return true};
 const secOf=el=>{const s=el.closest('main > *, header.top, footer, .x2p-crawl, [class*=crawl]');return s?(s.id||s.className.toString().split(' ').slice(0,2).join('.')||s.tagName):'?'};
 const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=tw.nextNode()){const t=n.nodeValue.replace(/\s+/g,' ').trim();if(!t)continue;const pe=n.parentElement;if(/^(SCRIPT|STYLE|NOSCRIPT)$/.test(pe.tagName))continue;
  const rg=document.createRange();rg.selectNodeContents(n);const rs=[...rg.getClientRects()].filter(r=>r.width>1&&r.height>1);if(!rs.length)continue;if(!vis(pe))continue;
  const cs=getComputedStyle(pe);const h=Math.max(...rs.map(r=>r.height));
  out.push({s:secOf(pe),y:Math.round(rs[0].top+scrollY),x:Math.round(rs[0].left),t:t.slice(0,90),f:cs.fontFamily.split(',')[0].replace(/"/g,''),h:Math.round(h),fw:cs.fontWeight,fst:cs.fontStyle,tt:cs.textTransform,c:pe instanceof SVGElement?cs.fill:cs.color,cls:(pe.className.baseVal!==undefined?pe.className.baseVal:pe.className).toString().slice(0,40),tag:pe.tagName,aria:!!pe.closest('[aria-hidden=true]')})}
 return out});
fs.writeFileSync(OUT,JSON.stringify(r));console.log(r.length);await b.close()})();
