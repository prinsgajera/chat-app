const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

http.listen(PORT);

app.use(express.static(__dirname+"/public"));

app.get('/' , (req,res,next)=>{
    res.sendFile(__dirname + "/index.html");
})

io.on('connection',(socket)=>{
        socket.on('message',(msg)=>{
            socket.broadcast.emit('message',msg);
        })
})