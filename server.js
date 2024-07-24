const XV = require("./VXIII");

const USERS = [
    {id: 1, name: "admin", password: "admin"},
    {id: 2, name: "user", password: "user"},
    {id: 3, name: "guest", password: "guest"},
];

const POSTS = [
    {
        id: 1, 
        title: "Post 1",    
        body: "Advanced Persistent Threats (APTs) are sophisticated, covert, and continuous computer hacking processes, often orchestrated by persons targeting a specific entity. APTs are typically launched by highly skilled adversaries, such as nation-states or organized crime groups, with the intent to steal information or monitor network activities over extended periods without being detected."
    },
];

const ADDR = "localhost"
const PORT = 8000;

const server = new XV();

// ---------- FILE ROUTES ------------- // 

server.route("GET", "/", (req,res)=>{
    res.sendFile("./public/index.html", "text/html");
});

server.route("GET", "/styles.css", (req,res)=>{
    res.sendFile("./public/styles.css", "text/css");
});

server.route("GET", "/scripts.js", (req,res)=>{
    res.sendFile("./public/scripts.js", "text/javascript");
});

// ---------- JSON ROUTES ------------- //

server.route("GET", "/api/posts", (req,res)=>{

    const posts = POSTS.map((post)=>{

        const user = USERS.find((user)=>{
            return user.id === post.id;
        });

        post.author = user.name;
        return post;

    });

    res.status(200).json(posts);
});

server.listen(PORT,ADDR,()=>{
    console.log("Listening on Port:" + PORT);
});