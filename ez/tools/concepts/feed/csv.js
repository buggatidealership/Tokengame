// tiny RFC 4180 reader for calls.csv (quotes, doubled quotes, commas and newlines inside quotes)
module.exports=function(s){const R=[];let row=[],f='',q=false;for(let i=0;i<s.length;i++){const c=s[i];
  if(q){if(c==='"'){if(s[i+1]==='"'){f+='"';i++}else q=false}else f+=c}
  else if(c==='"')q=true;else if(c===','){row.push(f);f=''}else if(c==='\n'){row.push(f);R.push(row);row=[];f=''}else if(c!=='\r')f+=c}
  if(f||row.length){row.push(f);R.push(row)}const H=R.shift();return R.filter(r=>r.length>1).map(r=>Object.fromEntries(H.map((h,i)=>[h,r[i]])))};
