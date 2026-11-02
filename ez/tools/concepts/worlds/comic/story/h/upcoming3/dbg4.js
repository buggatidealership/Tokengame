const {open}=require('./lib');const [W,sel,...ov]=process.argv.slice(2);(async()=>{const {b,p,errs}=await open(+W,664,{css:ov.filter(f=>f.endsWith('.css')),js:ov.filter(f=>f.endsWith('.js'))});
await p.waitForSelector('.u3-root');await p.waitForTimeout(1500);
console.log(await p.evaluate(s=>{const e=document.querySelector(s);return e?[e.outerHTML.slice(0,300),getComputedStyle(e).width,document.documentElement.className]:'none'},sel));await b.close()})();
