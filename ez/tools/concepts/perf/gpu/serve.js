// node serve.js <port> [map...]: serves ez/ ; each map "name=/abs/file.html" serves that file at /name (so a page snapshot can be measured while others rebuild).
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../../../..');const [port,...maps]=process.argv.slice(2);const M={};maps.forEach(m=>{const [k,v]=m.split('=');M['/'+k]=v});
const T={'.html':'text/html','.js':'application/javascript','.css':'text/css','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.mp4':'video/mp4','.webm':'video/webm','.json':'application/json','.woff2':'font/woff2'};
http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);let f=M[u]||path.join(ROOT,u);
 fs.stat(f,(e,st)=>{if(e||!st.isFile()){r.writeHead(404);return r.end()}const ty=T[path.extname(f)]||'application/octet-stream';
  const rg=q.headers.range;if(rg){const m=/bytes=(\d*)-(\d*)/.exec(rg);let s=+m[1]||0,en=m[2]?+m[2]:st.size-1;r.writeHead(206,{'Content-Type':ty,'Content-Range':`bytes ${s}-${en}/${st.size}`,'Accept-Ranges':'bytes','Content-Length':en-s+1});return fs.createReadStream(f,{start:s,end:en}).pipe(r)}
  r.writeHead(200,{'Content-Type':ty,'Content-Length':st.size,'Accept-Ranges':'bytes'});fs.createReadStream(f).pipe(r)})}).listen(+port);
