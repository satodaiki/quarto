import './preStart'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';

import http from 'http';
import socketio from 'socket.io';

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
    socket.on("hoge_message", (msg: string) => {
        io.emit("hoge_message", msg);
    });
})

// Start the server
const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
