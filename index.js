var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');  
});

app.get('/app', function(req, res){
    res.sendFile(__dirname + '/app.html');  
});

io.on('connection', function(socket){
    // let token = socket.handshake.query.token;
    console.log(socket.id , 'user connected');

    // On message
    socket.on('new', function(token){
        console.log(token, " recieved");
        socket.join(token);
    });

    socket.on('appconn', function(token){
        console.log(" App trying to connect to : " , token);
        socket.join(token);
    });

    socket.on('message', function(data){
        console.log(" Recieved token ", data.token, " message: ", data.message);
        socket.to(data.token).emit('message', data.message);
    })
    // On disconnect
    socket.on('disconnect', function(){
        console.log(socket.id, 'user disconnected');
    });
 
});
  
http.listen(port, function(){
    console.log('listening on *:',port);
});