var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');  
    res.sendFile(__dirname + '/chat.js');
});

io.on('connection', function(socket){
    console.log(socket.id , 'user connected');

    // On disconnect
    socket.on('disconnect', function(){
        console.log(socket.id, 'user disconnected');
    });
    let token = socket.handshake.query.token;

    // On message
    socket.on(token,function(msg){
        console.log(token, socket.id, msg);
    })
});
  
http.listen(port, function(){
    console.log('listening on *:',port);
});