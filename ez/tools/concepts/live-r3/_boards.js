/* live-r1 boards: lays the shots out on a plain HTML board and screenshots it into ez/ */
const fs=require('fs');
const PILL=[
 ['NOW','Today\'s pill','"Next: SK" with the red dot that always pulses; one company, as a ticker.'],
 ['F','Today\'s pill, honest, with logos','The yellow pill and the honest dot. Desktop: the biggest company on now named beside its logo, the next three as logos, then +4. A phone holds the dot, one or two logos and a short ticker: a long name (SK Hynix) gives way so the logos stay.'],
 ['G','On air, with logos','The ON AIR lightbox; under it the biggest company named, the rest as logos (or the time to the close, then the logos). Keeps a name on a phone, in small type.'],
 ['H','The live bug, with logos','The red LIVE tab with the dot; desktop names the biggest company, then logos. A phone has room for one logo and +7 beside the tab.'],
 ['I','Tally light, with logos','The tally lamp; beside it the companies on now (or the clock ticking to 4pm), a small line under it. On a phone the logos win over the name.'],
 ['J','The stub, with logos','The ticket stub with the round numbers on now; under them the companies printed into the paper, biggest first.']];
const PAGE=[
 ['P4c','The week on the card, with logos','Each day\'s stub prints up to four of its companies, biggest first by market cap (one big logo, two side by side, three or four in a square), then +k for the rest. Today carries the dot; graded days fade with a tick. No counts and no season totals: a preview of what\'s next. On a Saturday it shows next week.',[['page-P4c-mon-390-0.png',150,700],['page-P4c-fri-390-0.png',150,700],['page-P4c-bell-390-0.png',150,700],['page-P4c-sat-390-0.png',150,700]],['Mon 1:09 pm · calls due','Fri 1:09 pm · at the bell (rebuilt)','Fri 4:20 pm · bell rung (rebuilt)','Sat 11 am · off air, next week']]];
const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const CSS=`body{margin:0;background:#e9e4d8;font:15px/1.4 Barlow,system-ui,sans-serif;color:#1b181c}
.b{padding:28px 32px 36px}h1{font:400 34px/1 Anton,Impact,sans-serif;letter-spacing:.02em;margin:0 0 6px;text-transform:uppercase}
.sub{margin:0 0 22px;color:#4d463c;max-width:1500px}.o{background:#fff;border:2px solid #1b181c;box-shadow:4px 4px 0 #1b181c;padding:14px 16px 16px;margin:0 0 20px}
.o h2{margin:0 0 4px;font:400 24px/1 Anton,Impact,sans-serif;text-transform:uppercase;letter-spacing:.02em}.o h2 i{font-style:normal;background:#f2b632;padding:0 8px;margin-right:8px}
.o p{margin:0 0 10px;max-width:1540px;color:#3a342c}.r{display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start}.c small{display:block;font:700 12px/1 Barlow,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#6a5f4c;margin:0 0 5px}
.c div{background-repeat:no-repeat;border:1px solid #1b181c}`;
function cell(f,x,y,w,h,label,S){const im=S+f;return `<div class="c"><small>${esc(label)}</small><div style="width:${w}px;height:${h}px;background-image:url('file://${im}');background-size:auto;background-position:-${x}px -${y}px;zoom:1"></div></div>`}
module.exports=async function(b,S,EZ){S2=S;
  /* pill board: crops in CSS px of 2x shots; background-size halves them */
  const bg=(f,x,y,w,h,label,full)=>`<div class="c"><small>${esc(label)}</small><div style="width:${w}px;height:${h}px;background-image:url('file://${S+f}');background-size:${full}px auto;background-position:-${x}px -${y}px"></div></div>`;
  let h=`<div class="b"><h1>Live, round 3 · the on-air dot, with logos</h1><p class="sub">Round 2's five pills with company logos in place of names: the biggest company on now (by market cap) named beside its logo, the rest as logos and +k, on the real X2+ page, each fed only by ez-data.js and the clock (the 4pm New York close via Intl). Moments: Mon Oct 26 1:09 pm ET (data as it stands: 45 graded, 8 calls due today, none in yet) · Fri Oct 23 1:09 pm and 4:20 pm ET (rebuilt from the sheet: R43 to R45 with calls in, before and after the bell) · Sat Oct 24 11 am ET. Phones hold 108px beside the logo and the X (96px at 320); every shot measured: no sideways scroll, no overlap.</p>`;
  for(const [k,n,d] of PILL){h+=`<section class="o"><h2><i>${k==='NOW'?'Now':k}</i>${esc(n)}</h2><p>${esc(d)}</p><div class="r">`+
    bg(`pill-${k}-mon-390.png`,0,0,390,58,'390 · Mon 1:09 pm',390)+bg(`pill-${k}-fri-390.png`,190,0,200,58,'Fri 1:09 pm',390)+bg(`pill-${k}-bell-390.png`,190,0,200,58,'Fri 4:20 pm, after the bell',390)+
    bg(`pill-${k}-sat-390.png`,190,0,200,58,'Sat 11 am',390)+bg(`pill-${k}-mon-320.png`,0,0,320,58,'320 · Mon',320)+`</div><div class="r" style="margin-top:10px">`+
    bg(`pill-${k}-mon-1280.png`,40,0,740,61,'1280 · Mon 1:09 pm',1280)+bg(`pill-${k}-fri-1280.png`,40,0,740,61,'1280 · Fri 1:09 pm',1280)+`</div></section>`}
  h+='</div>';
  await shoot(b,h,EZ+'x2p-live-r3-pill.png',1640);
  let g=`<div class="b"><h1>Live, round 3 · the week on the card, with logos</h1><p class="sub">The week strip with the dot, at four moments, on the real page at 390px, from ez-data.js and the clock only. Measured at 320, 390 and 1280px: no sideways scroll.</p><div style="display:grid;grid-template-columns:1fr;gap:0 20px">`;
  for(const [k,n,d,shots,labs] of PAGE){g+=`<section class="o"><h2><i>${k}</i>${esc(n)}</h2><p>${esc(d)}</p><div class="r">`+shots.map((s,i)=>bg(s[0],0,s[1],390,s[2]-s[1],labs[i],390)).join('')+`</div></section>`}
  g+='</div></div>';
  await shoot(b,g,EZ+'x2p-live-r3-page.png',1820);
};
let S2='';async function shoot(b,html,out,W){const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});
  const f=S2+'board-'+require('path').basename(out,'.png')+'.html';
  fs.writeFileSync(f,`<!doctype html><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@500;700&display=swap" rel="stylesheet"><style>${CSS}</style>${html}`);
  await require('../live-r1/_fonts.js')(p);await p.goto('file://'+f);await p.waitForTimeout(1500);await p.screenshot({path:out,fullPage:true});await p.close();console.log('board',out)}
