/* H50 install (launch day, 2026-11-04): writes the owner's picked top bar and loading cover into tools/v22/story/, where build.py picks
   them up (h50_head.css; h50_load.html/.css/.head). node install.js <A|B|C|none> <A|B|C|none>
   Header A gets its E and Z a shade darker (the crawl's colours measure 3.1:1 and 3.8:1 on the plain cream; these 4.8:1 and 4.9:1, at least 4.2:1 where the paper is darkest).
   Loading A: its band (where the header lands) takes the picked header's height from the header itself once the page is parsed, and
   with header A it is painted as that header's cream stock and ink line instead of black. */
const fs=require('fs'),path=require('path');const S=path.join(__dirname,'../../v22/story/');
const [hd,ld]=process.argv.slice(2);
for(const f of ['h50_head.css','h50_load.html','h50_load.css','h50_load.head'])try{fs.unlinkSync(S+f)}catch(e){}
if(hd&&hd!=='none'){let c='/* H50 take: '+hd+' (the top bar in the show\'s look; tools/concepts/h50/header/, installed by install.js) */\n'+
  fs.readFileSync(path.join(__dirname,'header/base.css'),'utf8')+'\n'+fs.readFileSync(path.join(__dirname,'header/'+hd+'.css'),'utf8');
  if(hd==='A')c+='\n/* E and Z a shade darker on the cream (4.8:1 and 4.9:1 on the plain cream) */\nhtml.h50-A.h48.x2p.x2d.x2d[data-theme] body header.top a.brand b .x2p-be{color:#17692e!important}\nhtml.h50-A.h48.x2p.x2d.x2d[data-theme] body header.top a.brand b .x2p-bz{color:#a82a19!important}\n';
  fs.writeFileSync(S+'h50_head.css',c)}
if(ld&&ld!=='none'){const T=require('./loading/takes.js')[ld]();let html=T.html,css=T.css;
  if(ld==='A'){
    // the band takes the real header's height once it exists (the CSS guesses stand until then)
    html=html.replace('<script>(function(){var H=document.documentElement,L=document.getElementById("x2pLoad"),',
      '<script>(function(){var L0=document.getElementById("x2pLoad");function hb(){var h=document.querySelector("header.top");if(h&&h.offsetHeight&&L0)L0.style.setProperty("--hb",h.offsetHeight+"px")}document.addEventListener("DOMContentLoaded",hb);addEventListener("resize",hb)})()</script><script>(function(){var H=document.documentElement,L=document.getElementById("x2pLoad"),');
    if(hd==='A')css+='\n/* the band is header A\'s cream stock and ink line */\n#x2pLoad.ldA .ldA-band{background:radial-gradient(90% 160% at 12% 0%,rgba(255,250,232,.55),rgba(255,250,232,0) 60%),linear-gradient(0deg,rgba(90,52,20,.16),rgba(90,52,20,0) 45%),url(media/h48-paper.jpg) center/560px auto,#ecd7a8;background-blend-mode:normal,multiply,multiply,normal;border-bottom:3px solid #24140c;box-sizing:border-box}\n#x2pLoad.ldA{--hb:98px}@media (min-width:1100px){#x2pLoad.ldA{--hb:67px}}\n';
  }
  fs.writeFileSync(S+'h50_load.html',html);fs.writeFileSync(S+'h50_load.css',css);fs.writeFileSync(S+'h50_load.head',T.head)}
console.log('installed header',hd||'none','loading',ld||'none');
