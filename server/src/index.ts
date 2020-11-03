import './preStart'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';

import http from 'http';
import socketio from 'socket.io';

const server = http.createServer(app);
const io = socketio(server);

// 仮でルームのストア
let room = [];

io.on("connection", (socket) => {
    socket.on('create_room', (roomId: string) => {
        // const roomId = zeroPadding(room.length, 5);
        socket.join(roomId);
        const personCount = io.sockets.adapter.rooms[roomId].length;
        io.to(roomId).emit('room_person_count', personCount);
    });

    socket.on('message', (data: { text: string }) => {
        console.log('data: ', data);
        console.log('data.text: ', data.text);
        io.emit('receiveMessage', data.text);
    });
});

// Start the server
const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
