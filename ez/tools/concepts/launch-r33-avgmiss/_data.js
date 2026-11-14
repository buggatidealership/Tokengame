/* Round 33, the Avg miss view: shared data, computed like x2plus.js x2pProof (the same rounds, the same "% off" per call from
   callOf's third field, the average over every call made, the same order: smallest average miss first). Exposes window.__xam
   and helpers each option uses to rebuild the Avg miss body in place. A function body, run in the page after the Avg miss tab is open. */
var d=document,tk=d.querySelector('#learn .x2p-pt'),body=tk&&tk.querySelector('.pt-body');
if(!tk||!body)throw new Error('proof ticket not found');
var MK=Object.keys(MODELS).filter(function(m){return ROUNDS.some(function(r){return callOf(r,m)})}),N=ROUNDS.length;
var COL={};MK.forEach(function(m){COL[m]=m==='GROK'?'#141217':MODELS[m].c});
var S={};MK.forEach(function(m){var calls=[];
  ROUNDS.forEach(function(r,i){var c=callOf(r,m);if(!c)return;var dn=/^DOWN/.test(c[1]);calls.push({i:i,n:r.n,co:r.co,ok:(dn?-1:1)>0===(r.a>0),off:parseFloat(c[2])||0})});
  var n=calls.length,sum=0;calls.forEach(function(c){sum+=c.off});var R=calls.filter(function(c){return c.ok});
  S[m]={m:m,calls:calls,n:n,miss:n?sum/n:0,right:R.length,wrong:n-R.length,within1:R.filter(function(c){return c.off<=1}).length}});
var byMiss=MK.slice().sort(function(a,b){return S[a].miss-S[b].miss});
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
/* the page's own hot-foil text (the PROOF block's .pt-fo) */
var fo=function(t){return '<em class="pt-fo" data-t="'+esc(t)+'">'+esc(t)+'</em>'};
/* the card's own stock, for marks that need to show it (knock-outs, the walls of a punched hole) */
var pm=getComputedStyle(tk.querySelector('.pt-cd')).backgroundImage.match(/url\("data:image\/svg\+xml[^"]*"\)/);
if(pm)tk.style.setProperty('--xam-paper',pm[0]);
var pct=function(v){return v.toFixed(2)+'%'};
/* the rank, the printed logo and the name: 1 and the leader's name hot-foil stamped, 2 to 4 in ink, each name in its model's ink */
var who=function(m,i){return '<span class="xam-who" style="--c:'+COL[m]+'"><b class="xam-rk">'+(i?i+1:fo('1'))+'</b>'+logo(m)+'<span class="xam-nm">'+(i?esc(m):fo(m))+'</span></span>'};
window.__xam={tk:tk,body:body,MK:MK,N:N,COL:COL,S:S,byMiss:byMiss,esc:esc,fo:fo,pct:pct,who:who,
  put:function(cls,html){body.innerHTML='<div class="xam '+cls+'">'+html+'</div>'}};
