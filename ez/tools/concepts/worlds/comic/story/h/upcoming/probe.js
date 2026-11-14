// node probe.js <out> <w>: shoot today's Upcoming tab on the built X3+ page and dump its structure
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const OUT=process.argv[2],W=+(process.argv[3]||390);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:W<600?2:1});await fonts(p);
const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('http://localhost:8931/v47-live-x3plus.html#/upcoming',{waitUntil:'load',timeout:120000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.waitForTimeout(6000);
const info=await p.evaluate(()=>{const s=document.querySelector('#upcoming')||[...document.querySelectorAll('section')].find(x=>x.offsetParent&&x.getBoundingClientRect().height>300);
 const walk=(e,d)=>d>5?'':[...e.children].filter(c=>c.offsetHeight>0).slice(0,12).map(c=>'  '.repeat(d)+c.tagName+'#'+c.id+'.'+String(c.className).replace(/ /g,'.').slice(0,80)+' '+Math.round(c.getBoundingClientRect().height)+'\n'+walk(c,d+1)).join('');
 return {id:s&&s.id,cls:s&&s.className,h:document.documentElement.scrollHeight,tree:walk(s,0).slice(0,6000)}});
console.log(JSON.stringify({id:info.id,cls:info.cls,h:info.h}));console.log(info.tree);
await p.screenshot({path:`${OUT}/now-${W}.png`,fullPage:true});console.log(er);await b.close()})();
