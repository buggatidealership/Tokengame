/* W1 "The lie detector": smart or lucky is a question of truth, so the machine that tests truth draws it. The chart paper is black
   smoked paper (pens scratch it, as on a kymograph), seen head-on; four pens write each AI's hit rate, the coin flip a red dashed
   line at 50%. The pens sit at the right of the paper, so the names and figures are typed as the chart's key under it (W-L and the
   figure; in P&L the same key is the table). Console take: the brass plates under the toggles are the P&L windows, the knob turns
   between hit rate and P&L (a disc of the painting itself rotates; it twitches until first used). Desk take (top-down): the switch
   is the chart paper's own printed header. */
const POLI={GPT:'#3fe0a0',KIMI:'#6aa9ff',CLAUDE:'#ff9a62',GROK:'#f1ece0'};
const polyM={font:'"Courier Prime",monospace',gold:'#ffd21f',ink:POLI,dim:'#a9a294',txt:'#ece5d3',grid:'#3b3833',gridDash:'1 3',baseC:'#ff5a4e',up:'#46e88a',dn:'#ff5e52',lw:1.8,cap:1,tabHead:'Subject',tabRule:1,
  base:(x0,x1,y)=>`<path d="M${x0.toFixed(1)} ${y.toFixed(1)}H${x1.toFixed(1)}" stroke="#ff5a4e" stroke-width="1.4" stroke-dasharray="6 4" fill="none" shape-rendering="crispEdges"/>`};
window.S3FRT=(id,src,p3,p16)=>S3World({id,kind:'frt',img:S3IMG,mat:polyM,alwaysTable:1,
  phone:Object.assign({src:src+'-3x4.jpg',iw:768,ih:1024,crop:[96,296,724,934],ctl:'plates',fk:.05,ins:.02,pfs:19},p3),
  wide:Object.assign({src:src+'w-16x9.jpg',iw:1280,ih:720,crop:[290,40,990,720],maxW:900,ctl:'plates',fk:.036,ins:.015,pfs:11},p16)});
window.S3TOP=(id,src,p3,p16)=>S3World({id,kind:'top',img:S3IMG,mat:polyM,alwaysTable:1,
  phone:Object.assign({src:src+'-3x4.jpg',iw:768,ih:1024,crop:[40,200,768,860],ctl:'header',fk:.05,ins:.02},p3),
  wide:Object.assign({src:src+'w-16x9.jpg',iw:1280,ih:720,crop:[150,0,1280,720],maxW:1180,ctl:'header',fk:.03,ins:.015},p16)});
