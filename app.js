const express = require('express')
const body_parser = require('body-parser')
const app = express().use(body_parser.json())

const cors = require('cors');
const server =  require('http').createServer(app);
server.listen(process.env.PORT || 3000);

const { Server } = require("socket.io");
const io = new Server(server);

const port = server.address().port;

app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('camera_move', data => {
    io.emit('camera_move', data);
  });
});

console.log("connected and listening at http://localhost:%s", port); 

