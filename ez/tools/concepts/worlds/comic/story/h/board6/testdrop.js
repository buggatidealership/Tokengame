// node testdrop.js : pastes dropin-frame4.js into a copy of tools/v22/story/x2p_top.js (steps 2 to 4 of its header), runs it on the built page,
// routes media/top-h25-board6.jpg to out/, shoots "How a round works" at 390 and 1280 and prints errors and the page width.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const S=process.env.TMPD||'/tmp';let top=fs.readFileSync(__dirname+'/../../../../../../v22/story/x2p_top.js','utf8');const drop=fs.readFileSync(__dirname+'/dropin-frame4.js','utf8');
const n0=top.length;top=top.replace('function frames(){',drop+'\nfunction frames(){');
top=top.replace(/board:\{w:'BOARD',k:'board',l:LINES\.board,cap:'The board',p:boardB5\(\)\}\}/,"board:{w:'BOARD',k:'board',l:LINES.board,cap:'The board',p:boardB6()}}");
top=top.replace('requestAnimationFrame(()=>{place(sec);q4k(sec)});wire()}','requestAnimationFrame(()=>{place(sec);q4k(sec)});wire();b6Wire(sec)}');
if(!/boardB6\(\)\}\}/.test(top)||!/b6Wire\(sec\)\}/.test(top))throw new Error('patch did not apply');fs.writeFileSync(S+'/x2p_top_b6.js',top);
(async()=>{const b=await chromium.launch();for(const W of [320,390,1280]){const ctx=await b.newContext({viewport:{width:W,height:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
 await p.route('**/media/top-h25-board6.jpg',r=>r.fulfill({path:__dirname+'/out/top-h25-board6.jpg',contentType:'image/jpeg'}));
 await p.goto('http://localhost:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 await p.addStyleTag({content:fs.readFileSync(__dirname+'/dropin-frame4.css','utf8')});await p.addScriptTag({content:top});
 await p.waitForTimeout(2500);await p.evaluate(()=>window.__t5.place());await p.waitForTimeout(800);const e=await p.evaluate(()=>window.__x2pTopErr&&String(window.__x2pTopErr));
 const nv=await p.evaluate(()=>document.querySelectorAll('li.q4-board video.b6-v').length);
 const el=await p.$('.t4-b2');await el.screenshot({path:__dirname+`/out/drop-${W}.png`});console.log(W,JSON.stringify({er,e,sw:await p.evaluate(()=>document.documentElement.scrollWidth),videos:nv}));await ctx.close()}await b.close()})();
