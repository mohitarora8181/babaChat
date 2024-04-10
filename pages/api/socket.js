import { Server } from 'socket.io';
const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io');
        const io = new Server(res.socket.server);
        io.on("connection", (socket) => {
            socket.on("disconnecting", () => {
                socket.broadcast.emit("user-disconnected","disconnected")
            });
            socket.on("newUserJoined", (name) => {
                socket.broadcast.emit("newUser", { id: socket.id, name: name });
            });
            socket.on("send-message", (obj) => {
                socket.broadcast.emit("receive-message", obj);
            });
        });

        res.socket.server.io = io;
    } else {
        console.log('socket.io already running');
    }
    res.end();
};

export const config = {
    api: {
        bodyParser: false
    }
};

export default ioHandler;