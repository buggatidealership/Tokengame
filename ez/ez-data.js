/* =====================================================================
   EZ — shared data for every landing-page variant.
   Mirrors the ARENA sheet cell for cell. Edit here once; all variants follow.
   Winners, distances, direction, ladder: derived, never typed.
   ===================================================================== */
var CONFIG={ca:"",buyUrl:"",chain:"",x:"",tg:"",pool:"",poolUrl:"",betDate:"",
  /* the buyback scoreboard: "$EZ bought back" (text, e.g. "$12.4K"); empty = "Opens at launch" */
  boughtBack:"",
  /* the road: launch comes after launchAt graded rounds; set launched:true once $EZ is live */
  launchAt:35,launched:false};
/* The prompt every model gets, every round. verbatim:false = the shape only (pages say so);
   paste the exact text and set verbatim:true to publish it word for word. */
var PROMPT={verbatim:false,lines:["Company <i>X</i> reports on <i>date</i>.","Full freedom: use any tool you like.","Answer: <i>up or down</i>, and <i>by how much</i>."]};
var SHEET_HEADER=["ROUND","TICKER","CALL DATE (T-1)","GPT DIR","GPT MAG (%)","KIMI DIR","KIMI MAG (%)","CLAUDE DIR","CLAUDE MAG (%)","GROK DIR","GROK MAG (%)","RESOLUTION DATE/TIME","ACTUAL MOVE (%)","REPORT TIME","SECTOR","INDUSTRY GROUP","THEMES","MAG 7"];
var SHEET=[
 ["1","GME","09/08/26","UP","1","UP","4","UP","2","","","09/09/26","5.95","","Consumer Discretionary","Consumer Discretionary Distribution & Retail","Gaming","FALSE"],
 ["2","ORCL","09/16/26","UP","6","DOWN","6","DOWN","3","","","09/17/26","-1.74","","Information Technology","Software & Services","AI; Cloud","FALSE"],
 ["3","AZO","09/19/26","UP","4","DOWN","5","DOWN","4.5","","","09/22/26","3.25","","Consumer Discretionary","Consumer Discretionary Distribution & Retail","Automotive","FALSE"],
 ["4","GIS","09/19/26","UP","3","UP","3","DOWN","3","","","09/23/26","1.04","","Consumer Staples","Food, Beverage & Tobacco","Food & beverages","FALSE"],
 ["5","BB","09/20/26","UP","7","UP","9","UP","9","","","09/21/26","4.1","","Information Technology","Software & Services","Automotive; Cybersecurity","FALSE"],
 ["6","COST","09/24/26","DOWN","2.5","DOWN","2.5","DOWN","2.8","","","09/25/26","2.95","","Consumer Staples","Consumer Staples Distribution & Retail","","FALSE"],
 ["7","JEF","09/28/26","UP","3","UP","4.5","UP","3.7","","","09/29/26","-1.25","","Financials","Financial Services","","FALSE"],
 ["8","CCL","09/29/26","UP","3","UP","5","DOWN","5.7","","","09/29/26","13.53","","Consumer Discretionary","Consumer Services","Travel","FALSE"],
 ["9","MU","09/30/26","UP","4","UP","7","DOWN","6.8","UP","6","10/01/26","3.11","","Information Technology","Semiconductors & Semiconductor Equipment","AI; Semiconductors","FALSE"],
 ["10","ACN","10/01/26","DOWN","4","DOWN","4.5","DOWN","6","DOWN","4.5","10/01/26","16.02","","Information Technology","Software & Services","AI; Cloud; Cybersecurity","FALSE"],
 ["11","NKE","10/01/26","DOWN","3","UP","6","DOWN","8","DOWN","4.5","10/02/26","-3.64","","Consumer Discretionary","Consumer Durables & Apparel","","FALSE"],
 ["12","2317.TW","10/05/26","UP","1.5","UP","1.75","UP","1.2","UP","2.5","10/06/26","0.79","","Information Technology","Technology Hardware & Equipment","AI; Consumer electronics","FALSE"],
 ["13","RPM","10/05/26","UP","2.5","UP","2.5","UP","1.5","UP","2.8","10/06/26","3.27","","Materials","Materials","","FALSE"],
 ["15","005930.KS","10/06/26","UP","2","UP","3","DOWN","1.5","DOWN","3.2","10/08/26","","","Information Technology","Technology Hardware & Equipment","AI; Semiconductors; Consumer electronics","FALSE"],
 ["16","LEVI","10/07/26","UP","2","UP","4","DOWN","6.5","DOWN","1.5","10/08/26","","","Consumer Discretionary","Consumer Durables & Apparel","","FALSE"],
 ["17","APLD","10/07/26","UP","4","UP","5","UP","8","DOWN","3.5","10/08/26","","","Information Technology","Software & Services","AI; Cloud","FALSE"],
 ["18","PEP","10/07/26","UP","1.5","UP","2","DOWN","3","DOWN","1.8","10/08/26","","","Consumer Staples","Food, Beverage & Tobacco","Food & beverages","FALSE"],
 ["19","TSMC","10/08/26","","","","","","","","","10/12/26","","","Information Technology","Semiconductors & Semiconductor Equipment","AI; Semiconductors","FALSE"],
 ["20","DAL","10/08/26","","","","","","","","","10/09/26","","","Industrials","Transportation","Travel","FALSE"],
 ["21","JPM","10/12/26","","","","","","","","","10/13/26","","","Financials","Banks","","FALSE"],
 ["22","JNJ","10/12/26","","","","","","","","","10/13/26","","","Health Care","Pharmaceuticals, Biotechnology & Life Sciences","Healthcare","FALSE"],
 ["23","UNH","10/12/26","","","","","","","","","10/13/26","","","Health Care","Health Care Equipment & Services","Healthcare","FALSE"],
 ["24","GS","10/12/26","","","","","","","","","10/13/26","","","Financials","Financial Services","","FALSE"],
 ["25","WFC","10/12/26","","","","","","","","","10/13/26","","","Financials","Banks","","FALSE"],
 ["26","C","10/12/26","","","","","","","","","10/13/26","","","Financials","Banks","","FALSE"],
 ["27","DPZ","10/12/26","","","","","","","","","10/13/26","","","Consumer Discretionary","Consumer Services","Food & beverages","FALSE"],
 ["28","8267.T","10/12/26","","","","","","","","","10/14/26","","","Consumer Staples","Consumer Staples Distribution & Retail","","FALSE"],
 ["29","ASML.AS","10/13/26","","","","","","","","","10/14/26","","","Information Technology","Semiconductors & Semiconductor Equipment","AI; Semiconductors","FALSE"],
 ["30","BAC","10/13/26","","","","","","","","","10/14/26","","","Financials","Banks","","FALSE"],
 ["31","MS","10/13/26","","","","","","","","","10/14/26","","","Financials","Financial Services","","FALSE"],
 ["32","BLK","10/13/26","","","","","","","","","10/14/26","","","Financials","Financial Services","","FALSE"],
 ["33","2330.TW","10/14/26","","","","","","","","","10/16/26","","","Information Technology","Semiconductors & Semiconductor Equipment","AI; Semiconductors","FALSE"],
 ["34","9602.T","10/14/26","","","","","","","","","10/16/26","","","Communication Services","Media & Entertainment","Media","FALSE"],
 ["35","IBKR","10/15/26","","","","","","","","","10/16/26","","","Financials","Financial Services","Crypto","FALSE"],
 ["36","AA","10/15/26","","","","","","","","","10/16/26","","","Materials","Materials","","FALSE"],
 ["37","GE","10/20/26","","","","","","","","","","","","Industrials","Capital Goods","Defense","FALSE"],
 ["38","NFLX","10/20/26","","","","","","","","","","","","Communication Services","Media & Entertainment","Media","FALSE"],
 ["39","IBM","10/21/26","","","","","","","","","","","","Information Technology","Software & Services","AI; Cloud; Cybersecurity","FALSE"],
 ["40","LRCX","10/21/26","","","","","","","","","","","","Information Technology","Semiconductors & Semiconductor Equipment","AI; Semiconductors","FALSE"],
 ["41","PM","10/21/26","","","","","","","","","","","","Consumer Staples","Food, Beverage & Tobacco","","FALSE"],
 ["42","TXN","10/21/26","","","","","","","","","","","","Information Technology","Semiconductors & Semiconductor Equipment","Semiconductors; Automotive","FALSE"],
 ["43","TSLA","10/21/26","","","","","","","","","","","","Consumer Discretionary","Automobiles & Components","AI; Automotive; Power & electrification","TRUE"],
 ["44","SAP","10/21/26","","","","","","","","","","","","Information Technology","Software & Services","AI; Cloud","FALSE"],
 ["45","INTC","10/22/26","","","","","","","","","","","","Information Technology","Semiconductors & Semiconductor Equipment","AI; Semiconductors","FALSE"],
 ["46","LMT","10/22/26","","","","","","","","","","","","Industrials","Capital Goods","Defense; Space","FALSE"],
 ["47","SPOT","10/22/26","","","","","","","","","","","","Communication Services","Media & Entertainment","Media","FALSE"],
 ["48","AXP","10/23/26","","","","","","","","","","","","Financials","Financial Services","Payments","FALSE"],
 ["49","000660.KS","10/26/26","","","","","","","","","","","","Information Technology","Semiconductors & Semiconductor Equipment","AI; Semiconductors","FALSE"],
 ["50","BA","10/26/26","","","","","","","","","","","","Industrials","Capital Goods","Defense; Space","FALSE"],
 ["51","BE","10/26/26","","","","","","","","","","","","Industrials","Capital Goods","AI; Power & electrification","FALSE"],
 ["52","GLW","10/26/26","","","","","","","","","","","","Information Technology","Technology Hardware & Equipment","AI","FALSE"],
 ["53","KO","10/26/26","","","","","","","","","","","","Consumer Staples","Food, Beverage & Tobacco","Food & beverages","FALSE"],
 ["54","PYPL","10/26/26","","","","","","","","","","","","Financials","Financial Services","Payments; Crypto","FALSE"],
 ["55","UPS","10/26/26","","","","","","","","","","","","Industrials","Transportation","","FALSE"],
 ["56","NOVN.SW","10/26/26","","","","","","","","","","","","Health Care","Pharmaceuticals, Biotechnology & Life Sciences","Healthcare","FALSE"],
 ["57","HSBA.L","10/26/26","","","","","","","","","","","","Financials","Banks","","FALSE"],
 ["58","STX","10/27/26","","","","","","","","","","","","Information Technology","Technology Hardware & Equipment","AI","FALSE"],
 ["59","HOOD","10/27/26","","","","","","","","","","","","Financials","Financial Services","Crypto","FALSE"],
 ["60","373220.KS","10/27/26","","","","","","","","","","","","Industrials","Capital Goods","Automotive; Power & electrification","FALSE"],
 ["61","EBAY","10/27/26","","","","","","","","","","","","Consumer Discretionary","Consumer Discretionary Distribution & Retail","E-commerce","FALSE"],
 ["62","FDX","10/27/26","","","","","","","","","","","","Industrials","Transportation","","FALSE"],
 ["63","GEV","10/27/26","","","","","","","","","","","","Industrials","Capital Goods","AI; Power & electrification","FALSE"],
 ["64","GOOGL","10/27/26","","","","","","","","","","","","Communication Services","Media & Entertainment","AI; Cloud; Media","TRUE"],
 ["65","META","10/27/26","","","","","","","","","","","","Communication Services","Media & Entertainment","AI; Media","TRUE"],
 ["66","MSFT","10/27/26","","","","","","","","","","","","Information Technology","Software & Services","AI; Cloud; Gaming; Consumer electronics; Cybersecurity","TRUE"],
 ["67","NOW","10/27/26","","","","","","","","","","","","Information Technology","Software & Services","AI; Cloud","FALSE"],
 ["68","MBG.DE","10/27/26","","","","","","","","","","","","Consumer Discretionary","Automobiles & Components","Automotive","FALSE"],
 ["69","CMG","10/28/26","","","","","","","","","","","","Consumer Discretionary","Consumer Services","Food & beverages","FALSE"],
 ["70","005930.KS","10/28/26","","","","","","","","","","","","Information Technology","Technology Hardware & Equipment","AI; Semiconductors; Consumer electronics","FALSE"],
 ["71","AAPL","10/28/26","","","","","","","","","","","","Information Technology","Technology Hardware & Equipment","AI; Consumer electronics","TRUE"],
 ["72","AMZN","10/28/26","","","","","","","","","","","","Consumer Discretionary","Consumer Discretionary Distribution & Retail","AI; Cloud; E-commerce","TRUE"],
 ["73","CAT","10/28/26","","","","","","","","","","","","Industrials","Capital Goods","","FALSE"],
 ["74","COIN","10/28/26","","","","","","","","","","","","Financials","Financial Services","Crypto","FALSE"],
 ["75","LLY","10/28/26","","","","","","","","","","","","Health Care","Pharmaceuticals, Biotechnology & Life Sciences","Healthcare","FALSE"],
 ["76","MA","10/28/26","","","","","","","","","","","","Financials","Financial Services","Payments","FALSE"],
 ["77","MRK","10/28/26","","","","","","","","","","","","Health Care","Pharmaceuticals, Biotechnology & Life Sciences","Healthcare","FALSE"],
 ["78","MSTR","10/28/26","","","","","","","","","","","","Information Technology","Software & Services","Crypto","FALSE"],
 ["79","NET","10/28/26","","","","","","","","","","","","Information Technology","Software & Services","AI; Cloud; Cybersecurity","FALSE"],
 ["80","RDDT","10/28/26","","","","","","","","","","","","Communication Services","Media & Entertainment","Media","FALSE"],
 ["81","SBUX","10/28/26","","","","","","","","","","","","Consumer Discretionary","Consumer Services","Food & beverages","FALSE"],
 ["82","SNDK","10/28/26","","","","","","","","","","","","Information Technology","Technology Hardware & Equipment","AI; Semiconductors","FALSE"],
 ["83","WDC","10/28/26","","","","","","","","","","","","Information Technology","Technology Hardware & Equipment","AI","FALSE"],
 ["84","VOW3.DE","10/28/26","","","","","","","","","","","","Consumer Discretionary","Automobiles & Components","Automotive","FALSE"],
 ["85","CVX","10/29/26","","","","","","","","","","","","Energy","Energy","","FALSE"],
 ["86","XOM","10/29/26","","","","","","","","","","","","Energy","Energy","","FALSE"],
 ["87","SHEL.L","10/29/26","","","","","","","","","","","","Energy","Energy","","FALSE"],
 ["88","AZN.L","10/30/26","","","","","","","","","","","","Health Care","Pharmaceuticals, Biotechnology & Life Sciences","Healthcare","FALSE"],
 ["89","KIOXIA","10/30/26","","","","","","","","","","","","Information Technology","Semiconductors & Semiconductor Equipment","AI; Semiconductors","FALSE"],
 ["90","BRK.B","11/2/26","","","","","","","","","","","","Financials","Financial Services","","FALSE"],
 ["91","HIMS","11/2/26","","","","","","","","","","","","Health Care","Health Care Equipment & Services","Healthcare","FALSE"],
 ["92","PLTR","11/2/26","","","","","","","","","","","","Information Technology","Software & Services","AI; Defense","FALSE"],
 ["93","AMD","11/3/26","","","","","","","","","","","","Information Technology","Semiconductors & Semiconductor Equipment","AI; Semiconductors; Gaming","FALSE"],
 ["94","LITE","11/3/26","","","","","","","","","","","","Information Technology","Technology Hardware & Equipment","AI","FALSE"],
 ["95","PFE","11/3/26","","","","","","","","","","","","Health Care","Pharmaceuticals, Biotechnology & Life Sciences","Healthcare","FALSE"],
 ["96","SHOP","11/3/26","","","","","","","","","","","","Information Technology","Software & Services","AI; E-commerce; Payments","FALSE"],
 ["97","UBER","11/3/26","","","","","","","","","","","","Industrials","Transportation","Travel; Food & beverages","FALSE"],
 ["98","NVO","11/3/26","","","","","","","","","","","","Health Care","Pharmaceuticals, Biotechnology & Life Sciences","Healthcare","FALSE"],
 ["99","BMW","11/03/26","","","","","","","","","","","","Consumer Discretionary","Automobiles & Components","Automotive","FALSE"],
 ["100","ARM","11/4/26","","","","","","","","","","","","Information Technology","Semiconductors & Semiconductor Equipment","AI; Semiconductors; Automotive","FALSE"],
 ["101","CVS","11/4/26","","","","","","","","","","","","Health Care","Health Care Equipment & Services","Healthcare","FALSE"],
 ["102","MCD","11/4/26","","","","","","","","","","","","Consumer Discretionary","Consumer Services","Food & beverages","FALSE"],
 ["103","QCOM","11/4/26","","","","","","","","","","","","Information Technology","Semiconductors & Semiconductor Equipment","AI; Semiconductors; Automotive","FALSE"],
 ["104","6758.T","11/4/26","","","","","","","","","","","","Consumer Discretionary","Consumer Durables & Apparel","Gaming; Media; Consumer electronics","FALSE"],
 ["105","NINTENDO","11/4/26","","","","","","","","","","","","Communication Services","Media & Entertainment","Gaming; Consumer electronics","FALSE"],
 ["106","DHL","11/04/26","","","","","","","","","","","","Industrials","Transportation","","FALSE"],
 ["107","ABNB","11/5/26","","","","","","","","","","","","Consumer Discretionary","Consumer Services","Travel","FALSE"],
 ["108","DDOG","11/5/26","","","","","","","","","","","","Information Technology","Software & Services","AI; Cloud","FALSE"],
 ["109","DKNG","11/5/26","","","","","","","","","","","","Consumer Discretionary","Consumer Services","Sports betting","FALSE"],
 ["110","GPRO","11/5/26","","","","","","","","","","","","Consumer Discretionary","Consumer Durables & Apparel","Consumer electronics","FALSE"],
 ["111","TTWO","11/5/26","","","","","","","","","","","","Communication Services","Media & Entertainment","Gaming","FALSE"],
 ["112","USAR","11/5/26","","","","","","","","","","","","Materials","Materials","Power & electrification","FALSE"],
 ["113","CRWV","11/9/26","","","","","","","","","","","","Information Technology","Software & Services","AI; Cloud","FALSE"],
 ["114","RKLB","11/9/26","","","","","","","","","","","","Industrials","Capital Goods","Space; Defense","FALSE"],
 ["115","NBIS","11/10/26","","","","","","","","","","","","Information Technology","Software & Services","AI; Cloud","FALSE"],
 ["116","SOFTBANK","11/10/26","","","","","","","","","","","","Communication Services","Telecommunication Services","AI","FALSE"],
 ["117","SIE.DE","11/11/26","","","","","","","","","","","","Industrials","Capital Goods","AI; Power & electrification","FALSE"],
 ["118","AMAT","11/12/26","","","","","","","","","","","","Information Technology","Semiconductors & Semiconductor Equipment","AI; Semiconductors","FALSE"],
 ["119","DIS","11/12/26","","","","","","","","","","","","Communication Services","Media & Entertainment","Media; Travel","FALSE"],
 ["120","HD","11/17/26","","","","","","","","","","","","Consumer Discretionary","Consumer Discretionary Distribution & Retail","","FALSE"],
 ["121","NVDA","11/17/26","","","","","","","","","","","","Information Technology","Semiconductors & Semiconductor Equipment","AI; Semiconductors; Gaming; Automotive","TRUE"]
];

