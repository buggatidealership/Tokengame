const {chromium}=require('/opt/node22/lib/node_modules/playwright');const D=process.argv[2],W=+process.argv[3],OUT=process.argv[4];
const R=[['models','Meet the models','3D render, comic ink (Seedream)'],['rounds','Every round so far','3D pop art (GPT Image 2)'],['tonight','Upcoming: next on the card','Anime cel colour (GPT Image 2)'],['bet','Bet #1: NVIDIA','Noir ink, gold only (Seedream)']];
const cw=W>1000?620:390;
const h=`<html><body style="margin:0;background:#16141c;color:#f8f0d9;font:600 15px system-ui;padding:20px">
<div style="font:800 22px system-ui;color:#fdbc2a;margin-bottom:14px">Section openers: today vs opening on a painted Hedra panel (${W}px)</div>
<div style="display:grid;grid-template-columns:repeat(${W>1000?2:4},${cw}px);gap:18px 14px">
${R.map(r=>`<div><div style="margin:0 0 6px">${r[1]} · today</div><img src="file://${D}/${r[0]}-now-${W}.png" style="width:${cw}px;display:block"></div><div><div style="margin:0 0 6px;color:#fdbc2a">${r[1]} · opener: ${r[2]}</div><img src="file://${D}/${r[0]}-new-${W}.png" style="width:${cw}px;display:block"></div>`).join('')}
</div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W>1000?1320:1680,height:800}});require("fs").writeFileSync(D+"/b.html",h);await p.goto("file://"+D+"/b.html");await p.waitForTimeout(800);await p.screenshot({path:OUT,fullPage:true});await b.close()})();
