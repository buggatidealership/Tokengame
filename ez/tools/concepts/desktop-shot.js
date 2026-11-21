const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');const fs=require('fs');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';const TF='/home/user/Tokengame/ez/teaser/fonts/';
const FF=[['Anton',400,S+'trio/fonts/Anton.woff2'],['Barlow',500,TF+'barlow-500.woff2'],['Barlow',600,TF+'barlow-700.woff2'],['Barlow',700,TF+'barlow-700.woff2'],['Barlow',800,TF+'barlow-800.woff2'],['Barlow Condensed','100 900',TF+'barlow-condensed-800.woff2']];
const CSS=FF.map((f,i)=>"@font-face{font-family:'"+f[0]+"';font-weight:"+f[1]+";src:url(https://fontfile.local/"+i+".woff2)}").join('');
const C=require(S+'dk/concepts.js');const only=process.argv[2];
(async()=>{const b=await chromium.launch();
 for(const k of Object.keys(C)){ if(only&&k!==only)continue;
  for(const [W,H,full] of [[1536,864,1],[1280,720,0],[1920,1080,0],[390,844,0]]){
   const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
   await p.route(/fonts\.googleapis\.com/,x=>x.fulfill({contentType:'text/css',body:CSS}));
   await p.route(/fontfile\.local/,x=>{const i=+x.request().url().match(/(\d+)\.woff2/)[1];x.fulfill({contentType:'font/woff2',body:fs.readFileSync(FF[i][2])})});
   await p.route(/fonts\.gstatic\.com/,x=>x.abort());
   await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html#/');await p.waitForTimeout(2200);
   await p.evaluate(([css,js,W])=>{const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);if(W>=1100)(new Function('return ('+js+')()'))();document.documentElement.style.scrollBehavior='auto'},[C[k].css,C[k].js.toString(),W]);
   await p.waitForTimeout(1200);
   await p.screenshot({path:S+'dk/'+k+'-'+W+'-fold.png'});
   if(full){const h=await p.evaluate(()=>document.documentElement.scrollHeight);
     for(let i=1;i<4;i++){await p.evaluate(y=>window.scrollTo(0,y),i*(H-80));await p.waitForTimeout(500);await p.screenshot({path:S+'dk/'+k+'-'+W+'-s'+i+'.png'})}
     console.log(k,W,'doc h',h,'sw',await p.evaluate(()=>document.documentElement.scrollWidth),errs.join('|'))}
   else console.log(k,W,'sw',await p.evaluate(()=>document.documentElement.scrollWidth),errs.join('|'));
   await p.close()}}
 await b.close()})();