/* presentation only — names, films, and the words on each card (never numbers) */
var TICKERS={JPM:"JPMorgan Chase",JNJ:"Johnson & Johnson",UNH:"UnitedHealth",GS:"Goldman Sachs",WFC:"Wells Fargo",C:"Citigroup",DPZ:"Domino's",BAC:"Bank of America",MS:"Morgan Stanley",BLK:"BlackRock",IBKR:"Interactive Brokers",AA:"Alcoa","8267.T":"AEON","ASML.AS":"ASML","2330.TW":"TSMC","9602.T":"Toho",GME:"GameStop",ORCL:"Oracle",AZO:"AutoZone",GIS:"General Mills",BB:"BlackBerry",COST:"Costco",JEF:"Jefferies",CCL:"Carnival",MU:"Micron",ACN:"Accenture",NKE:"Nike","2317.TW":"Foxconn",RPM:"RPM","005930.KS":"Samsung",STX:"Seagate",LEVI:"Levi Strauss",APLD:"Applied Digital",PEP:"PepsiCo",TSMC:"TSMC",DAL:"Delta",GE:"GE Aerospace",NFLX:"Netflix",IBM:"IBM",LRCX:"Lam Research",PM:"Philip Morris",TXN:"Texas Instruments",TSLA:"Tesla",INTC:"Intel",LMT:"Lockheed Martin",SPOT:"Spotify",AXP:"American Express","000660.KS":"SK Hynix",BA:"Boeing",BE:"Bloom Energy",GLW:"Corning",KO:"Coca-Cola",PYPL:"PayPal",UPS:"UPS",HOOD:"Robinhood","373220.KS":"LG Energy Solution",EBAY:"eBay",FDX:"FedEx",GEV:"GE Vernova",GOOGL:"Alphabet",META:"Meta",MSFT:"Microsoft",NOW:"ServiceNow",CMG:"Chipotle",AAPL:"Apple",AMZN:"Amazon",CAT:"Caterpillar",COIN:"Coinbase",LLY:"Eli Lilly",MA:"Mastercard",MRK:"Merck",MSTR:"Strategy",NET:"Cloudflare",RDDT:"Reddit",SBUX:"Starbucks",SNDK:"Sandisk",WDC:"Western Digital",CVX:"Chevron",XOM:"Exxon Mobil","285A.T":"Kioxia","BRK.B":"Berkshire Hathaway",HIMS:"Hims & Hers",PLTR:"Palantir",AMD:"AMD",LITE:"Lumentum",PFE:"Pfizer",SHOP:"Shopify",UBER:"Uber",NVO:"Novo Nordisk",ARM:"Arm",CVS:"CVS Health",MCD:"McDonald's",QCOM:"Qualcomm","6758.T":"Sony","7974.T":"Nintendo",ABNB:"Airbnb",DDOG:"Datadog",DKNG:"DraftKings",GPRO:"GoPro",TTWO:"Take-Two",USAR:"USA Rare Earth",CRWV:"CoreWeave",RKLB:"Rocket Lab",NBIS:"Nebius","9984.T":"SoftBank Group",AMAT:"Applied Materials",DIS:"Disney",HD:"Home Depot",NVDA:"NVIDIA","SAP":"SAP","NOVN.SW":"Novartis","HSBA.L":"HSBC","MBG.DE":"Mercedes-Benz","VOW3.DE":"Volkswagen","SHEL.L":"Shell","AZN.L":"AstraZeneca","KIOXIA":"Kioxia","BMW":"BMW","NINTENDO":"Nintendo","DHL":"DHL Group","SOFTBANK":"SoftBank","SIE.DE":"Siemens"};
var CARDS={
 1:{tag:"SEASON OPENER",head:"Kimi Calls GameStop",film:"round-1-gamestop-hd",poster:"round-1-gamestop-hd-poster"},
 2:{tag:"THE FADE",head:"Oracle Fades; Claude Collects",film:"round-2-oracle-hd",poster:"round-2-oracle-hd-poster"},
 3:{tag:"TIGHTEST CALL",head:"GPT Answers the Doubters",film:"round-3-autozone",poster:"round-3-autozone-end"},
 4:{tag:"DEAD HEAT",head:"A Dead Heat at General Mills",film:"round-4-generalmills",poster:"round-4-generalmills-poster"},
 5:{tag:"LEAD CHANGE",head:"GPT Again, and the Standings Turn",film:"round-5-blackberry",poster:"round-5-blackberry-poster"},
 6:{tag:"NO WINNER",head:"The Call That Fooled All Three",film:"round-6-costco",poster:"round-6-costco-poster"}
};
/* optional exact times (UTC) for countdowns; the sheet only carries dates */
var TIMES={MU:{lock:"2026-09-30T20:30:00Z"}};
var MEDIA="media/";
/* Company marks. Put a logo file in media/logos/ (SVG or PNG, square, transparent) and list it here, e.g. GME:"logos/GME.svg".
   Without a file, pages show a ticker badge, so a new round never breaks the page. */
