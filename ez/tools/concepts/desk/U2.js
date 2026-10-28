(function(){var d=document;function go(){if(d.querySelector('.u2-rail'))return;var S=[['standings','01','Standings'],['record','02','The record'],['learn','03','The proof'],['highlights','04','MVPs'],['x2pSt','05','The bet'],['get','06','Get $EZ']];
 var g=ROUNDS.length,t=g+(typeof PENDING!=='undefined'?PENDING.length:0)+(typeof UPCOMING!=='undefined'?UPCOMING.length:0);
 var r=d.createElement('nav');r.className='u2-rail';r.setAttribute('aria-label','Sections');
 r.innerHTML='<div class="cap"><b>Season 1</b> · R1</div><div class="ln"><i></i>'+S.map(function(s,i){return '<a class="st" data-id="'+s[0]+'" style="top:'+(6+i*17.6)+'%">'+s[1]+'<span>'+s[2]+'</span></a>'}).join('')+'</div><div class="cap nv">'+g+'/'+t+' · Bet #1 NVDA</div>';
 d.body.appendChild(r);var st=[].slice.call(r.querySelectorAll('.st'));st.forEach(function(a){a.onclick=function(){var e=d.getElementById(a.dataset.id);e&&e.scrollIntoView({behavior:'smooth'})}});
 function upd(){var y=innerHeight*.4,on=null;S.forEach(function(s,i){var e=d.getElementById(s[0]);if(e&&e.getBoundingClientRect().top<y)on=i});if(on==null)on=0;st.forEach(function(a,i){a.classList.toggle('on',i===on)});r.querySelector('.ln i').style.height=(6+on*17.6)+'%'}
 addEventListener('scroll',upd,{passive:true});upd()}
 if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',function(){setTimeout(go,0)});else go();setTimeout(go,3000)})();
