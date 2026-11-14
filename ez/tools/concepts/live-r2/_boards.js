/* live-r1 boards: lays the shots out on a plain HTML board and screenshots it into ez/ */
const fs=require('fs');
const PILL=[
 ['NOW','Today\'s pill','"Next: SK" with the red dot that always pulses. The dot is the on-air feeling; the words and the dot never change with what is happening.'],
 ['F','Today\'s pill, honest','The same yellow pill and dot. The dot glows red only while something is live (calls due today, or rounds graded at today\'s close), breathes amber after the bell until the results are in, and goes grey and still when nothing is on ("Back Mon"). The words say what is live.'],
 ['G','On air','A studio ON AIR lightbox: lit red glass while live, dark glass ("OFF AIR") otherwise, amber dot after the bell; one line under it says what. The most literal "on air"; the lit box is loud in the corner on phones.'],
 ['H','The live bug','A broadcast corner bug: a red LIVE tab with a white dot, then one fact (time to the close, calls due). After the bell the tab turns amber ("BELL"), off air grey ("NEXT"). Matches the site\'s straps and bugs.'],
 ['I','Tally light','The dot grows into a camera\'s tally lamp in a black pill. While a close grades rounds, a clock beside it ticks every second to 4pm New York; on a calls day it says how many are due. Off air the lamp is dark.'],
 ['J','The stub','A ticket stub off the site\'s roll: the dot in a printed circle, the round numbers on now (No. 46–53 calls due; No. 43–45 at the bell). In the ticket world and the number climbs every sync; a paper object in the night header is the odd one out.']];
const PAGE=[
 ['P4b','The week on the card, on air','Round 1\'s P4 with the dot: today\'s stub carries it (red while live, amber after the bell), the head says what is on now, and the header pill (F here) jumps to the strip. On a Saturday nothing glows: "Off air · back Mon Oct 26".',[['page-P4b-mon-390-0.png',150,700],['page-P4b-fri-390-0.png',150,700],['page-P4b-bell-390-0.png',150,700],['page-P4b-sat-390-0.png',150,700]],['Mon 1:09 pm · calls due','Fri 1:09 pm · at the bell (rebuilt)','Fri 4:20 pm · bell rung (rebuilt)','Sat 11 am · off air']]];
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
  let h=`<div class="b"><h1>Live, round 2 · the on-air dot</h1><p class="sub">Five takes on the pill that keep the glowing dot as the on-air signal, lit only when something is live, on the real X2+ page, each fed only by ez-data.js and the clock (the 4pm New York close via Intl). Moments: Mon Oct 26 1:09 pm ET (data as it stands: 45 graded, 8 calls due today, none in yet) · Fri Oct 23 1:09 pm and 4:20 pm ET (rebuilt from the sheet: R43 to R45 with calls in, before and after the bell) · Sat Oct 24 11 am ET. Phones hold 108px beside the logo and the X (96px at 320); every shot measured: no sideways scroll, no overlap.</p>`;
  for(const [k,n,d] of PILL){h+=`<section class="o"><h2><i>${k==='NOW'?'Now':k}</i>${esc(n)}</h2><p>${esc(d)}</p><div class="r">`+
    bg(`pill-${k}-mon-390.png`,0,0,390,58,'390 · Mon 1:09 pm',390)+bg(`pill-${k}-fri-390.png`,190,0,200,58,'Fri 1:09 pm',390)+bg(`pill-${k}-bell-390.png`,190,0,200,58,'Fri 4:20 pm, after the bell',390)+
    bg(`pill-${k}-sat-390.png`,190,0,200,58,'Sat 11 am',390)+bg(`pill-${k}-mon-320.png`,0,0,320,58,'320 · Mon',320)+`</div><div class="r" style="margin-top:10px">`+
    bg(`pill-${k}-mon-1280.png`,40,0,740,61,'1280 · Mon 1:09 pm',1280)+bg(`pill-${k}-fri-1280.png`,40,0,740,61,'1280 · Fri 1:09 pm',1280)+`</div></section>`}
  h+='</div>';
  await shoot(b,h,EZ+'x2p-live-r2-pill.png',1640);
  let g=`<div class="b"><h1>Live, round 2 · the week on the card, on air</h1><p class="sub">The week strip with the dot, at four moments, on the real page at 390px, from ez-data.js and the clock only. Measured at 320, 390 and 1280px: no sideways scroll.</p><div style="display:grid;grid-template-columns:1fr;gap:0 20px">`;
  for(const [k,n,d,shots,labs] of PAGE){g+=`<section class="o"><h2><i>${k}</i>${esc(n)}</h2><p>${esc(d)}</p><div class="r">`+shots.map((s,i)=>bg(s[0],0,s[1],390,s[2]-s[1],labs[i],390)).join('')+`</div></section>`}
  g+='</div></div>';
  await shoot(b,g,EZ+'x2p-live-r2-page.png',1820);
};
let S2='';async function shoot(b,html,out,W){const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});
  const f=S2+'board-'+require('path').basename(out,'.png')+'.html';
  fs.writeFileSync(f,`<!doctype html><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@500;700&display=swap" rel="stylesheet"><style>${CSS}</style>${html}`);
  await require('../live-r1/_fonts.js')(p);await p.goto('file://'+f);await p.waitForTimeout(1500);await p.screenshot({path:out,fullPage:true});await p.close();console.log('board',out)}