var CO_LOGOS={"000660.KS":{f:"logos/000660.KS.png",c:"#12131a"},"005930.KS":{f:"logos/005930.KS.png",c:"#1428a0"},"2317.TW":{f:"logos/2317.TW.png",c:"#0c549c"},"2330.TW":{f:"logos/2330.TW.png",c:"#fc0c24"},"373220.KS":{f:"logos/373220.KS.png",c:"#cc0c3c"},"6758.T":{f:"logos/6758.T.png",c:"#12131a"},"8267.T":{f:"logos/8267.T.png",c:"#b42484"},"9602.T":{f:"logos/9602.T.png",c:"#12131a"},"AA":{f:"logos/AA.png",c:"#0c549c"},"AAPL":{f:"logos/AAPL.png",c:"#12131a"},"ABNB":{f:"logos/ABNB.png",c:"#fc3c54"},"ACN":{f:"logos/ACN.png",c:"#9c0cfc"},"AMAT":{f:"logos/AMAT.png",c:"#0c9ccc"},"AMD":{f:"logos/AMD.png",c:"#0cb46c"},"AMZN":{f:"logos/AMZN.png",c:"#fc9c0c",dark:1},"APLD":{f:"logos/APLD.png",c:"#0c84fc"},"ARM":{f:"logos/ARM.png",c:"#0c9cb4"},"ASML.AS":{f:"logos/ASML.AS.png",c:"#0c2484"},"AXP":{f:"logos/AXP.png",c:"#0c6ccc"},"AZN.L":{f:"logos/AZN.L.png",c:"#e4b40c"},"AZO":{f:"logos/AZO.png",c:"#cc2424"},"BA":{f:"logos/BA.png",c:"#12131a",dark:1},"BAC":{f:"logos/BAC.png",c:"#cc2424"},"BB":{f:"logos/BB.png",c:"#12131a",dark:1},"BE":{f:"logos/BE.png",c:"#6cb46c"},"BLK":{f:"logos/BLK.png",c:"#12131a",dark:1},"BMW":{f:"logos/BMW.png",c:"#12131a"},"BRK.B":{f:"logos/BRK.B.png",c:"#243c9c"},"C":{f:"logos/C.png",c:"#0c3c84"},"CAT":{f:"logos/CAT.png",c:"#fccc0c",dark:1},"CCL":{f:"logos/CCL.png",c:"#cc0c3c"},"CMG":{f:"logos/CMG.png",c:"#b42424"},"COIN":{f:"logos/COIN.png",c:"#0c54fc"},"COST":{f:"logos/COST.png",c:"#fc0c3c"},"CRWV":{f:"logos/CRWV.png",c:"#12131a"},"CVS":{f:"logos/CVS.png",c:"#cc0c0c"},"CVX":{f:"logos/CVX.png",c:"#249ccc"},"DAL":{f:"logos/DAL.png",c:"#e4243c"},"DDOG":{f:"logos/DDOG.png",c:"#6c249c"},"DHL":{f:"logos/DHL.png",c:"#fccc0c"},"DIS":{f:"logos/DIS.png",c:"#12131a",dark:1},"DKNG":{f:"logos/DKNG.png",c:"#fc8424"},"DPZ":{f:"logos/DPZ.png",c:"#e40c3c"},"EBAY":{f:"logos/EBAY.png",c:"#0c6ccc"},"FDX":{f:"logos/FDX.png",c:"#6c249c"},"GE":{f:"logos/GE.png",c:"#246cb4"},"GEV":{f:"logos/GEV.png",c:"#0c8484"},"GIS":{f:"logos/GIS.png",c:"#0c549c"},"GLW":{f:"logos/GLW.png",c:"#0c54cc"},"GME":{f:"logos/GME.png",c:"#fc0c0c"},"GOOGL":{f:"logos/GOOGL.png",c:"#e43c3c"},"GPRO":{f:"logos/GPRO.png",c:"#12131a"},"GS":{f:"logos/GS.png",c:"#7399c6"},"HD":{f:"logos/HD.png",c:"#fc8424"},"HIMS":{f:"logos/HIMS.png",c:"#12131a",dark:1},"HOOD":{f:"logos/HOOD.png",c:"#0ccc0c"},"HSBA.L":{f:"logos/HSBA.L.png",c:"#12131a"},"IBKR":{f:"logos/IBKR.png",c:"#e40c24"},"IBM":{f:"logos/IBM.png",c:"#12131a",dark:1},"INTC":{f:"logos/INTC.png",c:"#12131a"},"JEF":{f:"logos/JEF.png",c:"#12131a"},"JNJ":{f:"logos/JNJ.png",c:"#cc0c0c"},"JPM":{f:"logos/JPM.png",c:"#0c54b4"},"KIOXIA":{f:"logos/KIOXIA.png",c:"#12131a"},"KO":{f:"logos/KO.png",c:"#e40c24"},"LEVI":{f:"logos/LEVI.png",c:"#cc0c3c"},"LITE":{f:"logos/LITE.png",c:"#12131a"},"LLY":{f:"logos/LLY.png",c:"#cc2424"},"LMT":{f:"logos/LMT.png",c:"#12131a",dark:1},"LRCX":{f:"logos/LRCX.png",c:"#12131a"},"MA":{f:"logos/MA.png",c:"#cc0c0c"},"MBG.DE":{f:"logos/MBG.DE.png",c:"#12131a"},"MCD":{f:"logos/MCD.png",c:"#fccc0c",dark:1},"META":{f:"logos/META.png",c:"#0c84fc"},"MRK":{f:"logos/MRK.png",c:"#0c846c"},"MS":{f:"logos/MS.png",c:"#002b51"},"MSFT":{f:"logos/MSFT.png",c:"#fc5424"},"MSTR":{f:"logos/MSTR.png",c:"#cc3c3c"},"MU":{f:"logos/MU.png",c:"#0c9ccc"},"NBIS":{f:"logos/NBIS.png",c:"#e4fc54"},"NET":{f:"logos/NET.png",c:"#fc8424"},"NFLX":{f:"logos/NFLX.png",c:"#b40c0c"},"NINTENDO":{f:"logos/NINTENDO.png",c:"#e40c0c"},"NKE":{f:"logos/NKE.png",c:"#12131a",dark:1},"NOVN.SW":{f:"logos/NOVN.SW.png",c:"#12131a"},"NOW":{f:"logos/NOW.png",c:"#12131a"},"NVDA":{f:"logos/NVDA.png",c:"#84b40c"},"NVO":{f:"logos/NVO.png",c:"#0c0c6c"},"ORCL":{f:"logos/ORCL.png",c:"#cc3c3c"},"PEP":{f:"logos/PEP.png",c:"#0c549c"},"PFE":{f:"logos/PFE.png",c:"#0c9ce4"},"PLTR":{f:"logos/PLTR.png",c:"#12131a"},"PM":{f:"logos/PM.png",c:"#0c6cb4"},"PYPL":{f:"logos/PYPL.png",c:"#243c84"},"QCOM":{f:"logos/QCOM.png",c:"#0c6cb4"},"RDDT":{f:"logos/RDDT.png",c:"#fc3c0c"},"RKLB":{f:"logos/RKLB.png",c:"#e42424"},"RPM":{f:"logos/RPM.png",c:"#0c3c6c"},"SAP":{f:"logos/SAP.png",c:"#0cb4e4"},"SBUX":{f:"logos/SBUX.png",c:"#0c6c54"},"SHEL.L":{f:"logos/SHEL.L.png",c:"#fccc0c"},"SHOP":{f:"logos/SHOP.png",c:"#9cb43c"},"SIE.DE":{f:"logos/SIE.DE.png",c:"#009999"},"SNDK":{f:"logos/SNDK.png",c:"#e40c0c"},"SOFTBANK":{f:"logos/SOFTBANK.png",c:"#12131a"},"SPOT":{f:"logos/SPOT.png",c:"#24cc6c"},"STX":{f:"logos/STX.png",c:"#4f9a3a"},"TSLA":{f:"logos/TSLA.png",c:"#e42424"},"TSMC":{f:"logos/TSMC.png",c:"#e40c0c"},"TTWO":{f:"logos/TTWO.png",c:"#0c549c"},"TXN":{f:"logos/TXN.png",c:"#cc0c0c"},"UBER":{f:"logos/UBER.png",c:"#12131a",dark:1},"UNH":{f:"logos/UNH.png",c:"#002677",dark:1},"UPS":{f:"logos/UPS.png",c:"#e49c24"},"USAR":{f:"logos/USAR.png",c:"#12131a"},"VOW3.DE":{f:"logos/VOW3.DE.png",c:"#12131a"},"WDC":{f:"logos/WDC.png",c:"#0c6c9c"},"WFC":{f:"logos/WFC.png",c:"#cc2424"},"XOM":{f:"logos/XOM.png",c:"#fc0c0c"}};
/* CO_LOGOS is written by tools/fetch_logos.py: {TICKER:{f:"logos/X.png",dark:1}}; dark = a light logo, shown on a dark badge */
function coMark(t,cls){t=String(t||"").toUpperCase();var L=CO_LOGOS[t],f=L&&(L.f||L);
  return f?'<span class="co-mark has-logo'+(L.dark?' dk':'')+' '+(cls||'')+'" title="'+(TICKERS[t]||t)+'"><img src="'+MEDIA+f+'" alt="'+(TICKERS[t]||t)+'" loading="lazy"></span>'
          :'<span class="co-mark '+(cls||'')+'" title="'+(TICKERS[t]||t)+'">'+t+'</span>'}
