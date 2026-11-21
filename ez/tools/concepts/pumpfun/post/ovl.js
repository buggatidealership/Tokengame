// The words for the pool post, as transparent 1920x1080 layers over the Hedra loop: the scene's own labels (signpost, chest plate,
// bucket tag) and one caption plate per beat. node ovl.js <outdir>   (needs the local server on 8997 for the fonts)
const {chromium}=require('playwright');const fs=require('fs');const out=process.argv[2];fs.mkdirSync(out,{recursive:true});
const B='http://127.0.0.1:8997/';
const css=`@font-face{font-family:Lil;src:url(${B}media/h48-lilita.woff2)}@font-face{font-family:Cap;src:url(${B}media/h48-caprasimo.woff2)}@font-face{font-family:Fre;src:url(${B}media/h48-fredoka.woff2);font-weight:300 700}
html,body{margin:0;background:transparent}.f{position:relative;width:1920px;height:1080px;overflow:hidden}
.bd{position:absolute;display:grid;place-items:center;font:400 40px/1 Lil,sans-serif;letter-spacing:.03em;color:#2b1709;text-shadow:0 2px 0 rgba(255,214,150,.35),0 -1px 0 rgba(0,0,0,.35);transform:rotate(var(--r,0deg))}
.pl{position:absolute;display:grid;place-items:center;font:400 40px/1 Cap,serif;color:#3a2405;text-shadow:0 1px 0 rgba(255,240,180,.6),0 -1px 0 rgba(0,0,0,.3)}
.tag{position:absolute;padding:6px 12px 4px;background:#fbf1d8;border:3px solid #24140c;box-shadow:4px 5px 0 #24140c;font:400 30px/1 Lil,sans-serif;color:#24140c;transform:rotate(-4deg)}
.tag small{display:block;font-size:17px;letter-spacing:.06em;margin-top:2px}
.cap{position:absolute;right:70px;top:64px;width:780px;padding:26px 32px 22px;background:#fbf1d8;border:5px solid #24140c;box-shadow:9px 11px 0 #24140c;transform:rotate(-1deg);color:#24140c}
.cap b{display:block;font:400 50px/1.08 Lil,sans-serif}.cap p{margin:12px 0 0;font:600 31px/1.3 Fre,sans-serif}.cap em{font-style:normal;color:#b5321c}.cap i{font-style:normal;color:#1d7a39}
.cap .k{display:inline-block;margin:0 0 10px;padding:4px 12px 2px;background:#24140c;color:#f6e7c4;font:400 22px/1 Lil,sans-serif;letter-spacing:.1em}
.foot{position:absolute;right:56px;bottom:40px;display:flex;align-items:center;gap:14px;font:400 30px/1 Lil,sans-serif;color:#fff6e2;text-shadow:2px 3px 0 #24140c}
.foot img{width:74px;height:56px;filter:drop-shadow(2px 3px 0 #24140c)}`;
const scene=`<div class="bd" style="left:108px;top:271px;width:377px;height:149px;--r:-1deg">BET #1: NVIDIA</div>
<div class="bd" style="left:108px;top:465px;width:384px;height:138px;--r:.5deg">NOV 17</div>
<div class="bd" style="left:117px;top:649px;width:378px;height:154px;--r:-.5deg">LEADER&rsquo;S CALL</div>
<div class="pl" style="left:1244px;top:644px;width:145px;height:62px;transform:rotate(-2deg)">69%</div>
<div class="tag" style="left:560px;top:742px">31%<small>THE PROJECT</small></div>
<div class="foot"><img src="${B}media/ez-mark.svg">earningszn.xyz</div>`;
const beats=[
 ['Creator rewards: on','Every $EZ trade pays a creator fee.','<em>69%</em> pours into the pool. <em>31%</em> runs the project.'],
 ['Bet #1','Nov 17, NVIDIA earnings.','The whole pool goes on one trade: the call of the AI leading our season P&amp;L. Right now, <em>Grok</em>.'],
 ['Right call','Profit buys back $EZ.','On the open market. The pool keeps filling, so the next bet is <i>bigger</i>.'],
 ['Wrong call','The pool shrinks.','No leverage, so it can&rsquo;t be wiped out. Fees keep filling it. On to the next bet.'],
 ['The market decides','Trading fills the pool.','The more $EZ trades, the bigger every bet. It only stops if nobody trades.'],
];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
 const shot=async(name,inner)=>{await p.setContent(`<style>${css}</style><div class="f">${inner}</div>`,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(250);await p.screenshot({path:`${out}/${name}.png`,omitBackground:true})};
 await p.goto(B);await shot('scene',scene);
 for(let i=0;i<beats.length;i++){const [k,h,t]=beats[i];await shot('beat'+(i+1),`<div class="cap"><span class="k">${k}</span><b>${h}</b><p>${t}</p></div>`)}
 await b.close()})();
