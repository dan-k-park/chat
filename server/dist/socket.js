"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./utils/logger"));
const EVENTS = {
    connection: "connection",
};
function socket({ io }) {
    logger_1.default.info("Sockets enabled");
    io.on(EVENTS.connection, (socket) => {
        logger_1.default.info(`User connected ${socket.id}`);
    });
}
exports.default = socket;
//# sourceMappingURL=socket.js.map