/* Pool calculator assumptions (owner to confirm). null = not decided yet: the page uses its example value and marks it.
   feePct: % of each $EZ trade that becomes fees we collect · leverage: the bet's leverage · volPct: example daily volume as % of market cap
   betDate: MM/DD/YY of the NVIDIA bet (also CONFIG.betDate) */
/* poolShare: the share of fees that goes to the pot (the rest runs operations). Read by the story pages (v25-v27). */
var SIM={feePct:null,leverage:10,volPct:25,betDate:null,poolShare:.69};
/* the round films: webm/mp4/poster in media/, tall = 9:16 */
/* all rounds: 1080x1080 at 60fps ("-hd"); the original files stay for Variant 1.
   pan: for 9:16 films shown in a square, [second, vertical position %] keyframes so the frame follows the action */
/* PREFILMS: optional "calls are in" clips for rounds not graded yet (shown on the pending card only; the
   locked pages ignore them). Remove the entry once the round's real film is in FILMS. */
var PREFILMS={};
/* RECEIPTS: public proof the calls were filed before the report, per round. Paste the link of the post
   (X, Telegram, or an on-chain memo) that published the calls with a timestamp, e.g. 11:"https://x.com/...". */
var RECEIPTS={};
var FILMS={1:{f:"round-1-gamestop-hd",p:"round-1-gamestop-hd-poster"},2:{f:"round-2-oracle-hd",p:"round-2-oracle-hd-poster"},3:{f:"round-3-autozone-hd",p:"round-3-autozone-end"},4:{f:"round-4-generalmills-hd",p:"round-4-generalmills-hd-poster"},5:{f:"round-5-blackberry-hd",p:"round-5-blackberry-hd-poster"},6:{f:"round-6-costco-hd",p:"round-6-costco-hd-poster"},7:{f:"round-7-jefferies-hd",p:"round-7-jefferies-hd-poster"},8:{f:"round-8-carnival-hd",p:"round-8-carnival-hd-poster"},9:{f:"round-9-micron-hd",p:"round-9-micron-hd-poster"},10:{f:"round-10-accenture-hd",p:"round-10-accenture-hd-poster"},11:{f:"round-11-nike-hd",p:"round-11-nike-hd-poster"},12:{f:"round-12-foxconn-hd",p:"round-12-foxconn-hd-poster"},13:{f:"round-13-rpm-hd",p:"round-13-rpm-hd-poster"}};
var NVIDIA_D="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z";
function nvLogo(){return '<span class="lg" style="background:#000" title="NVIDIA"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#76B900" d="'+NVIDIA_D+'"/></svg></span>'}
function hlLogo(){return '<span class="lg" style="background:#0f1a1f" title="Hyperliquid"><img src="'+MEDIA+'logo-hyperliquid.png" alt="" style="width:70%;height:70%;object-fit:contain"></span>'}
/* MODELS (ver = the exact model in play; keep it the newest one we use) — add a model here and it appears everywhere (roster, cards, logos).
   Marks: Simple Icons (CC0 paths of each brand's own mark), styled like the phone app icons. */
