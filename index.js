var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');  
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
  
http.listen(3000, function(){
    console.log('listening on *:3000');
});