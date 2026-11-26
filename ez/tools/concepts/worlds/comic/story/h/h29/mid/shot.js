// node shot.js <width> <meet:now|h29> <rounds:now|B|C|L> <out-prefix|-> [dpr]   env PORT (9741)
// The built X2+ page (v46) with the H29 middle laid over it: meet12 D (m12.js patched, see PATCH) + meet.css/js, live.js, and the rounds take
// (B, C: rounds10's _r10.js with "Winner" read as "Closest"; L: front.css/js). The gutter: h29/_gutter.css if it exists, else _gutter-ph.css.
// Writes <prefix>-meet.png and <prefix>-rounds.png (element shots) and prints checks plus words/faces/movers per phone screen of the middle.
const {chromium}=require('playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const fs=require('fs');const path=require('path');
const PORT=process.env.PORT||9741,H=path.join(__dirname,'..'),R10=path.join(H,'../rounds10'),M12=path.join(H,'../meet12');
(async()=>{const [Wd,MT,RT,out,dpr]=process.argv.slice(2);const w=+Wd,VH=w<760?844:900;const rd=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
 const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const ctx=await b.newContext({viewport:{width:w,height:VH},deviceScaleFactor:+(dpr||1),reducedMotion:process.env.RM?'reduce':'no-preference'});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
 p.on('response',r=>{if(r.status()>=400&&/h29|media|rounds10|meet12/.test(r.url()))er.push(r.status()+' '+r.url().slice(-70))});
 await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.documentElement.classList.contains('m11-ready'),null,{timeout:120000});await p.waitForTimeout(800);
 const real=fs.existsSync(path.join(H,'_gutter.css'));
 if(MT!=='now'||RT!=='now'){await p.addStyleTag({content:real?rd(path.join(H,'_gutter.css')):rd(path.join(__dirname,'_gutter-ph.css'))});
}
 if(MT!=='now'){/* PATCH m12.js: the version in Anton at 12px or more (it measured Barlow Condensed and could fall to 8px) */
  let m12=rd(path.join(M12,'m12.js')).replace(`tw(V,vs,"'Barlow Condensed'")`,'tw(V,vs)').replace(`tw(V,vs,"'Barlow Condensed'")`,'tw(V,vs)').replace('if(tot>max){const k=max/tot;fs*=k;vs*=k}','if(tot>max){const k=max/tot;fs*=k;vs*=k}vs=Math.max(vs,12);');
  await p.evaluate(()=>{window.__M12T='d';window.__M10T=-1});await p.addStyleTag({content:rd(path.join(M12,'m12.css'))+rd(path.join(__dirname,'meet.css'))});
  await p.addScriptTag({content:m12});await p.addScriptTag({content:rd(path.join(__dirname,'meet.js'))});
  await p.waitForFunction(()=>document.documentElement.classList.contains('h29m-ready')||window.__h29mErr||window.__m12Err,null,{timeout:30000}).catch(()=>er.push('no h29m'));}
 if(RT==='L'){await p.addStyleTag({content:rd(path.join(__dirname,'front.css'))});await p.addScriptTag({content:rd(path.join(__dirname,'front.js'))})}
 else if(RT==='B'||RT==='C'){await p.addStyleTag({content:rd(path.join(R10,'_r10.css'))});await p.evaluate(t=>{window.__R10=t;window.__R10IMG='tools/concepts/worlds/comic/story/h/rounds10/img/'},RT);
  const s=rd(path.join(R10,'_r10.js')).replace(/Winner\$\{W\.length>1\?'s':''\}/g,'Closest').replace(/'Tie':'Winner'/g,"'Closest':'Closest'").replace(/<em>Winner<\/em>/g,'<em>Closest</em>');await p.addScriptTag({content:s})}
 if(MT!=='now'||RT!=='now')await p.addScriptTag({content:rd(path.join(__dirname,'live.js'))});
 await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
 await p.evaluate(async()=>{const e=document.getElementById('learn');const end=e?e.getBoundingClientRect().top+scrollY:6000;for(let y=0;y<end;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,70))}});await p.waitForTimeout(1500);
 await p.evaluate(()=>Promise.all([...document.querySelectorAll('section.c8 img,#record img')].filter(i=>i.getClientRects().length).map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));
 await p.evaluate(()=>window.__h29m&&window.__h29m.fit());
 const span=await p.evaluate(()=>{const a=document.querySelector('section.c8'),r=document.getElementById('record');return {top:Math.round(a.getBoundingClientRect().top+scrollY)-60,bot:Math.round(r.getBoundingClientRect().bottom+scrollY)}});
 const hdrH=await p.evaluate(()=>Math.round(document.querySelector('header').getBoundingClientRect().height)),step=VH-hdrH,scr=[];
 for(let y=span.top-hdrH;y<span.bot-hdrH-120;y+=step){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(1300);
  scr.push(await p.evaluate(({y})=>{const VW=innerWidth,VH=innerHeight,top=document.querySelector('header').getBoundingClientRect().bottom;const fam=f=>f.split(',')[0].replace(/["']/g,'').trim();
   const vis=el=>{for(let e=el;e&&e!==document.body;e=e.parentElement){const c=getComputedStyle(e);if(c.display==='none'||c.visibility==='hidden'||+c.opacity<.05)return false;if(c.clip&&/rect\(0/.test(c.clip))return false;if(/inset\(50%/.test(c.clipPath))return false;if(e.classList.contains('ch-sr')||e.classList.contains('sr'))return false}return true};
   const tw=document.createTreeWalker(document.querySelector('main')||document.body,NodeFilter.SHOW_TEXT);let n,words=0;const fams={},small=[];
   while(n=tw.nextNode()){const t=n.nodeValue.replace(/\s+/g,' ').trim();if(!t)continue;const pe=n.parentElement;if(!pe||/^(SCRIPT|STYLE|NOSCRIPT|TITLE)$/.test(pe.tagName))continue;
    const rg=document.createRange();rg.selectNodeContents(n);const r=rg.getBoundingClientRect();if(!r.width||r.bottom<top||r.top>VH||r.right<0||r.left>VW)continue;if(!vis(pe))continue;
    if(r.width<2&&r.height<2)continue;const wc=t.split(' ').filter(w=>/[A-Za-z0-9$%]/.test(w)).length;words+=wc;const cs=getComputedStyle(pe);const f=fam(cs.fontFamily);fams[f]=(fams[f]||0)+wc;
    let fz=parseFloat(cs.fontSize);if(pe.closest('svg')&&pe.getScreenCTM){const m=pe.getScreenCTM();fz*=Math.hypot(m.a,m.b)}if(fz<11.95)small.push(t.slice(0,18)+'@'+fz.toFixed(1))}
   const anim=document.getAnimations().filter(a=>{const e=a.effect&&a.effect.target;if(!e||a.playState!=='running')return false;const r=e.getBoundingClientRect();return r.bottom>top&&r.top<VH&&r.width>0&&vis(e)&&a.effect.getTiming().iterations===Infinity}).map(a=>{const e=a.effect.target;return (e.getAttribute('class')||e.tagName).split(' ')[0]+':'+(a.animationName||'waapi')});
   const vids=[...document.querySelectorAll('main video')].filter(v=>!v.paused&&v.getBoundingClientRect().bottom>top&&v.getBoundingClientRect().top<VH).map(v=>'video:'+(v.currentSrc||'').split('/').pop().slice(0,24));
   return {y,words,faces:fams,movers:[...new Set(anim)].concat(vids),small:small.slice(0,5)}},{y}))}
 const chk=await p.evaluate(()=>{const vw=document.documentElement.clientWidth;const over=[...document.querySelectorAll('section.c8 *,#record *')].filter(e=>{const r=e.getBoundingClientRect(),cs=getComputedStyle(e);return r.width&&(r.right>vw+.5||r.left<-.5)&&cs.position!=='fixed'&&cs.display!=='none'&&cs.visibility!=='hidden'&&!e.closest('.ch-sr,.sr,svg,.r6,.r6-old,.car,.c7-pic')}).slice(0,6).map(e=>(e.tagName+'.'+(e.getAttribute('class')||'')).slice(0,40)+'@'+Math.round(e.getBoundingClientRect().left)+'..'+Math.round(e.getBoundingClientRect().right));
  const M=document.querySelector('section.c8').getBoundingClientRect(),Rr=document.getElementById('record').getBoundingClientRect();
  return {scrollW:document.documentElement.scrollWidth,vw,over,meetH:Math.round(M.height),roundsH:Math.round(Rr.height),fit:window.__h29m?window.__h29m.log:null,names:window.__m12?window.__m12.names:null,m12:window.__m12?window.__m12.measure().overlap:null,err:[window.__h29mErr,window.__m12Err].filter(Boolean).map(String)}});
 if(out!=='-'){await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if((ps==='fixed'||ps==='sticky'))x.style.setProperty('visibility','hidden','important')});const t=document.querySelector('section.t4');if(t)t.style.setProperty('visibility','hidden','important')});
  await p.evaluate(()=>{window.__h29Still=1;document.querySelectorAll('main video').forEach(v=>{v.pause()})});
  const shoot=async(sel,f)=>{const bx=await p.evaluate(s=>{const e=document.querySelector(s),c=e.getBoundingClientRect(),g=[...document.querySelectorAll('.h29-gutter')].map(x=>x.getBoundingClientRect()).filter(r=>r.height&&r.bottom>c.top-100&&r.top<c.top+10);const t=Math.min(c.top,...g.map(r=>r.top));return {y:t+scrollY,h:c.bottom-t}},sel);
   await p.screenshot({path:f,clip:{x:0,y:bx.y,width:w,height:Math.min(bx.h,9000)},fullPage:true})};
  await shoot('section.c8',out+'-meet.png');await shoot('#record',out+'-rounds.png')}
 console.log(JSON.stringify({w,MT,RT,span,gutter:real?'real':'placeholder',...chk,screens:scr,er}));await b.close()})();
