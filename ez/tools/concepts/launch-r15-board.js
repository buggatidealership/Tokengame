// Round 15 mockups on the built X2+ page (owner, 2026-10-22: "the rules section, I do feel it overpowers a little bit the
// significance of the actual leaderboard"; creative, "one I can't predict", but every element in the site's colours and its
// paper-manga world). The rules keep the owner's words; only where and how big they sit changes. Board first in every option.
// node launch-r15-board.js <option> <outdir>   option: now F T P K S
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'F',OUT=process.argv[3]||'.',W=+process.argv[4]||390;
const S='html.x2p.x2d[data-theme] #standings';
const O={
 now:{css:''},
 // F: fine print: the board straight under the head; the rules shrink to a slim strap under the board, before the "As it stands" ticket
 F:{css:`
  ${S} .x2p-strap{margin:18px 0 0 6px;padding:13px 10px 3px 11px;border-left-width:6px}
  ${S} .x2p-strap .x2p-bug{font-size:9.5px;padding:2px 7px 1px;top:-9px}
  ${S} .x2p-strap .x2o-ul li{font-size:12px!important;padding:3px 0 4px!important;letter-spacing:.05em}`,
  dom:()=>{const st=document.querySelector('#standings .x2p-strap'),fl=document.querySelector('#standings .x2p-flip');fl.after(st)}},
 // T: title card: #1 gets the champion's card (bigger, its own gold frame and crown), the others sit as the undercard; the rules
 // fold into one quiet caption line under the head
 T:{css:`
  ${S} .x2p-strap{display:none}
  ${S} .cap{margin:8px 0 0;font:400 11.5px/1.45 Anton,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:rgba(243,234,214,.62)}
  ${S} .cap b{color:#f2b632;font-weight:400}
  ${S} li.lbr:first-child{transform:scale(1.045);transform-origin:50% 100%;margin:14px 0 16px;box-shadow:0 0 0 3px #f2b632,6px 7px 0 #000!important}
  ${S} li.lbr:not(:first-child){transform:scale(.95);transform-origin:50% 50%;opacity:.92}
  ${S} li.lbr:first-child::after{content:"IN LINE FOR THE CALL";position:absolute;right:10px;top:-11px;background:#c8372a;color:#f3ead6;border:2px solid #000;padding:2px 7px 1px;font:italic 900 10px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.08em;transform:skewX(-8deg)}`,
  dom:()=>{const st=document.querySelector('#standings .x2p-strap');const t=[...st.querySelectorAll('li')].map(l=>l.innerHTML);const c=document.createElement('p');c.className='cap';c.innerHTML=t.join(' <b>·</b> ');document.querySelector('#standings .sh').appendChild(c)}},
 // P: pull tab: the rules fold away into a small gold paper tab clipped to the board's top edge ("The rules", a fold mark);
 // a tap unfolds the strap (closed state shown)
 P:{css:`
  ${S} .x2p-strap{display:none}
  ${S} .x2p-flip{position:relative;margin-top:30px}
  ${S} .tab{position:absolute;left:8px;top:-26px;z-index:5;display:flex;align-items:center;gap:7px;padding:5px 12px 7px 10px;background:linear-gradient(162deg,#ffd76a 0 52%,#e2a823 52% 100%);border:2px solid #000;border-bottom:0;box-shadow:3px 0 0 #000;font:400 12px/1 Anton,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#141217;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)}
  ${S} .tab::after{content:"";position:absolute;right:0;top:0;width:10px;height:10px;background:linear-gradient(225deg,transparent 50%,#9a6a05 50%)}
  ${S} .tab i{display:inline-block;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:6px solid #141217}`,
  dom:()=>{const fl=document.querySelector('#standings .x2p-flip');const t=document.createElement('div');t.className='tab';t.innerHTML='The rules <i></i>';fl.appendChild(t)}},
 // K: ticker: the rules run as a one-line broadcast crawl across the top of the board, under its red bug (the strap at a third
 // of its height; it scrolls on the page, shown still)
 K:{css:`
  ${S} .x2p-strap{display:none}
  ${S} .tick{position:relative;display:flex;align-items:center;margin:12px 0 2px;height:26px;background:#141217;border:2px solid #000;box-shadow:4px 4px 0 #000;overflow:hidden;transform:skewX(-6deg)}
  ${S} .tick b{flex:none;height:100%;display:flex;align-items:center;padding:0 9px;background:#c8372a;color:#f3ead6;border-right:2px solid #000;font:italic 900 11px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.08em;text-transform:uppercase}
  ${S} .tick span{flex:none;padding-left:10px;white-space:nowrap;font:400 12.5px/1 Anton,sans-serif;letter-spacing:.05em;text-transform:uppercase;background:linear-gradient(162deg,#fbf3df 0 52%,#cdbf9c 52% 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;transform:skewX(6deg)}
  ${S} .tick::after{content:"";position:absolute;right:0;top:0;bottom:0;width:40px;background:linear-gradient(90deg,transparent,#141217)}
  ${S} .tick span em{font-style:normal;-webkit-text-fill-color:#f2b632;padding:0 8px}
  ${S} .tick span i.lc{font-style:normal;text-transform:none;-webkit-text-fill-color:#e9dfc6}`,
  dom:()=>{const st=document.querySelector('#standings .x2p-strap');const t=[...st.querySelectorAll('li')].map(l=>l.textContent);const k=document.createElement('div');k.className='tick';k.innerHTML='<b>The rules</b><span>'+t.join('<em>✦</em>').replace(/\bAIs\b/g,'AI<i class="lc">s</i>')+'</span>';document.querySelector('#standings .x2p-flip').before(k)}},
 // S: tear-off stub: the board is the ticket and the rules are printed small on its stub, torn along a perforation, in the
 // tickets' cream card with green and red edges (letterpress ink)
 S:{css:`
  ${S} .x2p-strap{display:none}
  ${S} .stub{position:relative;margin:2px 4px 0 2px;padding:12px 16px 10px;background:var(--paper) 0 0/220px 220px;border:2px solid #000;border-top:0;box-shadow:4px 4px 0 #000;transform:rotate(-.6deg)}
  ${S} .stub::before{content:"";position:absolute;left:10px;right:10px;top:0;border-top:2px dashed rgba(20,18,23,.55)}
  ${S} .stub::after{content:"";position:absolute;inset:0 auto 0 0;width:6px;background:#1f7a45;box-shadow:calc(100% - 0px) 0 0 #c8372a}
  ${S} .stub i{position:absolute;right:0;top:0;bottom:0;width:6px;background:#c8372a}
  ${S} .stub .bg{display:inline-block;margin-bottom:6px;font:italic 900 10px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.1em;text-transform:uppercase;color:#c8372a}
  ${S} .stub li{list-style:none;font:400 12px/1.35 Anton,sans-serif;letter-spacing:.05em;text-transform:uppercase;color:rgba(20,18,23,.86);text-shadow:0 1px 0 rgba(255,255,255,.6)}
  ${S} .stub li b{color:#a3221a;font-weight:400}
  ${S} .stub ul{margin:0;padding:0 0 0 2px}`,
  dom:()=>{const st=document.querySelector('#standings .x2p-strap');const t=[...st.querySelectorAll('li')].map(l=>l.innerHTML);const s=document.createElement('div');s.className='stub';s.innerHTML='<i></i><span class="bg">The rules</span><ul>'+t.map(x=>'<li>'+x+'</li>').join('')+'</ul>';document.querySelector('#standings .x2p-flip').after(s)}},
};
(async()=>{const o=O[V];const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/'+(process.env.PAGE||'v46-live-x2plus.html'));await p.waitForTimeout(3000);
await p.evaluate(()=>{const t=document.querySelector('.x2p-ast .tk');if(t)document.documentElement.style.setProperty('--paper',getComputedStyle(t).backgroundImage.split(/,(?=\s*url\()/).filter(x=>/url\(/.test(x)).pop()||'#efe4c8')});
if(o.css)await p.addStyleTag({content:o.css});
if(o.dom)await p.evaluate(o.dom);
await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
await p.evaluate(()=>document.getElementById('standings').scrollIntoView());await p.waitForTimeout(700);
const c=await p.evaluate(()=>{const a=document.querySelector('#standings .sh').getBoundingClientRect(),z=document.querySelector('#standings .x2p-astf').getBoundingClientRect();return {x:0,y:a.top+scrollY-12,width:innerWidth,height:z.bottom-a.top+26}});
await p.screenshot({path:`${OUT}/r15-${V}.png`,clip:c,fullPage:true});
const h=await p.evaluate(()=>{const a=document.querySelector('#standings .sh').getBoundingClientRect(),f=document.querySelector('#standings .x2p-flip').getBoundingClientRect();return 'board starts '+Math.round(f.top-a.top)+'px under the head'});
console.log(V,h,errs.length?'ERR '+errs.join('|'):'');await b.close()})();
