const express = require("express")
const path = require("path")

const app = express()
const port = 3000
const host = "localhost"
const server = app.listen(port, host, () => {
    console.log(`Server online on http://${host}:${port}`);
})
app.use(express.static(path.join(__dirname, 'public')))

const io = require("socket.io")(server)
let socketConnected = new Set()
io.on("connection", onConnected)

function onConnected(socket) {
    console.log(socket.id);
    socketConnected.add(socket.id)
    io.emit("user-online", socketConnected.size)
    
    socket.on("disconnect", () => {
        console.log("Socket disconnetc", socket.id);
        socketConnected.delete(socket.id)
        io.emit("user-online", socketConnected.size)
    })
    
    socket.on("message", (data) => {
        socket.broadcast.emit("chat-message", data)
    })
}