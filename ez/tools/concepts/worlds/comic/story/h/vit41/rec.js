// node rec.js <out dir>   records the belt (scroll by swipes, then Older) and the deck (swipes left and right, then a swipe up that opens the round)
// at 390x844 with touch, on the private sandbox (PORT, default 8961); writes belt.webm, deck.webm in <out dir>.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],PORT=process.env.PORT||8961;fs.mkdirSync(OUT,{recursive:true});
const drag=async(c,x0,y0,x1,y1,n=14)=>{await c.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x0,y:y0}]});
  for(let i=1;i<=n;i++){await c.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x0+(x1-x0)*i/n,y:y0+(y1-y0)*i/n}]});await new Promise(r=>setTimeout(r,16))}
  await c.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})};
(async()=>{const b=await chromium.launch();
 for(const V of ['belt','deck']){
  const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true,recordVideo:{dir:OUT+'/raw-'+V,size:{width:390,height:844}}});
  const p=await ctx.newPage();await FONTS(p);await p.addInitScript(v=>{window.__x2pSwipe=v},V);
  await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'domcontentloaded'});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pVit,null,{timeout:150000});await p.waitForTimeout(1500);
  const c=await ctx.newCDPSession(p);
  await p.evaluate(V=>{document.documentElement.style.scrollBehavior='auto';const e=document.querySelector(V==='belt'?'.vt-line':'.vt-stk');const r=e.getBoundingClientRect();scrollTo(0,scrollY+r.top-(V==='belt'?330:250))},V);
  await p.waitForTimeout(1500);
  if(V==='belt'){const r=await p.evaluate(()=>{const e=document.querySelector('.vt-belt').getBoundingClientRect();return {y:e.top+e.height*.45}});
    for(let k=0;k<4;k++){await drag(c,330,r.y,80,r.y);await p.waitForTimeout(1100)}
    await drag(c,80,r.y,330,r.y);await p.waitForTimeout(1100);
    await p.tap('.vt-ol');await p.waitForTimeout(1300);await p.tap('.vt-ol');await p.waitForTimeout(1300);
    // a tap lifts a slab and tags it
    const s=await p.evaluate(()=>{const B=document.querySelector('.vt-belt').getBoundingClientRect();const it=[...document.querySelectorAll('.vt-belt .vt-it')].find(i=>{const q=i.getBoundingClientRect();return q.left>B.left+40&&q.right<B.right-20});const q=it.querySelector('a').getBoundingClientRect();return {x:q.left+q.width/2,y:q.top+q.height/2}});
    await p.touchscreen.tap(s.x,s.y);await p.waitForTimeout(1800);
    // a vertical swipe over the belt scrolls the page
    await drag(c,195,r.y,195,r.y-260);await p.waitForTimeout(1600)}
  else{const fr=()=>p.evaluate(()=>{const f=document.querySelector('.vt-stk .vt-it[data-p="0"]').getBoundingClientRect();return {x:f.left+f.width/2,y:f.top+f.height*.6}});
    for(let k=0;k<3;k++){const f=await fr();await drag(c,f.x,f.y,f.x-190,f.y+12);await p.waitForTimeout(1000)}
    {const f=await fr();await drag(c,f.x,f.y,f.x+190,f.y+8);await p.waitForTimeout(1000)}
    {const f=await fr();await drag(c,f.x-30,f.y,f.x+40,f.y,6);await p.waitForTimeout(900)}/* a short drag snaps back */
    await p.tap('.vt-ol');await p.waitForTimeout(1000);
    {const f=await fr();await drag(c,f.x,f.y,f.x,f.y-200);await p.waitForTimeout(2600)}}
  await ctx.close()}
 await b.close()})();
