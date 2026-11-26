// copy fixes flagged on the live terminal: Season 2 says "Season", never "All time"; no "Paper"
(()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const r=[];while(w.nextNode())r.push(w.currentNode);
for(const n of r){let t=n.nodeValue;const o=t;t=t.replace(/ALL TIME P&L/g,'SEASON P&L').replace(/ALL TIME/g,'SEASON').replace(/All time P&L/g,'Season P&L').replace(/Paper P&L:\s*/g,'P&L: ');if(t!==o)n.nodeValue=t}})();
// sentence case for the page's own capitals (labels only; tickers, AI, P&L, W-L kept)
(()=>{const keep={'p&l':'P&L','ai':'AI','ais':'AIs','w-l':'W-L','w/l':'W/L','24h':'24H','7d':'7D','30d':'30D'};
const sc=t=>{const s=t.toLowerCase().replace(/[a-z0-9&\/-]+/g,w=>keep[w]||w);return s.replace(/^(\s*)([a-z])/,(m,a,b)=>a+b.toUpperCase())};
document.querySelectorAll('.tabs button,.kick small,.ud,.dnav button,.nav button span,.nav button,.st th:first-child,.th,.sb b').forEach(el=>{
 el.childNodes.forEach(n=>{if(n.nodeType===3&&/[A-Z]{3}/.test(n.nodeValue)&&n.nodeValue===n.nodeValue.toUpperCase())n.nodeValue=sc(n.nodeValue)})})})();
// "paper" left the copy (owner's rule); the how-it-works step says what is placed
(()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const o=n.nodeValue;const t=o.replace(/\$100K of paper money on each pick/g,'$100K on each trade').replace(/\s*paper\s*/gi,' ');if(t!==o)n.nodeValue=t}})();
// one type scale, five steps (12 14 16 20 28): every visible text snaps to its nearest step, nothing under 12
(()=>{const S=[12,14,16,20,28];const near=f=>S.reduce((a,b)=>Math.abs(b-f)<Math.abs(a-f)?b:a);
for(const el of document.querySelectorAll('.app *,.nav *')){if(![...el.childNodes].some(n=>n.nodeType===3&&n.nodeValue.trim()))continue;const f=parseFloat(getComputedStyle(el).fontSize);const g=near(Math.max(12,f));if(g!==f)el.style.setProperty('font-size',g+'px','important')}})();
