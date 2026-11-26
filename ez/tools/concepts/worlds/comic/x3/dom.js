const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
 await p.goto('http://localhost:8897/v47-live-x3plus.html#/leaderboard',{waitUntil:'load'});await p.waitForTimeout(12000);
 console.log(await p.evaluate(()=>{const v=document.querySelector('#view');let s='';let n=v;const path=[];while(n){path.push(n.tagName+'#'+n.id+'.'+(n.className||'').toString().slice(0,30));n=n.parentElement}
  return path.join(' < ')+'\nVIEW kids: '+[...v.children].map(x=>x.tagName+'#'+x.id+'.'+x.className.slice(0,50)).join(' | ')+'\nscores strip: '+(document.querySelector('.scores,.xs-strip,[class*=score]')||{}).className+'\nbody kids: '+[...document.body.children].map(x=>x.tagName+'#'+x.id+'.'+(x.className||'').toString().slice(0,30)).join(' | ')}));
 await b.close()})();
