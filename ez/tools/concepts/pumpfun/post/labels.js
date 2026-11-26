// The loop's labels, painted onto its own objects (owner, launch night: "69% on the chest, 31% on the bucket... bet number one on the first
// board, NVIDIA on the second, and bet number two ?"): one transparent 1920x1080 layer. node labels.js <out.png>  (server on 8997 for fonts)
const {chromium}=require('playwright');const B='http://127.0.0.1:8997/';
const css=`@font-face{font-family:Lil;src:url(${B}media/h48-lilita.woff2)}@font-face{font-family:Cap;src:url(${B}media/h48-caprasimo.woff2)}
html,body{margin:0;background:transparent}.f{position:relative;width:1920px;height:1080px;overflow:hidden}
.bd{position:absolute;display:grid;place-items:center;font:400 52px/1 Lil,sans-serif;letter-spacing:.04em;color:#1f0f05;
  text-shadow:0 2px 0 rgba(255,214,150,.42),0 -1px 0 rgba(0,0,0,.45);transform:rotate(var(--r,0deg));opacity:.92}
.bd.q{color:#1f0f05}
.pl{position:absolute;display:grid;place-items:center;font:400 42px/1 Cap,serif;color:#3a2405;text-shadow:0 1px 0 rgba(255,240,180,.6),0 -1px 0 rgba(0,0,0,.3)}
.bk{position:absolute;display:grid;place-items:center;font:400 40px/1 Lil,sans-serif;letter-spacing:.02em;color:#f3e3b8;text-shadow:0 2px 0 rgba(20,8,2,.55);opacity:.9}`;
const html=`<div class="bd" style="left:108px;top:271px;width:377px;height:149px;--r:-1deg">BET #1</div>
<div class="bd" style="left:108px;top:465px;width:384px;height:138px;--r:.5deg">NVIDIA</div>
<div class="bd q" style="left:117px;top:649px;width:378px;height:154px;--r:-.5deg">BET #2 ?</div>
<div class="pl" style="left:1244px;top:644px;width:145px;height:62px;transform:rotate(-2deg)">69%</div>
<div class="bk" style="left:500px;top:822px;width:112px;height:56px">31%</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});await p.goto(B);
 await p.setContent(`<style>${css}</style><div class="f">${html}</div>`,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
 await p.screenshot({path:process.argv[2],omitBackground:true});await b.close()})();
