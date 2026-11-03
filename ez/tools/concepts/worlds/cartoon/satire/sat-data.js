/* satire / sat-data.js — every number on both mockup pages, computed from ez-data.js at render time.
   Rules (BRIEF.md, Round H47): flat $100,000 per trade, v = 100000 x dir x move / 100, a W when v > 0;
   hit rate over time = (right + 1) / (trades + 2); windows: 7 days = rounds whose resolves date (New York) is today or
   one of the six days before; 24 hours = rounds graded at their own exchange's close in the last 24 hours, no fallback.
   The bet time is the live page's betAt (x2p_more.js), copied verbatim. Nothing here is typed by hand. */
(function(W){
'use strict';
const MK=['GROK','CLAUDE','GPT','KIMI'];
const NM={GROK:'Grok',CLAUDE:'Claude',GPT:'GPT',KIMI:'Kimi'};
const COL={GROK:'#e4e0d6',CLAUDE:'#ef8a55',GPT:'#b18cff',KIMI:'#58b7ff'};
const FLAG={GROK:'US',CLAUDE:'US',GPT:'US',KIMI:'CN'};
const SECT={"Information Technology":"Tech","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Financials":"Finance","Industrials":"Industrials","Communication Services":"Media & telecom","Health Care":"Health","Materials":"Materials","Energy":"Energy","Utilities":"Utilities","Real Estate":"Real estate"};
const XC={KS:['Asia/Seoul',15,30],KQ:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30],MI:['Europe/Rome',17,30],MC:['Europe/Madrid',17,30]};
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],DAY=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const IDF={};
function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=String(mdy).split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
const NYF=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'});
function nyDay(ms){const p=NYF.formatToParts(new Date(ms));const g=k=>+p.find(x=>x.type===k).value;return Date.UTC(2000+g('year'),g('month')-1,g('day'))}
const dOf=s=>{const [m,d,y]=String(s).split('/').map(Number);return Date.UTC(2000+(y%100),m-1,d)};
const md=ms=>{const d=new Date(ms);return MON[d.getUTCMonth()]+' '+d.getUTCDate()};
const wdmd=ms=>{const d=new Date(ms);return DAY[d.getUTCDay()]+' '+MON[d.getUTCMonth()]+' '+d.getUTCDate()};

