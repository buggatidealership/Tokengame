// R5 rules with receipts: the owner's chosen strap (the Receipts look), but every rule carries its live evidence from the data,
// so each claim is checked where it is made: the trades graded so far, the last close that graded them, and the AI that makes the
// call right now with its P&L (a prediction-market card's claim + live number, the page's own "Don't trust us. Verify.")
(function(){var R=R26,d=d=document,st=d.querySelector('#standings .x2p-strap'),ls=st.querySelectorAll('li'),E=R.evid(),L=R.leader();
 var last=E.last,dt=last&&last.resolves?(function(){var p=String(last.resolves).split('/');return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+p[0]-1]+' '+(+p[1])})():'';
 var ev=[E.trades+' trades graded so far',E.rounds+' rounds graded · last close '+dt,(L.name||'')+' makes the call now · '+(L.pl||'')];
 [].forEach.call(ls,function(l,i){var t=l.textContent.trim();l.innerHTML='<span class="r26-5r">'+t+'</span><span class="r26-5e">'+ev[i]+'</span>'});
 R.css('#standings .x2p-strap .x2o-ul>li{text-transform:none!important;font-size:15px!important;display:grid!important;gap:1px;padding:5px 0 6px!important}'+
 '.r26-5r{display:block}.r26-5e{display:block;font:400 12.5px/1.15 Anton,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#fdbc2a}')})();
