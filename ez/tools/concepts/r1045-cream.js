// node r1045-cream.js <outdir> [now,A,B] [width] — the certificate's cream (#f8f0d9, what the record cards' certificate shows) on the
// beige of every bet-stock ticket (the live strip, the season ticket and its tryouts stub, the proof ticket, the bet and Season 2
// tickets); the green and red bands untouched. A: the base colour with the fine grain only (mottle, aged rim, light and sunburst off).
// B: flat like the certificate (the grain off too). The die-cut toning, holes, rules and bands stay.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const out=process.argv[2],vs=(process.argv[3]||'now,A,B').split(','),W=+(process.argv[4]||390);
const CREAM='#f8f0d9';
const SECT=[['strip','.x2p-ls'],['standings','.stx-roll'],['proof','.x2p-pt'],['bet','#x2pSt .x2p-bet, #x2pSt .bs-roll, #x2pSt']];
(async()=>{const b=await chromium.launch();for(const v of vs){const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});await FONTS(p);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(2500);
 // bring every section near once so its paper and fitting run
 for(const [,sel] of SECT){const e=await p.$(sel);if(e){await e.scrollIntoViewIfNeeded();await p.waitForTimeout(700)}}
 if(v!=='now')await p.evaluate(([v,CREAM])=>{
  const lst=s=>{const o=[];let dp=0,st=0;for(let i=0;i<s.length;i++){const c=s[i];if(c==='(')dp++;else if(c===')')dp--;else if(c===','&&!dp){o.push(s.slice(st,i).trim());st=i+1}}o.push(s.slice(st).trim());return o};
  document.querySelectorAll('.bt-pp').forEach(e=>{if(e.closest('.n5k,.x2p-n5'))return;e.style.setProperty('background-color',CREAM,'important');
   {const L=lst(getComputedStyle(e).backgroundImage);const n=L.length;
    // layers from the end (x2plus.js, the bet stock): n-1 MOTTLE, n-2 the sunburst's conic, n-3 its radial mask, n-4 GRAIN, n-5 FIB;
    // the aged rim and the light across the card are gradients matched by their text. A keeps the grain; B keeps nothing on the ivory
    for(let i=0;i<n;i++){const s=L[i];const grain=/fractalNoise/.test(s)&&/1\.7/.test(s),mottle=/\.011/.test(s),sun=/repeating-conic-gradient|closest-side at 50% 52%/.test(s),rim=/^radial-gradient\(140% 120% at 45% 40%/.test(s),light=/^linear-gradient\(168deg/.test(s);
     if(mottle||sun||rim||light||(v==='B'&&grain))L[i]='none'}
    e.style.backgroundImage=L.join(', ')}})},[v,CREAM]);
 await p.waitForTimeout(500);
 for(const [nm,sel] of SECT){const e=await p.$(sel);if(!e){console.log(v,nm,'missing');continue}await e.scrollIntoViewIfNeeded();await p.waitForTimeout(300);await e.screenshot({path:`${out}/${v}-${nm}.png`})}
 console.log(v,'ok');await p.close()}await b.close()})();
