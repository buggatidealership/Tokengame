// R2 three rule stubs: each rule its own small cream ticket (a red-ink numeral, the rule in ink, sentence case), the three joined at
// perforations and sitting on the season ticket's top edge, so the rules are the stubs you tear off before you get in
(function(){var R=R26,d=document,st=R.hideStrap(),ru=R.rules();var flip=d.querySelector('#standings .x2p-flip');
 var w=d.createElement('div');w.className='r26-2';w.innerHTML=ru.map(function(t,i){return '<div class="r26-2s"><b>'+(i+1)+'</b><span>'+t+'</span></div>'}).join('');
 flip.parentNode.insertBefore(w,flip);
 R.css('.r26-2{display:grid;grid-template-columns:repeat(3,1fr);margin:18px 0 0;filter:drop-shadow(3px 4px 0 rgba(0,0,0,.55))}'+
 '.r26-2s{position:relative;padding:10px 10px 12px 12px;background:'+R.grain()+' 0 0/200px 200px,#f8f0d9;background-blend-mode:multiply;color:'+R.INK+';min-height:86px;'+
 '-webkit-mask:radial-gradient(circle at 0 0,#0000 7px,#000 7.5px) 0 0/51% 51% no-repeat,radial-gradient(circle at 100% 0,#0000 7px,#000 7.5px) 100% 0/51% 51% no-repeat,radial-gradient(circle at 0 100%,#0000 7px,#000 7.5px) 0 100%/51% 51% no-repeat,radial-gradient(circle at 100% 100%,#0000 7px,#000 7.5px) 100% 100%/51% 51% no-repeat;'+
 'mask:radial-gradient(circle at 0 0,#0000 7px,#000 7.5px) 0 0/51% 51% no-repeat,radial-gradient(circle at 100% 0,#0000 7px,#000 7.5px) 100% 0/51% 51% no-repeat,radial-gradient(circle at 0 100%,#0000 7px,#000 7.5px) 0 100%/51% 51% no-repeat,radial-gradient(circle at 100% 100%,#0000 7px,#000 7.5px) 100% 100%/51% 51% no-repeat}'+
 '.r26-2s+.r26-2s::before{content:"";position:absolute;left:-2px;top:10px;bottom:10px;width:4px;background:radial-gradient(circle,#0b0a14 1.5px,#0000 1.9px) 50% 0/4px 8px repeat-y}'+
 '.r26-2s b{display:block;font:400 22px/1 Anton,sans-serif;color:#b3261e;text-shadow:'+R.LIP+';margin:0 0 5px}'+
 '.r26-2s span{display:block;font:600 14px/1.18 "Saira Condensed",sans-serif;text-shadow:'+R.LIP+'}'+
 '#standings .x2p-flip{margin-top:-2px!important}')})();
