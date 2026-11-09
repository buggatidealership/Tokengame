/* The phone walk-through: a fixed script of scrolls and taps, driven by window.R(t). Times in seconds. */
(function(){
var HDR=64;
function ease(p){p=Math.max(0,Math.min(1,p));return p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2}
function el(sel,i){return document.querySelectorAll(sel)[i||0]}
function headY(txt){var h=[].slice.call(document.querySelectorAll(".sh h2,.dh,.ph1")).filter(function(x){return x.textContent.indexOf(txt)===0})[0];return h?h.getBoundingClientRect().top+scrollY-HDR-6:0}
function nm(sel,txt){return [].slice.call(document.querySelectorAll(sel)).filter(function(x){return x.textContent.indexOf(txt)>-1})[0]}
var tabs=function(n){return el(".tabbar a",n)};
/* scroll moves: [start, end, target y] ; taps: [time, element getter, route] */
var S=[[2.0,3.8,function(){return headY("Live now")}],[4.6,6.2,function(){return headY("Tonight")}],[7.0,8.6,function(){return headY("Table")}],
       [11.8,13.2,function(){return headY("Match timeline")}],[14.2,15.6,function(){return headY("Player of the match")}],
       [20.6,22.0,function(){return headY("Season so far")}],
       [25.6,27.2,function(){return headY("Tomorrow")}],[27.9,29.6,function(){var r=nm(".fr","NVIDIA");return r?r.getBoundingClientRect().top+scrollY-260:0}]];
var TAP=[[9.6,function(){return nm(".rr","DraftKings")},"match/99"],[16.8,function(){return tabs(3)},"table"],[18.6,function(){return nm(".lt-r","Grok")},"team/GROK"],[23.8,function(){return tabs(1)},"fixtures"]];
var cur={i:-1,from:0,to:0},done={};
window.WALK=function(t){
  TAP.forEach(function(k,i){if(t>=k[0]&&!done[i]){done[i]=1;APP.go(k[2]);cur={i:-1,from:0,to:0}}});
  /* touch: shown 0.5 s before a tap, on the element, gone 0.2 s after */
  var tp=TAP.filter(function(k){return t>k[0]-.5&&t<k[0]+.2})[0];
  if(tp&&t<tp[0]){var e=tp[1]();if(e){var r=e.getBoundingClientRect();tp.x=r.left+Math.min(r.width/2,150);tp.y=r.top+r.height/2}}
  if(tp)APP.touch(tp.x||0,tp.y||0,t<tp[0]?Math.min(1,(t-(tp[0]-.5))/.18):Math.max(0,1-(t-tp[0])/.2));else APP.touch(0,0,0);
  for(var i=0;i<S.length;i++){var s=S[i];if(t>=s[0]&&t<=s[1]+.001){if(cur.i!==i){cur={i:i,from:scrollY,to:Math.max(0,Math.min(s[2](),document.documentElement.scrollHeight-innerHeight))}}
    window.scrollTo(0,cur.from+(cur.to-cur.from)*ease((t-s[0])/(s[1]-s[0])));break}}
};
})();
