/* live-r4: under the explainer film, a module that says the site is live and changes every weekday (owner, 2026-10-26), plus headline
   alternatives. Reuses live-r3's runner pieces (the real X2+ page at a fixed New York moment, the live model, logos).
     node live-r4.js under [U1..U5]   modules under the film -> scratchpad/lv4/u-*.png
     node live-r4.js head [H0..H4]    headlines (with an optional module: node live-r4.js head H1 U2) -> scratchpad/lv4/h-*.png */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const FONTS=require('./live-r1/_fonts.js');
const EZ='/home/user/Tokengame/ez/',D=__dirname+'/live-r4/',D1=__dirname+'/live-r1/',D3=__dirname+'/live-r3/',S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/lv4/';
fs.mkdirSync(S,{recursive:true});
const MOMENTS={mon:['2026-10-26T17:09:00Z',null],fri:['2026-10-23T17:09:00Z',[43,44,45]],bell:['2026-10-23T20:20:00Z',[43,44,45]],sat:['2026-10-24T15:00:00Z',null]};
const MODEL=fs.readFileSync(D1+'_model.js','utf8'),rd=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
async function open(b,w,moment,h){const ctx=await b.newContext({viewport:{width:w,height:h||844},deviceScaleFactor:2,timezoneId:'America/New_York',reducedMotion:'reduce'});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.errs=errs;await FONTS(p);const M=MOMENTS[moment];
  await p.clock.setFixedTime(new Date(M[0]));
  await p.route(/ez-data\.js/,r=>{let s=fs.readFileSync(EZ+'ez-data.js','utf8');
    if(M[1])s=s.replace('\nbuild(SHEET_HEADER,SHEET);','\nSHEET.forEach(function(r){if('+JSON.stringify(M[1])+'.indexOf(+r[0])>-1)r[12]=""});\nbuild(SHEET_HEADER,SHEET);');
    r.fulfill({contentType:'application/javascript',body:s})});
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForTimeout(5200);await p.evaluate(MODEL);return p}
async function inject(p,opt){const css=rd(D1+'_common.css')+rd(D3+'_r2.css')+rd(D+opt+'.css'),js=[rd(D1+'_common.js'),rd(D3+'_state.js'),rd(D3+'_logos.js'),rd(D+'_lv4.js'),rd(D+opt+'.js')].join('\n');
  await p.evaluate(([css,js])=>{const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);(0,eval)(js)},[css,js]);await p.waitForTimeout(800)}
async function measure(p){return p.evaluate(()=>{const W=innerWidth,o={sw:document.documentElement.scrollWidth,W,bad:[]};
  document.querySelectorAll('.lv4 *').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width)return;if(r.left<-0.5||r.right>W+0.5)o.bad.push('out '+e.className+' '+Math.round(r.left)+'..'+Math.round(r.right));
    if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible')o.bad.push('clip '+e.className)});
  const m=document.querySelector('.lv4'),f=document.querySelector('.x2p-vt'),h=document.querySelector('h1'),rec=document.querySelector('#record .sh');
  const y=e=>e?Math.round(e.getBoundingClientRect().top+scrollY):null,yb=e=>e?Math.round(e.getBoundingClientRect().bottom+scrollY):null;
  Object.assign(o,{h1:[y(h),yb(h)],film:[y(f),yb(f)],mod:[y(m),yb(m)],rec:y(rec)});
  /* text that wraps when it should hold one line */
  document.querySelectorAll('.lv4 li,.lv4 em,.lv4 small,.lv4-sh span,.lv4-mr').forEach(e=>{const r=e.getClientRects();if(e.matches('.lv4-u1 li')){const lh=parseFloat(getComputedStyle(e).lineHeight)||20;if(e.getBoundingClientRect().height>lh*1.6+12)o.bad.push('wrap '+e.textContent)}});
  return o})}
const HEADS={H0:null,
  H1:'4 AIs call earnings.<br> <span class="hl">The best one runs our buybacks.</span>',
  H2:'Can an <span class="lc">AI</span> call earnings?<br> <span class="hl">4 are trying. Live.</span>',
  H3:'4 AIs. Live. Every week.<br> <span class="hl">The top one bets our pool.</span>',
  H4:'KICK'};
(async()=>{const mode=process.argv[2]||'under',only=process.argv[3],withU=process.argv[4];const b=await chromium.launch();
 if(mode==='under'){for(const opt of ['U1','U2','U3','U4','U5']){if(only&&opt!==only)continue;
   await Promise.all([[390,'mon'],[390,'fri'],[390,'bell'],[390,'sat'],[320,'mon'],[1280,'mon']].map(async([w,m])=>{
     const p=await open(b,w,m,w>760?900:844);await inject(p,opt);const r=await measure(p);
     await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(300);
     await p.screenshot({path:S+'u-'+opt+'-'+m+'-'+w+'.png'});
     console.log(opt,m,w,JSON.stringify(r),p.errs.join('|'));await p.context().close()}))}}
 if(mode==='head'){for(const h of Object.keys(HEADS)){if(only&&only!=='all'&&h!==only)continue;
   await Promise.all([[390,'mon'],[320,'mon'],[1280,'mon']].map(async([w,m])=>{const p=await open(b,w,m,w>760?900:844);
     if(HEADS[h]==='KICK')await p.evaluate(wk=>{const h1=document.querySelector('h1');const k=document.createElement('p');k.className='lv4-kick';
         k.innerHTML='<i class="lv-dot"></i>Live · Season 1 · Week '+wk;h1.before(k)},0).catch(()=>{});
     else if(HEADS[h])await p.evaluate(t=>{const h=document.querySelector('h1');h.innerHTML=t;h.style.setProperty('white-space','nowrap','important');let f=parseFloat(getComputedStyle(h).fontSize);const f0=f;const P=h.parentElement,cs=getComputedStyle(P),T=P.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);h.style.width='max-content';h.style.maxWidth='none';while(h.getBoundingClientRect().width>T+.5&&f>20){f-=.5;h.style.setProperty('font-size',f+'px','important')}h.dataset.fs=f0+'>'+f},HEADS[h]);
     if(HEADS[h]==='KICK'){await inject(p,'_kick');}
     if(withU)await inject(p,withU);await p.waitForTimeout(500);const r=await measure(p);await p.evaluate(()=>scrollTo(0,0));
     await p.screenshot({path:S+'h-'+h+(withU?'-'+withU:'')+'-'+m+'-'+w+'.png'});console.log(h,withU||'',w,await p.evaluate(()=>document.querySelector('h1').dataset.fs),JSON.stringify(r),p.errs.join('|'));await p.context().close()}))}}
 await b.close()})();
