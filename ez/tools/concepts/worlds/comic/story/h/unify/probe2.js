const {open}=require('./lib');(async()=>{const W=+process.argv[2];const {b,p,errs}=await open(W,844);
const r=await p.evaluate(()=>{const d=(el,dep)=>{if(dep>3)return '';return [...el.children].filter(c=>getComputedStyle(c).display!=='none'&&c.getBoundingClientRect().height>8).map(c=>'  '.repeat(dep)+c.tagName+'#'+c.id+'.'+c.className.toString().slice(0,50)+' h'+Math.round(c.getBoundingClientRect().height)+' y'+Math.round(c.getBoundingClientRect().top+scrollY)+'\n'+(dep<2?d(c,dep+1):'')).join('')};
 return d(document.querySelector('main.wrap'),0)+'\nFOOT:'+[...document.body.children].map(c=>c.tagName+'#'+c.id+'.'+c.className.toString().slice(0,30)).join(' | ')});
console.log(r);await b.close()})();
