const {open}=require('./lib');(async()=>{const {b,p}=await open(390,844);
const r=await p.evaluate(()=>{const fams=['Anton','Bangers','Shantell Sans','Barlow Condensed','Barlow','Saira Condensed','Kanit','Chivo Mono'];const o={};
 for(const f of fams){for(const v of ['normal','tabular-nums']){const s=document.createElement('span');s.style.cssText=`position:absolute;top:-999px;font-family:'${f}';font-size:100px;font-weight:${f==='Shantell Sans'?600:f.startsWith('Barlow')||f.startsWith('Saira')?700:400};font-variant-numeric:${v};white-space:pre`;document.body.appendChild(s);
  const w=[];for(const d of '0123456789+-$%'){s.textContent=d.repeat(10);w.push(Math.round(s.getBoundingClientRect().width)/10)}s.remove();o[f+' '+v]=w.join(' ')}}return o});
console.log(r);await b.close()})();