/* the bet: x2p_more.js betAt, verbatim */
function betAt(){const md2=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
  const nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
  const S=window.SIM||{},C=window.CONFIG||{},bd=md2(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
  const nv=[].concat(window.UPCOMING||[],window.PENDING||[]).find(u=>u.ticker==='NVDA'),c0=nv&&md2(nv.called);if(!c0)return null;
  let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}

const $f=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const $k=v=>{const a=Math.abs(v);return (v<0?'−':'+')+'$'+(a>=1000?(a/1000).toFixed(a>=100000?0:1)+'K':Math.round(a))};
const pct=v=>v==null?'–':Math.round(v*100)+'%';
const mv=a=>(a<0?'−':'+')+Math.abs(a).toFixed(2)+'%';
const co=t=>(W.TICKERS&&TICKERS[t])||t;
const tk=t=>String(t).split('.')[0];
const coT=t=>co(t)+' ('+tk(t)+')';
const logo=t=>{const L=W.CO_LOGOS&&CO_LOGOS[t];return L?{src:'../../../../../media/'+L.f,c:L.c,dark:!!L.dark}:null};
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function compute(NOW){
  NOW=NOW||W.__SATNOW||Date.now();const today=nyDay(NOW);
  const RS=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)).slice().sort((a,b)=>a.n-b.n);
  const per={};MK.forEach(m=>per[m]={m,name:NM[m],col:COL[m],flag:FLAG[m],trades:[],pnl:0,W:0,L:0,right:0,n:0,ser:[],hit:[],long:0,size:0,best:null,worst:null,sect:{}});
  RS.forEach((r,i)=>{
    const sec=SECT[(W.RMETA&&RMETA[r.n]&&RMETA[r.n].sector)||'']||null;
    r.__sec=sec;r.__t={};
    r.calls.forEach(c=>{const m=c[0];const P=per[m];if(!P)return;const up=/^UP/.test(c[1]);const dir=up?1:-1;const v=100000*dir*r.a/100;
      const mag=parseFloat(String(c[1]).replace(/[^0-9.]/g,''));
      const t={n:r.n,r,dir,v,mag,ok:v>0,off:parseFloat(c[2])};r.__t[m]=t;P.trades.push(t);P.pnl+=v;P.n++;if(v>0){P.W++;P.right++}else P.L++;if(up)P.long++;P.size+=mag;
      if(!P.best||v>P.best.v)P.best=t;if(!P.worst||v<P.worst.v)P.worst=t;
      if(sec){const q=P.sect[sec]||(P.sect[sec]={w:0,n:0});q.n++;if(v>0)q.w++}});
    MK.forEach(m=>{const P=per[m];P.ser.push({i,n:r.n,v:P.pnl});P.hit.push({i,n:r.n,v:(P.right+1)/(P.n+2),traded:!!r.__t[m]})});
  });
  MK.forEach(m=>{const P=per[m];P.hitRate=P.n?P.right/P.n:null;P.avgSize=P.n?P.size/P.n:0;P.longShare=P.n?P.long/P.n:0;P.last5=P.trades.slice(-5)});
  const cl=r=>r.__xc!==undefined?r.__xc:(r.__xc=closeAt(r.ticker,r.resolves));
  const dAgo=r=>r.resolves?Math.round((today-dOf(r.resolves))/864e5):1e9;
  const inD1=r=>{const a=dAgo(r);if(a>2||a<-1)return false;const c=cl(r);return c!=null&&c<=NOW&&c>NOW-864e5};
  const inD7=r=>{const a=dAgo(r);return a>=0&&a<=6};
  const lastClose=RS.reduce((a,r)=>{const c=cl(r);return c&&c<=NOW&&c>a?c:a},0);
  const lcDay=RS.reduce((a,r)=>{const t=r.resolves?dOf(r.resolves):0;return t>a?t:a},0),lcRs=RS.filter(r=>r.resolves&&dOf(r.resolves)===lcDay);
  const lcName=wdmd(nyDay(lastClose||NOW));
  const d1=RS.filter(inD1),d7=RS.filter(inD7),wd=today-6*864e5;
  const WIN={
    season:{k:'season',t:'Season',lab:'Season P&L',when:'Since '+md(dOf(RS[0].called||RS[0].resolves))+' · '+RS.length+' rounds',rs:RS},
    d7:{k:'d7',t:'7 days',lab:'7-day P&L',when:md(wd)+' to '+md(today)+' · '+d7.length+' round'+(d7.length===1?'':'s'),rs:d7},
    d1:{k:'d1',t:'24 hours',lab:'24h P&L',when:d1.length?d1.length+' round'+(d1.length===1?'':'s')+' at the '+md(dOf(d1[d1.length-1].resolves))+' close':'No round graded in the last 24 hours · last close '+lcName,rs:d1}};
  const win={};Object.values(WIN).forEach(w=>{win[w.k]={};MK.forEach(m=>{let p=0,wn=0,l=0;w.rs.forEach(r=>{const x=r.__t[m];if(!x)return;p+=x.v;if(x.v>0)wn++;else l++});win[w.k][m]={pnl:p,W:wn,L:l,n:wn+l,hit:wn+l>=5?wn/(wn+l):null}})});
  const lc={};MK.forEach(m=>{let p=0,k=0;lcRs.forEach(r=>{const x=r.__t[m];if(x){p+=x.v;k++}});lc[m]={pnl:p,n:k}});
  const rank=MK.slice().sort((a,b)=>per[b].pnl-per[a].pnl);
  /* lone wolf: every model traded, exactly one was right; the biggest move */
  let wolf=null;RS.forEach(r=>{const ts=MK.map(m=>r.__t[m]).filter(Boolean);if(ts.length!==4)return;const ok=ts.filter(t=>t.ok);if(ok.length!==1)return;if(!wolf||Math.abs(r.a)>Math.abs(wolf.r.a))wolf={r,m:MK.find(m=>r.__t[m]&&r.__t[m].ok)}});
  /* nobody rounds */
  const nobody=RS.filter(r=>!r.win);
  /* shared worst: the most models whose biggest L is the same round */
  const wc={};MK.forEach(m=>{const w=per[m].worst;if(w)(wc[w.n]=wc[w.n]||[]).push(m)});
  const shared=Object.keys(wc).map(n=>({n:+n,ms:wc[n]})).sort((a,b)=>b.ms.length-a.ms.length)[0];
  const pend=(W.PENDING||[]).slice().sort((a,b)=>a.n-b.n);
  const upc=(W.UPCOMING||[]).slice().sort((a,b)=>dOf(a.called)-dOf(b.called)||(CAPS[b.ticker]||0)-(CAPS[a.ticker]||0)||a.n-b.n);
  const bet=betAt(),lead=(W.SIM&&SIM.leadHours)||24,freeze=bet?bet-lead*36e5:null;
  const sectors=Object.keys(SECT).map(k=>SECT[k]).filter(s=>MK.some(m=>per[m].sect[s]));
  const nTrades=MK.reduce((a,m)=>a+per[m].n,0);
  return {NOW,today,RS,per,rank,WIN,win,lc,lcRs,lcName,lastClose,wolf,nobody,shared,pend,upc,bet,freeze,sectors,nTrades,MK,NM,COL,FLAG,
    pool:W.SIM&&SIM.poolShare!=null?Math.round(SIM.poolShare*100):null};
}
/* Hyperliquid snapshot (the one input not from the sheet): ticker -> [[dex, open interest $M, 24h volume $M, max leverage, delisted]].
   Key rule: the sheet ticker without its exchange suffix (ASML.AS -> ASML), as the brief's figures use; live markets only. */
