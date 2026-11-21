/* shared by m1..m4: the story card's parts in the owner's order (2026-10-24): the headline, the story right under it, then the four
   calls, then Stock moved and Winner, the grade line last */
var H=R37.hlData(),E=R37.esc;
window.R37S={H:H,calls:function(cls){return '<div class="'+cls+'">'+H.calls.map(function(c){return '<span class="'+(c.ok?'ok':'no')+'"><b>'+E(c.n)+'</b><i>'+E(c.v)+'</i><em>'+(c.ok?'✓':'✗')+'</em></span>'}).join('')+'</div>'},
  moved:'<span class="'+(H.mvdn?'r37dn':'r37up')+'">'+E(H.moved)+'</span>'};
