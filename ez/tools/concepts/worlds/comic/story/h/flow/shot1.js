// quick check: node shot1.js <take> <W> <out.png> [y list]
const R=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const [t,W,out]=[process.argv[2],+process.argv[3],process.argv[4]];const ys=(process.argv[5]||'').split(',').filter(Boolean).map(Number);const b=await chromium.launch();const H=W<600?844:800;const {ctx,p,er}=await R.open(b,W,H,1);await R.inject(p,t);await R.quiet(p);
const C=await R.cuts(p);console.log('cuts',C.join(','),await p.evaluate(()=>[document.documentElement.scrollWidth,innerWidth,document.documentElement.scrollHeight].join('/')));
let i=0;for(const y of (ys.length?ys:C.map(c=>c-H*.55))){const y0=await p.evaluate(()=>scrollY);for(let s=1;s<=6;s++){await p.evaluate(v=>scrollTo(0,v),Math.round(y0+(y-y0)*s/6));await p.waitForTimeout(80)}await p.waitForTimeout(1300);await p.screenshot({path:out.replace('.png','-'+(i++)+'.png')})}
console.log(er.join('|')||'ok');await b.close()})();
