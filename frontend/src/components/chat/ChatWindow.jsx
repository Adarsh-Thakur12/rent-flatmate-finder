import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import socket from "../../socket/socket";

import {
    getMessages,
} from "../../services/api/chat.api";

import { AuthContext } from "../../context/AuthContext";

function ChatWindow({ bookingId }) {

    const { user } = useContext(AuthContext);

    const currentUserId = user?._id;

    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState("");

    const messagesEndRef = useRef(null);

    useEffect(() => {

        fetchMessages();

        socket.emit(
            "join-room",
            bookingId
        );

        socket.on(
            "receive-message",
            (newMessage) => {

                setMessages(prev => [

                    ...prev,

                    newMessage,

                ]);

            }
        );
        socket.on(
            "message-error",
            (error) => {

                toast.error(error);

            }
        );

      return () => {

        socket.off("receive-message");

        socket.off("message-error");

    };

    }, [bookingId]);

    const fetchMessages = async () => {

        try {

            const data = await getMessages(
                bookingId
            );

            setMessages(
                data.chats
            );

        } catch (error) {

            toast.error(
                "Failed to load chat"
            );

        }

    };
        // ==========================
    // Auto Scroll
    // ==========================

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);

    // ==========================
    // Send Message
    // ==========================

    const handleSend = () => {

      if (!message.trim() || !currentUserId) return;

        socket.emit("send-message", {

            bookingId,

            senderId: currentUserId,

            message,

        });

        setMessage("");

    };

    return (

        <div className="bg-white rounded-xl shadow-lg h-[75vh] flex flex-col">

            {/* Header */}

            <div className="border-b p-5">

                <h2 className="text-2xl font-bold">

                    Chat

                </h2>

            </div>

            {/* Messages */}

            <div className="flex-1 overflow-y-auto p-5 space-y-4">

                {

                    messages.map((msg) => (

                        <div

                            key={msg._id}

                            className={`flex ${
                                msg.sender?._id === currentUserId

                                    ? "justify-end"

                                    : "justify-start"
                            }`}

                        >

                            <div

                                className={`max-w-[70%] px-4 py-3 rounded-xl ${
                                    msg.sender?._id === currentUserId

                                        ? "bg-blue-600 text-white"

                                        : "bg-gray-200 text-black"
                                }`}

                            >

                                <p>

                                    {msg.message}

                                </p>

                                <p className="text-xs mt-2 opacity-70">

                                    {

                                        new Date(

                                            msg.createdAt

                                        ).toLocaleTimeString([], {

                                            hour: "2-digit",

                                            minute: "2-digit",

                                        })

                                    }

                                </p>

                            </div>

                        </div>

                    ))

                }

                <div ref={messagesEndRef}></div>

            </div>

            {/* Input */}

            <div className="border-t p-4 flex gap-3">

                <input

                    type="text"

                    value={message}

                    onChange={(e) =>
                        setMessage(e.target.value)
                    }

                    onKeyDown={(e) => {

                        if (e.key === "Enter") {

                            handleSend();

                        }

                    }}

                    placeholder="Type a message..."

                    className="flex-1 border rounded-lg px-4 py-3 outline-none"

                />

                <button

                    onClick={handleSend}

                    className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"

                >

                    Send

                </button>

            </div>

        </div>

    );

}

export default ChatWindow;