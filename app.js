var express = require("express");
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var pushed = 0;

app.get('/', function(req, res) {
    res.render("index");
});

var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});

var io = require('socket.io')(server);   
var querystring = require('querystring');

// io.sockets.on('connection', function (socket) {
io.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    socket.emit('first_connect',{pushed: pushed})
    
    socket.on("add_push", function (data){
        pushed++;
        io.emit('button_push', {pushed: pushed});
    });

    socket.on("reset_push", function (data){
        pushed = 0;
        io.emit('button_push', {pushed: pushed});
    });

});