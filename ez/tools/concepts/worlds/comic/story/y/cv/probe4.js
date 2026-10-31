const {open}=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const {p}=await open(b,390,process.argv[2]||'c3',{wait:300});
console.log(await p.evaluate(sel=>{const r=e=>{const b=e.getBoundingClientRect();return [e.className.baseVal??e.className,Math.round(b.left),Math.round(b.top),Math.round(b.width),Math.round(b.height)].join(' ')};return [...document.querySelectorAll(sel)].map(r).join('\n')},process.argv[3]||'.c3-f1, .c3-f1 .c3-ob, .c3-o1, .c3-c0, .c3-c0 .pp-coin'));await b.close()})();
