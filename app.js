const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});


io.on("connection", function (socket)  {
    socket.on("send-location", function (data) {
       io.emit("receive-location", {id: socket.id, ...data});
    });

    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id);
    });


    console.log("connected");
});

app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server started on port 3000");
});
