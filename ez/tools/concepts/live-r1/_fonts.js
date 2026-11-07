// Serves Google Fonts to the headless browser through curl (the sandbox's proxy), cached in the scratchpad.
const fs=require('fs'),cp=require('child_process'),crypto=require('crypto');
const DIR='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/lv/fontcache/';
fs.mkdirSync(DIR,{recursive:true});
const UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
function get(url){const f=DIR+crypto.createHash('md5').update(url).digest('hex');
  if(!fs.existsSync(f))cp.execFileSync('curl',['-sS','-m','30','-A',UA,'-o',f,url]);return fs.readFileSync(f)}
module.exports=async function(p){
  await p.route(/fonts\.googleapis\.com/,r=>{try{r.fulfill({contentType:'text/css',body:get(r.request().url())})}catch(e){r.abort()}});
  await p.route(/fonts\.gstatic\.com/,r=>{try{const u=r.request().url();r.fulfill({contentType:u.endsWith('.ttf')?'font/ttf':'font/woff2',body:get(u)})}catch(e){r.abort()}});
};
