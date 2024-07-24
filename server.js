const VX = require("./VXIII");

const ADDR = "localhost"
const PORT = 9000;

const server = new VX();        // new object for class

server.route("GET", "/", (req,res)=>{
    res.sendFile("./public/index.html", "text/html");
});

server.route("GET", "/styles.css", (req,res)=>{
    res.sendFile("./public/styles.css", "text/css");
});

server.route("GET", "/scripts.js", (req,res)=>{
    res.sendFile("./public/scripts.js", "text/javascript");
});

server.route("POST", "/login", (req,res)=>{
    res.status(404).json({"error" : "Not Found"});
});
server.listen(PORT,ADDR,()=>{
    console.log("Listening on Port:" + PORT);
});


