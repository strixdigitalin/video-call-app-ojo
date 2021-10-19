let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let stream = require("./src/ws/stream.js");
let path = require("path");
let favicon = require("serve-favicon");
const PORT = process.env.PORT || 3000;
app.use(favicon(path.join(__dirname, "src", "favicon.ico")));
app.use("/assets", express.static(path.join(__dirname, "src", "assets")));

// if(process.env.NODE_ENV === 'production'){
//     app.get("*",(req,res )=>{
// res.sendFile(path.resolve(__dirname,"app.js",))
//     })
// }
console.log(__dirname);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

io.of("/stream").on("connection", stream);

server.listen(PORT);

// 1. npm ci
// 2. cd src
// 3. node app.js
// open localhost:3000
