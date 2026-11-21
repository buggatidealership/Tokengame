/* r2 D · Next up: a No. 5 row with the four next AIs rubber-stamped in their own colours, each at its own angle with its name,
   worn like a stamp pressed by hand (the GRADED stamp's ink), the words where a name goes */
var R=window.R34;
R.ticket("r34n-d",'<span class="r34n-b-ai r34n-d-ai"><span class="r34n-hd">Next up</span><span class="r34n-sm">31% of creator fees</span></span>'+
  '<span class="r34n-d-four">'+R.next.map(function(m,i){return '<span class="r34n-d-it" style="--r:'+[-7,5,-3,6][i]+'deg;--c:'+(({QWEN:"#5b4fe0",MISTRAL:"#f05a14",NEMOTRON:"#69a300",GEMINI:"#6c74c8"})[m.k])+'">'+R.logo(m)+'<b>'+m.name+'</b></span>'}).join("")+'</span>',
  "Ticket number 5: next up, "+R.names+", paid for by 31% of our creator fees.");
