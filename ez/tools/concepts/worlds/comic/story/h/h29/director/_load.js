// H29 director · loads the built X2+ page (v46) with all three parts and the director's layer over it, in page order.
// load(page,{dir:true|false, port}) -> errors[]. Parts: top (top.css/js), middle (meet12 D patched as mid/shot.js does, meet.css/js,
// front.css/js = Every round so far take L, live.js), end (load.json: sol9 A4 kit, end.css/js), then director/dir.css + dir.js.
const fs=require('fs'),path=require('path');
const H29=path.join(__dirname,'..'),H=path.join(H29,'..');
const rd=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
async function load(p,o={}){const PORT=o.port||process.env.PORT||9833,er=o.er||[];
 await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__t4&&document.documentElement.classList.contains('m11-ready'),null,{timeout:150000});
 await p.waitForFunction(()=>window.P5&&P5.cur&&document.querySelector('#x2pSt.hb-on'),null,{timeout:90000}).catch(()=>er.push('no P5'));
 await p.waitForTimeout(600);
 if(o.parts===false)return er;
 const gut=rd(path.join(H29,'_gutter.css'))||rd(path.join(H29,'mid/_gutter-ph.css'));
 /* end first (it defines window.H29_NEXT, the one "next" source the top's pill reads) */
 const L=JSON.parse(rd(path.join(H29,'end/load.json')));const E=f=>rd(path.join(H29,'end',f));
 await p.addStyleTag({content:gut+'\n'+L.css.map(E).join('\n')});
 await p.addScriptTag({content:L.js.map(E).join('\n;')});
 await p.waitForFunction(()=>document.documentElement.classList.contains('h29e-ready')||window.__h29eErr,null,{timeout:60000}).catch(()=>er.push('no h29e'));
 /* top */
 await p.addStyleTag({content:rd(path.join(H29,'top/top.css'))});await p.addScriptTag({content:rd(path.join(H29,'top/top.js'))});
 await p.waitForFunction(()=>window.__h29t||window.__h29tErr,null,{timeout:20000}).catch(()=>er.push('no h29t'));
 /* middle: meet12 D, patched as mid/shot.js */
 const M12=path.join(H,'meet12');
 let m12=rd(path.join(M12,'m12.js')).replace(`tw(V,vs,"'Barlow Condensed'")`,'tw(V,vs)').replace(`tw(V,vs,"'Barlow Condensed'")`,'tw(V,vs)').replace('if(tot>max){const k=max/tot;fs*=k;vs*=k}','if(tot>max){const k=max/tot;fs*=k;vs*=k}vs=Math.max(vs,12);');
 await p.evaluate(()=>{window.__M12T='d';window.__M10T=-1});
 await p.addStyleTag({content:rd(path.join(M12,'m12.css'))+rd(path.join(H29,'mid/meet.css'))});
 await p.addScriptTag({content:m12});await p.addScriptTag({content:rd(path.join(H29,'mid/meet.js'))});
 await p.waitForFunction(()=>document.documentElement.classList.contains('h29m-ready')||window.__h29mErr||window.__m12Err,null,{timeout:30000}).catch(()=>er.push('no h29m'));
 await p.addStyleTag({content:rd(path.join(H29,'mid/front.css'))});await p.addScriptTag({content:rd(path.join(H29,'mid/front.js'))});
 await p.addScriptTag({content:rd(path.join(H29,'mid/live.js'))});
 /* the director */
 if(o.dir!==false){await p.addStyleTag({content:rd(path.join(__dirname,'dir.css'))});
  if(o.after)await p.evaluate(o.after);
  await p.addScriptTag({content:rd(path.join(__dirname,'dir.js'))});
  await p.waitForFunction(()=>window.__h29d||window.__h29dErr,null,{timeout:30000}).catch(()=>er.push('no h29d'));}
 await p.evaluate(()=>document.fonts.ready);
 return er}
module.exports={load,rd,H29};
