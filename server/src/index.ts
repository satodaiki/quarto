import './preStart'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import { Request, Response } from 'express';

import GameField from './domain/models/GameField';
import Player from './domain/models/Player';

import http from 'http';
import socketio from 'socket.io';

const games: {
    roomId: string,
    playerA: Player,
    playerB?: Player,
    gameField?: GameField
}[] = [];

app.get('/count_rooms', (req: Request, res: Response) => {
    res.send('ken');
});

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
    socket.on('joinRoom',
    (roomId: string, userId: string, userName: string, firstStrike = false) => {
        socket.join(roomId);
        // 先攻は必ず最初にemitされる
        if (firstStrike) {
            games.push({ roomId: roomId, playerA: new Player(userId, userName) });
        } else {
            const i = games.findIndex(game => game.roomId === roomId);
            if (i !== -1) {
                const playerB = new Player(userId, userName);
                games[i].playerB = playerB
                games[i].gameField = new GameField(games[i].playerA, playerB);
            }
        }
        const personCount = io.sockets.adapter.rooms[roomId].length;
        io.to(roomId).emit('roomPersonCount', personCount);
    });

    socket.on('leaveRoom', (roomId: string) => {
        socket.leave(roomId);
        io.to(roomId).emit('leavePlayer', null);
    });

    socket.on('resetRoom', (roomId: string) => {
        logger.info('resetRoom: ' + roomId);
        const i = games.findIndex(game => game.roomId === roomId);
        if (i !== -1) {
            games[i].gameField = new GameField(games[i].playerA, games[i].playerB!);
        }
        io.to(roomId).emit('resetRoom', null);
    });

    socket.on('syncGameField', (roomId: string) => {
        const i = games.findIndex(game => game.roomId === roomId);
        if (i !== -1) {
            io.to(roomId).emit('boardState', games[i].gameField?.boardState);
            io.to(roomId).emit('phase', games[i].gameField?.phase);
            io.to(roomId).emit('pieces', {
                pieces: games[i].gameField?.pieces,
                selectPieceId: games[i].gameField?.currentPlayer.pieceId,
            });
            io.to(roomId).emit('getCurrentPlayer', games[i].gameField?.currentPlayer);
        }
    });

    socket.on('judgeResult', (roomId: string) => {
        const i = games.findIndex(game => game.roomId === roomId);
        if (i !== -1) {
            io.to(roomId).emit('getJudgeResult', games[i].gameField?.getJudgeResult());
        }
    })

    socket.on('setPiece', (roomId: string, width: number, height: number) => {
        const i = games.findIndex(game => game.roomId === roomId);
        if (i !== -1) {
            games[i].gameField?.setPiece(width, height);
        }
    })

    socket.on('selectPiece', (roomId: string, selectPieceId: number) => {
        const i = games.findIndex(game => game.roomId === roomId);
        if (i !== -1) {
            games[i].gameField?.selectPiece(selectPieceId);
        }
    })
});

// Start the server
const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
