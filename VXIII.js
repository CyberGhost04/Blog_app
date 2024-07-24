const http = require("node:http");
const fs = require("node:fs/promises");

class VXIII {

    constructor(){
        this.server = http.createServer();

        this.routes = {};       // stores { "GET/upload" : ()=>{...}, "PUT/file" : ()=>{} }

        this.server.on("request",(req,res)=>{
            res.sendFile = async(path,mime) =>{
                const filehandle = await fs.open(path, "r");
                const rdStream = filehandle.createReadStream();

                res.setHeader("Content-Type", mime);
                rdStream.pipe(res);
            };

            res.status = (code) =>{
                res.statusCode = code;
                return res;
            };

            res.json = (body) => {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(body));
                return res;
            };

            // if the route is not found
            if(!this.routes[req.method.toUpperCase() + req.url]){
                return res.status(404).json({error : "Not Found"});
            }

            this.routes[req.method.toUpperCase() + req.url](req,res);    
        });

    }

    route(method,path,callback){
        this.routes[method + path] = callback;

    };

    listen(port,addr,callback){
        this.server.listen(port,addr,()=>{
            callback();
        });
    };

}

module.exports = VXIII; 