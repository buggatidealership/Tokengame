/* brand colours read from each company's own logo file (same-origin media/): the most common saturated colour is the
   brand colour, the next distinct one the accent; a logo with no saturated colour (black wordmarks) falls back to ink. */
window.__bpal=async function(src){return new Promise(res=>{const im=new Image();im.onload=()=>{try{const W=64,H=Math.max(8,Math.round(64*im.height/im.width));
  const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0,W,H);const d=x.getImageData(0,0,W,H).data;const bins={};
  for(let i=0;i<d.length;i+=4){const a=d[i+3];if(a<160)continue;const r=d[i],g=d[i+1],b=d[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b),s=mx?(mx-mn)/mx:0;
    if(s<.35||mx<60)continue;const k=(r>>5)+','+(g>>5)+','+(b>>5);(bins[k]=bins[k]||{n:0,r:0,g:0,b:0});bins[k].n++;bins[k].r+=r;bins[k].g+=g;bins[k].b+=b}
  const L=Object.values(bins).sort((a,b)=>b.n-a.n).map(o=>[o.r/o.n|0,o.g/o.n|0,o.b/o.n|0,o.n]);
  const hue=([r,g,b])=>{const mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx===mn)return 0;let h=mx===r?(g-b)/(mx-mn):mx===g?2+(b-r)/(mx-mn):4+(r-g)/(mx-mn);return (h*60+360)%360};
  const a=L[0],b2=a&&L.find(o=>Math.min(Math.abs(hue(o)-hue(a)),360-Math.abs(hue(o)-hue(a)))>40&&o[3]>a[3]*.08);
  const hx=o=>o?'#'+o.slice(0,3).map(v=>v.toString(16).padStart(2,'0')).join(''):null;res({main:hx(a),acc:hx(b2)})}catch(e){res({})}};im.onerror=()=>res({});im.src=src})};
