// node serve.js <root> <port>: a static server that answers Range requests (206), as the real hosting does, so the film can seek.
const http=require('http'),fs=require('fs'),path=require('path');const ROOT=path.resolve(process.argv[2]),PORT=+process.argv[3];
const T={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.mp4':'video/mp4','.webm':'video/webm','.woff2':'font/woff2','.ttf':'font/ttf'};
http.createServer((q,r)=>{let f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));if(!f.startsWith(ROOT)){r.writeHead(403);return r.end()}
  fs.stat(f,(e,st)=>{if(e||!st.isFile()){r.writeHead(404);return r.end()}const ty=T[path.extname(f).toLowerCase()]||'application/octet-stream',m=/bytes=(\d*)-(\d*)/.exec(q.headers.range||'');
    if(m){const a=m[1]?+m[1]:0,b=m[2]?Math.min(+m[2],st.size-1):st.size-1;r.writeHead(206,{'Content-Type':ty,'Content-Range':`bytes ${a}-${b}/${st.size}`,'Accept-Ranges':'bytes','Content-Length':b-a+1});fs.createReadStream(f,{start:a,end:b}).pipe(r)}
    else{r.writeHead(200,{'Content-Type':ty,'Accept-Ranges':'bytes','Content-Length':st.size});fs.createReadStream(f).pipe(r)}})}).listen(PORT,'127.0.0.1');
