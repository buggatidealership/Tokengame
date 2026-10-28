(function(){const X='<svg viewBox="0 0 24 24"><path fill="#1d1a1e" d="M18.9 2H22l-7.2 8.2L23 22h-6.6l-5.1-6.7L5.4 22H2.3l7.7-8.8L2 2h6.7l4.6 6.1zM17.7 20.1h1.7L7.4 3.8H5.6z"/></svg>';
function add(){document.querySelectorAll('.xc .xc-dt').forEach(l=>{const d=l.firstElementChild;if(!d||d.classList.contains('xc-xpd'))return;d.classList.add('xc-xpd');d.querySelector('small').innerHTML='Filed on '+X;d.querySelector('b').insertAdjacentHTML('beforeend','<i>↗</i>')})}
add();setInterval(add,500)})();
