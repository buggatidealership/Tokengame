// Time-remaps vid5's pure R(t) into a cut. Loaded after vid5's own script; window.CUT holds the segments [dur, from, to, kind].
(function(){var R0=window.R,S=window.CUT,ov=document.createElement('div');ov.id='cutov';
 ov.style.cssText='position:absolute;left:0;right:0;top:120px;text-align:center;z-index:90;font:700 34px/1 var(--mono);letter-spacing:.16em;text-transform:uppercase;color:#fdbc2a;opacity:0;text-shadow:0 4px 30px rgba(0,0,0,.8)';
 ov.textContent='◂◂  24 hours earlier';document.getElementById('st').appendChild(ov);
 window.CUTDUR=S.reduce(function(a,s){return a+s[0]},0);
 window.R=function(T){var a=0,st=document.getElementById('st');for(var i=0;i<S.length;i++){var s=S[i];if(T<a+s[0]||i===S.length-1){var k=Math.min(1,Math.max(0,(T-a)/s[0])),rw=s[3]==='rewind';
   var pr=R0(s[1]+(s[2]-s[1])*(rw?k*k*(3-2*k):k));ov.style.opacity=rw?Math.min(1,Math.sin(Math.PI*k)*2.2):0;
   st.style.filter=rw?'saturate(.4) contrast(1.15) blur('+(Math.sin(Math.PI*k)*2.5).toFixed(1)+'px)':'';return pr}a+=s[0]}};
 window.R(0)})();
