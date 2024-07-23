const http = require("node:http");

const PORT = 9000; 
const ADDR = "localhost";

const server = http.createServer();

server.on("request", (req, res) => {

    if(req.url === "/" && req.method === "GET"){

        res.setHeader("Content-Type", "text/html");
        

    };

});

server.listen(PORT, ADDR, () => {
   console.log("listening"); 
});

