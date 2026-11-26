const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();for(const W of [390,1280]){const p=await (await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:1})).newPage();await FONTS(p);
await p.goto('http://localhost:8941/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{const o={};const q=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return {cls:String(e.className).slice(0,80),x:r.x|0,y:(r.y+scrollY)|0,w:r.width|0,h:r.height|0,html:e.outerHTML.slice(0,1500)}};
o.header=q('header.top');o.film=q('.x2p-vt')||q('.vb-bl');o.foot=q('footer');o.crawl=q('.x2p-crawl')||q('[class*=crawl]');o.load=q('#x2pLoad');
o.fixed=[...document.querySelectorAll('body *')].filter(e=>getComputedStyle(e).position==='fixed'&&e.getBoundingClientRect().height>0).map(e=>e.tagName+'.'+String(e.className).slice(0,40)+'#'+e.id);
o.secs=[...document.querySelectorAll('main > *, main section')].slice(0,30).map(e=>e.tagName+'.'+String(e.className).slice(0,40)+'#'+e.id+' '+(e.getBoundingClientRect().top+scrollY|0)+' h'+(e.getBoundingClientRect().height|0));return o});
console.log('=====',W);console.log(JSON.stringify(r,null,1));}await b.close()})();
