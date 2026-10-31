/* 3 · Fight card code: "USA" / "CHN" over the name, as a fight poster bills a fighter's country; no flag at all */
r34g.rows().forEach(function(li){var t=li.querySelector(".pc-t");if(!t||t.querySelector(".r34g-cc"))return;var c=r34g.cc(li);
  t.insertAdjacentHTML("afterbegin",'<span class="r34g-cc" aria-hidden="true">'+r34g.CODE[c]+'</span>');t.insertAdjacentHTML("afterend",'<span class="sr">'+r34g.NAME[c]+'</span>')});
r34g.aiw();
