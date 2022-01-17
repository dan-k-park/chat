"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const logger_1 = __importDefault(require("./utils/logger"));
const EVENTS = {
    connection: "connection",
    CLIENT: {
        CREATE_ROOM: "CREATE_ROOM",
        SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    },
    SERVER: {
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED_ROOM",
        ROOM_MESSAGE: "ROOM_MESSAGE",
    },
};
const rooms = {};
const socket = ({ io }) => {
    logger_1.default.info("Sockets enabled");
    io.on(EVENTS.connection, (socket) => {
        logger_1.default.info(`User connected ${socket.id}`);
        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
            console.log({ roomName });
            const roomId = (0, nanoid_1.nanoid)();
            rooms[roomId] = {
                name: roomName,
            };
            socket.join(roomId);
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
            socket.emit(EVENTS.SERVER.ROOMS, rooms);
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        });
        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({ roomId, message, username }) => {
            const date = new Date();
            socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                message,
                username,
                time: `${date.getHours()}:${date.getMinutes()}`,
            });
        });
    });
};
exports.default = socket;
//# sourceMappingURL=socket.js.map