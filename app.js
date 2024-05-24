const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { Server } = require('socket.io');
const { createServer } = require('http');

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('chat message', (msg) => {
        console.log('A new user message: ' + msg);
        io.emit('chat message', msg);
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
