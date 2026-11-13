// node posts.js <round> : the two posts for a round, from the sheet only. Writes ez/post/r<round>-<ticker>-calls.txt (the plain-text
// calls post, before the report) and, once graded, r<round>-<ticker>-outcome.txt (the quote-post caption for the outcome video).
const fs=require('fs'),vm=require('vm'),path=require('path');const n=+process.argv[2];const EZ=path.resolve(__dirname,'../../..'),OUT=EZ+'/post';fs.mkdirSync(OUT,{recursive:true});
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync(EZ+'/ez-data.js','utf8')+';this.SHEET=SHEET;this.SHEET_HEADER=SHEET_HEADER;this.TICKERS=TICKERS',ctx);
const H=ctx.SHEET_HEADER.map(h=>String(h).trim().toUpperCase()),g=(r,k)=>String(r[H.indexOf(k)]??'').trim();
const row=ctx.SHEET.find(r=>+g(r,'ROUND')===n);if(!row)throw new Error('no round '+n);
const t=g(row,'TICKER').toUpperCase(),co=ctx.TICKERS[t]||t,cash='$'+t.replace(/\..*$/,'').replace(/^\d.*$/,'');
const AIS=[['GPT','GPT'],['KIMI','Kimi'],['CLAUDE','Claude'],['GROK','Grok']];
const side=k=>({UP:'LONG',DOWN:'SHORT'})[g(row,k+' DIR').toUpperCase()]||null;
const D=new Date(g(row,'RESOLUTION DATE/TIME').replace(/(\d+)\/(\d+)\/(\d+)/,'20$3-$1-$2T12:00:00Z'));
const day=isNaN(D)?'the next close':D.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'UTC'});
const calls=AIS.filter(([k])=>side(k));const L=calls.filter(([k])=>side(k)==='LONG').length,S=calls.length-L;
const split=L===calls.length?`all ${L} long`:S===calls.length?`all ${S} short`:`${L} long vs ${S} short`;
const tick=cash==='$'?co:`${co} (${cash})`;
const pre=`Round ${n}: ${tick} earnings.\n\n`+AIS.map(([k,nm])=>`${nm}: ${side(k)||'no call'}`).join('\n')+`\n\n${split[0].toUpperCase()+split.slice(1)}. $100K each, graded at the close ${day}.`;
const base=path.join(OUT,`r${n}-${t.replace(/[^A-Z0-9]/g,'')}`);fs.writeFileSync(base+'-calls.txt',pre+'\n');console.log('--- calls post\n'+pre);
const dp=path.join(__dirname,'data','r'+n+'.json');
if(fs.existsSync(dp)){const R=JSON.parse(fs.readFileSync(dp));const $=v=>(v<0?'−':'+')+'$'+Math.abs(v).toLocaleString('en-US');
  const win=R.ai.filter(a=>a.right),los=R.ai.filter(a=>!a.right&&a.side!=='NO CALL'),names=a=>a.length===1?a[0].name:a.slice(0,-1).map(x=>x.name).join(', ')+' and '+a.at(-1).name;
  const pos=s=>s.toLowerCase();let cap;
  if(!win.length)cap=`${tick} closed ${R.pct}. All ${los.length} AIs were ${pos(los[0].side)} and lost ${$(los[0].pnl).replace('−','')} each.`;
  else if(!los.length)cap=`${tick} closed ${R.pct}. All ${win.length} AIs were ${pos(win[0].side)} and banked ${$(win[0].pnl)} each.`;
  else cap=`${names(win)} ${win.length===1?'takes':'take'} the ${cash==='$'?co:cash} round${win.length===1&&R.kind==='lone'?`, the only ${pos(win[0].side)}`:''} at ${R.pct}. ${win.length===1?win[0].name+' banked':'Each banked'} ${$(win[0].pnl)} on $100,000. ${names(los)}'s ${pos(los[0].side)}${los.length>1?'s':''} ${los.length>1?'each ':''}lost ${$(los[0].pnl).replace('−','$').replace('$$','$')}.`;
  cap+=`\n\nSeason P&L: `+R.order.map(k=>`${R.ai.find(a=>a.k===k).name} ${$(R.season1[k])}`).join(' · ');
  fs.writeFileSync(base+'-outcome.txt',cap+'\n');console.log('--- outcome caption (quote the calls post)\n'+cap)}
