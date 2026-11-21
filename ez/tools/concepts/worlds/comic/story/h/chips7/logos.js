// node logos.js : renders each model's mark (MODELS[].d) and the US/CN flags as black-on-white / colour reference PNGs in ref/
const {chromium}=require('playwright');const M=require('/tmp/claude-0/models.json');
const star=(cx,cy,r,rot=0)=>{let p='';for(let i=0;i<10;i++){const a=rot+Math.PI*i/5-Math.PI/2,rr=i%2?r*.42:r;p+=(i?'L':'M')+(cx+rr*Math.cos(a)).toFixed(2)+' '+(cy+rr*Math.sin(a)).toFixed(2)}return p+'Z'};
function flag(c){let s='<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 30 20">';
 if(c==='us'){s+='<rect width="30" height="20" fill="#fff"/>';for(let i=0;i<7;i++)s+=`<rect y="${i*40/13}" width="30" height="${20/13}" fill="#b22234"/>`;s+='<rect width="13" height="10.77" fill="#3c3b6e"/>';
  for(let r=0;r<9;r++)for(let k=0;k<(r%2?5:6);k++)s+=`<path d="${star(1.08+k*2.17+(r%2)*1.08,.6+r*1.2,.42)}" fill="#fff"/>`}
 else{s+='<rect width="30" height="20" fill="#de2910"/>'+`<path d="${star(5,5,3)}" fill="#ffde00"/>`;[[10,2,.9],[12,4,.5],[12,7,.1],[10,9,-.3]].forEach(([a,b,r])=>s+=`<path d="${star(a,b,1,r)}" fill="#ffde00"/>`)}
 return s+'</svg>'}
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:900,height:900}});
 for(const k in M){const m=M[k];const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="-2 -2 28 28"><path d="${m.d}" ${m.fr?'fill-rule="evenodd"':''} fill="#000"/>${m.dot?`<path d="${m.dot}" fill="#000"/>`:''}</svg>`;
  await p.setContent(`<body style="margin:0;background:#fff">${svg}</body>`);await p.screenshot({path:`ref/logo-${k.toLowerCase()}.png`,clip:{x:0,y:0,width:800,height:800}})}
 for(const c of ['us','cn']){await p.setContent(`<body style="margin:0;background:#fff">${flag(c)}</body>`);await p.screenshot({path:`ref/flag-${c}.png`,clip:{x:0,y:0,width:900,height:600}})}
 await b.close()})();
