/* live-r1: mockups for "the site keeps updating" (owner, 2026-10-26). Loads the real X2+ page at a fixed moment, injects
   one option from live-r1/, measures overflow and shoots it. Nothing on the site changes.
     node live-r1.js model            print the live model for each moment
     node live-r1.js pill [A..E]      header pill options -> scratchpad/lv/pill-*.png
     node live-r1.js page [P1..P4]    page-wide elements  -> scratchpad/lv/page-*.png
     node live-r1.js boards           compose the two boards into ez/
   Moments (all New York time; the data is ez-data.js as it stands, except where a moment is rebuilt from the sheet):
     mon  Mon Oct 26, 1:09 pm   data as is: 45 graded, today's 8 rounds have no calls in yet
     fri  Fri Oct 23, 1:09 pm   rebuilt: R43 to R45 back to "calls in" (their moves blanked), the bell at 4pm grades them
     bell Fri Oct 23, 4:20 pm   the same, after the bell, before the sync that posts the results
     sat  Sat Oct 24, 11:00 am  data as is (the R43 to R45 sync ran on Friday) */
const fs=require('fs'),path=require('path');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const FONTS=require('./live-r1/_fonts.js');
const EZ='/home/user/Tokengame/ez/',D=__dirname+'/live-r1/',S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/lv/';
fs.mkdirSync(S,{recursive:true});
const MOMENTS={mon:['2026-10-26T17:09:00Z',null,'Mon Oct 26, 1:09 pm ET'],fri:['2026-10-23T17:09:00Z',[43,44,45],'Fri Oct 23, 1:09 pm ET (rebuilt)'],
  bell:['2026-10-23T20:20:00Z',[43,44,45],'Fri Oct 23, 4:20 pm ET (rebuilt)'],sat:['2026-10-24T15:00:00Z',null,'Sat Oct 24, 11:00 am ET']};
const MODEL=fs.readFileSync(D+'_model.js','utf8');
async function open(b,w,moment,h){
  const ctx=await b.newContext({viewport:{width:w,height:h||844},deviceScaleFactor:2,timezoneId:'America/New_York'});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.errs=errs;
  await FONTS(p);const M=MOMENTS[moment];
  await p.clock.setFixedTime(new Date(M[0]));
  await p.route(/ez-data\.js/,r=>{let s=fs.readFileSync(EZ+'ez-data.js','utf8');
    if(M[1])s=s.replace('\nbuild(SHEET_HEADER,SHEET);','\nSHEET.forEach(function(r){if('+JSON.stringify(M[1])+'.indexOf(+r[0])>-1)r[12]=""});\nbuild(SHEET_HEADER,SHEET);');
    r.fulfill({contentType:'application/javascript',body:s})});
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForTimeout(5200);
  await p.evaluate(MODEL);return p}
async function inject(p,opt){const css=fs.readFileSync(D+'_common.css','utf8')+(fs.existsSync(D+opt+'.css')?fs.readFileSync(D+opt+'.css','utf8'):'');const js=fs.readFileSync(D+'_common.js','utf8')+'\n'+(fs.existsSync(D+opt+'.js')?fs.readFileSync(D+opt+'.js','utf8'):'');
  await p.evaluate(([css,js])=>{const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);if(js)(0,eval)(js)},[css,js]);await p.waitForTimeout(700)}
/* overflow: the page must not scroll sideways; every lv- element must sit inside the viewport; in the header, the pill
   must not overlap the brand, the X icon or the tabs */
