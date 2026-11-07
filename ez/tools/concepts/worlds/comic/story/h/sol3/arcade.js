/* A "Insert coin": the arcade. Meet the models was fight night; next door the gambling starts: one upright cabinet, the chart is the
   game on its CRT, seen head-on. The coin flip is a row of coins at 50% (the arcade's own currency, the thing to beat). The game's own
   menu on the screen is the switch (1P Hit rate / 2P P&L, then Season 7D 24H); the item not yet tried blinks like "PRESS START"
   until it is used. P&L: the high-score table under the chart (rank, name, W-L, P&L). One cabinet painting per style. */
const ARCI={GPT:'#35e39a',KIMI:'#5fa8ff',CLAUDE:'#ff8f52',GROK:'#f3efe4'};
const arcM={font:'VT323,monospace',gold:'#ffd21f',ink:ARCI,dim:'#93a6c9',txt:'#e9eef8',grid:'#253150',gridDash:'2 4',baseC:'#ffd21f',up:'#46f08f',dn:'#ff5e52',lw:2,cap:1,rankNo:1,tabHead:'High scores',tabRule:1,
  base:(x0,x1,y,fs)=>{let s='';const r=Math.max(2.6,fs*.2),n=Math.floor((x1-x0)/(r*4.2));for(let i=0;i<=n;i++){const x=x0+i*(x1-x0)/n;s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#04070e" stroke="#ffd21f" stroke-width="1.3"/><path d="M${(x-r*.35).toFixed(1)} ${y.toFixed(1)}h${(r*.7).toFixed(1)}" stroke="#ffd21f" stroke-width="1"/>`}return s}};
window.S3ARC=(id,src,surf3,surf16)=>S3World({id,kind:'arc',img:S3IMG,mat:arcM,
  phone:{src:src+'-3x4.jpg',iw:768,ih:1024,crop:[surf3[0]-34,surf3[1]-40,surf3[2]+34,surf3[3]+150],surf:surf3,ctl:'menu',fk:.047,ins:.035},
  wide:{src:src+'-16x9.jpg',iw:1280,ih:720,crop:[0,0,1280,720],surf:surf16,ctl:'menu',fk:.034,fmax:24,ins:.035}});
