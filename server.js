const http = require("node:http");
const fs = require("node:fs/promises");

const PORT = 9000; 
const ADDR = "localhost";

const server = http.createServer();

server.on("request", async(req, res) => {

    if(req.url === "/" && req.method === "GET"){

        res.setHeader("Content-Type", "text/html");
        const file = await fs.open("./public/index.html", "r");
        const ReadStream = file.createReadStream();     // never write directly, always use streams
        
        ReadStream.pipe(res);
    };

    if(req.url === "/styles.css" && req.method === "GET"){

        res.setHeader("Content-Type", "text/css");
        const file = await fs.open("./public/styles.css", "r");
        const ReadStream = file.createReadStream();     // never write directly, always use streams
        
        ReadStream.pipe(res);
    };

    if(req.url === "/scripts.js" && req.method === "GET"){

        res.setHeader("Content-Type", "text/javascript");
        const file = await fs.open("./public/scripts.js", "r");
        const ReadStream = file.createReadStream();     // never write directly, always use streams
        
        ReadStream.pipe(res);
    };

});

server.listen(PORT, ADDR, () => {
   console.log("listening"); 
});

