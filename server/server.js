//creating express server 
const express = require('express');
const path=  require('path');
const app = express();
const server = require('http').createServer(app);   //app.listen(port,()=>{})
const io = require("socket.io")(server);
app.use(express.static(path.join(__dirname,'..','public')));

app.get('/', (req,res)=>{
    res.redirect('/home.html');
})
io.on("connection",function(socket){
socket.on("newuser", function(username){
    socket.broadcast.emit("update",username + "Joined the conversation");
});
socket.on("exituser", function(username){
    socket.broadcast.emit("update",username + "left the conversation");
});
socket.on("chat", function(message){
    socket.broadcast.emit("chat",message);
});
});
server.listen(4000,()=>{
    console.log("server is running on port 4000");
});
