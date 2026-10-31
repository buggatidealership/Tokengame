// Round 21 mockups on the built X2+ page (owner, 2026-10-23: five more, all very different, "if I can predict how it's going to look,
// you failed"; think about what makes people look, what matters most to them, and how a viewer becomes a follower on X or a buyer).
// Each one answers the section's own question ("Getting smarter or just lucky?") from a different angle, in a different printed
// object, everything printed on or cut from it, and each ends on an open loop (results still to come) that leads to X:
// sc the coin test (a scratch card: how often a fair coin does as well)  rc report card (first half vs second half of each AI's calls)
// cq cheque + statement (money: $100K copied; ROI lines on greenbar paper, the ROI leader in gold)  ev case file (an evidence board
// with a verdict)  bb scorecard (a baseball scorebook: last 10 rounds, batting average = hit rate)
// Every number comes from ez-data.js (the same file the page loads) or the page's own ROI tiles and chart.
// node launch-r21-proof.js <option> <outdir> [width]
const { chromium } = require('playwright');const fs=require('fs'),path=require('path');
const V=process.argv[2]||'sc',OUT=process.argv[3]||'.',W=+process.argv[4]||390;
const S='html.x2p.x2d[data-theme] #learn';
const COL={GPT:'#10a37f',KIMI:'#1e80ff',CLAUDE:'#d97757',GROK:'#141217'};
const FONTS='https://fonts.googleapis.com/css2?family=Bungee&family=Caveat:wght@600;700&family=Old+Standard+TT:wght@400;700&family=Special+Elite&family=Patrick+Hand&family=Libre+Barcode+39&family=Homemade+Apple&family=IBM+Plex+Mono:wght@500;600&family=Graduate&display=swap';
// ---- the data: the sheet as the page has it
global.window=global;eval(fs.readFileSync(path.join(__dirname,'..','..','ez-data.js'),'utf8').replace(/^\s*(const|let) /gm,'var '));
const MK=['GPT','KIMI','CLAUDE','GROK'],GR=SHEET.filter(r=>r[12]!==''&&r[12]!=null);
const tail=(k,n)=>{let p=0;const c=(n,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return r};for(let i=k;i<=n;i++)p+=c(n,i)/2**n;return p};
const ST={};MK.forEach((m,i)=>{const d=3+2*i,calls=[];GR.forEach(r=>{if(r[d]){const up=r[d]==='UP',mv=+r[12];calls.push({r:+r[0],ok:(up&&mv>0)||(!up&&mv<0),miss:Math.abs((up?1:-1)*+r[d+1]-mv)})}});
  const n=calls.length,k=calls.filter(c=>c.ok).length,h=Math.floor(n/2),A=calls.slice(0,h),B=calls.slice(h),pk=a=>a.filter(c=>c.ok).length;
  ST[m]={name:m,n,k,hit:k/n,odds:Math.round(1/tail(k,n)),h1:pk(A)/A.length,h2:pk(B)/B.length,miss:calls.reduce((s,c)=>s+c.miss,0)/n,
    l10:GR.slice(-10).map(r=>r[d]?(((r[d]==='UP')===(+r[12]>0))?1:0):-1)}});
// X2's ranking: hit rate among AIs that called at least half the graded rounds, ties to the smaller average miss, the rest after
const RANK=MK.slice().sort((a,b)=>{const qa=ST[a].n>=GR.length/2,qb=ST[b].n>=GR.length/2;return qa!==qb?(qa?-1:1):(ST[b].hit-ST[a].hit)||(ST[a].miss-ST[b].miss)});
RANK.forEach((m,i)=>ST[m].rank=i+1);const LEAD=RANK[0];
const L10R=GR.slice(-10).map(r=>r[0]);
const WK=UPCOMING.filter(u=>{const [mm,dd]=u.called.split('/').map(Number);return mm===10&&dd>=26&&dd<=30});
const BIG=['GOOGL','MSFT','AAPL','AMZN','META','COIN','MSTR','HOOD'].filter(t=>WK.some(u=>u.ticker===t));
const PEND=PENDING.filter(p=>p.status==='calls-in').map(p=>p.co.replace('American Express','AmEx'));
const pc=x=>Math.round(x*100)+'%',avg=x=>(x).toFixed(3).replace(/^0/,'');
const short=n=>n.split(' ').length>2?n.split(' ').slice(0,2).join(' '):n;
console.log('lead',LEAD,RANK.map(m=>m+' '+ST[m].k+'/'+ST[m].n+' 1in'+ST[m].odds+' '+pc(ST[m].h1)+'->'+pc(ST[m].h2)).join(' | '),'week',WK.length,BIG.join(','),'pending',PEND.join(','));
// ---- shared pieces
const BASE=`
 ${S} .rsw2,${S} #rflip{display:none!important}
 ${S} .q{position:relative;margin:16px 0 0}
 ${S} .q .tnum{font-variant-numeric:tabular-nums lining-nums}
 ${S} .q .lg{display:inline-grid!important;place-items:center;flex:none;border-radius:4px;transform:none!important;margin:0!important;box-shadow:none!important}
 ${S} .q .lg svg{width:66%;height:66%}
 ${S} .q .l1 .lg{background:none!important;color:var(--c)}${S} .q .l1 .lg svg *{fill:currentColor!important}
 ${S} .q .lp .lg{mix-blend-mode:multiply;opacity:.92}
 /* foil stamped into the stock (the bet ticket's NVIDIA recipe) */
 ${S} .q .fo{position:relative;display:inline-block;font-style:normal;color:transparent!important;-webkit-text-fill-color:transparent;text-shadow:0 -1px 0 rgba(70,42,6,.55),0 1.2px 0 rgba(255,250,232,.85)!important}
 ${S} .q .fo::after{content:attr(data-t);position:absolute;left:0;top:0;right:0;text-shadow:none;white-space:nowrap;
   background:var(--paper) 0 0/240px 240px,linear-gradient(172deg,#f6dc93 0%,#e4b54a 30%,#c99227 52%,#e7bd5b 70%,#bf8a22 100%);background-blend-mode:multiply,normal;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
 ${S} .q .q-xg{font-style:normal;font-weight:900;text-decoration:none}`;
