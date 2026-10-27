/* r1038 (owner, 2026-10-27, night: the leaderboard and the proof "replicate... the first principles of the design of those tickets",
   the bet ticket's: its stock, its green and red strips and their words, its die cut and perforations, the joins, everything printed
   in its ink "like the Tesla Google Apple"; Season 1 has the bet's look, Season 2 will get a new one). The board rebuilt from the page's
   own rows with the bet ticket's own classes (.bs-nx vars, .bt-sh/.bt-hs/.bt-p/.bt-pp/.bt-r1/.bt-r2/.bt-st), so stock, strips, die,
   holes and rules are the bet's, not copies. window.__sV = 'A' one ticket + the tryouts ticket torn off it; 'B' a roll, one ticket per AI. */
(function(){var V0=window.__sV||'A',V=V0.charAt(0),d=document,ol=d.querySelector('#standings ol.lbl'),hd=d.querySelector('#standings .lbh');if(!ol)return;
 var rows=[].slice.call(ol.querySelectorAll('li.lbr')).map(function(li){var t=function(q){var e=li.querySelector(q);return e?e.textContent.trim():''};
  var sm=li.querySelector('.pc-t small'),fl=sm&&sm.querySelector('svg');
  return {rk:t('.rk b')||t('.rk').replace(/\D/g,''),nm:t('.pc-t h3'),ver:sm?(sm.querySelector('span')||sm).textContent.trim():'',flag:fl?fl.outerHTML:'',logo:(li.querySelector('.lg')||{}).innerHTML||'',
   w:t('.pn-rec .g')||t('.pn-rec b').split('-')[0],l:t('.pn-rec .r')||t('.pn-rec b').split('-')[1],hit:t('.lb-c:not(.roi)>b'),pl:t('.lb-c.roi>b')}});
 /* W-L from the record as the page prints it ("26-12") */
 rows.forEach(function(r,i){var li=ol.querySelectorAll('li.lbr')[i],w=li.querySelector('.pn-rec b.w'),l=li.querySelector('.pn-rec b.l');r.w=w?w.textContent.trim():'';r.l=l?l.textContent.trim():''});
 var n5=ol.querySelector('li.x2p-n5'),TRY=n5?[].slice.call(n5.querySelectorAll('.n5-c')).map(function(c){var f=c.querySelector('.n5-fw');return {lg:(c.querySelector('.n5-lg')||{}).innerHTML||'',nm:(c.querySelector('b')||{}).textContent||'',flag:f?f.innerHTML:''}}):[];
 var live=!!d.querySelector('#standings .hv.on');
 var lip='',star='<i></i>',num=function(s){var ink=[1,.84,.95,.88,1,.9],dy=[0,.3,-.2,.2,-.3,.1];return 'N<u>o</u> '+s.split('').map(function(c,i){return '<s style="opacity:'+ink[i]+';top:'+dy[i]+'px">'+c+'</s>'}).join('')};
 var foil=function(t){return '<span class="bt-b r38-fo"><span class="x2p-cdh"><b><em data-t="'+t+'">'+t+'</em></b></span></span>'};
 var graded=(d.querySelector('#learn .pt-bd.r .pt-ko:last-child')||{}).textContent||'';var ser=(graded.match(/\d{6}/)||['000046'])[0];
 function tk(cls,inner,head,foot,j){return '<div class="bs-nx r38-t '+cls+'"'+(V0==='A3'?' style="--px:-80px"':'')+'><div class="bt-sh"><i></i></div><div class="bt-hs"></div><div class="bt-p">'+
   '<div class="bt-pp"><i class="bt-pl"></i><i class="bt-r1"></i><i class="bt-r2"></i></div>'+inner+
   '<div class="bt-st bt-hd">'+head+'</div><div class="bt-st bt-ft">'+foot+'</div>'+(j?'<i class="bs-perf"></i>':'')+'</div></div>'}
 var cols='<div class="r38-cols"><span></span><span>'+(V0==='A3'?'Model':'AI')+'</span><span>W-L</span><span>Hit rate</span><span>P&amp;L</span></div>';
 function row(r,i){return '<div class="r38-r'+(i?'':' r38-1')+'"><span class="r38-rk"><small>No.</small><b>'+r.rk+'</b></span>'+
   '<span class="r38-ai"><span class="r38-lg">'+r.logo+'</span><span class="r38-nm">'+(i?'<b>'+r.nm+'</b>':foil(r.nm.toUpperCase()))+'<small>'+r.ver+'<span class="r38-fl">'+r.flag+'</span></small></span></span>'+
   '<span class="r38-wl"><i class="g">'+r.w+'</i>-<i class="r">'+r.l+'</i></span><span class="r38-hr">'+r.hit+'</span><span class="r38-pl '+(/^[-−]/.test(r.pl)?'dn':'up')+'">'+r.pl+'</span></div>'}
 var lv='<span class="r38-lv'+(live?' on':'')+'"><b></b>'+(live?'Live':'Off air')+'</span>';
 var tryT=tk('r38-try','<div class="r38-in r38-tin"><span class="r38-rk"><small>No. 5</small><b class="rd">?</b></span><span class="r38-tl"><b>Models</b><b class="rd">in tryouts</b></span>'+
   TRY.map(function(c){return '<span class="r38-tc"><span class="r38-lg">'+c.lg+'</span><b>'+c.nm.toUpperCase()+'</b><span class="r38-fl">'+c.flag+'</span></span>'}).join('')+'</div>',
   '<span class="r38-sl">No. 5</span><span class="r38-sb"><span>'+star+'Next challengers'+star+'</span></span>',
   V0==='A3'?'<span class="r38-ko">Not signed yet</span><span class="bt-no">'+num('000005')+'</span>':'<span class="r38-sl"></span><span class="r38-sb sp"><span>Not signed yet</span><span class="bt-no">'+num('000005')+'</span></span>',1);
 var h='';
 var ant='<span class="r38-air'+(live?' on':'')+'"><svg viewBox="0 0 20 22" aria-hidden="true"><path class="w" d="M4.2 3.6a8 8 0 0 0 0 11.3M15.8 3.6a8 8 0 0 1 0 11.3M6.9 6.3a4.2 4.2 0 0 0 0 5.9M13.1 6.3a4.2 4.2 0 0 1 0 5.9"/><path class="m" d="M10 9.3 6.6 21.2M10 9.3l3.4 11.9M7.6 17.6h4.8M8.6 14h2.8"/><circle class="d" cx="10" cy="9.3" r="2.1"/></svg><b>'+(live?'Live':'Off air')+'</b></span>';
 if(V==='A'){h=tk('r38-board','<div class="r38-in">'+cols+rows.map(row).join('')+'</div>',
    V0==='A3'?'<span class="r38-ko r38-s1">Season 1</span>'+ant:'<span class="r38-sl">Season 1</span><span class="r38-sb sp"><span>'+star+'$EZ main event'+star+'</span>'+lv+'</span>',
    '<span class="r38-sl">Admit one</span><span class="r38-sb sp"><span>Ranked by P&amp;L</span><span class="bt-no">'+num(ser)+'</span></span>')+tryT}
 else{h=rows.map(function(r,i){return tk('r38-one'+(i?'':' r38-first'),'<div class="r38-in">'+row(r,i)+'</div>',
    i?'<span class="r38-sl">Season 1</span><span class="r38-sb r38-cl"><span></span><span>W-L</span><span>Hit rate</span><span>P&amp;L</span></span>':'<span class="r38-sl">Season 1</span><span class="r38-sb r38-cl"><span>'+lv+'</span><span>W-L</span><span>Hit rate</span><span>P&amp;L</span></span>',
    '<span class="r38-sl">Admit one</span><span class="r38-sb sp"><span>'+(i?'':star+'$EZ main event'+star)+'</span><span class="bt-no">'+num('00000'+r.rk)+'</span></span>',i>0)}).join('')+tryT}
 var box=d.createElement('div');box.className='r38-roll r38-'+V0;box.innerHTML=h;
 var lbx=ol.closest('.lbx')||ol.parentNode;lbx.parentNode.insertBefore(box,lbx);lbx.style.display='none';
 /* each label over its figure's ink (as the live Season 1 bar does): A from the first row, B from its own ticket's row */
 function align(){var ink=function(e){var g=d.createRange();g.selectNodeContents(e);return g.getBoundingClientRect()},map=[['W-L','.r38-wl'],['Hit rate','.r38-hr'],['P&L','.r38-pl']];
  [].slice.call(box.querySelectorAll('.r38-t')).forEach(function(t){var row=t.querySelector('.r38-r')||box.querySelector('.r38-r');
   [].slice.call(t.querySelectorAll('.r38-cols span,.bt-st .r38-cl>span')).forEach(function(l){var m=map.filter(function(x){return l.textContent.trim()===x[0]})[0];if(!m)return;l.style.transform='';
    var f=ink(row.querySelector(m[1])),a=ink(l);l.style.transform='translateX('+((f.left+f.width/2)-(a.left+a.width/2)).toFixed(2)+'px)'})})}
 /* A2/B2 (owner, 2026-10-27, night: between the tickets "the red section and the green section should essentially just be the same
    color as the background of the main part of the ticket"; only the top keeps Season 1 and its green band, the foot its red one):
    the strips between tickets are taken out of each ticket's own paper layer (the bet's green, red and their squeeze edges set to
    none, layer by layer, so the stock, fibres and grain stay exactly the bet's), and their words go with them */
 if(V0.length>1){var T=[].slice.call(box.querySelectorAll('.r38-t'));
  function layers(v){var o=[],dp=0,st=0;for(var i=0;i<v.length;i++){var c=v[i];if(c==='(')dp++;else if(c===')')dp--;else if(c===','&&!dp){o.push(v.slice(st,i).trim());st=i+1}}o.push(v.slice(st).trim());return o}
  T.forEach(function(t,i){var pp=t.querySelector('.bt-pp'),L=layers(getComputedStyle(pp).backgroundImage);if(L.length<27||!/31, 122, 69/.test(L[19])||!/200, 55, 42/.test(L[21])){window.__r38err='layers '+L.length;return}
   L[24]='none';L[25]='none'; /* the bet's sunburst sits behind its label column; on the board it only lightened the rank column */
   var top=i>0,bot=i<T.length-1;if(top){L[17]='none';L[18]='none';L[19]='none';var h=t.querySelector('.bt-hd');if(h)h.remove()}
   if(bot){L[20]='none';L[21]='none';var f=t.querySelector('.bt-ft');if(f)f.remove()}pp.style.backgroundImage=L.join(', ')});
  if(V0==='B2')[].slice.call(box.querySelectorAll('.r38-t')).forEach(function(t,i){if(i){var c=t.querySelector('.r38-cols');if(c)c.remove()}})}
 if(V0==='A3'){var pp0=box.querySelector('.bt-pp'),L0=pp0?(function(v){var o=[],dp=0,st=0;for(var i=0;i<v.length;i++){var c=v[i];if(c==='(')dp++;else if(c===')')dp--;else if(c===','&&!dp){o.push(v.slice(st,i).trim());st=i+1}}o.push(v.slice(st).trim());return o})(getComputedStyle(pp0).backgroundImage):[];
  /* the words in the strips knocked out of the ink: the ticket's own stock (its grain and fibres, read from its paper layer) shows through */
  if(L0.length>23)[].slice.call(box.querySelectorAll('.r38-ko,.r38-air b')).forEach(function(e){e.style.backgroundImage=L0[23]+','+L0[22];e.style.backgroundSize='200px 200px,300px 200px';e.style.backgroundColor='#ece1c4'})}
 align();if(d.fonts)d.fonts.ready.then(align);addEventListener('resize',align);
})();
