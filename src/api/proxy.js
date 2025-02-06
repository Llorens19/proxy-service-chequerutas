const http = require("http");
const httpProxy = require("http-proxy");
require("dotenv").config();

const PORT_PROXY = process.env.PORT_PROXY;
const BACKEND_MAIN = process.env.BACKEND_MAIN ;
const BACKEND_PAYMENTS = process.env.BACKEND_PAYMENTS ;

const proxy = httpProxy.createProxyServer();

const server = http.createServer((req, res) => {
    if (req.url.startsWith("/api/service1")) {
        req.url = req.url.replace("/api/service1", "");
        proxy.web(req, res, {
            target: BACKEND_MAIN,
            changeOrigin: true
        });
    } else if (req.url.startsWith("/api/service2")) {
        req.url = req.url.replace("/api/service2", "");
        proxy.web(req, res, {
            target: BACKEND_PAYMENTS,
            changeOrigin: true
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

server.listen(PORT_PROXY, () => {
    console.log(`Proxy server running on port ${PORT_PROXY}`);
});