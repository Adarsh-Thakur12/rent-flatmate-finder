let io;

export const initializeSocket = (socketIo) => {

    io = socketIo;

    io.on("connection", (socket) => {

        console.log("User Connected:", socket.id);

        // ============================
        // Join Room
        // ============================
        socket.on("join-room", (bookingId) => {

            socket.join(bookingId);

            console.log(`${socket.id} joined room ${bookingId}`);

        });

        // ============================
        // Disconnect
        // ============================
        socket.on("disconnect", () => {

            console.log("User Disconnected:", socket.id);

        });

    });

};

export const getIO = () => {

    if (!io) {

        throw new Error("Socket.IO not initialized");

    }

    return io;

};