const fo=t=>`<em class="fo" data-t="${t}">${t}</em>`;
const FILT=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="qWorn" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.3 1.75" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>
 <filter id="qPen" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="9" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="1.1" xChannelSelector="R" yChannelSelector="G"/></filter></svg>`;
const svgUrl=s=>'url("data:image/svg+xml,'+encodeURIComponent(s)+'")';
// a scribble of scratch strokes (what a coin takes off the latex), as a mask
function scratch(x0,x1,seed){let s=seed,r=()=>{s=s*16807%2147483647;return s/2147483647};const p=[];for(let y=6;y<=74;y+=9){p.push([x0+r()*6,y+r()*4]);p.push([x1-r()*6,y+4+r()*4])}
  return svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" preserveAspectRatio="none"><polyline points="${p.map(q=>q.map(n=>n.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#000" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/></svg>`)}
const CORK=svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="c"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="11"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .37  0 0 0 0 .2  0 0 0 -2.6 1.55"/></filter><rect width="220" height="220" fill="#c9995f"/><rect width="220" height="220" filter="url(#c)"/></svg>`);
const O={
 // ---- 1 the coin test: a scratch card. Each AI's panel is under silver latex; scratched, it shows its hit rate and how often a fair
 // coin does at least as well. The mock shows the card as a visitor leaves it: two scratched, one half done, one untouched.
 sc:{css:`
  ${S} .q-sc{filter:drop-shadow(4px 5px 0 #000)}
  ${S} .q-sc .s-cd{position:relative;padding:16px 14px 12px;color:#141217;
    background:${svgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="14"><path d="M0 7 Q10 0 20 7 T40 7" fill="none" stroke="#e7a6c9" stroke-width=".5"/><path d="M0 10 Q10 3 20 10 T40 10" fill="none" stroke="#9fd2e9" stroke-width=".5"/><path d="M0 4 Q10 -3 20 4 T40 4" fill="none" stroke="#f1d38a" stroke-width=".5"/></svg>')} 0 0/40px 14px,
      linear-gradient(115deg,#fdf3f6,#f3f8fd 30%,#f6fbf1 60%,#fff7e6),var(--paper) 0 0/240px 240px;background-blend-mode:multiply,normal,multiply;
    box-shadow:inset 0 0 0 4px #141217,inset 0 0 0 7px #f2b632,inset 0 0 0 8.5px #141217}
  ${S} .q-sc .s-hd{text-align:center;margin:2px 0 10px}
  ${S} .q-sc .s-hd b{display:block;font:400 30px/1 Bungee,sans-serif;color:#f2b632;-webkit-text-stroke:1.3px #141217;paint-order:stroke fill;text-shadow:3px 3px 0 #c8372a}
  ${S} .q-sc .s-hd span{display:block;margin-top:5px;font:600 13.5px/1.2 "Barlow Condensed",sans-serif}
  ${S} .q-sc .s-gr{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  ${S} .q-sc .s-p{border:2px solid #141217;background:rgba(255,255,255,.55)}
  ${S} .q-sc .s-nm{display:flex;align-items:center;gap:5px;height:26px;padding:0 6px;border-bottom:2px solid #141217;font:400 14px/1 Anton,sans-serif;letter-spacing:.05em;text-transform:uppercase}
  ${S} .q-sc .s-nm .lg{width:16px;height:16px}${S} .q-sc .s-nm .fo{margin-left:auto;font-size:10.5px;letter-spacing:.08em}
  ${S} .q-sc .s-w{position:relative;height:84px}
  ${S} .q-sc .s-r{position:absolute;inset:0;display:grid;justify-items:center;align-content:center;gap:2px}
  ${S} .q-sc .s-r strong{font:400 31px/1 Anton,sans-serif;font-weight:400}${S} .q-sc .s-r span{font:700 9.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.14em;text-transform:uppercase}
  ${S} .q-sc .s-r em{margin-top:3px;font:400 13.5px/1 Anton,sans-serif;font-style:normal;color:#b3261e;letter-spacing:.02em}${S} .q-sc .s-r em .fo{font-size:15px}
  /* the latex: printed silver with its own "scratch here" print, scratched away by a coin (a mask of strokes) */
  ${S} .q-sc .s-lx{position:absolute;inset:5px;display:grid;place-items:center;font:400 13px/1 Bungee,sans-serif;color:rgba(80,80,90,.55);letter-spacing:.06em;
    background:radial-gradient(rgba(255,255,255,.5) .6px,transparent 1px) 0 0/3px 3px,linear-gradient(135deg,#c4c6cc,#f1f2f4 28%,#a9abb2 52%,#e6e7ea 76%,#b3b5bb)}
  ${S} .q-sc .s-lx::after{content:"";position:absolute;inset:0;background:${svgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34"><circle cx="17" cy="17" r="6" fill="none" stroke="#8d9097" stroke-width="1"/><text x="17" y="19.5" font-size="7" text-anchor="middle" fill="#8d9097" font-family="sans-serif">$</text></svg>')} 0 0/34px 34px;opacity:.6}
  ${S} .q-sc .s-p.done .s-lx{-webkit-mask:${scratch(0,160,5)} 0 0/100% 100%,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:${scratch(0,160,5)} 0 0/100% 100%,linear-gradient(#000 0 0);mask-composite:exclude}
  ${S} .q-sc .s-p.done2 .s-lx{-webkit-mask:${scratch(0,160,9)} 0 0/100% 100%,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:${scratch(0,160,9)} 0 0/100% 100%,linear-gradient(#000 0 0);mask-composite:exclude}
  ${S} .q-sc .s-p.half .s-lx{-webkit-mask:${scratch(0,92,13)} 0 0/100% 100%,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:${scratch(0,92,13)} 0 0/100% 100%,linear-gradient(#000 0 0);mask-composite:exclude}
  ${S} .q-sc .s-ft{display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;margin-top:12px;padding-top:10px;border-top:2px dashed rgba(20,18,23,.6)}
  ${S} .q-sc .s-ft small{display:block;font:700 9px/1 "Barlow Condensed",sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#b3261e}
  ${S} .q-sc .s-ft b{display:block;margin:3px 0 2px;font:400 16px/1 Anton,sans-serif;letter-spacing:.03em;text-transform:uppercase}
  ${S} .q-sc .s-ft span{display:block;font:600 12px/1.2 "Barlow Condensed",sans-serif}
  ${S} .q-sc .s-ft a{display:grid;justify-items:center;gap:2px;font:400 12.5px/1 Anton,sans-serif;text-transform:uppercase;color:#141217;text-decoration:none;text-align:center;white-space:nowrap}
  ${S} .q-sc .s-ft a i{font:400 34px/1 "Libre Barcode 39",monospace;font-style:normal;letter-spacing:0}
  ${S} .q-sc .s-fp{margin:8px 0 0;font:600 9.5px/1.3 "Barlow Condensed",sans-serif;letter-spacing:.04em;color:rgba(20,18,23,.62)}`,
  build:X=>{const st=['done','done2','half','full'];return `<div class="q q-sc">${FILT}<div class="s-cd"><div class="s-hd"><b>The coin test</b><span>How often would a coin flip do this well?</span></div>
   <div class="s-gr">${RANK.map((m,i)=>{const s=ST[m],w=m===LEAD;return `<div class="s-p ${st[i]}"><div class="s-nm l1" style="--c:${COL[m]}">${X.lg[m]}<span>${m}</span>${w?fo('We follow'):''}</div>
     <div class="s-w"><div class="s-r"><strong class="tnum">${pc(s.hit)}</strong><span>right on direction</span><em>${s.hit<.5?'A coin does better':w?fo('Coin: 1 in '+s.odds):'Coin: 1 in '+s.odds}</em></div><div class="s-lx">Scratch</div></div></div>`}).join('')}</div>
   <div class="s-ft"><div><small>Next draw · Mon 26 Oct</small><b>${WK.length} new calls</b><span>${BIG.slice(0,4).join(', ')} and more, before they report</span></div><a><i>*EZS1*</i><span>Calls on <u class="q-xg">𝕏</u> first</span></a></div>
   <p class="s-fp">Odds that a fair coin gets at least as many right. Small samples, so they can flip.</p></div></div>`}},
 // ---- 2 report card: is each AI getting smarter? The first half of its calls against the second half, graded in red pen, the
 // teacher's remark worked out from the numbers, the most improved gets the gold star
 rc:{css:`
  ${S} .q-rc{filter:drop-shadow(4px 5px 0 #000)}
  ${S} .q-rc .r-cd{position:relative;padding:14px 14px 12px;color:#1f3a6b;background:linear-gradient(transparent calc(50% - 1px),rgba(120,90,40,.28) calc(50% - 1px) 50%,rgba(255,250,235,.7) 50% calc(50% + 1px),transparent calc(50% + 1px)),var(--paper) 0 0/240px 240px,#ead9ac;background-blend-mode:normal,multiply,normal}
  ${S} .q-rc .r-hd{display:grid;grid-template-columns:40px 1fr;align-items:center;gap:10px;padding-bottom:8px;border-bottom:2px solid #1f3a6b}
  ${S} .q-rc .r-hd svg{width:40px;height:46px}
  ${S} .q-rc .r-hd b{display:block;font:700 21px/1 "Old Standard TT",serif;letter-spacing:.08em;text-transform:uppercase}
  ${S} .q-rc .r-hd span{display:block;margin-top:3px;font:400 12.5px/1.2 "Old Standard TT",serif;font-style:italic}
  ${S} .q-rc table{width:100%;border-collapse:collapse;margin-top:2px}
  ${S} .q-rc th{padding:7px 3px 4px;font:700 9px/1 "Barlow Condensed",sans-serif;letter-spacing:.13em;text-transform:uppercase;text-align:left;border-bottom:1px solid #1f3a6b}
  ${S} .q-rc td{height:50px;padding:0 3px;border-bottom:1px solid rgba(31,58,107,.55);vertical-align:middle}
  ${S} .q-rc td+td,${S} .q-rc th+th{border-left:1px solid rgba(31,58,107,.4)}
  ${S} .q-rc td.st{white-space:nowrap;font:400 15px/1 "Old Standard TT",serif;font-weight:700;letter-spacing:.04em}${S} .q-rc td.st .lg{width:15px;height:15px;vertical-align:-2px;margin-right:5px!important}
  ${S} .q-rc .hw{font:700 22px/1 Caveat,cursive;font-style:normal;color:#c0261d;filter:url(#qPen)}
  ${S} .q-rc td.g{text-align:center}${S} .q-rc .ci{position:relative;display:inline-block;padding:2px 5px}
  ${S} .q-rc .ci::before{content:"";position:absolute;inset:-3px -4px;border:1.8px solid #c0261d;border-radius:50%;transform:rotate(-6deg);filter:url(#qPen)}
  ${S} .q-rc .ar{display:block;font:700 15px/1 Caveat,cursive;color:#c0261d}
  ${S} .q-rc td.rm{position:relative}${S} .q-rc td.rm .hw{font-size:17.5px;line-height:.95}
  ${S} .q-rc .star{position:absolute;right:-6px;top:-10px;width:30px;height:30px;transform:rotate(12deg)}
  ${S} .q-rc .r-ft{display:grid;gap:4px;margin-top:10px}
  ${S} .q-rc .r-ft span{font:700 13px/1.2 "Old Standard TT",serif}${S} .q-rc .r-ft .hw{display:block;font-size:21px;transform:rotate(-2deg);text-align:right}
  ${S} .q-rc .r-fp{margin:7px 0 0;font:italic 400 10.5px/1.3 "Old Standard TT",serif;color:rgba(31,58,107,.8)}`,
  build:X=>{const imp=MK.slice().sort((a,b)=>(ST[b].h2-ST[b].h1)-(ST[a].h2-ST[a].h1))[0],roiTop=X.roiTop;
   const rem=m=>{const s=ST[m],d=s.h2-s.h1;if(m===imp)return 'Most improved!';if(m===roiTop&&s.rank>2)return 'Most money, fewer right.';if(d>.04)return 'Climbing nicely.';if(d<-.04)return 'Slipping. See me.';return 'Steady.'};
   const star=`<svg class="star" viewBox="0 0 30 30" aria-hidden="true"><defs><linearGradient id="rsF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6dc93"/><stop offset=".35" stop-color="#e4b54a"/><stop offset=".55" stop-color="#c99227"/><stop offset=".75" stop-color="#e7bd5b"/><stop offset="1" stop-color="#bf8a22"/></linearGradient></defs><polygon points="15,1.5 18.9,10.6 28.6,11.3 21.2,17.6 23.5,27.2 15,22 6.5,27.2 8.8,17.6 1.4,11.3 11.1,10.6" fill="url(#rsF)" stroke="rgba(110,70,10,.55)" stroke-width=".6"/></svg>`;
   const crest=`<svg viewBox="0 0 40 46" aria-hidden="true"><path d="M20 2 L37 8 V22 C37 33 29 41 20 44 C11 41 3 33 3 22 V8 Z" fill="none" stroke="#1f3a6b" stroke-width="2"/><path d="M20 6 L33 10.5 V22 C33 30.5 27 37 20 39.6 C13 37 7 30.5 7 22 V10.5 Z" fill="none" stroke="#1f3a6b" stroke-width=".8"/><text x="20" y="27" text-anchor="middle" font-family="Old Standard TT,serif" font-weight="700" font-size="13" fill="#1f3a6b">EZ</text></svg>`;
   return `<div class="q q-rc">${FILT}<div class="r-cd"><div class="r-hd">${crest}<div><b>EZ Academy</b><span>Season 1 report card · ${GR.length} rounds</span></div></div>
   <table><tr><th>Student</th><th>First half</th><th>Second half</th><th>Teacher's remarks</th></tr>${RANK.map(m=>{const s=ST[m];return `<tr><td class="st l1" style="--c:${COL[m]}">${X.lg[m]}${m}</td><td class="g"><i class="hw tnum">${pc(s.h1)}</i></td>
     <td class="g"><i class="hw tnum ${m===imp?'ci':''}">${pc(s.h2)}</i><i class="ar">${s.h2>s.h1+.04?'↗':s.h2<s.h1-.04?'↘':'→'}</i></td><td class="rm"><i class="hw">${rem(m)}</i>${m===imp?star:''}</td></tr>`}).join('')}</table>
   <div class="r-ft"><span>Next term: Mon 26 Oct · ${WK.length} new calls</span><i class="hw">Grades go out on <u class="q-xg">𝕏</u> first →</i></div>
   <p class="r-fp">Each AI's own calls, split into two halves; right on direction. Small samples, so they can flip.</p></div></div>`}},
 // ---- 3 the money: a cheque made out to you, if you had copied the top earner, then the statement on greenbar paper: the ROI lines
 // (each AI in its colour, the leader in gold ink), the four balances, the loser's stamped RETURNED, the next deposits still to clear
 cq:{css:`
  ${S} .q-cq{display:grid;gap:12px}
  ${S} .q-cq .c-ck{position:relative;padding:12px 14px 10px;color:#163828;filter:drop-shadow(4px 5px 0 #000);
    background:${svgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="10"><path d="M0 5 Q6 0 12 5 T24 5" fill="none" stroke="#9cc7b0" stroke-width=".45"/><path d="M0 8 Q6 3 12 8 T24 8" fill="none" stroke="#b9d8c6" stroke-width=".45"/><path d="M0 2 Q6 -3 12 2 T24 2" fill="none" stroke="#b9d8c6" stroke-width=".45"/></svg>')} 0 0/24px 10px,var(--paper) 0 0/240px 240px,linear-gradient(100deg,#e3efe6,#eef4ea 50%,#e5eee9);background-blend-mode:multiply,multiply,normal}
  ${S} .q-cq .c-t{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:6px;border-bottom:1px solid rgba(22,56,40,.5)}
  ${S} .q-cq .c-t b{font:700 15px/1 "Old Standard TT",serif;letter-spacing:.06em;text-transform:uppercase}${S} .q-cq .c-t span{font:500 11px/1 "IBM Plex Mono",monospace}
  ${S} .q-cq .hw{font:700 21px/1 Caveat,cursive;font-style:normal;color:#1d3f8f}
  ${S} .q-cq .c-pay{display:grid;grid-template-columns:1fr auto;align-items:end;gap:8px;margin-top:10px}
  ${S} .q-cq small{display:block;font:600 8.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(22,56,40,.8)}
  ${S} .q-cq .c-pay div{border-bottom:1px solid rgba(22,56,40,.6);padding-bottom:2px}${S} .q-cq .c-pay .hw{display:block;margin-top:2px}
  ${S} .q-cq .c-amt{padding:3px 7px;border:1.4px solid rgba(22,56,40,.75);background:rgba(255,255,255,.35)}${S} .q-cq .c-amt .hw{font-size:23px}
  ${S} .q-cq .c-wd{margin-top:8px;border-bottom:1px solid rgba(22,56,40,.6);padding-bottom:2px;display:flex;justify-content:space-between;align-items:end;gap:6px}${S} .q-cq .c-wd .hw{font-size:16.5px}
  ${S} .q-cq .c-mm{display:grid;grid-template-columns:1fr 112px;gap:10px;align-items:end;margin-top:8px}${S} .q-cq .c-mm>div{border-bottom:1px solid rgba(22,56,40,.6);padding-bottom:2px}${S} .q-cq .c-mm .hw{font-size:16px}
  ${S} .q-cq .c-sg{font:400 17px/1 "Homemade Apple",cursive;color:#1d3f8f;text-align:center}
  ${S} .q-cq .c-mi{margin-top:9px;font:500 12px/1 "IBM Plex Mono",monospace;letter-spacing:.12em;color:rgba(22,40,30,.85)}
  ${S} .q-cq .c-st{position:relative;padding:10px 22px 12px;color:#1c2a22;font:500 11.5px/1.25 "IBM Plex Mono",monospace;filter:drop-shadow(4px 5px 0 #000);
    background:repeating-linear-gradient(#cfe6cf 0 20px,#f4f6ec 20px 40px);
    -webkit-mask:radial-gradient(3.4px at 9px 50%,#0000 97%,#000) 0 0/100% 20px,radial-gradient(3.4px at calc(100% - 9px) 50%,#0000 97%,#000) 0 0/100% 20px;-webkit-mask-composite:source-in;mask:radial-gradient(3.4px at 9px 50%,#0000 97%,#000) 0 0/100% 20px intersect,radial-gradient(3.4px at calc(100% - 9px) 50%,#0000 97%,#000) 0 0/100% 20px}
  ${S} .q-cq .c-sh{display:flex;justify-content:space-between;font-weight:600;text-transform:uppercase;letter-spacing:.06em;line-height:20px}
  ${S} .q-cq .q-ch{position:relative;margin-top:6px}${S} .q-cq .q-ch>svg{position:absolute;left:0;top:0;overflow:visible}${S} .q-cq .q-ch>svg.ink{mix-blend-mode:multiply}
  ${S} .q-cq .q-lb{position:absolute;transform:translateY(-50%);font:600 11px/1 "IBM Plex Mono",monospace;white-space:nowrap}
  ${S} .q-cq .c-ax{display:flex;justify-content:space-between;margin-right:var(--gut);font-size:10px}
  ${S} .q-cq table{width:100%;border-collapse:collapse;margin-top:8px}${S} .q-cq td{height:20px;padding:0}${S} .q-cq td.r{text-align:right}
  ${S} .q-cq tr.w td:first-child b{color:#9a6a0c}
  ${S} .q-cq td.q-rs{position:relative}${S} .q-cq .rt{position:absolute;left:54px;top:-1px;white-space:nowrap;padding:2px 6px;border:2px solid #b3261e;color:#b3261e;font:700 13px/1 "Special Elite",monospace;letter-spacing:.08em;transform:rotate(-9deg);filter:url(#qWorn)}
  ${S} .q-cq .c-nx{margin-top:8px;padding-top:6px;border-top:1px dashed rgba(28,42,34,.6);text-transform:uppercase;font-size:10.5px}`,
  chart:{h:150,gut:64},
  build:X=>{const t=X.tiles[0],k=+t.val.replace(/[$,]/g,'');
   const words=n=>{const a=['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],b=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
     const h=n=>(n>=100?a[Math.floor(n/100)]+' hundred'+(n%100?' ':''):'')+(n%100<20?a[n%100]:b[Math.floor(n%100/10)]+(n%10?'-'+a[n%10]:''));return (h(Math.floor(n/1000))+' thousand '+h(n%1000)).replace(/^./,c=>c.toUpperCase())};
   return `<div class="q q-cq">${FILT}<div class="c-ck"><div class="c-t"><b>First Bank of $EZ</b><span>Nº ${String(GR.length).padStart(6,'0')}</span></div>
   <div class="c-pay"><div><small>Pay to the order of</small><i class="hw">You, if you copied ${t.name}</i></div><span class="c-amt"><i class="hw tnum">${t.val}.00</i></span></div>
   <div class="c-wd"><i class="hw">${words(k)}</i><small>dollars</small></div>
   <div class="c-mm"><div><small>Memo</small><i class="hw">$100K, all in on every call</i></div><div><span class="c-sg">${t.name[0]+t.name.slice(1).toLowerCase()}</span></div></div>
   <div class="c-mi">⑆000042⑆ ${String(k).padStart(7,'0')}⑈ ${X.n}</div></div>
   <div class="c-st"><div class="c-sh"><span>Statement</span><span>${X.n} rounds</span></div><div class="q-ch" id="qch"></div><div class="c-ax"><span>R1</span><span>- - start $100,000</span><span>R${X.n}</span></div>
   <table>${X.tiles.map(t=>`<tr class="${t.rank===1?'w':''}"><td${t.up?'':' class="q-rs"'}><b>${t.name}</b>${t.up?'':'<span class="rt">Returned</span>'}</td><td class="r tnum">${t.val}</td><td class="r tnum">${t.up?'+':'−'}${t.pct}</td></tr>`).join('')}</table><div class="c-nx">Still to clear: ${PEND.join(', ')}. Statements on <u class="q-xg">𝕏</u> first.</div><div style="margin-top:4px;font-size:9.5px">Simulated, before fees. Buy on an up call, short on a down call.</div></div></div>`}},
 // ---- 4 case file: is it skill or luck? An evidence board: the coin test on an index card, then-vs-now on a polaroid, the money on a
 // till receipt, red string to the verdict on a sticky note, the case stamped open, the next evidence on a second note
 ev:{css:`
  ${S} .q-ev{filter:drop-shadow(4px 5px 0 #000)}
  ${S} .q-ev .e-bd{position:relative;padding:14px 12px 16px;border:9px solid #5b3b20;box-shadow:inset 0 0 0 1px rgba(0,0,0,.4),inset 0 2px 8px rgba(0,0,0,.45);background:${CORK} 0 0/220px 220px;
    display:grid;grid-template-columns:1fr 1fr;gap:16px 12px;align-items:start}
  ${S} .q-ev .e-bd>*{position:relative;z-index:1}
  ${S} .q-ev .pin{position:absolute;left:50%;top:-6px;z-index:3;width:13px;height:13px;margin-left:-6.5px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#ff8d80,#c8372a 55%,#7a1810);box-shadow:1px 2px 0 rgba(0,0,0,.45)}
  ${S} .q-ev .pin.g{background:radial-gradient(circle at 35% 35%,#fff0b8,#e4b54a 50%,#8a5c06)}
  ${S} .q-ev .e-tab{grid-column:1/-1;justify-self:start;padding:7px 12px 6px;background:var(--paper) 0 0/240px 240px,#e2c98f;background-blend-mode:multiply;font:400 13px/1 "Special Elite",monospace;color:#2a2116;transform:rotate(-1deg)}
  ${S} .q-ev .e-tab b{font-weight:400;letter-spacing:.06em}
  ${S} .q-ev .e-bd>.stp{position:absolute;right:8px;top:10px;z-index:4;padding:3px 7px;border:2.5px solid #b3261e;color:#b3261e;font:400 15px/1 "Special Elite",monospace;letter-spacing:.1em;transform:rotate(-12deg);filter:url(#qWorn);mix-blend-mode:multiply}
  ${S} .q-ev .e-a{grid-column:1/-1;padding:12px 12px 10px 30px;color:#1d1a16;transform:rotate(-1.2deg);
    background:linear-gradient(90deg,transparent 22px,rgba(200,55,42,.55) 22px 23.5px,transparent 23.5px),repeating-linear-gradient(transparent 0 21px,rgba(60,110,190,.35) 21px 22px),var(--paper) 0 0/240px 240px,#fbf8ef;background-blend-mode:normal,normal,multiply,normal;font:400 13.5px/22px "Special Elite",monospace}
  ${S} .q-ev .e-a b{display:block;font-weight:400;letter-spacing:.08em;color:#b3261e}${S} .q-ev .e-a strong{font-weight:400;background:linear-gradient(transparent 55%,rgba(246,214,74,.7) 55% 90%,transparent 90%)}
  ${S} .q-ev .e-b{padding:8px 8px 6px;background:#f6f3ea;transform:rotate(2.4deg);box-shadow:0 1px 0 rgba(0,0,0,.25)}
  ${S} .q-ev .e-b .ph{position:relative;height:118px;background:linear-gradient(160deg,#2a2730,#16141a);overflow:hidden;display:grid;grid-template-columns:1fr 1fr;align-items:end;gap:10px;padding:10px 12px 0}
  ${S} .q-ev .e-b .ph i{display:block;background:linear-gradient(#f4e9cf,#cdbf9c);position:relative}
  ${S} .q-ev .e-b .ph i span{position:absolute;left:0;right:0;top:-17px;text-align:center;font:400 14px/1 Anton,sans-serif;color:#f4e9cf}
  ${S} .q-ev .e-b .ph i:last-child{background:linear-gradient(#f6d67c,#b8841c)}${S} .q-ev .e-b .ph i:last-child span{color:#f6d67c}
  ${S} .q-ev .e-b .ph::after{content:"";position:absolute;inset:0;background:linear-gradient(130deg,rgba(255,255,255,.14),transparent 45%)}
  ${S} .q-ev .e-b p{margin:6px 0 0;font:700 17px/1 Caveat,cursive;color:#1d1a16;text-align:center}
  ${S} .q-ev .e-c{padding:10px 9px 12px;color:#26231f;font:500 10px/1.45 "IBM Plex Mono",monospace;transform:rotate(-2deg);background:var(--paper) 0 0/240px 240px,#f7f5ee;background-blend-mode:multiply;
    -webkit-mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50% 100%/8px 51% repeat-x,conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) 50% 0/8px 51% repeat-x;
    mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50% 100%/8px 51% repeat-x,conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) 50% 0/8px 51% repeat-x}
  ${S} .q-ev .e-c b{display:block;text-align:center;font-weight:600;letter-spacing:0;white-space:nowrap;border-bottom:1px dashed #26231f;margin-bottom:4px;padding-bottom:3px}
  ${S} .q-ev .e-c div{display:flex;justify-content:space-between}${S} .q-ev .e-c small{display:block;margin-top:4px;font-size:9px;text-align:center}
  ${S} .q-ev .e-v{padding:12px 12px 14px;background:linear-gradient(rgba(0,0,0,.04),transparent 30%),#f7e27a;transform:rotate(1.5deg);font:700 20px/1.02 Caveat,cursive;color:#1d1a16}
  ${S} .q-ev .e-v b{display:block;font-size:14px;letter-spacing:.06em;text-transform:uppercase;margin-bottom:4px}
  ${S} .q-ev .e-n{padding:11px 11px 12px;background:linear-gradient(rgba(0,0,0,.04),transparent 30%),#f5b8c6;transform:rotate(-2.2deg);font:700 17.5px/1.02 Caveat,cursive;color:#1d1a16}
  ${S} .q-ev .e-bd>svg.str{position:absolute;left:0;top:0;z-index:0;pointer-events:none;overflow:visible}
  ${S} .q-ev .e-bd .pin{z-index:5}
  ${S} .q-ev .e-fp{grid-column:1/-1;margin:0;padding:4px 8px;justify-self:start;background:#f7f5ee;font:500 9.5px/1.3 "IBM Plex Mono",monospace;color:#3a352d;transform:rotate(.6deg)}`,
  build:X=>{const g=ST[LEAD],o=RANK[1],so=ST[o];return `<div class="q q-ev">${FILT}<div class="e-bd">
   <div class="e-tab"><b>Case Nº ${String(GR.length).padStart(3,'0')} · Skill or luck?</b></div><span class="stp">Case open</span>
   <div class="e-a" data-pin="g"><i class="pin g"></i><b>Exhibit A · The coin test</b>${LEAD[0]+LEAD.slice(1).toLowerCase()}: ${g.k} of ${g.n} right. A fair coin does that <strong>1 time in ${g.odds}</strong>.<br>${o[0]+o.slice(1).toLowerCase()}: ${so.k} of ${so.n}. A coin: 1 in ${so.odds}.</div>
   <div class="e-b" data-pin><i class="pin"></i><div class="ph"><i style="height:${Math.round(g.h1*100)}px"><span>${pc(g.h1)}</span></i><i style="height:${Math.round(g.h2*100)}px"><span>${pc(g.h2)}</span></i></div><p>${LEAD[0]+LEAD.slice(1).toLowerCase()}: then vs. now</p></div>
   <div class="e-c" data-pin><i class="pin"></i><b>$100K on every call</b>${X.tiles.map(t=>`<div><span>${t.name}</span><span class="tnum">${t.val}</span></div>`).join('')}<small>Simulated, before fees</small></div>
   <div class="e-v" data-pin="v"><i class="pin"></i><b>Verdict</b>Too early to close. Leaning skill: ${LEAD[0]+LEAD.slice(1).toLowerCase()}, ${o[0]+o.slice(1).toLowerCase()}.</div>
   <div class="e-n"><i class="pin"></i>New evidence: ${PEND.slice(0,2).join(', ')} results. Follow the case on <u class="q-xg">𝕏</u> →</div>
   <p class="e-fp">Odds that a fair coin does at least as well. Small samples, so they can flip.</p></div></div>`},
  after:`(()=>{const bd=document.querySelector('#learn .e-bd'),b=bd.getBoundingClientRect(),c=e=>{const r=e.querySelector('.pin').getBoundingClientRect();return [r.left+r.width/2-b.left,r.top+r.height/2-b.top]};
    const v=c(bd.querySelector('[data-pin=v]'));let h='';bd.querySelectorAll('[data-pin]:not([data-pin=v])').forEach(e=>{const p=c(e),mx=(p[0]+v[0])/2,my=Math.max(p[1],v[1])+18;h+='<path d="M'+p[0]+','+p[1]+' Q'+mx+','+my+' '+v[0]+','+v[1]+'" fill="none" stroke="#c8372a" stroke-width="1.6"/><path d="M'+p[0]+','+(p[1]+1.5)+' Q'+mx+','+(my+1.5)+' '+v[0]+','+(v[1]+1.5)+'" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1.6"/>'});
    bd.insertAdjacentHTML('beforeend','<svg class="str" width="'+b.width+'" height="'+b.height+'" aria-hidden="true">'+h+'</svg>')})()`},
 // ---- 5 scorecard: who is hot right now? A baseball scorebook: each AI a batter, the last 10 rounds as innings, a right call a run
 // (the diamond shaded in pencil), a wrong one a K, the season's hit rate as a batting average, the leader's highlighted in gold
 bb:{css:`
  ${S} .q-bb{filter:drop-shadow(4px 5px 0 #000)}
  ${S} .q-bb .b-cd{position:relative;padding:13px 10px 11px;color:#3e5c47;background:var(--paper) 0 0/240px 240px,#f4f0e3;background-blend-mode:multiply}
  ${S} .q-bb .b-hd{display:flex;justify-content:space-between;align-items:baseline;padding:0 2px 6px;border-bottom:2.5px solid #3e5c47}
  ${S} .q-bb .b-hd b{font:400 22px/1 Graduate,serif;letter-spacing:.04em;text-transform:uppercase}${S} .q-bb .b-hd span{font:700 9.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.12em;text-transform:uppercase}
  ${S} .q-bb table{width:100%;border-collapse:collapse;table-layout:fixed;margin-top:4px}
  ${S} .q-bb th{height:22px;font:700 8.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.06em;text-transform:uppercase;text-align:center;border-bottom:1.5px solid #3e5c47}
  ${S} .q-bb th small{display:block;font-size:7px;letter-spacing:0;opacity:.8;margin-top:1px}
  ${S} .q-bb td{height:44px;border:1px solid rgba(62,92,71,.55);text-align:center;vertical-align:middle;padding:0}
  ${S} .q-bb td.bt{text-align:left;padding-left:4px;font:400 12.5px/1 Graduate,serif;color:#2c3e31;white-space:nowrap;overflow:hidden}
  ${S} .q-bb td.bt .lg{width:13px;height:13px;vertical-align:-2px;margin-right:3px!important}${S} .q-bb td.bt small{display:block;margin-top:3px;font:700 8px/1 "Barlow Condensed",sans-serif;letter-spacing:.08em;color:#3e5c47}
  ${S} .q-bb td.ix svg{display:block;margin:auto;width:17px;height:17px}
  ${S} .q-bb .pn{font:400 17px/1 "Patrick Hand",cursive;color:#3a3a3e;filter:url(#qPen)}
  ${S} .q-bb td.av{position:relative}${S} .q-bb td.av .pn{font-size:22px}${S} .q-bb td.av small{display:block;font:400 11px/1 "Patrick Hand",cursive;color:#3a3a3e;margin-top:1px}
  ${S} .q-bb tr.w td.av::before{content:"";position:absolute;left:3px;right:3px;top:10px;height:17px;background:rgba(246,206,64,.75);transform:rotate(-3deg);mix-blend-mode:multiply;border-radius:2px}
  ${S} .q-bb tr.w td.av>*{position:relative}
  ${S} .q-bb .b-lg{display:flex;gap:12px;justify-content:center;margin-top:6px;font:700 9px/1 "Barlow Condensed",sans-serif;letter-spacing:.1em;text-transform:uppercase}
  ${S} .q-bb .b-lg span{display:flex;align-items:center;gap:4px}${S} .q-bb .b-lg svg{width:12px;height:12px}${S} .q-bb .b-lg .pn{font-size:13px}
  ${S} .q-bb .b-ft{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:end;margin-top:9px;padding-top:8px;border-top:1.5px solid #3e5c47}
  ${S} .q-bb .b-ft b{display:block;font:400 14px/1.1 Graduate,serif;text-transform:uppercase}${S} .q-bb .b-ft span{display:block;margin-top:2px;font:600 11.5px/1.2 "Barlow Condensed",sans-serif;color:#2c3e31}
  ${S} .q-bb .b-ft .pn{font-size:16px;text-align:right;transform:rotate(-3deg);white-space:nowrap}`,
  build:X=>{const dia=(s)=>`<svg viewBox="0 0 20 20" aria-hidden="true"><defs><pattern id="hh${s}" width="2.2" height="2.2" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="2.2" stroke="#3a3a3e" stroke-width="1"/></pattern></defs><path d="M10 2 L18 10 L10 18 L2 10 Z" fill="${s?'url(#hh1)':'none'}" stroke="${s?'#3a3a3e':'rgba(62,92,71,.6)'}" stroke-width="${s?1.4:.9}" filter="${s?'url(#qPen)':''}"/></svg>`;
   const rows=RANK.slice().sort((a,b)=>ST[b].hit-ST[a].hit);
   return `<div class="q q-bb">${FILT}<div class="b-cd"><div class="b-hd"><b>Scorecard</b><span>AIs vs. the market · last 10 rounds</span></div>
   <table><colgroup><col style="width:78px">${L10R.map(()=>'<col>').join('')}<col style="width:42px"></colgroup>
   <tr><th style="text-align:left;padding-left:4px">Batter</th>${GR.slice(-10).map(r=>`<th>${r[0]}<small>${(r[1].split('.')[0]).slice(0,4)}</small></th>`).join('')}<th>AVG</th></tr>
   ${rows.map(m=>{const s=ST[m];return `<tr class="${m===LEAD?'w':''}"><td class="bt l1" style="--c:${COL[m]}">${X.lg[m]}${m}<small>${s.l10.filter(x=>x===1).length}-${s.l10.filter(x=>x===0).length} last 10</small></td>${s.l10.map(x=>`<td class="ix">${x===1?dia(1):x===0?'<span class="pn">K</span>':''}</td>`).join('')}<td class="av"><span class="pn">${avg(s.hit)}</span><small>${s.k}-for-${s.n}</small></td></tr>`}).join('')}</table>
   <div class="b-lg"><span>${dia(1)} Right call: a run</span><span><i class="pn">K</i> Wrong: struck out</span><span>AVG = hit rate</span></div>
   <div class="b-ft"><div><b>Next game · Mon 26 Oct</b><span>${WK.length} at-bats: ${BIG.slice(0,4).join(', ')} and more</span></div><span class="pn">Box scores on <u class="q-xg">𝕏</u> first</span></div></div></div>`}},
};
// the statement's chart: the page's own ROI lines in real pixels, each AI's line in its colour (ink, multiplied into the paper), the
// ROI leader's in gold ink with a dark keyline, labels where the lines end, pushed apart where they crowd
function QDRAW(el,X,o){const W=el.clientWidth,H=o.h,G=o.gut,pw=W-G,pad=5,ih=H-2*pad;el.style.height=H+'px';el.parentNode.style.setProperty('--gut',G+'px');
  const sx=x=>x/100*pw,sy=y=>pad+y/100*ih,P=s=>s.pts.map((p,i)=>(i?'L':'M')+sx(p[0]).toFixed(1)+','+sy(p[1]).toFixed(1)).join('');
  const win=X.series.find(s=>s.rank===1),y0=sy(X.y0),ln=(d,c,w,x)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"${x||''}/>`;
  let ink=`<path d="M0,${y0}H${pw}" stroke="rgba(28,42,34,.55)" stroke-width="1" stroke-dasharray="4 3"/>`;X.series.filter(s=>s.rank!==1).forEach(s=>ink+=ln(P(s),s.col,1.8,' opacity=".9"'));
  const top=`<defs><linearGradient id="cqG" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="50" y2="18" spreadMethod="reflect"><stop offset="0" stop-color="#f6dc93"/><stop offset=".35" stop-color="#d9a636"/><stop offset=".6" stop-color="#b8841c"/><stop offset="1" stop-color="#e9c262"/></linearGradient></defs>`+ln(P(win),'#5a3a06',4)+ln(P(win),'url(#cqG)',2.6);
  const ends=X.series.map(s=>({s,y0:sy(s.lastY),y:sy(s.lastY)})).sort((a,b)=>a.y-b.y);for(let i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<14)ends[i].y=ends[i-1].y+14;
  const ov=ends[ends.length-1].y-(H-6);if(ov>0)ends.forEach(e=>e.y-=ov);
  ends.forEach(e=>ink+=`<path d="M${pw+2},${e.y0}L${pw+7},${e.y}" stroke="rgba(28,42,34,.6)" stroke-width=".8"/>`);
  el.insertAdjacentHTML('beforeend',`<svg class="ink" width="${W}" height="${H}" aria-hidden="true">${ink}</svg><svg width="${W}" height="${H}" aria-hidden="true">${top}</svg>`+
    ends.map(e=>`<div class="q-lb" style="left:${pw+9}px;top:${e.y.toFixed(1)}px;color:${e.s.rank===1?'#8a5c06':e.s.col==='#141217'?'#141217':e.s.col}">${e.s.name}</div>`).join(''))}
(async()=>{const o=O[V];const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/'+(process.env.PAGE||'v46-live-x2plus.html'));await p.waitForTimeout(3000);
await p.evaluate(()=>{const t=document.querySelector('.x2p-ast .tk');if(t)document.documentElement.style.setProperty('--paper',getComputedStyle(t).backgroundImage.split(/,(?=\s*url\()/).filter(x=>/url\(/.test(x)).pop()||'none')});
await p.click('#learn [data-rk="roi"]');await p.waitForTimeout(900);
// the page's own ROI tiles and chart lines, and each AI's logo
const X=await p.evaluate(()=>{const f=document.querySelector('#learn #rflip');const byC={'#10a37f':'GPT','#1e80ff':'KIMI','#d97757':'CLAUDE','#111':'GROK'};
  const tiles=[...f.querySelectorAll('.pnl-k li')].map(li=>{const m=li.textContent.replace(/\s+/g,' ').match(/(\d)\s*([A-Za-z]+)\s*(\$[\d,]+)\s*([▲▼])\s*([\d.]+%)/);return {rank:+m[1],name:m[2].toUpperCase(),val:m[3],up:m[4]==='▲',pct:m[5],lg:li.querySelector('.lg').outerHTML}});
  const series=[...f.querySelectorAll('.pnl svg path')].filter(x=>/stroke:/.test(x.getAttribute('style')||'')).map(x=>{const k=byC[x.getAttribute('style').match(/stroke:\s*(#[0-9a-f]+)/i)[1].toLowerCase()];
    const pts=x.getAttribute('d').match(/-?[\d.]+,-?[\d.]+/g).map(q=>q.split(',').map(Number));return {name:k,pts,lastY:pts[pts.length-1][1],rank:tiles.find(t=>t.name===k).rank}});
  return {tiles,series,y0:parseFloat(f.querySelector('.pnl-z').style.top)}});
X.n=GR.length;X.lg={};X.tiles.forEach(t=>X.lg[t.name]=t.lg);X.roiTop=X.tiles[0].name;X.series.forEach(s=>s.col=COL[s.name]);
await p.addStyleTag({url:FONTS});await p.addStyleTag({content:BASE+o.css});
await p.evaluate(h=>{const l=document.getElementById('learn');const w=document.createElement('div');w.innerHTML=h;l.appendChild(w.firstElementChild)},o.build(X));
await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
if(o.chart){await p.addScriptTag({content:'window.QDRAW='+QDRAW.toString()});await p.evaluate(([X,c])=>QDRAW(document.getElementById('qch'),X,c),[X,o.chart])}
if(o.after)await p.evaluate(o.after);
await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
await p.evaluate(()=>document.getElementById('learn').scrollIntoView());await p.waitForTimeout(700);
const c=await p.evaluate(()=>{const a=document.querySelector('#learn .q').getBoundingClientRect(),h=document.querySelector('#learn').getBoundingClientRect();return {x:0,y:h.top+scrollY,width:innerWidth,height:a.bottom-h.top+14}});
await p.screenshot({path:`${OUT}/r21-${V}-${W}.png`,clip:c,fullPage:true});
console.log(V,W,'height',Math.round(c.height),'page width',await p.evaluate(()=>document.documentElement.scrollWidth),errs.length?'ERR '+errs.join('|'):'');await b.close()})();
