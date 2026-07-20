import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import {
  Send,
  Shield,
  Loader2,
} from "lucide-react";

interface CounselingCase {
  id: number;
  user: number;
  counselor: number | null;
  counselor_name: string | null;
  initial_message: string;
  status: string;
  created_at: string;
}

interface ChatMessage {
  id: number;
  senderId: number;
  senderName: string;
  message: string;
  created_at: string;
}

interface ChatroomProps {
  selectedCase: CounselingCase;
  refreshCases: () => Promise<void>;
}

export default function Chatroom({
  selectedCase,
}: ChatroomProps) {
 // Get token from either storage
const token =
  localStorage.getItem("access") ||
  sessionStorage.getItem("access");

 

const [messages, setMessages] = useState<ChatMessage[]>([]);
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(true);
const [connected, setConnected] = useState(false);

const ws = useRef<WebSocket | null>(null);
const bottomRef = useRef<HTMLDivElement>(null);

// Axios auth header
const auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// Scroll helper
const scrollToBottom = () => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
};

// Load chat history
const loadMessages = async () => {
  if (!selectedCase?.id || !token) return;

  try {
    setLoading(true);

    const res = await api.get(
      `https://tedcom-backend-system.onrender.com/api/counseling/cases/${selectedCase.id}/messages/`,
      auth
    );

    const history: ChatMessage[] = res.data.map((msg: any) => ({
      id: msg.id,
      senderId: msg.sender,
      senderName: msg.sender_name,
      message: msg.message,
      created_at: msg.created_at,
    }));

    setMessages(history);

    setTimeout(scrollToBottom, 100);
  } catch (err) {
    console.error("Unable to load messages:", err);
  } finally {
    setLoading(false);
  }
};

// Load messages when case changes
useEffect(() => {
  if (selectedCase?.id) {
    loadMessages();
  }
}, [selectedCase?.id]);

// WebSocket connection
useEffect(() => {
  if (!selectedCase?.id || !token) return;

  const socket = new WebSocket(
    `wss://tedcom-backend-system.onrender.com/ws/counseling/${selectedCase.id}/?token=${token}`
  );

  ws.current = socket;

 socket.onopen = () => {
  console.log("✅ WebSocket OPEN");
  setConnected(true);
};

socket.onmessage = (event) => {
  

  try {
    const payload = JSON.parse(event.data);

    if (payload.type !== "message") return;

    const msg: ChatMessage = {
      id: payload.data.id,
      senderId: payload.data.sender.id,
      senderName: payload.data.sender.name,
      message: payload.data.message,
      created_at: payload.data.created_at,
    };

    setMessages((prev) => {
      const exists = prev.some((m) => m.id === msg.id);
      return exists ? prev : [...prev, msg];
    });
  } catch (err) {
    console.error(err);
  }
};

socket.onerror = (event) => {
  console.log("❌ ERROR", event);
};

socket.onclose = (event) => {
  console.log("🔒 CLOSED", event.code, event.reason);
  setConnected(false);
};

  return () => {
    socket.close();
  };
}, [selectedCase?.id, token]);

// Send message
const sendMessage = () => {
  const text = message.trim();

  if (!text) return;

  if (!token) {
    alert("Please login first.");
    return;
  }

  if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
    alert("Connection is not ready yet.");
    return;
  }

  try {
    ws.current.send(
      JSON.stringify({
        message: text,
      })
    );

    setMessage("");
  } catch (err) {
    console.error("Unable to send message:", err);
  }
};

// Auto scroll when messages update
useEffect(() => {
  scrollToBottom();
}, [messages]);

    return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 p-5 bg-white">

        <div>

          <h2 className="text-lg font-bold text-gray-900">
            Counseling Chat
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Anonymous • End-to-end encrypted
          </p>

        </div>

        <div className="flex items-center gap-2">

          <Shield className="w-4 h-4 text-emerald-600" />

          <span
            className={`text-sm font-medium ${
              connected
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >
            {connected ? "Connected" : "Connecting..."}
          </span>

        </div>

      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-6">

        {loading ? (

          <div className="h-full flex items-center justify-center">

            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />

          </div>

        ) : messages.length === 0 ? (

          <div className="h-full flex items-center justify-center text-gray-500">

            No messages yet.

          </div>

        ) : (

          <div className="space-y-4">

            {messages.map((msg) => {

              const mine =
                msg.senderName === "You";

              return (

                <div
                  key={msg.id}
                  className={`flex ${
                    mine
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                      mine
                        ? "bg-blue-600 text-white rounded-tr-md"
                        : "bg-white border border-gray-200 rounded-tl-md"
                    }`}
                  >

                    {!mine && (

                      <p className="text-xs font-semibold text-blue-600 mb-1">
                        {msg.senderName}
                      </p>

                    )}

                    <p className="whitespace-pre-wrap break-words text-sm leading-6">
                      {msg.message}
                    </p>

                    <p
                      className={`text-[11px] mt-2 ${
                        mine
                          ? "text-blue-100"
                          : "text-gray-400"
                      }`}
                    >
                      {new Date(
                        msg.created_at
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>

                  </div>

                </div>

              );

            })}

            <div ref={bottomRef} />

          </div>

        )}

      </div>
            {/* Message Box */}
      <div className="border-t border-gray-200 bg-white p-5">

        <div className="flex items-center gap-3">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type your message..."
            className="flex-1 h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
          />

          <button
            onClick={sendMessage}
            disabled={!connected || !message.trim()}
            className="w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center text-white transition"
          >
            <Send className="w-5 h-5" />
          </button>

        </div>

      </div>

    </div>
  );
}