import { saveMessageService } from "../services/chat.service.js";

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

            console.log(
                `${socket.id} joined room ${bookingId}`
            );

        });

        // ============================
        // Send Message
        // ============================
        socket.on(
            "send-message",
            async (data) => {

                try {

                    const {

                        bookingId,

                        senderId,

                        message,

                    } = data;

                    const result =
                        await saveMessageService(

                            bookingId,

                            senderId,

                            message

                        );

                    if (!result.success) {

                        socket.emit(
                            "message-error",
                            result.message
                        );

                        return;

                    }

                    const chat = result.chat;

                    io.to(bookingId).emit(
                        "receive-message",
                        chat
                    );

                } catch (error) {

                    console.error(error);

                    socket.emit(
                        "message-error",
                        "Failed to send message"
                    );

                }

            }
        );

        // ============================
        // Disconnect
        // ============================
        socket.on("disconnect", () => {

            console.log(
                "User Disconnected:",
                socket.id
            );

        });

    });

};

export const getIO = () => {

    if (!io) {

        throw new Error(
            "Socket.IO not initialized"
        );

    }

    return io;

};