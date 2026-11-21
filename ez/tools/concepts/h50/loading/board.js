/* boards for the H50 loading covers: node board.js <shotsdir> <width 390|1280|checks> <out.png> */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,DIR,W,OUT]=process.argv;
const ROWS=[['today','Today','The EZ. mark breathing on black (the X2+ cover, never moved into the show).'],
  ['A','A · The title card','The show\'s own open, held: painting + lettering, the lift lands it on the page\'s identical card.'],
  ['B','B · Sign-on','The set warms up on the network\'s test card; the cast are its colour bars; the lift pushes into the screen.'],
  ['C','C · Curtain up','The stage before the show: the cloth sways, the title hangs on the join; the lift is the curtain going up.']];
const f=n=>'file://'+path.join(DIR,n);
let html='<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#1b1712;color:#f6e7c4;font:15px/1.35 system-ui,sans-serif;padding:24px}'+
 'h1{font-size:26px;margin:0 0 4px}p.s{margin:0 0 20px;color:#c9b99a}.r{display:flex;gap:14px;align-items:flex-start;margin:0 0 26px}'+
 '.l{width:200px;flex:none}.l b{display:block;font-size:19px;margin:0 0 6px;color:#ffd877}.c{flex:none;text-align:center;font-size:12px;color:#c9b99a}.c img{display:block;border:1px solid #000;margin:0 0 4px}'+
 '.st{display:flex;gap:6px}.ar{align-self:center;font-size:28px;color:#ffd877}</style>';
if(W==='checks'){
  html+='<h1>H50 loading covers · fit checks</h1><p class="s">Each take\'s cover held at 320×640, 844×390 (phone on its side) and 1920×1080, and the very first paint at 390 (DOM ready, no image, no web font).</p>';
  for(const [k,t] of ROWS){html+='<div class="r"><div class="l"><b>'+t+'</b></div>';
    for(const [n,w,lab] of [[k+'-390-0first.png',195,'390 · first paint'],[k+'-320x640-cover.png',160,'320×640'],[k+'-844x390-cover.png',422,'844×390'],[k+'-1920x1080-cover.png',480,'1920×1080']])
      if(fs.existsSync(path.join(DIR,n)))html+='<div class="c"><img src="'+f(n)+'" width="'+w+'">'+lab+'</div>';
    html+='</div>'}}
else{const big=W==='390'?390:640,sm=W==='390'?150:256,tag=W==='390'?'390x844':'1280x800';
  html+='<h1>H50 loading cover · '+(W==='390'?'phone 390×844':'desktop 1280×800')+'</h1><p class="s">Left: the cover as it holds (2 to 8 s on a phone). Middle: the lift at its true timing (0, 100, 200, 300, 400 ms after the page is built; every animation stepped together). Right: the first screen once the lift is done.</p>';
  for(const [k,t,d] of ROWS){html+='<div class="r"><div class="l"><b>'+t+'</b>'+d+'</div>'+
    '<div class="c"><img src="'+f(k+'-'+tag+'-cover.png')+'" width="'+big+'">cover</div><div class="st">'+
    [0,2,4,6,8].map(i=>'<div class="c"><img src="'+f(k+'-'+tag+'-lift'+i+'.png')+'" width="'+sm+'">'+(i*50)+' ms</div>').join('')+'</div>'+
    '<div class="c"><img src="'+f(k+'-'+tag+'-after.png')+'" width="'+big+'">first screen after the lift</div></div>'}}
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W==='390'?1700:2700,height:800}});
  const tmp=path.join(DIR,'board-'+W+'.html');fs.writeFileSync(tmp,html);await p.goto('file://'+tmp);await p.waitForTimeout(800);
  await p.screenshot({path:OUT,fullPage:true});await b.close();console.log('ok',OUT)})();
