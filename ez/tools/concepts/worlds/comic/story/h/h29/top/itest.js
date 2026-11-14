// node itest.js : the film button opens the film, the pill links to Upcoming, the overlay survives x2p_top's rebuild at the 1000px crossing.
const {chromium}=require('playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const fs=require('fs');const path=require('path');const rd=f=>fs.readFileSync(path.join(__dirname,f),'utf8');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('http://127.0.0.1:8947/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__t4,null,{timeout:120000});
await p.addStyleTag({content:rd('../_gutter.css')+rd('top.css')});await p.addScriptTag({content:rd('top.js')});await p.waitForFunction(()=>window.__h29t,null,{timeout:20000});
const r={};r.next=await p.evaluate(()=>window.__h29next());r.pill=await p.evaluate(()=>{const a=document.querySelector('.h29t-next');return [a.textContent,a.getAttribute('href'),a.getAttribute('aria-label')]});
await p.click('.h29t-film');await p.waitForTimeout(800);r.open=await p.evaluate(()=>{const lb=document.querySelector('.f4-lb');return lb?[lb.getAttribute('aria-label'),!!lb.querySelector('video')]:null});
await p.keyboard.press('Escape');await p.waitForTimeout(300);r.closed=await p.evaluate(()=>!document.querySelector('.f4-lb'));
await p.setViewportSize({width:900,height:900});await p.waitForTimeout(1500);
r.after900=await p.evaluate(()=>({film:document.querySelectorAll('.h29t-film').length,g:document.querySelectorAll('.h29-gutter').length,bd:!!document.querySelector('.r3-bd[data-h29]'),led:!!document.querySelector('.q4-ledger .t4-pic[data-h29]'),closest:[...document.querySelectorAll('.q4-ledger svg text')].map(t=>t.textContent).join(' '),sq:[...document.querySelectorAll('.t4-frs>.t4-fr .t4-art')].map(a=>Math.round(a.getBoundingClientRect().width)+'x'+Math.round(a.getBoundingClientRect().height)).join(' '),h1:getComputedStyle(document.querySelector('.t4-h1')).fontFamily.split(',')[0]+' '+getComputedStyle(document.querySelector('.t4-h1')).fontSize,inl:document.querySelector('.t4-h1').style.fontSize}));
await p.setViewportSize({width:1280,height:900});await p.waitForTimeout(1500);
r.back=await p.evaluate(()=>({film:document.querySelectorAll('.h29t-film').length,g:document.querySelectorAll('.h29-gutter').length,sq:[...document.querySelectorAll('.t4-frs>.t4-fr .t4-art')].map(a=>Math.round(a.getBoundingClientRect().width)+'x'+Math.round(a.getBoundingClientRect().height)).join(' ')}));
r.anims=await p.evaluate(()=>document.getAnimations().filter(a=>{const t=a.effect&&a.effect.target;return t&&t.closest&&(t.closest('section.t4')||t.closest('header'))}).length);
r.er=er;console.log(JSON.stringify(r,null,1));await b.close()})();
