var path = require("path");
var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Chỉ ra đường dẫn chứa css, js, images...
app.use(express.static(path.join(__dirname, 'public')));

//Tạo router
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/views/chat.html'));
});

//Tạo socket 
io.on('connection', function (socket) {
    console.log('Welcome to server chat');

    // sự kiện send là sự kiện khi client gửi message thì server sẽ nhận được 
    // và gửi data sang các kết nối khác đến server (đây chính là phần realtime cuả socket).
    socket.on('send', function (data) {
        io.sockets.emit('send', data);
    });
});

//Khởi tạo 1 server listen tại 1 port
server.listen(3000);