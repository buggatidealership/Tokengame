// node shot.js <outdir> <W> [dpr] [mode: full|secs|first]  · serves from http://127.0.0.1:8982 (ez/)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
(async()=>{const [OUT,Wd,dpr,mode]=process.argv.slice(2);const W=+Wd,VH=W<760?664:(W<1400?800:864);fs.mkdirSync(OUT,{recursive:true});
 const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
 const ctx=await b.newContext({viewport:{width:W,height:VH},deviceScaleFactor:+(dpr||1),reducedMotion:process.env.RM?'reduce':'no-preference'});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,200))});
 p.on('response',r=>{if(r.status()>=400)er.push(r.status()+' '+r.url().slice(-80))});
 await p.goto('http://127.0.0.1:8982/tools/concepts/worlds/comic/story/h/h30/b/index.html'+(process.env.Q||''),{waitUntil:'networkidle'});
 await p.evaluate(()=>document.fonts.ready);
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1200);
 const info=await p.evaluate(()=>{const D=document,vw=D.documentElement.clientWidth;
  const secs=[...D.querySelectorAll('section.sec')].map(s=>{const r=s.getBoundingClientRect();let words=0;const tw=D.createTreeWalker(s,NodeFilter.SHOW_TEXT);let n;
    const lab={};while(n=tw.nextNode()){const t=n.nodeValue.replace(/\s+/g,' ').trim();if(!t)continue;const pe=n.parentElement;if(!pe||pe.closest('.sr,[aria-hidden=true]'))continue;const cs=getComputedStyle(pe);if(!pe.checkVisibility({checkOpacity:true,checkVisibilityCSS:true}))continue;
      const w=t.split(' ').filter(x=>/[A-Za-z]{2,}/.test(x)).length;words+=w;const f=cs.fontFamily.split(',')[0].replace(/"/g,'');lab[f]=(lab[f]||0)+w}
    return {id:s.id,top:Math.round(r.top+scrollY),h:Math.round(r.height),words,faces:lab}});
  const past=[...D.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.right>vw+.5)&&!e.closest('svg')}).slice(0,8).map(e=>e.className+' '+Math.round(e.getBoundingClientRect().right));
  return {sw:D.documentElement.scrollWidth,vw,secs,past,hdr:Math.round(D.querySelector('header').getBoundingClientRect().height),b:window.__b&&{order:__b.order,lead:__b.lead,ex:__b.ex,latest:__b.latest,next:__b.nextLab,trades:__b.trades}}});
 console.log(JSON.stringify(info));fs.writeFileSync(OUT+'/info-'+W+'.json',JSON.stringify({info,er},null,1));
 if(!mode||mode==='full'){await p.screenshot({path:OUT+'/full-'+W+'.png',fullPage:true})}
 if(mode==='secs'||mode==='all'){for(const s of info.secs){await p.evaluate(y=>scrollTo(0,y),s.top);await p.waitForTimeout(900);const el=await p.$('#'+s.id);await el.screenshot({path:OUT+'/s-'+W+'-'+s.id+'.png'})}
   await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(400);await p.screenshot({path:OUT+'/first-'+W+'.png'})}
 if(mode==='first'){await p.screenshot({path:OUT+'/first-'+W+'.png'})}
 if(mode==='all'){await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(400);await p.screenshot({path:OUT+'/full-'+W+'.png',fullPage:true})}
 console.log('errors',JSON.stringify(er));await b.close()})();
