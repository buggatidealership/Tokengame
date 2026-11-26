(()=>{const l=document.createElement('link');l.rel='stylesheet';
// each panel's rim takes the ground's colour at its height on the page: green in the top 40%, gold in the middle, red below
const H=document.documentElement.scrollHeight,out=[];document.querySelectorAll('.pn').forEach(p=>{if(!p.offsetParent)return;const r=p.getBoundingClientRect(),y=(r.top+scrollY+r.height/2)/H;
 p.style.setProperty('--rim',y<.4?'rgba(3,200,112,.55)':y<.62?'rgba(253,188,42,.45)':'rgba(255,58,49,.55)');p.style.setProperty('--rimg',y<.4?'rgba(3,200,112,.35)':y<.62?'rgba(253,188,42,.2)':'rgba(255,58,49,.32)');out.push(y.toFixed(2))});window.__rims=out})();
