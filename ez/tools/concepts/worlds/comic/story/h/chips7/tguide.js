// node tguide.js : the fifth chip's guide: IN INFERENCE, the four labs' marks in their dies, names and flags in their windows, laid on the blank painting
const {chromium}=require('playwright');const fs=require('fs');const G=require('./tgeom.json'),MK=require('./ref/tmarks.json');
const TRY=['Mistral','Qwen','Gemini','Nemotron'];
const star=(cx,cy,r,rot=0)=>{let p='';for(let i=0;i<10;i++){const a=rot+Math.PI*i/5-Math.PI/2,rr=i%2?r*.42:r;p+=(i?'L':'M')+(cx+rr*Math.cos(a)).toFixed(2)+' '+(cy+rr*Math.sin(a)).toFixed(2)}return p+'Z'};
function flag(c,x,y,w,h){let s=`<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 30 20" preserveAspectRatio="none">`;
 if(c==='US'){s+='<rect width="30" height="20" fill="#fff"/>';for(let i=0;i<7;i++)s+=`<rect y="${i*40/13}" width="30" height="${20/13}" fill="#b22234"/>`;s+='<rect width="13" height="10.77" fill="#3c3b6e"/>';for(let r=0;r<5;r++)for(let k=0;k<(r%2?4:5);k++)s+=`<path d="${star(1.4+k*2.55+(r%2)*1.27,1.3+r*2.05,.62)}" fill="#fff"/>`}
 else if(c==='CN'){s+='<rect width="30" height="20" fill="#de2910"/>'+`<path d="${star(5,5,3)}" fill="#ffde00"/>`;[[10,2,.9],[12,4,.5],[12,7,.1],[10,9,-.3]].forEach(([a,b,r])=>s+=`<path d="${star(a,b,1,r)}" fill="#ffde00"/>`)}
 else{s+='<rect width="30" height="20" fill="#003399"/>';for(let i=0;i<12;i++){const a=i*Math.PI/6;s+=`<path d="${star(15+6*Math.cos(a),10+6*Math.sin(a),1.05)}" fill="#ffcc00"/>`}}
 return s+'</svg>'}
const img='data:image/jpeg;base64,'+fs.readFileSync('img/t7-master.jpg').toString('base64');
const font='data:font/ttf;base64,'+fs.readFileSync('../world/fonts/BarlowCondensed-600.ttf').toString('base64');
let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="3760" height="1540"><style>@font-face{font-family:B;src:url(${font})}text{font-family:B;fill:#f4e9c9}</style><image href="${img}" width="3760" height="1540"/>`;
const s=G.strip;svg+=`<text x="${(s[0]+s[2])/2}" y="${s[1]+(s[3]-s[1])*.76}" font-size="${(s[3]-s[1])*.72}" text-anchor="middle" letter-spacing="14" style="fill:#ffd96a">IN INFERENCE</text>`;
TRY.forEach((t,i)=>{const d=G['die'+i],cx=(d[0]+d[2])/2,cy=(d[1]+d[3])/2,sz=(d[2]-d[0])*.5,M=MK[t];
 svg+=`<svg x="${cx-sz/2}" y="${cy-sz/2}" width="${sz}" height="${sz}" viewBox="0 0 24 24"><path d="${M.d}" ${M.fr?'fill-rule="evenodd"':''} fill="#f4e9c9" opacity=".62"/></svg>`;
 const L=G['lab'+i],h=L[3]-L[1],fh=h*.52,fw=fh*1.5,pad=h*.2;
 svg+=`<text x="${L[0]+pad}" y="${L[1]+h*.74}" font-size="${h*.62}" textLength="${Math.min((L[2]-L[0])-fw-pad*3, t.length*h*.31)}" lengthAdjust="spacingAndGlyphs">${t.toUpperCase()}</text>`+flag(M.cc,L[2]-pad-fw,L[1]+(h-fh)/2,fw,fh)});
svg+='</svg>';fs.writeFileSync('/tmp/claude-0/tguide.svg',svg);
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:3760,height:1540}});await p.setContent(`<body style="margin:0">${svg}</body>`);await p.waitForTimeout(500);
 await p.screenshot({path:'ref/try-guide.png',clip:{x:0,y:0,width:3760,height:1540}});await b.close()})();
