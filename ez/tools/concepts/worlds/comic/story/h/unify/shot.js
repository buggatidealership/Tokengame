// node shot.js W tag [css...] : full-page screenshot + slices
const {open}=require('./lib');(async()=>{const [W,tag,...css]=process.argv.slice(2);const {b,p,errs}=await open(+W,844,{css:css.filter(f=>f.endsWith('.css')),js:css.filter(f=>f.endsWith('.js'))});
await p.screenshot({path:`out/${tag}-${W}.png`,fullPage:true});
const m=await p.evaluate(()=>({sh:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth,secs:[...document.querySelectorAll('main.wrap > section')].map(s=>[s.id||s.className.split(' ')[0],Math.round(s.getBoundingClientRect().height)])}));
console.log(JSON.stringify(m),'errs',JSON.stringify(errs));await b.close()})();
