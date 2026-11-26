const fs=require('fs');const tag=process.argv[2];const d=require('./out/'+tag+'/m.json');const sal=require('./out/'+tag+'/sal.json');
const SECS=JSON.parse(process.argv[3]);
const out=[];
for(const m of d.res){const seen=new Set();let w=0;const fam={};
 for(const t of m.texts){const k=t.t+'|'+Math.round(t.x/6)+'|'+Math.round(t.y/6);if(seen.has(k))continue;seen.add(k);const n=t.t.split(' ').filter(x=>/[A-Za-z0-9$%]/.test(x)).length*t.w/Math.max(1e-9,t.t.split(' ').filter(x=>/[A-Za-z0-9$%]/.test(x)).length);w+=t.w;fam[t.f]=(fam[t.f]||0)+t.w}
 const top=m.y+d.hdr.h,bot=m.y+d.H;const secs=SECS.filter(s=>s[1]<bot&&s[2]>top).map(s=>s[0]);
 const famsAll=Object.keys(m.fams);
 const cc=[];const grad=new Set();const rgb=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16));
 for(const t of m.texts){if(t.w<0.3)continue;const c=t.col;if(c[0]==='#'){const v=rgb(c);if(!cc.some(g=>Math.hypot(...g.map((x,i)=>x-v[i]))<30))cc.push(v)}else{grad.add(c.replace(/url\("#|"\)/g,'').replace(/B?\d+$/,''))}}
 var colC=cc.length,gradC=[...grad];
 out.push({k:m.k,y:m.y,secs,words:Math.round(w),wordsRaw:m.words-m.hdrWords,hdrWords:m.hdrWords,fams:Object.entries(fam).filter(([k,v])=>v>=0.5).map(([k])=>k),famsAll,cols:m.cols.length,colC,gradC,clip:m.clip,moving:m.moving,mvd:m.mvd.map(x=>x.n+(x.pe||'')+':'+x.cls.split(' ')[0]),vids:m.vids,frames:m.framesD,sal:sal[m.k]})}
fs.writeFileSync('out/'+tag+'/final.json',JSON.stringify(out,null,1));
for(const o of out)console.log(`S${o.k} y${o.y} [${o.secs.join(',')}] words ${o.words} (raw ${o.wordsRaw}, +hdr ${o.hdrWords}) fams ${o.fams.length}:${o.fams.join('/')} | all ${o.famsAll.length} | cols all ${o.cols} content ${o.colC}+${o.gradC.join('/')} | moving ${o.moving+o.vids.length} (${o.mvd.join(', ')}${o.vids.length?' + '+o.vids.length+' video':''}) | frames ${o.frames} | sal ${o.sal.x},${o.sal.y}`);
