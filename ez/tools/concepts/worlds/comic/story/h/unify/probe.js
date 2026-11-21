const {open}=require('./lib');(async()=>{const W=+process.argv[2];const {b,p,errs}=await open(W,844);
const r=await p.evaluate(()=>{const m=document.querySelector('main');const out=[];
 const secs=[...document.querySelectorAll('main section, main > *')].filter(s=>{const cs=getComputedStyle(s);return cs.display!=='none'&&s.getBoundingClientRect().height>20});
 for(const s of secs){const r=s.getBoundingClientRect();out.push([s.tagName,s.id,s.className.toString().slice(0,60),Math.round(r.top+scrollY),Math.round(r.height),s.parentElement.tagName+'.'+s.parentElement.className.toString().slice(0,20)])}
 return {secs:out,sh:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth,fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family+' '+f.weight+' '+f.style)}});
console.log(JSON.stringify(r,null,0).replace(/\],\[/g,'],\n['));console.log('errs',errs);await b.close()})();
