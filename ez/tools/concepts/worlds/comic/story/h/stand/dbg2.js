const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const P='tools/concepts/worlds/comic/story/h/stand/';const css=fs.readFileSync(__dirname+'/_st.css','utf8').replace(/url\(img\//g,'url('+P+'img/'),js=fs.readFileSync(__dirname+'/_st.js','utf8');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:900}})).newPage();await FONTS(p);
await p.goto('http://127.0.0.1:8985/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
const R=()=>p.evaluate(()=>['.t4-b2','#stRoot','.t4-b3','.f4-cx','section.ch','section.t4'].map(s=>{const e=document.querySelector(s);if(!e)return s+' -';const r=e.getBoundingClientRect(),k=getComputedStyle(e);return s+' y'+Math.round(r.top+scrollY)+' h'+Math.round(r.height)+' mt'+k.marginTop+' tr'+k.transform.slice(0,30)}).join('\n'));
console.log(await R());
await p.addStyleTag({content:css});await p.evaluate(()=>{window.__ST='A'});await p.addScriptTag({content:js});for(let i=0;i<8;i++){await p.waitForTimeout(500);console.log(i,await p.evaluate(()=>!!document.getElementById('stRoot')+' '+(window.__stErr||'')+' '+!!document.querySelector('.t4-b2')))}
console.log('---');console.log(await R());
console.log(await p.evaluate(()=>[...document.body.querySelectorAll('*')].filter(x=>{const s=getComputedStyle(x).position;return (s==='fixed'||s==='sticky')}).map(x=>x.tagName+'.'+String(x.className).slice(0,30)+' '+getComputedStyle(x).position).join('\n')));
const bx=await p.evaluate(()=>{const r=document.getElementById('stRoot').getBoundingClientRect();return [r.top+scrollY,r.height]});console.log(bx);await p.screenshot({path:process.argv[2]+'/dbg.png',clip:{x:0,y:bx[0],width:390,height:bx[1]},fullPage:true});console.log(await R());await b.close()})();