async function measure(p){return p.evaluate(()=>{const W=innerWidth,o={sw:document.documentElement.scrollWidth,W:W,bad:[]};
  document.querySelectorAll('[class*="lv-"]').forEach(e=>{if(e.parentElement&&e.parentElement.closest('.lv-crawl,.lv-scroll,#car'))return;const r=e.getBoundingClientRect();if(!r.width)return;if(r.left<-0.5||r.right>W+0.5)o.bad.push(e.className+' '+Math.round(r.left)+'..'+Math.round(r.right));
    if(e.scrollWidth>e.clientWidth+1&&!/lv-scroll|lv-crawl/.test(e.className)&&getComputedStyle(e).overflow!=='visible')o.bad.push('clip '+e.className+' '+e.scrollWidth+'>'+e.clientWidth)});
  const pill=document.querySelector('.lv-pill');if(pill){const r=pill.getBoundingClientRect();o.pill=[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)];
    ['.brand','.x2p-xhd','.nav'].forEach(s=>{const e=document.querySelector(s);if(!e)return;const q=e.getBoundingClientRect();if(!q.width)return;
      if(r.left<q.right&&r.right>q.left&&r.top<q.bottom&&r.bottom>q.top)o.bad.push('overlaps '+s)});
    o.hdr=Math.round(document.querySelector('header.top').getBoundingClientRect().height)}
  return o})}
const PILLS=['NOW','A','B','C','D','E'],PAGES=['P1','P2','P3','P4'];
(async()=>{const mode=process.argv[2]||'model',only=process.argv[3];const b=await chromium.launch();
 if(mode==='model'){for(const m of Object.keys(MOMENTS)){const p=await open(b,390,m);
   console.log(m,JSON.stringify(await p.evaluate(()=>({today:LV.todayLabel,bell:LV.bellLabel,left:LV.left(),hms:LV.hms(),open:LV.open,rung:LV.rungToday,atBell:LV.atBell.map(u=>u.n),waiting:LV.waiting.map(u=>u.n),graded:LV.graded,last:LV.lastLabel,lastBatch:LV.lastBatch.map(r=>r.n+LV.short(r)+r.out+r.win),due:LV.due.map(u=>u.n+LV.short(u)),next:LV.nextLabel,upcoming:LV.upcoming,pending:LV.pending,total:LV.total,stand:LV.stand.map(t=>t.m+' #'+t.rank+' '+(t.hr*100).toFixed(1)+' mv'+t.move+' '+t.ok+'/'+t.n),week:LV.week.map(d=>d.k+':'+d.n+'/'+d.graded+'/'+d.inn),wk:LV.weekCalls,pct:LV.sessionPct().toFixed(2)}))),p.errs.join('|'));await p.context().close()}}
 if(mode==='pill'){for(const opt of PILLS){if(only&&opt!==only)continue;
   await Promise.all([[390,'mon'],[1280,'mon'],[320,'mon'],[390,'fri'],[390,'bell'],[390,'sat'],[1280,'fri'],[1280,'sat']].map(async([w,m])=>{
     const p=await open(b,w,m,200);if(opt!=='NOW')await inject(p,opt);const r=await measure(p);
     await p.screenshot({path:S+'pill-'+opt+'-'+m+'-'+w+'.png',clip:{x:0,y:0,width:w,height:w>760?62:112}});
     console.log(opt,m,w,JSON.stringify(r),p.errs.join('|'));await p.context().close()}))}}
 if(mode==='page'){for(const opt of PAGES){if(only&&opt!==only)continue;const spec=require(D+opt+'.shot.js');
   for(const m of spec.moments){for(const w of [390,320,1280]){const p=await open(b,w,m);await inject(p,opt);
     if(spec.pre&&spec.pre[m]){await p.evaluate(spec.pre[m]);await p.waitForTimeout(1200)}
     const r=await measure(p);
     if(w===390||spec.all)for(const [i,sel,dy] of spec.shots.map((s,i)=>[i,s[0],s[1]])){
       const y=await p.evaluate(([sel,dy])=>{const e=document.querySelector(sel);if(!e)return 0;const t=e.getBoundingClientRect().top+scrollY+dy;scrollTo({top:Math.max(0,t),behavior:'instant'});return t},[sel,dy]);
       await p.waitForTimeout(900);await p.screenshot({path:S+'page-'+opt+'-'+m+'-'+w+'-'+i+'.png'})}
     console.log(opt,m,w,JSON.stringify(r),p.errs.join('|'));await p.context().close()}}}}
 if(mode==='boards')await require(D+'_boards.js')(b,S,EZ,MOMENTS);
 await b.close()})();
