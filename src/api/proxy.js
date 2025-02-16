const http = require("http");
const httpProxy = require("http-proxy");
require("dotenv").config();

const PORT_PROXY = process.env.PORT_PROXY || 3000;
const BACKEND_MAIN = process.env.BACKEND_MAIN;
const BACKEND_PAYMENTS = process.env.BACKEND_PAYMENTS;
const BACKEND_NOTIFICATIONS = process.env.BACKEND_NOTIFICATIONS;
const BACKEND_IMAGES = process.env.BACKEND_IMAGES;

const proxy = httpProxy.createProxyServer();

const server = http.createServer((req, res) => {
    let target = null;

    if (req.url.startsWith("/api/main")) {
        req.url = req.url.replace("/api/main", "");
        target = BACKEND_MAIN;

    } else if (req.url.startsWith("/api/payments")) {
        req.url = req.url.replace("/api/payments", "");
        target = BACKEND_PAYMENTS;

    } else if (req.url.startsWith("/api/notifications")) {
        req.url = req.url.replace("/api/notifications", "");
        target = BACKEND_NOTIFICATIONS;

    } else if (req.url.startsWith("/api/images")) {
        req.url = req.url.replace("/api/images", "");
        target = BACKEND_IMAGES;

    }else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
        return;
    }

    proxy.web(req, res, { target, changeOrigin: true }, (err) => {
        console.error(`Error en la conexión con ${target}:`, err.message);
        res.writeHead(502, { "Content-Type": "text/plain" });
        res.end("Error en el servidor proxy");
    });
});

server.listen(PORT_PROXY, () => {
    console.log(`Proxy server running on port ${PORT_PROXY}`);
});
