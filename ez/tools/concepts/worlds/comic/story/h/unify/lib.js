// shared: open the built X2+ page on :8986 with optional overlay css/js, warmed and settled
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');
exports.open=async function(W,H,{css=[],js=[],dpr=1}={}){
 const b=await chromium.launch({proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'},args:['--ignore-certificate-errors','--autoplay-policy=no-user-gesture-required']});
 const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:dpr,ignoreHTTPSErrors:true,isMobile:W<700,hasTouch:W<700});
 const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});
 const CSS=css.map(f=>fs.readFileSync(f,'utf8')).join('\n');const JS=js.map(f=>fs.readFileSync(f,'utf8')).join('\n;\n');
 if(CSS||JS)await p.addInitScript(([c,j])=>{const add=()=>{if(c){const s=document.createElement('style');s.id='unify-css';s.textContent=c;(document.head||document.documentElement).appendChild(s)}if(j){try{(0,eval)(j)}catch(e){console.error('unify js',e)}}};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add);else add()},[CSS,JS]);
 await p.goto('http://localhost:8986/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000}).catch(()=>errs.push('cover did not lift'));
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(2000);
 const SH=await p.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<SH;y+=450){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(120)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);
 return {b,p,errs};
};
