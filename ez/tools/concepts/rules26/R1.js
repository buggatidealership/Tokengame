// R1 the rules stub: the scorebug's "expanded state" made physical: the rules on a green stub torn off the top of the season ticket,
// joined to it at a perforation (the bet's own join), the words knocked out of the band ink in cream, sentence case; the lines
// snap in one after another as the stub scrolls into view (CSS scroll-driven animation: Safari 26+, Chromium; static elsewhere)
(function(){var R=R26,d=document,st=R.hideStrap(),ru=R.rules();var flip=d.querySelector('#standings .x2p-flip');
 var w=d.createElement('div');w.className='r26-1';w.innerHTML='<div class="r26-1b"><span class="r26-1t">The rules</span><ol>'+ru.map(function(t,i){return '<li><b>'+(i+1)+'</b><span>'+t+'</span></li>'}).join('')+'</ol></div>';
 flip.parentNode.insertBefore(w,flip);
 R.css('.r26-1{position:relative;margin:18px 0 0;filter:drop-shadow(3px 4px 0 rgba(0,0,0,.55))}'+
 '.r26-1b{position:relative;padding:12px 18px 16px;background:'+R.green()+' 0 0/240px 100% repeat,#1f7a45;color:#f8f0d9;'+
 '-webkit-mask:radial-gradient(circle at 0 0,#0000 11px,#000 11.5px) 0 0/51% 51% no-repeat,radial-gradient(circle at 100% 0,#0000 11px,#000 11.5px) 100% 0/51% 51% no-repeat,radial-gradient(circle at 0 100%,#0000 8px,#000 8.5px) 0 100%/51% 51% no-repeat,radial-gradient(circle at 100% 100%,#0000 8px,#000 8.5px) 100% 100%/51% 51% no-repeat;'+
 'mask:radial-gradient(circle at 0 0,#0000 11px,#000 11.5px) 0 0/51% 51% no-repeat,radial-gradient(circle at 100% 0,#0000 11px,#000 11.5px) 100% 0/51% 51% no-repeat,radial-gradient(circle at 0 100%,#0000 8px,#000 8.5px) 0 100%/51% 51% no-repeat,radial-gradient(circle at 100% 100%,#0000 8px,#000 8.5px) 100% 100%/51% 51% no-repeat}'+
 '.r26-1b::after{content:"";position:absolute;left:12px;right:12px;bottom:3px;height:4px;background:radial-gradient(circle,#0b0a14 1.6px,#0000 2px) 0 50%/9px 4px repeat-x;opacity:.9}'+
 '.r26-1t{display:block;font:italic 900 11px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.14em;text-transform:uppercase;color:#fdbc2a;margin:0 0 6px}'+
 '.r26-1 ol{list-style:none;margin:0;padding:0;display:grid;gap:0}'+
 '.r26-1 li{display:grid;grid-template-columns:22px 1fr;align-items:baseline;padding:6px 0;border-top:1px solid rgba(248,240,217,.22);'+
 'font:600 16px/1.2 "Saira Condensed",sans-serif;letter-spacing:.01em;text-shadow:0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(255,255,255,.12);animation:r26snap linear both;animation-timeline:view();animation-range:entry 10% entry 90%}'+
 '.r26-1 li:first-child{border-top:0}.r26-1 li:nth-child(2){animation-range:entry 25% cover 30%}.r26-1 li:nth-child(3){animation-range:entry 40% cover 38%}'+
 '.r26-1 li b{font:400 18px/1 Anton,sans-serif;color:#fdbc2a}'+
 '@keyframes r26snap{0%{opacity:0;transform:translateX(-14px)}60%{opacity:1;transform:none}100%{opacity:1;transform:none}}'+
 '#standings .x2p-flip{margin-top:0!important}')})();