function hlFor(HL,t){if(!HL)return null;const L=(HL[String(t).split('.')[0]]||[]).filter(x=>!x[4]);if(!L.length)return null;const b=L.slice().sort((a,c)=>c[1]-a[1])[0];
  return {name:b[0]+':'+String(t).split('.')[0],oi:b[1],vol:b[2],lev:b[3],thin:b[1]<10,all:L.map(x=>x[0]+':'+String(t).split('.')[0])}}
function hlPnl(D,HL){const o={};D.MK.forEach(m=>o[m]={pnl:0,W:0,L:0,n:0});D.RS.forEach(r=>{if(!hlFor(HL,r.ticker))return;D.MK.forEach(m=>{const t=r.__t[m];if(!t)return;const q=o[m];q.pnl+=t.v;q.n++;if(t.v>0)q.W++;else q.L++})});return o}
/* the plain range for a hit rate: Wilson 95% interval */
function wilson(k,n){if(!n)return [0,1];const z=1.96,p=k/n,d=1+z*z/n,c=(p+z*z/(2*n))/d,h=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return [c-h,c+h]}
function left(at){if(!at)return null;const s=Math.max(0,Math.floor((at-Date.now())/1e3));return {s,d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),x:s%60}}
const nyFmt=(ms,o)=>new Date(ms).toLocaleString('en-US',Object.assign({timeZone:'America/New_York'},o));
W.SAT={compute,hlFor,hlPnl,wilson,left,closeAt,nyDay,dOf,md,wdmd,$f,$k,pct,mv,co,tk,coT,logo,esc,nyFmt,MK,NM,COL,FLAG,SECT};
})(window);
