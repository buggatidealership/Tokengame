// Round 25 mockups, Upcoming (owner, 2026-10-23: the tab is "super old"; "the tickets are sort of the cards. The tickets become
// cards when they're graded"; carte blanche, with the cinematic-cleanliness reference in mind). Four different ideas, all on the
// site's own card stock (the "As it stands" ticket's paper, read from the page's skin), all from the page's own data (PENDING:
// calls in; UPCOMING: calls to come; RMETA: Mag 7 and AI). Each shows the life of a round: a ticket, its calls in, then a card.
// Research: a schedule is checked in seconds (Apple Sports was built for "five seconds to go look at the score", chronological,
// favourites floated up); countdowns carry time-boxed events (prediction-market cards).
// 1 box office: each round an Admit One ticket like the standings tickets (stub No., printed logo, ticker; calls stamped in once
//   they are in; Mag 7 stubs in gold foil), a three-step strip on how a ticket becomes a card.
// 2 take a number: a "Now serving" sign with the rounds graded at today's close, then each day a roll of numbered tickets you swipe.
// 3 spotlight: one subject: today's rounds big under a warm light with their calls and the time to the close; the rest of the week
//   quiet, one line per day of logos.
// 4 pocket schedule: a folded printed schedule card (the kind clubs hand out), the whole run of dates at a glance, Mag 7 in red,
//   today highlighted, a tick where the calls are in.
// node launch-r25-upcoming.js <option> <outdir> [width] [height]
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'1',OUT=process.argv[3]||'.',W=+process.argv[4]||390,H=+process.argv[5]||1180;
const CSS={
common:`
 #view.ku{padding:18px 16px 40px!important}
 .ku *{box-sizing:border-box}
 .ku-h{font:400 34px/.95 Anton,Impact,sans-serif;letter-spacing:.01em;text-transform:uppercase;color:#f3ead3;margin:0 0 6px}
 .ku-tag{display:inline-block;background:#f2b632;color:#141217;font:400 11px/1 Anton,sans-serif;letter-spacing:.1em;text-transform:uppercase;padding:5px 9px 4px;transform:skewX(-8deg);margin:0 0 10px}
 .ku-l{font:600 14px/1.35 "Barlow Condensed",Barlow,sans-serif;color:rgba(243,234,211,.78);margin:0 0 16px}
 .ku-co{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:7px;background:#fff;flex:none;overflow:hidden}
 .ku-co img{width:72%;height:72%;object-fit:contain}
 .ku .ku-co.dk{mix-blend-mode:normal!important;background:#141217!important}
 .ku-ai{display:inline-flex;align-items:center;gap:3px;white-space:nowrap}
 .ku-ai .lg{width:15px;height:15px;border-radius:4px}.ku-ai .lg svg,.ku-ai .lg img{width:68%;height:68%}
 .ku-up{color:rgba(29,107,60,.95)}.ku-dn{color:rgba(163,34,26,.95)}`,
'1':`
 .ku-life{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;gap:6px;margin:0 0 20px}
 .ku-life div{display:grid;justify-items:center;gap:5px;font:700 10px/1.1 "Barlow Condensed",sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(243,234,211,.8);text-align:center}
 .ku-life i{font-style:normal;color:#f2b632;font:400 15px/1 Anton,sans-serif}
 .ku-ic{width:54px;height:34px;background:var(--pp) 0 0/240px 240px,#efe4c8;border-radius:2px;position:relative;box-shadow:2px 3px 0 #000}
 .ku-ic.t{-webkit-mask:radial-gradient(4px at 0 50%,#0000 97%,#000) 0 0/51% 100%,radial-gradient(4px at 100% 50%,#0000 97%,#000) 100% 0/51% 100%;-webkit-mask-repeat:no-repeat}
 .ku-ic.s::after{content:"IN";position:absolute;inset:7px 12px;border:2px solid rgba(163,34,26,.85);border-radius:50%;font:400 10px/16px Anton,sans-serif;color:rgba(163,34,26,.85);text-align:center;transform:rotate(-10deg)}
 .ku-ic.c{width:28px;height:40px;background:linear-gradient(#fff 0 32%,#1d1a24 32%);border:2px solid #c99227;border-radius:3px}
 .ku-day{display:flex;justify-content:space-between;align-items:baseline;margin:18px 0 9px;border-bottom:1px solid rgba(242,182,50,.45);padding-bottom:6px}
 .ku-day b{font:400 20px/1 Anton,sans-serif;letter-spacing:.03em;text-transform:uppercase;color:#f3ead3}.ku-day b em{font-style:normal;color:#f2b632;margin-left:6px;font-size:13px}
 .ku-day small{font:700 10px/1 "Barlow Condensed",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(243,234,211,.7)}
 .ku-ts{display:grid;gap:9px;filter:drop-shadow(3px 4px 0 #000)}
 .ku-t{display:grid;grid-template-columns:44px minmax(0,1fr) auto;align-items:stretch;height:62px;background:var(--pp) 0 0/240px 240px,#efe4c8;color:rgba(20,18,23,.88);
  -webkit-mask:radial-gradient(4.5px at 0 50%,#0000 97%,#000) 0 0/51% 11px repeat-y,radial-gradient(4.5px at 100% 50%,#0000 97%,#000) 100% 0/51% 11px repeat-y;position:relative}
 .ku-t.big{height:84px}
 .ku-t::before{content:"";position:absolute;inset:5px 9px 5px 50px;border:1px solid rgba(20,18,23,.35);pointer-events:none}
 .ku-sb{display:grid;place-content:center;justify-items:center;gap:1px;border-right:2px dashed rgba(20,18,23,.45);background:rgba(120,86,30,.12);font:400 21px/1 Anton,sans-serif;text-shadow:0 1px 0 rgba(255,255,255,.6)}
 .ku-sb small{font:italic 900 7.5px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.14em;text-transform:uppercase;color:rgba(163,34,26,.9)}
 .ku-t.m7 .ku-sb{background:var(--pp) 0 0/240px 240px,linear-gradient(115deg,#f6d77c,#d39c1c 34%,#fbe8a8 52%,#c98a12 70%,#efc24a);background-blend-mode:multiply,normal;color:rgba(110,66,0,.85)}
 .ku-mn{display:flex;align-items:center;gap:9px;padding:0 6px 0 14px;min-width:0}
 .ku-mn .ku-co{mix-blend-mode:multiply;background:transparent;width:28px;height:28px}
 .ku-mn div{display:grid;gap:3px;min-width:0}.ku-mn b{font:400 19px/1 Anton,sans-serif;letter-spacing:.03em;text-shadow:0 1px 0 rgba(255,255,255,.6),0 -1px 0 rgba(0,0,0,.18)}
 .ku-mn small{font:600 11px/1 "Barlow Condensed",sans-serif;color:rgba(20,18,23,.65);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 .ku-rt{display:grid;place-content:center;justify-items:end;gap:3px;padding:0 18px 0 8px;border-left:1px solid rgba(20,18,23,.3);min-width:96px}
 .ku-rt small{font:italic 800 8px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.1em;text-transform:uppercase;color:rgba(20,18,23,.6)}
 .ku-rt b{font:400 15px/1 Anton,sans-serif;letter-spacing:.03em}
 .ku-cl{display:grid;grid-template-columns:auto auto;gap:5px 9px;font:400 12.5px/1 Anton,sans-serif;padding:0 16px 0 8px;align-content:center;border-left:1px solid rgba(20,18,23,.3)}
 .ku-cl .lg{mix-blend-mode:multiply}`,
'2':`
 .ku-ns{background:#c8372a;border-radius:6px;padding:12px 14px 13px;box-shadow:4px 5px 0 #000;margin:0 0 22px;color:#fff;position:relative;overflow:hidden}
 .ku-ns::before{content:"";position:absolute;inset:0;background:var(--pp) 0 0/240px 240px;mix-blend-mode:multiply;opacity:.9}
 .ku-ns>*{position:relative}
 .ku-ns small{display:block;font:400 13px/1 Anton,sans-serif;letter-spacing:.24em;text-transform:uppercase;opacity:.9}
 .ku-ns .n{display:flex;gap:10px;align-items:baseline;margin:6px 0 5px}.ku-ns .n b{font:400 54px/.9 Anton,sans-serif}.ku-ns .n i{font-style:normal;font:400 22px/1 Anton,sans-serif;opacity:.7}
 .ku-ns p{margin:0;font:600 13px/1.3 "Barlow Condensed",sans-serif;opacity:.92}
 .ku-ns .cs{display:flex;flex-wrap:wrap;gap:6px 12px;margin-top:9px}.ku-ns .cs span{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.92);color:#141217;border-radius:4px;padding:3px 6px;font:400 12px/1 Anton,sans-serif}
 .ku-dy{margin:0 0 18px}
 .ku-dy>div:first-child{display:flex;justify-content:space-between;align-items:baseline;margin:0 0 8px}
 .ku-dy b{font:400 18px/1 Anton,sans-serif;text-transform:uppercase;color:#f3ead3;letter-spacing:.03em}.ku-dy small{font:700 10px/1 "Barlow Condensed",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(243,234,211,.65)}
 .ku-roll{display:flex;overflow:hidden;filter:drop-shadow(3px 4px 0 #000);margin-right:-16px}
 .ku-k{flex:0 0 96px;height:126px;display:grid;justify-items:center;align-content:center;gap:5px;background:var(--pp) 0 0/240px 240px,#efe4c8;color:rgba(20,18,23,.88);position:relative;border-right:2px dashed rgba(20,18,23,.35);
  -webkit-mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/8px 100%,linear-gradient(#000 0 0);-webkit-mask-composite:source-in}
 .ku-k::before{content:"No.";font:italic 900 8px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.14em;text-transform:uppercase;color:rgba(163,34,26,.9)}
 .ku-k>b{color:rgba(20,18,23,.88);font:400 40px/.85 Anton,sans-serif;text-shadow:0 1px 0 rgba(255,255,255,.6),0 -1px 0 rgba(0,0,0,.2)}
 .ku-k>span{display:flex;align-items:center;gap:5px;font:400 12.5px/1 Anton,sans-serif;letter-spacing:.04em;max-width:86px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:rgba(20,18,23,.88)}
 .ku-k .ku-co{width:18px;height:18px;border-radius:4px;mix-blend-mode:multiply;background:transparent}
 .ku-k.m7{background:var(--pp) 0 0/240px 240px,linear-gradient(115deg,#f6d77c,#d39c1c 34%,#fbe8a8 52%,#c98a12 70%,#efc24a);background-blend-mode:multiply,normal}
 .ku-k.m7>b{color:rgba(110,66,0,.88)}`,
'3':`
 #view.ku{background:radial-gradient(85% 42% at 50% 23%,rgba(255,214,140,.2),transparent 70%)}
 .ku-sp{text-align:center;margin:4px 0 16px}
 .ku-sp small{display:block;font:700 11px/1 "Barlow Condensed",sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#f2b632}
 .ku-sp b{display:block;font:400 46px/.95 Anton,sans-serif;color:#f3ead3;text-transform:uppercase;margin:6px 0 4px}
 .ku-sp span{font:600 14px/1.3 "Barlow Condensed",sans-serif;color:rgba(243,234,211,.75)}
 .ku-hs{display:grid;gap:12px;margin:0 0 30px;filter:drop-shadow(0 14px 24px rgba(0,0,0,.55)) drop-shadow(3px 4px 0 #000)}
 .ku-hx{background:var(--pp) 0 0/240px 240px,#f1e7cc;border-radius:3px;padding:12px 14px;color:rgba(20,18,23,.9);
  -webkit-mask:radial-gradient(5px at 0 50%,#0000 97%,#000) 0 0/51% 12px repeat-y,radial-gradient(5px at 100% 50%,#0000 97%,#000) 100% 0/51% 12px repeat-y}
 .ku-hx>div:first-child{display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(20,18,23,.3);padding-bottom:9px;margin-bottom:9px}
 .ku-hx .ku-co{width:36px;height:36px;mix-blend-mode:multiply;background:transparent}
 .ku-hx h4{margin:0;font:400 22px/1 Anton,sans-serif;text-transform:uppercase;letter-spacing:.02em}.ku-hx h4 small{display:block;font:600 11px/1.2 "Barlow Condensed",sans-serif;color:rgba(20,18,23,.6);letter-spacing:.04em;text-transform:none;margin-top:3px}
 .ku-hx .no{margin-left:auto;font:400 13px/1 Anton,sans-serif;color:rgba(163,34,26,.9);letter-spacing:.08em}
 .ku-hx .cl{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;text-align:center}
 .ku-hx .cl span{display:grid;justify-items:center;gap:4px;font:400 15px/1 Anton,sans-serif}.ku-hx .cl .lg{width:22px;height:22px;mix-blend-mode:multiply}
 .ku-lt>p{font:700 11px/1 "Barlow Condensed",sans-serif;letter-spacing:.3em;text-transform:uppercase;color:rgba(243,234,211,.55);margin:0 0 10px}
 .ku-ln{display:grid;grid-template-columns:62px minmax(0,1fr);align-items:center;gap:8px;padding:9px 0;border-top:1px solid rgba(243,234,211,.12);opacity:.78}
 .ku-ln b{font:400 15px/1.05 Anton,sans-serif;color:#f3ead3;text-transform:uppercase}.ku-ln b small{display:block;font:700 9px/1 "Barlow Condensed",sans-serif;letter-spacing:.14em;color:rgba(243,234,211,.55);margin-top:3px}
 .ku-ln div{display:flex;flex-wrap:wrap;gap:5px}.ku-ln .ku-co{width:24px;height:24px;border-radius:6px}.ku-ln .ku-co.m7{box-shadow:0 0 0 2px #f2b632}`,
'4':`
 .ku-pk{background:var(--pp) 0 0/240px 240px,#f1e7cc;color:rgba(20,18,23,.88);border-radius:3px;box-shadow:4px 5px 0 #000;position:relative;overflow:hidden}
 .ku-pk::after{content:"";position:absolute;left:0;right:0;top:50%;height:16px;transform:translateY(-50%);background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.09) 45%,rgba(255,255,255,.35) 55%,rgba(0,0,0,0));pointer-events:none}
 .ku-pk .ku-hd{background:#c8372a;color:#fff;padding:10px 14px 9px;position:relative}.ku-pk .ku-hd::before{content:"";position:absolute;inset:0;background:var(--pp) 0 0/240px 240px;mix-blend-mode:multiply}
 .ku-pk .ku-hd *{position:relative}.ku-pk .ku-hd b{display:block;font:400 22px/1 Anton,sans-serif;letter-spacing:.04em;text-transform:uppercase}
 .ku-pk .ku-hd small{font:700 10px/1 "Barlow Condensed",sans-serif;letter-spacing:.2em;text-transform:uppercase;opacity:.9}
 .ku-pk table{width:100%;border-collapse:collapse;font:600 13px/1.25 "Barlow Condensed",sans-serif}
 .ku-pk th{width:66px;text-align:left;vertical-align:top;padding:9px 6px 9px 14px;font:400 14px/1.05 Anton,sans-serif;text-transform:uppercase;letter-spacing:.03em}
 .ku-pk th small{display:block;font:700 9px/1 "Barlow Condensed",sans-serif;letter-spacing:.12em;color:rgba(20,18,23,.55);margin-top:3px}
 .ku-pk td{padding:9px 14px 9px 4px;vertical-align:top;letter-spacing:.02em}
 .ku-pk tr+tr>*{border-top:1px dotted rgba(20,18,23,.45)}
 .ku-pk td span{white-space:nowrap;display:inline}.ku-pk td span+span::before{content:"· ";color:rgba(20,18,23,.4)}
 .ku-pk td .m7{color:rgba(170,30,24,.95);font-weight:800}
 .ku-pk tr.ku-now>th,.ku-pk tr.ku-now>td{transform:none!important;background:linear-gradient(transparent 8%,rgba(242,214,60,.55) 8% 92%,transparent 92%)}
 .ku-pk td .in::after{content:" ✓";color:rgba(29,107,60,.95);font-weight:800}
 .ku-pk .ku-ft{display:flex;justify-content:space-between;gap:8px;padding:9px 14px 11px;border-top:1.5px solid rgba(20,18,23,.7);font:700 9.5px/1.3 "Barlow Condensed",sans-serif;letter-spacing:.1em;text-transform:uppercase;color:rgba(20,18,23,.62)}
 .ku-pk .ku-ft b{color:rgba(170,30,24,.95)}`};
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html#/upcoming');await p.waitForTimeout(3800);
await p.addStyleTag({content:CSS.common+CSS[V]});
await p.evaluate((V)=>{
 const pp=(document.getElementById('x2plus-skin').textContent.match(/url\("data:image\/svg\+xml[^"]*feDiffuseLighting[^"]*"\)/)||['none'])[0];
 const view=document.getElementById('view');view.classList.add('ku');view.style.setProperty('--pp',pp);
 const D=s=>{const [m,d,y]=s.split('/').map(Number);return new Date(2000+y,m-1,d)},fmt=(d,o)=>d.toLocaleDateString('en-US',o),key=d=>d.toISOString().slice(0,10);
 const co=t=>{const c=CO_LOGOS[t]||{};return '<span class="ku-co'+(c.dark?' dk':'')+'"'+(c.dark?' style="background:#141217"':'')+'>'+(c.f?'<img src="media/'+c.f+'" alt="">':'')+'</span>'};
 const big=u=>/\d/.test(u.ticker)?u.co:u.ticker.replace(/\..*$/,''),sml=u=>/\d/.test(u.ticker)?u.ticker:u.co;
 const m7=n=>!!(RMETA[n]&&RMETA[n].mag7),nm=m=>({GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'})[m]||m;
 const call=c=>'<span class="ku-ai '+(c.dir==='UP'?'ku-up':'ku-dn')+'">'+logo(c.m)+(c.dir==='UP'?'▲':'▼')+c.mag+'%</span>';
 const today=new Date(2026,9,23);
 const days={};UPCOMING.forEach(u=>{const d=D(u.called),k=key(d);(days[k]=days[k]||{d,list:[]}).list.push(u)});
 const order=Object.keys(days).sort().map(k=>days[k]);
 const pend=PENDING;
 let h='';
 if(V==='1'){
  h='<span class="ku-tag">Upcoming</span><h2 class="ku-h">The tickets</h2><p class="ku-l">Every round starts as a ticket. The four calls go in before the report. At the next close it becomes a graded card in the record.</p>'+
   '<div class="ku-life"><div><span class="ku-ic t"></span>Ticket</div><i>→</i><div><span class="ku-ic t s"></span>Calls in</div><i>→</i><div><span class="ku-ic c"></span>Graded card</div></div>';
  const tk=(u,inn)=>'<div class="ku-t'+(m7(u.n)?' m7':'')+(inn?' big':'')+'"><div class="ku-sb"><small>No.</small>'+u.n+'</div><div class="ku-mn">'+co(u.ticker)+'<div><b>'+big(u)+'</b><small>'+sml(u)+'</small></div></div>'+
   (inn?'<div class="ku-cl">'+u.calls.map(call).join('')+'</div>':'')+'</div>';
  h+='<div class="ku-day"><b>Today<em>Fri Oct 23</em></b><small>Calls in · graded at the close</small></div><div class="ku-ts">'+pend.map(u=>tk(u,true)).join('')+'</div>';
  order.slice(0,2).forEach(g=>{h+='<div class="ku-day"><b>'+fmt(g.d,{weekday:'short',month:'short',day:'numeric'})+'</b><small>'+g.list.length+' tickets · calls due</small></div><div class="ku-ts">'+g.list.map(u=>tk(u,false)).join('')+'</div>'})}
 if(V==='2'){
  h='<span class="ku-tag">Upcoming</span><h2 class="ku-h">Take a number</h2><p class="ku-l">Every round gets a number. When its number is called, its calls are in and it is graded at the next close.</p>'+
   '<div class="ku-ns"><small>Now serving</small><div class="n">'+pend.map(u=>'<b>'+u.n+'</b>').join('<i>·</i>')+'</div><p>Calls are in. Graded at today\'s close.</p><div class="cs">'+pend.map(u=>'<span>'+co(u.ticker)+u.ticker+'</span>').join('')+'</div></div>';
  order.slice(0,4).forEach(g=>{h+='<div class="ku-dy"><div><b>'+fmt(g.d,{weekday:'short',month:'short',day:'numeric'})+'</b><small>'+g.list.length+' numbers · swipe</small></div><div class="ku-roll">'+
   g.list.map(u=>'<div class="ku-k'+(m7(u.n)?' m7':'')+'"><b>'+u.n+'</b><span>'+co(u.ticker)+big(u)+'</span></div>').join('')+'</div></div>'})}
 if(V==='3'){
  const now=new Date(),close=new Date(Date.UTC(2026,9,23,20,0)),mins=Math.max(0,Math.round((close-now)/60000));
  h='<div class="ku-sp"><small>Tonight · Fri Oct 23</small><b>Graded at the close</b><span>'+(mins?'In '+Math.floor(mins/60)+'h '+(mins%60)+'m':'At 4pm New York')+' · '+pend.length+' rounds · calls locked</span></div><div class="ku-hs">'+
   pend.map(u=>'<div class="ku-hx"><div>'+co(u.ticker)+'<h4>'+u.co+'<small>'+u.ticker+' · calls filed '+fmt(D(u.called),{month:'short',day:'numeric'})+'</small></h4><span class="no">No. '+u.n+'</span></div><div class="cl">'+
    u.calls.map(c=>'<span class="'+(c.dir==='UP'?'ku-up':'ku-dn')+'">'+logo(c.m)+(c.dir==='UP'?'▲':'▼')+c.mag+'%</span>').join('')+'</div></div>').join('')+'</div>'+
   '<div class="ku-lt"><p>Later</p>'+order.slice(0,6).map(g=>'<div class="ku-ln"><b>'+fmt(g.d,{weekday:'short'})+' '+fmt(g.d,{day:'numeric'})+'<small>'+g.list.length+' rounds</small></b><div>'+g.list.map(u=>co(u.ticker).replace('ku-co','ku-co'+(m7(u.n)?' m7':''))).join('')+'</div></div>').join('')+'</div>'}
 if(V==='4'){
  const rows=[{d:today,list:pend,now:1}].concat(order.slice(0,9));
  h='<span class="ku-tag">Upcoming</span><h2 class="ku-h">The schedule</h2><p class="ku-l">Every report the four AIs will call this season. Each one becomes a graded card once the market closes on it.</p>'+
   '<div class="ku-pk"><div class="ku-hd"><b>$EZ Season 1</b><small>Earnings schedule · keep this</small></div><table>'+rows.map(g=>'<tr'+(g.now?' class="ku-now"':'')+'><th>'+fmt(g.d,{weekday:'short'})+' '+fmt(g.d,{day:'numeric'})+'<small>'+(g.now?'today':fmt(g.d,{month:'short'}))+'</small></th><td>'+
   g.list.map(u=>'<span class="'+(m7(u.n)?'m7':'')+(u.calls?' in':'')+'">'+u.co+'</span>').join(' ')+'</td></tr>').join('')+'</table><div class="ku-ft"><span><b>Red</b>: Mag 7 · ✓ calls are in</span><span>Graded at the next close</span></div></div>'}
 view.innerHTML=h;window.scrollTo(0,0)},V);
await p.waitForTimeout(1200);
await p.screenshot({path:`${OUT}/r25u-${V}-${W}.png`,fullPage:false});
console.log(V,W,errs.length?'ERR '+errs.join('|'):'ok');await b.close()})();
