// "As it stands" ticket, round 6c (owner, 2026-10-22: the board is the main thing; the ticket "at least a third smaller",
// "a bit tilted", different art styles and sizes; the words stay, Grok in gold). Each: centred under the board.
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'1',W=+process.argv[3]||412,H=+process.argv[4]||863;
const GOLD="background:linear-gradient(180deg,#fff3b0 0%,#f2c14e 38%,#c98a12 62%,#f7d774 100%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;";
const S={
 // 1 Admit One mini: the bet ticket's cream paper, green and red bands, die-cut notches
 '1':{w:'64%',rot:-2.5,css:`.tk{background:#efe5cf;position:relative;padding:22px 16px 20px;text-align:center;color:#141217;font:800 14px/1.25 'Barlow Condensed',Barlow,sans-serif;text-transform:uppercase;letter-spacing:.04em;
   -webkit-mask:radial-gradient(circle 7px at 0 50%,#0000 98%,#000) 0 0/51% 100% no-repeat,radial-gradient(circle 7px at 100% 50%,#0000 98%,#000) 100% 0/51% 100% no-repeat;filter:drop-shadow(3px 4px 0 #000)}
   .tk::before,.tk::after{content:"";position:absolute;left:0;right:0;height:9px}.tk::before{top:0;background:#1f7a45}.tk::after{bottom:0;background:#c8372a}
   .tk .in{border:1.5px solid rgba(20,18,23,.55);outline:1px solid rgba(20,18,23,.35);outline-offset:2px;padding:7px 8px}
   .tk em{font:400 19px/1 Anton,sans-serif;letter-spacing:.03em;${GOLD}filter:drop-shadow(0 1px 0 #6b4a08)}`},
 // 2 Raffle ticket: red stock, cream inner frame, serial number
 '2':{w:'60%',rot:-3,css:`.tk{background:#c8372a;padding:9px;filter:drop-shadow(3px 4px 0 #000);-webkit-mask:radial-gradient(circle 4px at 50% 0,#0000 98%,#000) 0 0/12px 51% repeat-x,radial-gradient(circle 4px at 50% 100%,#0000 98%,#000) 0 100%/12px 51% repeat-x}
   .tk .in{border:2px dashed rgba(255,240,215,.75);padding:11px 10px 9px;text-align:center;color:#fff3df;font:700 14px/1.3 Barlow,sans-serif}
   .tk em{font:400 20px/1 Anton,sans-serif;letter-spacing:.03em;${GOLD}filter:drop-shadow(0 1px 0 #3a0b06)}
   .tk .no{display:block;margin-top:5px;font:800 9px/1 'Barlow Condensed',sans-serif;letter-spacing:.2em;opacity:.75}`},
 // 3 Fight night: black card, gold rule border, gold stars
 '3':{w:'62%',rot:-2,css:`.tk{background:#141217;border:2px solid #f2b632;box-shadow:4px 4px 0 #000,0 0 0 4px #141217,0 0 0 5px rgba(242,182,50,.5);padding:12px 14px 11px;text-align:center;color:#f3ead6;font:800 14px/1.25 'Barlow Condensed',Barlow,sans-serif;text-transform:uppercase;letter-spacing:.06em}
   .tk .st{display:block;color:#f2b632;font-size:9px;letter-spacing:.5em;margin-bottom:5px}.tk em{font:400 21px/1 Anton,sans-serif;letter-spacing:.04em;${GOLD}}`},
 // 4 Cinema stub: cream stub, punched hole, perforated left edge, serif
 '4':{w:'56%',rot:-3.5,css:`.tk{background:#f6edd6;position:relative;padding:12px 14px 12px 30px;color:#2a2117;font:400 16px/1.2 'Instrument Serif',Georgia,serif;filter:drop-shadow(3px 4px 0 #000);
   -webkit-mask:radial-gradient(circle 3px at 0 50%,#0000 98%,#000) 0 0/100% 9px repeat-y}
   .tk::before{content:"";position:absolute;left:10px;top:50%;width:9px;height:9px;margin-top:-4.5px;border-radius:50%;background:#141217;box-shadow:inset 0 0 0 1px rgba(0,0,0,.4)}
   .tk::after{content:"";position:absolute;left:22px;top:6px;bottom:6px;border-left:1.5px dashed rgba(42,33,23,.45)}
   .tk em{font:400 20px/1 Anton,sans-serif;letter-spacing:.03em;${GOLD}filter:drop-shadow(0 1px 0 #6b4a08)}`},
 // 5 The current $EZ ticket, centred and smaller
 '5':{w:'58%',rot:-2,keep:true},
 // 6 Gold foil VIP pass: gold card, black type, Grok in black-gold
 '6':{w:'54%',rot:-2.5,css:`.tk{background:linear-gradient(135deg,#f7d774,#e2a92f 45%,#fbe7a1 60%,#c98a12);border:2px solid #000;box-shadow:3px 3px 0 #000;border-radius:7px;padding:11px 12px;text-align:center;color:#141217;font:800 13.5px/1.25 'Barlow Condensed',Barlow,sans-serif;text-transform:uppercase;letter-spacing:.05em}
   .tk .st{display:block;font-size:8.5px;letter-spacing:.3em;margin-bottom:4px;opacity:.75}.tk em{font:400 20px/1 Anton,sans-serif;letter-spacing:.03em;color:#141217;text-shadow:0 1px 0 #fff3b0}`}};
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2800);await p.evaluate(()=>document.fonts.ready);
const s=S[V];
await p.evaluate(({V,s})=>{const ft=document.querySelector('#standings .x2p-lbfoot'),st0=ft.querySelector('.x2p-say .st'),em0=st0.querySelector('em'),nm=em0.textContent.trim();
  const parts=[...st0.childNodes].map(n=>n.nodeType===3?n.nodeValue:(n===em0?null:n.textContent)),i=parts.indexOf(null),before=parts.slice(0,i).join(''),after=parts.slice(i+1).join('');
  ft.style.cssText='display:flex!important;justify-content:center;margin-top:22px';
  if(s.keep){const say=ft.querySelector('.x2p-say');ft.innerHTML='';const w=document.createElement('div');w.className='mk-wrap';w.appendChild(say);ft.appendChild(w);
    say.style.cssText='display:block;max-width:none;width:100%;margin:0;transform:none';say.querySelector('.st').style.cssText='display:block;width:100%;box-sizing:border-box;text-align:center';return}
  const extra='';const pre=(V==='3'?'<span class="st">★ ★ ★</span>':V==='6'?'<span class="st">★ ★ ★</span>':'');
  ft.innerHTML='<div class="mk-wrap"><div class="tk"><div class="in">'+pre+before+'<em>'+nm+'</em>'+after+extra+'</div></div></div>'},{V,s});
