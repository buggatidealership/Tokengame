const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await FONTS(p);
await p.goto('http://localhost:8897/v46-live-x2plus.html');await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(1500);
const o=await p.evaluate(()=>{const tree=(el,d)=>{if(!el||d>3)return '';let s='  '.repeat(d)+el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+(el.className&&typeof el.className==='string'?'.'+el.className.trim().split(/\s+/).slice(0,4).join('.'):'')+'\n';[...el.children].slice(0,8).forEach(c=>s+=tree(c,d+1));return s};
return ['#standings','#learn','#x2pSt'].map(q=>tree(document.querySelector(q),0)).join('\n----\n')+'\nmain children: '+[...document.querySelector('main#top').children].map(c=>c.tagName+'#'+c.id+'.'+c.className).join(' | ')+'\nmains: '+[...document.querySelectorAll('main')].map(m=>m.id+':'+m.hidden).join(',')});
console.log(o);await b.close()})();
