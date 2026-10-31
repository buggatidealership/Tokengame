/* Round 34, set B, round 2: shared. Each next model's colour (one ink each: Qwen's violet, Mistral's orange, NVIDIA's green, Gemini's
   blue-to-rose gradient) and its lab's country (Qwen China, Mistral France, Nemotron and Gemini the United States). The No. 5
   ticket's columns follow a row's (the stub lines up with the stubs above). */
var R=window.R34;if(!R)return;
var INK={QWEN:"#5b4fe0",MISTRAL:"#f05a14",NEMOTRON:"#69a300",GEMINI:""},CC={QWEN:"CN",MISTRAL:"FR",NEMOTRON:"US",GEMINI:"US"};
R.logo=function(m){return '<span class="r34n-lg'+(m.k==="GEMINI"?" gem":"")+'" style="--c:'+(INK[m.k]||"#1b181c")+'">'+R.mark(m,"r34n-svg")+'</span>'};
R.flag=function(m){var c=CC[m.k];if(c==="FR")return '<i class="r34n-fl"><svg viewBox="0 0 15 10" preserveAspectRatio="none" aria-hidden="true"><rect width="5" height="10" fill="#22356a"/><rect x="10" width="5" height="10" fill="#b3261c"/></svg></i>';
  return '<i class="r34n-fl">'+window.r34g.svg(c,"")+'</i>'};
R.cc=CC;
if(!document.getElementById("r34nDefs")){var sv=document.createElementNS("http://www.w3.org/2000/svg","svg");sv.id="r34nDefs";sv.setAttribute("width","0");sv.setAttribute("height","0");sv.style.cssText="position:absolute;width:0;height:0";
  sv.innerHTML='<defs><linearGradient id="r34nGem" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3f86d8"/><stop offset=".55" stop-color="#8a6fc4"/><stop offset="1" stop-color="#c85f6e"/></linearGradient></defs>';document.body.appendChild(sv)}
R.ticket=function(cls,inner,sr){var st=document.getElementById("standings"),ol=st.querySelector("ol.lbl"),row=st.querySelector("li.lbr:not(.lead)")||st.querySelector("li.lbr");if(!ol||!row)return null;
  var li=st.querySelector("li.r34n");if(!li){li=document.createElement("li");li.className="r34n "+cls;li.innerHTML='<span class="r34n-st" aria-hidden="true"><i>No.</i><b>5</b></span>'+inner+'<span class="sr">'+sr+'</span>';ol.appendChild(li)}
  var sync=function(){li.style.gridTemplateColumns=getComputedStyle(row).gridTemplateColumns};sync();
  if(!window.__r34n){window.__r34n=1;var lw=innerWidth;addEventListener("resize",function(){if(innerWidth!==lw){lw=innerWidth;setTimeout(sync,200)}});if(document.fonts)document.fonts.ready.then(sync)}
  return li};
R.names=R.next.map(function(m){return m.name}).join(", ");
