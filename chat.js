
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

var socket = io('https://socket-bt.herokuapp.com:'+port+'?token=abc');
$('form').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('abc', $('#m').val());
    $('#m').val('');
    return false;
});