var MODELS={
 GPT:{name:"GPT",ver:"GPT-6 Astra",app:"ChatGPT",c:"#10a37f",bg:"#000",fg:"#fff",d:"M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"},
 KIMI:{name:"KIMI",ver:"Kimi K3",app:"Kimi",c:"#1e80ff",bg:"#000",fg:"#fff",d:"M9.41 13.388l8.447-8.377c.16-.16.07-.471-.14-.471h-4.55s-.1.02-.14.06l-9.099 9.029c-.14.14-.35.02-.35-.21V4.81c0-.15-.1-.27-.221-.27H.22c-.12 0-.22.12-.22.27v18.57c0 .15.1.27.22.27h3.137c.12 0 .22-.12.22-.27v-3.79c0-.08.03-.16.08-.21l2.826-2.796c.07-.07.16-.08.241-.03l7.546 5.551a8.9 8.9 0 0 0 4.018 1.493c.12.01.23-.11.23-.27V19.76c0-.14-.08-.25-.19-.26a5.8 5.8 0 0 1-2.355-.942l-6.533-4.73c-.14-.09-.15-.32-.03-.441",dot:"M21.765.351C22.998.351 24 1.353 24 2.586S22.998 4.82 21.765 4.82h-1.974c-.15 0-.26-.12-.26-.26V2.586A2.237 2.237 0 0 1 21.765.35",dotc:"#1e80ff"},
 CLAUDE:{name:"CLAUDE",ver:"Fable 5.1",app:"Claude",c:"#d97757",bg:"#f5f0e8",fg:"#d97757",d:"m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"},
 GROK:{name:"GROK",ver:"Grok 4.7",app:"Grok",c:"#111",bg:"#000",fg:"#fff",fr:"evenodd",d:"M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815"}
};
function logo(m,cls){var M=MODELS[m];return '<span class="lg '+(cls||'')+'" style="background:'+M.bg+'" title="'+M.app+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="'+M.fg+'"'+(M.fr?' fill-rule="'+M.fr+'"':'')+' d="'+M.d+'"/>'+(M.dot?'<path fill="'+M.dotc+'" d="'+M.dot+'"/>':'')+'</svg></span>'}

/* ---------- derive everything from the sheet ---------- */
var ROUNDS=[],PENDING=[],UPCOMING=[],LADDER=[],NEXT=null,MODEL_KEYS=[],RMETA={};
function fmtOut(v){var x=String(v).trim();if(x.charAt(0)==="-"||x.charAt(0)==="−")return "−"+x.replace(/^[-−]/,"")+"%";return "+"+x.replace(/^\+/,"")+"%"}
function fmtDate(d){var m=String(d).match(/(\d+)\/(\d+)/);if(!m)return d;return ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+m[1]]+" "+(+m[2])}
function build(header,rows){
  var col={};header.forEach(function(h,i){col[String(h).trim().toUpperCase()]=i});
  MODEL_KEYS=header.map(function(h){var m=String(h).trim().toUpperCase().match(/^(\w+) DIR$/);return m&&m[1]}).filter(Boolean);
  var g=function(r,k){var i=col[k];return i==null?"":String(r[i]==null?"":r[i]).trim()};
  ROUNDS=[];PENDING=[];UPCOMING=[];RMETA={};
  var tally={};MODEL_KEYS.forEach(function(m){tally[m]={won:0,right:0,n:0,err:0}});
  rows.forEach(function(r){
    var n=+g(r,"ROUND"),t=g(r,"TICKER").toUpperCase();if(!n||!t)return;
    var co=TICKERS[t]||t,act=g(r,"ACTUAL MOVE (%)"),calls=[];
    MODEL_KEYS.forEach(function(m){var d=g(r,m+" DIR").toUpperCase(),mg=g(r,m+" MAG (%)");if(d&&mg!=="")calls.push({m:m,dir:d,mag:mg,v:(d==="DOWN"?-1:1)*parseFloat(mg)})});
    /* details from the sheet (never part of the graded record): sector, industry group, themes, Mag 7 */
    RMETA[n]={sector:g(r,"SECTOR"),group:g(r,"INDUSTRY GROUP"),themes:g(r,"THEMES").split(";").map(function(x){return x.trim()}).filter(Boolean),mag7:/^(TRUE|YES|1|X)$/i.test(g(r,"MAG 7"))};
    var base={n:n,ticker:t,co:co,called:g(r,"CALL DATE (T-1)"),resolves:g(r,"RESOLUTION DATE/TIME"),timing:g(r,"REPORT TIME").toUpperCase(),card:CARDS[n]||{}};
    if(act!==""&&calls.length){
      var a=parseFloat(act),up=a>0;
      calls.forEach(function(c){c.ok=(c.v>0)===up;c.off=Math.abs(c.v-a);c.offs=c.off.toFixed(2)});
      var right=calls.filter(function(c){return c.ok}),best=Math.min.apply(null,right.map(function(c){return c.off}));
      var wn=right.filter(function(c){return Math.abs(c.off-best)<1e-9}).map(function(c){return c.m});
      calls.forEach(function(c){var T=tally[c.m];T.n++;T.err+=c.off;if(c.ok)T.right++;if(wn.indexOf(c.m)>-1)T.won++});
      var cd=base.card;
      ROUNDS.push({n:n,co:co,ticker:t,called:base.called,resolves:base.resolves,timing:base.timing,out:fmtOut(act),a:a,win:wn.length?wn.join(" & "):null,
        tag:cd.tag||(wn.length>1?"DEAD HEAT":wn.length?"":"NO WINNER"),head:cd.head||"",film:cd.film,poster:cd.poster,tall:cd.tall,
        calls:calls.map(function(c){return [c.m,c.dir+" "+c.mag+"%",c.offs]}),story:""});
    }else if(calls.length){PENDING.push({n:n,co:co,ticker:t,called:base.called,resolves:base.resolves,timing:base.timing,calls:calls,status:"calls-in"})}
    else{UPCOMING.push({n:n,co:co,ticker:t,called:base.called,resolves:base.resolves,timing:base.timing,lockAt:(TIMES[t]||{}).lock||null})}
  });
  LADDER=MODEL_KEYS.filter(function(m){return tally[m].n}).map(function(m){var T=tally[m];return {m:m,won:T.won,dir:T.right+" / "+T.n,avg:(T.err/T.n).toFixed(2)}})
    .sort(function(x,y){return (y.won-x.won)||(parseFloat(x.avg)-parseFloat(y.avg))});
  NEXT=UPCOMING[0]||PENDING[0]||null;
}
// REPORT TIME column (optional in the sheet): BMO = before the market opens, AMC = after it closes, DURING = in market hours
function timingLabel(t){return {BMO:"Before the open",AMC:"After the close",DURING:"During market hours"}[t]||""}
function nextLabel(u){return "Round "+u.n+" · "+u.co}
function parseCSV(t){var rows=[],r=[],f="",q=false;for(var i=0;i<t.length;i++){var ch=t[i];if(q){if(ch==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=ch}else if(ch==='"')q=true;else if(ch===","){r.push(f);f=""}else if(ch==="\n"||ch==="\r"){if(ch==="\r"&&t[i+1]==="\n")i++;r.push(f);rows.push(r);r=[];f=""}else f+=ch}if(f!==""||r.length){r.push(f);rows.push(r)}return rows.filter(function(x){return x.some(function(c){return String(c).trim()!==""})})}
build(SHEET_HEADER,SHEET);
ROUNDS.forEach(function(r){var f=FILMS[r.n];if(f){r.film=f.f;r.poster=f.p;r.tall=!!f.tall;r.pan=f.pan||null}});
function filmTag(r,attrs){return '<video '+(attrs||'playsinline muted loop preload="metadata"')+' poster="'+MEDIA+r.poster+'.jpg"><source src="'+MEDIA+r.film+'.webm" type="video/webm"><source src="'+MEDIA+r.film+'.mp4" type="video/mp4"></video>'}
function winLogos(r){return r.win?r.win.split(" & ").map(function(m){return logo(m)}).join(""):""}
function callOf(r,m){var c=r.calls.filter(function(c){return c[0]===m})[0];return c}