await p.addStyleTag({content:`html.x2p #standings .mk-wrap{width:${s.w};transform:rotate(${s.rot}deg);white-space:normal} html.x2p #standings .mk-wrap .tk,html.x2p #standings .mk-wrap .in{white-space:normal!important;text-wrap:balance} html.x2p #standings .mk-wrap .nm{display:none!important} html.x2p #standings `+(s.css||'').replace(/\}\s*\./g,'} html.x2p #standings .')});
await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const a=document.querySelector('#standings li.lbr').getBoundingClientRect(),t=document.querySelector('#standings .mk-wrap').getBoundingClientRect();return {board:Math.round(a.width),ticket:Math.round(t.width),centre:[Math.round((a.left+a.right)/2),Math.round((t.left+t.right)/2)]}});
const box=await p.evaluate(()=>{const a=document.querySelector('#standings li.lbr:nth-child(3)')||document.querySelectorAll('#standings li.lbr')[2],t=document.querySelector('#standings .mk-wrap').getBoundingClientRect(),r=a.getBoundingClientRect();return {y0:r.top+scrollY,y1:t.bottom+scrollY+24}});
await p.screenshot({path:'s'+V+'-full.png',fullPage:true});fs.writeFileSync('s'+V+'.json',JSON.stringify(box));
console.log(V,JSON.stringify(r));await b.close()})();
