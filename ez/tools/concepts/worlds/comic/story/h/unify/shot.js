// node shot.js W tag [overlays...] : full-page screenshot + section rects + measures
const {open}=require('./lib');const fs=require('fs');(async()=>{const [W,tag,...ov]=process.argv.slice(2);const {b,p,errs}=await open(+W,844,{css:ov.filter(f=>f.endsWith('.css')),js:ov.filter(f=>f.endsWith('.js'))});
await p.evaluate(()=>{const c=document.querySelector('.x2p-cw');if(c)c.style.visibility='hidden'});// the fixed desktop crawl would print over the middle of a full-page shot
await p.screenshot({path:`out/${tag}-${W}.png`,fullPage:true});
const m=await p.evaluate(()=>{const R=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.top+scrollY),Math.round(r.bottom+scrollY)]};
 const sec={'Headline':[0,R('.t5-bg')[1]],'How a round works':R('.t4-b2'),'The whole game':[R('.t4-b3')[0]-40,R('.f4-cx')[1]],'Meet the models':R('.ch'),'Every round so far':R('#record'),'Smart or lucky':R('#learn'),'The bet':R('#x2pSt'),'Next on the card + footer':[R('#get')[0],document.documentElement.scrollHeight]};
 return {sh:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth,sec,hs:[...document.querySelectorAll('main.wrap > section')].filter(s=>s.offsetHeight).map(s=>[s.id||s.className.split(' ')[0],Math.round(s.getBoundingClientRect().height*10)/10])}});
m.errs=errs;fs.writeFileSync(`out/${tag}-${W}.json`,JSON.stringify(m));console.log(tag,W,JSON.stringify(m.hs),'sh',m.sh,'sw',m.sw,'errs',errs.length);await b.close()})();
