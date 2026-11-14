/* 1 · Ink flag: a two-ink flag printed after the model line ("Grok 4.7 [flag]"), the height of its capitals */
r34g.rows().forEach(function(li){var sm=li.querySelector(".pc-t small");if(!sm||sm.querySelector(".r34g-f"))return;var c=r34g.cc(li);
  sm.insertAdjacentHTML("beforeend",r34g.svg(c,"r34g-f1"));
  /* the country for screen readers sits outside the name block, so the AI field's width is measured on the ink alone */
  li.querySelector(".pc-t").insertAdjacentHTML("afterend",'<span class="sr">'+r34g.NAME[c]+'</span>')});
/* the AI field keeps the width the page gives it (x2plus.js tixCols would measure the words, not the flag), so the columns do not move */
