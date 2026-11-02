// shared: open the built X2+ page on :8988 at #/upcoming, ez-data.js served from DATA (default: the sheet's state, a scratch copy
// written by sync_sheet.py from the public sheet; DATA=repo serves ez/ez-data.js as it is), fonts through curl, overlays injected.
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');const FONTS=require('../../../../../live-r1/_fonts.js');
const SCR='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/data/ez-data.js';
exports.open=async function(W,H,{css=[],js=[],dpr=1,hash='#/upcoming',data=process.env.DATA||'sheet',now=null}={}){
 const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:dpr,isMobile:W<700,hasTouch:W<700,reducedMotion:'reduce'});
 const p=await ctx.newPage();await FONTS(p);
 if(data==='sheet')await p.route(/\/ez-data\.js/,r=>r.fulfill({contentType:'application/javascript',body:fs.readFileSync(SCR,'utf8')}));
 const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text().slice(0,200))});
 const CSS=css.map(f=>fs.readFileSync(f,'utf8')).join('\n');const JS=js.map(f=>fs.readFileSync(f,'utf8')).join('\n;\n');
 if(now)await p.addInitScript(t=>{const D=Date,off=t-D.now();class F extends D{constructor(...a){if(!a.length)super(D.now()+off);else super(...a)}static now(){return D.now()+off}};window.Date=F},now);
 if(CSS||JS)await p.addInitScript(([c,j])=>{const add=()=>{if(c){const s=document.createElement('style');s.id='u3-css';s.textContent=c;(document.head||document.documentElement).appendChild(s)}if(j){try{(0,eval)(j)}catch(e){console.error('u3 js',e)}}};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add);else add()},[CSS,JS]);
 await p.goto('http://127.0.0.1:8988/v46-live-x2plus.html'+hash,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000}).catch(()=>errs.push('cover did not lift'));
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 return {b,p,errs};
};
