// R3 conditions of admission: the rules printed inside the season ticket, under its green band and above the columns, the way a real
// ticket prints its terms: a red "Conditions" label, three numbered lines in ink, sentence case, a printed double rule under them;
// the strap is gone, so the head runs straight into the ticket
(function(){var R=R26,d=document,st=R.hideStrap(),ru=R.rules();var inn=d.querySelector('#standings .stx-board .stx-in');
 var w=d.createElement('div');w.className='r26-3';w.innerHTML='<span class="r26-3t">Conditions of admission</span><ol>'+ru.map(function(t,i){return '<li><b>'+(i+1)+'.</b> '+t+'</li>'}).join('')+'</ol>';
 inn.insertBefore(w,inn.firstChild);
 R.css('.r26-3{margin:6px 16px 8px;padding:0 0 9px;border-bottom:3px double rgba(20,18,23,.55);color:'+R.INK+'}'+
 '.r26-3t{display:block;font:italic 900 10px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.16em;text-transform:uppercase;color:#b3261e;margin:2px 0 6px;text-shadow:'+R.LIP+'}'+
 '.r26-3 ol{list-style:none;margin:0;padding:0}.r26-3 li{font:600 15px/1.3 "Saira Condensed",sans-serif;text-shadow:'+R.LIP+'}'+
 '.r26-3 li b{font:400 15px/1 Anton,sans-serif;color:#b3261e;margin-right:2px}'+
 '#standings .x2p-flip{margin-top:14px!important}');
 // the ticket grows to hold them (its paper is sized by SEASONTIX on a width change: nudge it)
 setTimeout(function(){dispatchEvent(new Event('resize'))},50)})();
