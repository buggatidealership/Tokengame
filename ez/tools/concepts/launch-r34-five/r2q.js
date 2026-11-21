/* r2 Q · Kraft, one ticket (owner, 2026-10-24: No. 5 is picked and "in training camp"; then "either Mistral, Nemotron or Gemini";
   a new entrant "should look different to... the ones already in the league"): the No. 5 ticket on unbleached kraft card instead of the
   league's cream, Qwen in its colour with its flag, "In training camp" under it; a perforated No. 6 stub on its end with the other three
   marks in plain ink and "One of these" */
var R=window.R34,m=R.next[0];
R.ticket("r34n-q",'<span class="q-main"><i class="q-k">Next challenger</i><span class="q-row">'+R.logo(m)+'<b>'+m.name+'</b>'+R.flag(m)+'</span><small>In training camp</small></span>'+
  '<span class="q-six"><i>No. 6</i><span class="q-l">'+R.next.slice(1).map(function(x){return '<span class="q-m">'+R.mark(x,"r34n-svg")+'</span>'}).join("")+'</span><em>One of these</em></span>',
  "Ticket number 5: next challenger, "+m.name+", in training camp. Ticket number 6: one of "+R.next.slice(1).map(function(x){return x.name}).join(", ")+".");
