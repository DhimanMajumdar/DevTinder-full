import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Send } from "lucide-react";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          createdAt,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
      setMessages((prev) => [
        ...prev,
        { firstName, lastName, text, createdAt: createdAt || new Date() },
      ]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[calc(100vh-80px)] md:h-[85vh] flex flex-col bg-gradient-to-br mb-2 from-gray-900 to-gray-800 border border-gray-700/50 rounded-none md:rounded-xl shadow-2xl overflow-hidden p-3 md:p-5">
      {/* Header */}
      <h1 className="text-lg md:text-xl font-semibold text-white border-b border-gray-700 pb-3 mb-3">
        Chat Room
      </h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-2 md:p-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="text-gray-400 text-center mt-20">No messages yet</div>
        ) : (
          messages.map((msg, index) => {
            const isCurrentUser = user.firstName === msg.firstName;
            return (
              <div
                key={index}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] md:max-w-[60%] p-3 md:p-4 rounded-2xl shadow ${
                    isCurrentUser
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium">
                      {msg.firstName} {msg.lastName}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                  <p className="text-xs opacity-60 mt-2 text-right">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-4 flex items-center gap-2 border-t border-gray-700 pt-3">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-800/70 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg shadow hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
