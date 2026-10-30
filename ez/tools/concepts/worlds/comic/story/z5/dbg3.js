const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:200},deviceScaleFactor:2});
const css=fs.readFileSync('z5.css','utf8');
await p.setContent(`<style>${css}</style><div class="z5-sky-w" style="background:#5cc1e4"><span><span class="z5-bld" style="--k:1.5"><b>E</b></span><span class="z5-bld" style="--k:1.5"><b>A</b></span><span class="z5-bld" style="--k:1"><b style="font-family:Impact">R</b></span><div style="width:60px;height:60px;background:inherit" class="t"></div></span></div><style>.t{background:${/\.z5-bld b\{[^}]*background:([^;]*);/.exec(css.replace(/\n/g,''))[1]}!important}</style>`);
await p.screenshot({path:'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/z5/zz.png'});await b.close()})();
