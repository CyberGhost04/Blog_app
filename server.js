const myFramework = require("./XV.js");

// A sample object in this array would look like:
// { userId: 1, token: 23423423 }
let SESSIONS = [];

const USERS = [
    { id: 1, name: "admin", username: "admin", password: "admin" },
    { id: 2, name: "Meredith Green", username: "sky", password: "string" },
    { id: 3, name: "Ben Adams", username: "ben.poet", password: "string" },
];

const POSTS = [
    {
        id: 1,
        title: "This is a post title",
        body: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        userId: 1,
    },
];

const PORT = 8000;

const server = new myFramework();

// ------ Files Routes ------ //

server.route("get", "/", (req, res) => {
    res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/login", (req, res) => {
    res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/profile", (req, res) => {
    res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
    res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
    res.sendFile("./public/scripts.js", "text/javascript");
});

// ------ JSON Routes ------ //

// Log a user in and give them a token
server.route("post", "/api/login", (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString("utf-8");
    });

    req.on("end", () => {
        body = JSON.parse(body);

        const username = body.username;
        const password = body.password;

        // Check if the user exists
        const user = USERS.find((user) => user.username === username);

        // Check the password if the user was found
        if (user && user.password === password) {
            // At this point, we know that the client is who they say they are

            // Generate a random 10 digit token
            const token = Math.floor(Math.random() * 10000000000).toString();

            // Save the generated token
            SESSIONS.push({ userId: user.id, token: token });

            res.setHeader("Set-Cookie", `token=${token}; Path=/;`);
            res.status(200).json({ message: "Logged in successfully!" });
        } else {
            res.status(401).json({ error: "Invalid username or password." });
        }
    });
});

server.route("get", "/api/user", (req, res) => {

    const token = req.headers.cookie.split("=")[4];
    console.log(token);

    const session = SESSIONS.find((session) => { return session.token === token });
    if (session) {
        // Send the user's profile info
        console.log("Sending user info...");
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

// Send the list of all the posts that we have
server.route("get", "/api/posts", (req, res) => {
    const posts = POSTS.map((post) => {
        const user = USERS.find((user) => user.id === post.userId);
        post.author = user.name;
        return post;
    });

    res.status(200).json(posts);
});

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
