const {open}=require('./lib');(async()=>{const [expr,...ov]=process.argv.slice(2);const {b,p,errs}=await open(390,844,{css:ov.filter(f=>f.endsWith('.css')),js:ov.filter(f=>f.endsWith('.js'))});
console.log(await p.evaluate(expr));console.log(errs);await b.close()})();
