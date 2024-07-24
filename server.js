const VX = require("./VXIII");

const ADDR = "localhost"
const PORT = 9000;

const server = new VX();        // new object for class

server.listen(PORT,ADDR,()=>{
    console.log("Listening on Port:" + PORT);
});


