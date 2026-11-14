const L=require('./lib.js');const OUT=process.argv[2];const W=+process.argv[3]||390;
(async()=>{const b=await L.chromium.launch();const {p,er}=await L.open(b,W,1);await L.hideFixed(p);const H=await p.evaluate(()=>document.documentElement.scrollHeight);
await L.longShot(p,OUT,0,H);console.log(H,er);await b.close()})();
