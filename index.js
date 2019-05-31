const express = require("express")
const socket = require ("socket.io")

// app config

const app = express();

const server = app.listen(3000,()=>console.log("Lestening..."))

// Statci files
app.use(express.static("public"));

app.get("/:user",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})
// socket config

const io = socket(server);

io.on("connection",(socket)=>{
    console.log("Connection made ..",socket.id)
    socket.on("chat",(data)=>{
        io.sockets.emit("chat",data)
    })

    socket.on("typing",(data)=>{
        socket.broadcast.emit("typing",data)
    })
})

