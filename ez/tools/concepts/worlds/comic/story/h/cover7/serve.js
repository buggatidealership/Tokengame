// node serve.js <root> <port> : static server with Range support (python's http.server has none, so a browser cannot seek a video)
const http=require('http'),fs=require('fs'),path=require('path');const ROOT=path.resolve(process.argv[2]||'.'),PORT=+process.argv[3]||8971;
const T={'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.mp4':'video/mp4','.webm':'video/webm','.json':'application/json'};
http.createServer((q,r)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end()}
 const sz=fs.statSync(f).size,ty=T[path.extname(f)]||'application/octet-stream',m=/bytes=(\d*)-(\d*)/.exec(q.headers.range||'');
 if(m){const a=m[1]?+m[1]:0,b=m[2]?+m[2]:sz-1;r.writeHead(206,{'Content-Type':ty,'Content-Range':`bytes ${a}-${b}/${sz}`,'Accept-Ranges':'bytes','Content-Length':b-a+1});fs.createReadStream(f,{start:a,end:b}).pipe(r)}
 else{r.writeHead(200,{'Content-Type':ty,'Accept-Ranges':'bytes','Content-Length':sz});fs.createReadStream(f).pipe(r)}}).listen(PORT);
