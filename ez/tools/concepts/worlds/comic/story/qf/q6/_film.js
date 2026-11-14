/* qf film grabber: crops regions of the round's own film into canvases.
   __qfFilm(n).grab(t,[sx,sy,sw,sh],w,h,fx) -> Promise<canvas>; fx(ImageData) may rewrite pixels.
   Uses stills handed in as window.__qfFrames[t] (data URLs made by ffmpeg in the runner, kept in the scratchpad)
   because headless Chromium does not repaint a paused video after a seek; otherwise it seeks the film itself. */
(function(){
const cache={},imgs={};
const still=t=>{const k=String(t),F=window.__qfFrames;if(!F||!F[k])return null;
  return imgs[k]||(imgs[k]=new Promise(res=>{const i=new Image();i.onload=()=>res(i);i.src=F[k]}))};
window.__qfFilm=function(n){
  if(cache[n])return cache[n];
  const r=ROUNDS.find(x=>+x.n===+n);const base='media/'+(r.film||(FILMS[n]&&FILMS[n].f));
  let v=null,ready=null;
  const vid=()=>{if(v)return ready;v=document.createElement('video');v.muted=true;v.preload='auto';v.playsInline=true;v.src=base+'.webm';
    ready=new Promise(res=>{v.onloadeddata=()=>res();v.onerror=()=>{v.onerror=null;v.src=base+'.mp4';v.load()}});return ready};
  let q=Promise.resolve();
  const paint=(src,c,w,h,fx)=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;const x=cv.getContext('2d',{willReadFrequently:!!fx});
    x.drawImage(src,c[0],c[1],c[2],c[3],0,0,w,h);if(fx){const d=x.getImageData(0,0,w,h);fx(d);x.putImageData(d,0,0)}return cv};
  const grab=(t,c,w,h,fx)=>{const s=still(t);if(s)return s.then(i=>paint(i,c,w,h,fx));
    const p=q.then(vid).then(()=>new Promise(res=>{const done=()=>{v.onseeked=null;res(paint(v,c,w,h,fx))};
      if(Math.abs(v.currentTime-t)<.001)done();else{v.onseeked=done;v.currentTime=t}}));q=p.catch(()=>{});return p};
  return cache[n]={grab};
};
})();
