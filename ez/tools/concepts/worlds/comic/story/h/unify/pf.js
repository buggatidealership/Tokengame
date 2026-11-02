// node pf.js W tag [overlays] : rendered (platform) fonts per visible text element via CDP, by section
const {open}=require('./lib');const fs=require('fs');
(async()=>{const [W,tag,...ov]=process.argv.slice(2);const {b,p,errs}=await open(+W,844,{css:ov.filter(f=>f.endsWith('.css')),js:ov.filter(f=>f.endsWith('.js'))});
const n=await p.evaluate(()=>{let i=0;const marks=[['header.top','0 header'],['.t4-b1','1 headline + chip'],['.t5-bg','1 headline'],['.t4-b2','2 How a round works'],['.t4-b3','3 The whole game'],['.f4-cx','3 The whole game'],['.ch','4 Meet the models'],['#record','5 Every round so far'],['#learn','6 Smart or lucky'],['#x2pSt','7 The bet'],['#get','8 Next on the card / Get / Follow'],['footer','9 Footer']];
 const visible=el=>{for(let e=el;e&&e!==document.body;e=e.parentElement){const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<0.05||/rect\(0/.test(cs.clip)||/inset\(50%/.test(cs.clipPath))return false;if(e.getAttribute('aria-hidden')==='true'&&false)return false}const r=el.getBoundingClientRect();return r.width>1&&r.height>1};
 const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let t;const seen=new Set();
 while(t=tw.nextNode()){const pe=t.parentElement;if(!t.nodeValue.trim()||!pe||seen.has(pe)||/^(SCRIPT|STYLE|NOSCRIPT|TITLE)$/.test(pe.tagName))continue;seen.add(pe);if(pe.closest('.r6-old')||!visible(pe))continue;
  // skip carousels' offscreen record cards etc: require within page horizontally
  const r=pe.getBoundingClientRect();if(r.right<0||r.left>innerWidth)continue;
  let s='0 other';for(const [q,nm] of marks)if(pe.closest(q)){s=nm;break}
  pe.setAttribute('data-uf',s+'|'+pe.tagName.toLowerCase()+'.'+(pe.getAttribute('class')||'').split(/\s+/).slice(0,2).join('.')+'|'+t.nodeValue.trim().slice(0,24)+'|'+getComputedStyle(pe).fontSize);i++}return i});
const c=await p.context().newCDPSession(p);await c.send('DOM.enable');await c.send('CSS.enable');
const {root}=await c.send('DOM.getDocument',{depth:-1,pierce:true});const {nodeIds}=await c.send('DOM.querySelectorAll',{nodeId:root.nodeId,selector:'[data-uf]'});
const agg={};
for(const id of nodeIds){let f;try{f=(await c.send('CSS.getPlatformFontsForNode',{nodeId:id})).fonts}catch(e){continue}
 const {attributes}=await c.send('DOM.getAttributes',{nodeId:id});const a=attributes[attributes.indexOf('data-uf')+1];const [sec,de,tx,fs_]=a.split('|');
 for(const ff of f){const k=ff.familyName+' || '+sec;const o=agg[k]||(agg[k]={g:0,ex:[]});o.g+=ff.glyphCount;if(o.ex.length<5&&!o.ex.some(e=>e.startsWith(de)))o.ex.push(de+' "'+tx+'" '+fs_)}}
fs.writeFileSync(`out/pf-${tag}-${W}.json`,JSON.stringify(agg,null,1));
const fams={};for(const k in agg){const [f,s]=k.split(' || ');(fams[f]=fams[f]||[]).push(s+' ['+agg[k].g+' glyphs] '+agg[k].ex.join(' ; '))}
for(const f in fams){console.log('== '+f);fams[f].sort().forEach(x=>console.log('   '+x))}console.log('nodes',n,'errs',errs.length);await b.close()})();
