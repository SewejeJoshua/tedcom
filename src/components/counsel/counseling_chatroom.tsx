import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import {
  Send,
  Shield,
  Loader2,
  ArrowLeft,
} from "lucide-react";

const API =
  import.meta.env.VITE_TEDCOM_API ||
  "https://tedcom-backend-system.onrender.com";

interface ChatMessage {
  id: number;
  senderId: number;
  senderName: string;
  message: string;
  created_at: string;
}

export default function CounselingChatroom() {
  const navigate = useNavigate();
  const { id } = useParams();

  const caseId = Number(id);

  const token =
    localStorage.getItem("access") ||
    sessionStorage.getItem("access");

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const ws = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const loadMessages = async () => {
    if (!caseId || !token) return;

    try {
      setLoading(true);

      const res = await api.get(
        `${API}/api/counseling/cases/${caseId}/messages/`,
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

  useEffect(() => {
    loadMessages();
  }, [caseId]);

  useEffect(() => {
    if (!caseId || !token) return;

     

    const socket = new WebSocket(
  `wss://tedcom-backend-system.onrender.com/ws/counseling/${caseId}/?token=${token}`
);

    ws.current = socket;

    socket.onopen = () => {
      console.log("✅ Counseling WebSocket connected");
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
          const exists = prev.some(
            (m) => m.id === msg.id
          );

          return exists ? prev : [...prev, msg];
        });

        setTimeout(scrollToBottom, 100);
      } catch (err) {
        console.error("WebSocket parse error:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = (event) => {
      console.log(
        "WebSocket closed:",
        event.code,
        event.reason
      );

      setConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [caseId, token]);
    const sendMessage = () => {
    const text = message.trim();

    if (!text) return;

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isMine = (msg: ChatMessage) => {
    return (
      msg.senderName === "You" ||
      msg.senderName === "Me"
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/counsel")}
            className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Counseling Chat
            </h1>

            <p className="text-sm text-gray-500">
              Anonymous • Secure Conversation
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2">

          <Shield className="w-4 h-4 text-emerald-600" />

          <span
            className={`text-sm font-semibold ${
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
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50">

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
              const mine = isMine(msg);

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    mine ? "justify-end" : "justify-start"
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
                      {new Date(msg.created_at).toLocaleTimeString([], {
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