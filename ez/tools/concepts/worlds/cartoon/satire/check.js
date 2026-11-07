// node check.js : the gate before the boards (rule 0, gap list 1, 6, 17, 19): sideways scroll, faces, words, emoji,
// dead space inside containers, spread balance, and alignment of repeated cells, at 320, 390 and 1280.
const {chromium}=require(require.resolve('playwright',{paths:['/opt/node-tools/node_modules',process.cwd()]}));
(async()=>{const b=await chromium.launch();const out={};
for(const page of ['overview.html','leaderboard.html'])for(const w of [320,390,1280]){
 const p=await b.newPage({viewport:{width:w,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://localhost:8995/tools/concepts/worlds/cartoon/satire/'+page+'?shot=1',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
 const r=await p.evaluate(()=>{const R=e=>e.getBoundingClientRect();
  const sw=document.documentElement.scrollWidth,cw=document.documentElement.clientWidth;
  const fams=new Set();document.querySelectorAll('body *').forEach(e=>{if(!e.childNodes.length)return;const t=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(t)fams.add(getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g,''))});
  const txt=document.body.innerText;
  const bad=['\\bcall(s|ed|ing)?\\b','prediction','coin flip','\\bpot\\b','\\bvolume\\b','pit wall','proven','beats the market','getting smarter'].filter(x=>new RegExp(x,'i').test(txt));
  const emoji=/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(txt);
  // dead space: bottom gap between a container's content and its own bottom edge
  const dead={};document.querySelectorAll('.card,.pn,.gag,.tk,.du,.ad,.bx,.row,.nr').forEach(c=>{const kids=[...c.children].filter(k=>{const s=getComputedStyle(k);return s.position!=='absolute'&&s.display!=='none'&&R(k).height>0});if(!kids.length)return;
    const cb=R(c),pb=parseFloat(getComputedStyle(c).paddingBottom)+parseFloat(getComputedStyle(c).borderBottomWidth),mb=Math.max(...kids.map(k=>R(k).bottom));const g=cb.bottom-pb-mb;const k=c.classList[0];dead[k]=Math.max(dead[k]||0,Math.round(g*10)/10)});
  // spreads: the gap between the shorter page's last content and its bottom
  const spread=[...document.querySelectorAll('.spread.two')].map(s=>[...s.children].map(pg=>{const kids=[...pg.children].filter(k=>getComputedStyle(k).position!=='absolute'&&R(k).height>0);const mb=Math.max(...kids.map(k=>R(k).bottom));return Math.round(R(pg).bottom-parseFloat(getComputedStyle(pg).paddingBottom)-mb)}));
  // alignment: repeated cells
  const col=sel=>{const a=[...document.querySelectorAll(sel)].filter(e=>e.offsetParent!==null&&R(e).width>0).map(R);return a.length?{n:a.length,left:+(Math.max(...a.map(x=>x.left))-Math.min(...a.map(x=>x.left))).toFixed(2),right:+(Math.max(...a.map(x=>x.right))-Math.min(...a.map(x=>x.right))).toFixed(2),w:+(Math.max(...a.map(x=>x.width))-Math.min(...a.map(x=>x.width))).toFixed(2)}:null};
  const al={};['.row .pl','.row .l5','.row .wlv','.row .hit','.row .lcv','.row .md','.cm .por','.cm .np','.sx .c:nth-child(2)','.sx .c:nth-child(5)','.tl .th','.bx.w','.bx.l','.du .hm','.rb .tr'].forEach(s=>{const v=col(s);if(v)al[s]=v});
  // tags: lettering centred on the painted tag box
  const tags=[...document.querySelectorAll('.tag')].map(t=>{const b=R(t);const r=document.createRange();r.selectNodeContents(t);const c=r.getBoundingClientRect();return Math.round(Math.abs((c.left+c.right)/2-(b.left+b.right)/2)*100)/100});
  return {sw,cw,h:document.documentElement.scrollHeight,fams:[...fams],bad,emoji,dead,spread,al,tagOff:tags.length?Math.max(...tags):null}});
 r.errs=errs;out[page+'@'+w]=r;await p.close()}
console.log(JSON.stringify(out,null,1));await b.close()})();
