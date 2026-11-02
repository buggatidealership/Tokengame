const {open}=require('./lib');const [W,sel,...ov]=process.argv.slice(2);(async()=>{const {b,p,errs}=await open(+W,664,{css:ov.filter(f=>f.endsWith('.css')),js:ov.filter(f=>f.endsWith('.js'))});
await p.waitForSelector('.u3-root');await p.waitForTimeout(1500);
console.log(await p.evaluate(s=>[...document.querySelectorAll(s)].slice(0,3).map(e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return [c.stroke,c.strokeWidth,c.fill,e.tagName,r.x|0,r.y|0,r.width|0,r.height|0,c.display,c.position,c.opacity,c.visibility,c.zIndex].join(' ')}).join('\n'),sel));await b.close()})();
