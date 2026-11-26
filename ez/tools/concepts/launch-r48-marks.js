// Round 48 (owner, 2026-10-25): the EZ stamp as a mark of its own, off the card. One tile per concept: the upright master (undated,
// as it would go on anything), one ink on white, reversed out of the night ground, the small sizes, and a die-cut sticker on a film
// poster. Uses the real X2+ page for its fonts, data and paper. usage: node launch-r48-marks.js <out.png> [ids,comma]
const fs=require('fs'),path=require('path');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const OUT=process.argv[2],IDS=(process.argv[3]||'bell,postmark,crest,gloss,medal,punch,code,data,word,label').split(','),D=path.join(__dirname,'launch-r40-recback');
const rd=f=>fs.readFileSync(path.join(D,f),'utf8');
const CAP={bell:['The closing bell','Graded at the close. The bell also ends every fight night.'],
 postmark:['The postmark','Our stamp, cancelled by the market. On a card the wavy lines follow that round’s move.'],
 crest:['The warrant','“By appointment to the market.” The crown is the winner’s mark too.'],
 gloss:['Spot gloss','Shiny green and red, split along the Z’s own diagonal, the EZ cut out.'],
 medal:['EZ Proof','A proof coin: mirror field, enamel EZ in green and red, struck in gold.'],
 punch:['The validation punch','Conductors punched tickets with a shape of their own. Ours is the EZ, cut through the card.'],
 code:['The code stamp','A corner seal made to go on anything, with GRADED on its tab.'],
 data:['The data seal','The ring is the record: 64 bits of the round’s fingerprint, so every card’s ring differs.'],
 word:['The word stamp','The oldest approval mark is one word in a box. Ours says EZ PROOF.'],
 label:['The advisory label','One bold block that reads at any size, in one ink.']};
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
 const c=await b.newContext({viewport:{width:1600,height:1000},deviceScaleFactor:+(process.env.DSF||2),reducedMotion:'reduce'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});
 await p.evaluate(async()=>{window.R40N=43;const c=document.querySelector('#record .card[data-n="43"]');c.scrollIntoView({block:'center',inline:'center'});await new Promise(r=>setTimeout(r,900));
   if(!c.classList.contains('cur')){c.click();await new Promise(r=>setTimeout(r,900))}if(!c.classList.contains('flipped')){c.click();await new Promise(r=>setTimeout(r,1100))}await document.fonts.ready});
 await p.evaluate(({css,base,ids,cap})=>{const s=document.createElement('style');s.textContent=css+`
  #x48sh{position:absolute;left:0;top:0;width:1560px;padding:26px 20px 30px;background:#0b0a14;z-index:2147483000;font-family:Archivo,sans-serif;color:#f1ead8}
  #x48sh h1{margin:0 0 18px 6px;font:400 26px/1.1 Anton,Impact,sans-serif;letter-spacing:.02em;color:#f2b632}
  #x48sh h1 small{display:block;margin-top:6px;font:600 14px/1.3 Archivo,sans-serif;letter-spacing:0;text-transform:none;color:#bdb6a6}
  #x48sh .g{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  #x48sh .tl{background:#15131d;border-radius:10px;padding:12px 12px 12px}
  #x48sh .hd{display:flex;align-items:baseline;gap:10px;margin:0 0 9px}#x48sh .hd b{font:400 21px/1 Anton,Impact,sans-serif;letter-spacing:.02em}#x48sh .hd b i{font-style:normal;color:#f2b632;margin-right:8px}
  #x48sh .hd span{font:500 12.5px/1.3 Archivo,sans-serif;color:#bdb6a6}
  #x48sh .rw{display:grid;grid-template-columns:172px 92px 92px 1fr;gap:8px;height:176px}
  #x48sh .ce{position:relative;display:flex;align-items:center;justify-content:center;border-radius:6px;overflow:hidden}
  #x48sh .pa{background:var(--r40pap) 0 0/240px 240px,#f7f4ec;background-blend-mode:multiply}
  #x48sh .wh{background:#fff}#x48sh .dk{background:#0b0a14;box-shadow:inset 0 0 0 1px #2a2735}
  #x48sh .st2{display:grid;grid-template-rows:1fr 1fr;gap:8px}
  #x48sh .sm{display:flex;gap:10px;align-items:center;justify-content:center}
  #x48sh .lb{position:absolute;left:6px;top:5px;font:700 9.5px/1 Archivo,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#8a8273}
  #x48sh .dk .lb{color:#6f6a7c}
  #x48sh .po{background:#000 center/cover no-repeat}
  #x48sh .po .x48-st{position:absolute;left:14px;bottom:12px}
  body>*:not(#x48sh){visibility:hidden!important}
  `;document.head.appendChild(s);(new Function(base))();const D=R40.data(43);
  const el=document.createElement('div');el.id='x48sh';
  let h='<h1>Round 48 · the EZ stamp off the card<small>Each mark upright and undated (the master for anything), in one ink on white, reversed out of the night ground, at 32 and 20 px, and as a die-cut sticker on a round film. On the card it is tilted and dated.</small></h1><div class="g">';
  ids.forEach((id,k)=>{const R=(o,w)=>R48.render(id,D,Object.assign({rot:0},o),w);
   h+='<div class="tl"><p class="hd"><b><i>'+(k+1)+'</i>'+cap[id][0]+'</b><span>'+cap[id][1]+'</span></p><div class="rw">'+
    '<div class="ce pa">'+R({},id==='postmark'||id==='word'?150:118)+'<span class="lb">Master</span></div>'+
    '<div class="st2"><div class="ce wh">'+R({mono:1},id==='postmark'||id==='word'?78:58)+'<span class="lb">One ink</span></div><div class="ce dk">'+R({rev:1,cls:'x48-nb'},id==='postmark'||id==='word'?78:58)+'<span class="lb">Reversed</span></div></div>'+
    '<div class="st2"><div class="ce pa sm">'+R({},id==='postmark'||id==='word'?44:32)+R({},id==='postmark'||id==='word'?28:20)+'<span class="lb">32 · 20 px</span></div><div class="ce dk sm">'+R({rev:1,cls:'x48-nb'},id==='postmark'||id==='word'?44:32)+R({rev:1,cls:'x48-nb'},id==='postmark'||id==='word'?28:20)+'</div></div>'+
    '<div class="ce po" style="background-image:url(media/round-43-bloom-hd-poster.jpg)">'+R({stk:1,rot:-6},id==='postmark'||id==='word'?96:66)+'</div>'+
    '</div></div>'});
  el.innerHTML=h+'</div>';document.body.appendChild(el);window.scrollTo(0,0)},{css:rd('_base.css'),base:rd('_base.js')+'\n'+rd('_rows.js')+'\nwindow.R40rows=R40rows;\n'+rd('_r48.js'),ids:IDS,cap:CAP});
 await p.waitForTimeout(1200);const el=await p.$('#x48sh');await el.screenshot({path:OUT});console.log('ok',errs);await b.close()})();
