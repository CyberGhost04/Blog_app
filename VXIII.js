const http = require("node:http");

class VXIII {

    constructor(){
        this.server = http.createServer();

    }

    listen = (port,addr,callback) => {
        this.server.listen(port,addr,()=>{
            callback();
        });
    };

}

module.exports = VXIII; 