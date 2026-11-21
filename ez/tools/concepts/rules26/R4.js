// R4 the quiet line: no box ("smarter reveal beats more information"; the type carries the brand): three cream lines under the head,
// sentence case, each led by one of the logo's slashes (green, cream, red), then the ticket straight after
(function(){var R=R26,d=document,st=R.hideStrap(),ru=R.rules();var flip=d.querySelector('#standings .x2p-flip');
 var w=d.createElement('ul');w.className='r26-4';w.innerHTML=ru.map(function(t,i){return '<li><i class="s'+i+'"></i>'+t+'</li>'}).join('');
 flip.parentNode.insertBefore(w,flip);
 R.css('.r26-4{list-style:none;margin:14px 0 18px;padding:0;display:grid;gap:7px}'+
 '.r26-4 li{display:grid;grid-template-columns:16px 1fr;align-items:center;font:600 17px/1.2 "Saira Condensed",sans-serif;color:#f8f0d9;letter-spacing:.01em}'+
 '.r26-4 i{width:5px;height:15px;transform:skewX(-14deg);border-radius:1px}.r26-4 i.s0{background:#03c870}.r26-4 i.s1{background:#f8f0d9}.r26-4 i.s2{background:#ff3a31}'+
 '#standings .x2p-flip{margin-top:0!important}')})();
