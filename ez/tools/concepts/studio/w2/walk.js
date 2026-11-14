/* The phone walk-through: a fixed script of scrolls and taps, driven by window.R(t). Times in seconds. */
(function(){
var HDR=64;
function ease(p){p=Math.max(0,Math.min(1,p));return p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2}
function el(sel,i){return document.querySelectorAll(sel)[i||0]}
function headY(txt){var h=[].slice.call(document.querySelectorAll(".sh h2,.dh,.ph1")).filter(function(x){return x.textContent.indexOf(txt)===0})[0];return h?h.getBoundingClientRect().top+scrollY-HDR-6:0}
function nm(sel,txt){return [].slice.call(document.querySelectorAll(sel)).filter(function(x){return x.textContent.indexOf(txt)>-1})[0]}
function rowY(sel,txt,off){var r=nm(sel,txt);return r?r.getBoundingClientRect().top+scrollY-off:0}
var tabs=function(n){return el(".tabbar a",n)};
/* scroll moves: [start, end, target y] */
var S=[[2.8,4.4,function(){return headY("Live now")}],[5.0,6.6,function(){return headY("Tonight")}],[7.2,8.8,function(){return headY("Last matchday")}],
       [11.8,13.2,function(){return headY("Match timeline")}],[14.0,15.4,function(){return headY("Player of the match")}],
       [21.2,22.6,function(){return headY("Season so far")}],
       [26.0,27.6,function(){return headY("Tomorrow")}],[28.2,29.8,function(){return rowY(".fr","NVIDIA",300)}]];
/* taps: [time, element getter, route or action] */
var TAP=[[9.6,function(){return nm(".rr","DraftKings")},"match/99"],[16.4,function(){return tabs(3)},"table"],[19.4,function(){return nm(".lt-r","Grok")},"team/GROK"],[24.0,function(){return tabs(1)},"fixtures"],
         [25.2,function(){return el('[data-hlo="1"]')},function(){el('[data-hlo="1"]').click()}]];
var END=30.6,cur={i:-1,from:0,to:0},done={};
window.WALK=function(t){
  TAP.forEach(function(k,i){if(t>=k[0]&&!done[i]){done[i]=1;if(typeof k[2]==="function")k[2]();else APP.go(k[2]);cur={i:-1,from:0,to:0}}});
  var tp=TAP.filter(function(k){return t>k[0]-.5&&t<k[0]+.2})[0];
  if(tp&&t<tp[0]){var e=tp[1]();if(e){var r=e.getBoundingClientRect();tp.x=r.left+Math.min(r.width/2,150);tp.y=r.top+r.height/2}}
  if(tp)APP.touch(tp.x||0,tp.y||0,t<tp[0]?Math.min(1,(t-(tp[0]-.5))/.18):Math.max(0,1-(t-tp[0])/.2));else APP.touch(0,0,0);
  for(var i=0;i<S.length;i++){var s=S[i];if(t>=s[0]&&t<=s[1]+.001){if(cur.i!==i){cur={i:i,from:scrollY,to:Math.max(0,Math.min(s[2](),document.documentElement.scrollHeight-innerHeight))}}
    window.scrollTo(0,cur.from+(cur.to-cur.from)*ease((t-s[0])/(s[1]-s[0])));break}}
  APP.end(ease((t-END)/.6));
};
})();
