import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import LiveModal from "../live/live_modal";

import {
  ArrowLeft,
  Send,
  Shield,
  Users,
  Wifi,
  WifiOff,
  Play,
  Square,
  MessageCircleOff,
  MessageCircle,
  Video,
} from "lucide-react";


const API_BASE =
  import.meta.env.VITE_TEDCOM_API ||
  import.meta.env.TEDCOM_API ||
  "https://tedcom-backend-system.onrender.com";


// ============================
// TYPES
// ============================

interface Group {
  id: number;
  name: string;
  description: string;
  visibility: string;
  is_paid: boolean;
  amount: string;
  created_at: string;
  creator: number;
  is_admin: boolean;
}


interface Message {
  id: number;
  sender: number;
  sender_email: string;
  content: string;
  created_at: string;
}


interface LiveStatus {
  is_live: boolean;
  room_name: string;
  started_at?: string;
}



// ============================
// COMPONENT
// ============================

export default function ChatRoom() {

  const { state } = useLocation();

  const group: Group | undefined =
    state?.group;


  const token =
    localStorage.getItem("access") ||
    sessionStorage.getItem("access");


  const currentUser = JSON.parse(
    localStorage.getItem("user") ||
    sessionStorage.getItem("user") ||
    "{}"
  );



  // ============================
  // CHAT STATE
  // ============================

  const [messages, setMessages] =
    useState<Message[]>([]);


  const [message, setMessage] =
    useState("");


  const [loading, setLoading] =
    useState(true);


  const [connected, setConnected] =
    useState(false);


  const [chatEnabled, setChatEnabled] =
    useState(true);


  const [sending, setSending] =
    useState(false);


  const [error, setError] =
    useState("");


  const [isAdmin, setIsAdmin] =
    useState(false);



  // ============================
  // LIVE STATE
  // ============================


  const [liveStatus, setLiveStatus] =
    useState<LiveStatus | null>(null);


  const [showLiveModal, setShowLiveModal] =
    useState(false);


  const [liveToken, setLiveToken] =
    useState("");


  const [liveServerUrl, setLiveServerUrl] =
    useState("");


  const [liveRoomName, setLiveRoomName] =
    useState("");


  const [checkingLive, setCheckingLive] =
    useState(false);


  const [joiningLive, setJoiningLive] =
    useState(false);


  const [startingLive, setStartingLive] =
    useState(false);


  const [stoppingLive, setStoppingLive] =
    useState(false);



  // ============================
  // REFS
  // ============================


  const socket =
    useRef<WebSocket | null>(null);


  const reconnect =
    useRef(true);


  const bottomRef =
    useRef<HTMLDivElement | null>(null);



  // ============================
  // SCROLL
  // ============================


  const scrollToBottom = () => {

    requestAnimationFrame(() => {

      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });

    });

  };



  // ============================
  // LOAD HISTORY
  // ============================


  const loadHistory = async () => {

    if (!group || !token) return;


    try {

      setLoading(true);
      setError("");


      const res = await fetch(
        `${API_BASE}/api/chat/${group.id}/history/`,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );


      if(!res.ok){

        throw new Error(
          "Failed to load messages"
        );

      }


      const data =
        await res.json();


      setMessages(
        Array.isArray(data)
          ? data
          : []
      );


    } catch(err:any){

      setError(
        err.message ||
        "Unable to load chat"
      );


    } finally {

      setLoading(false);

      scrollToBottom();

    }

  };



  // ============================
  // WEBSOCKET CONNECTION
  // ============================


  const connectSocket = () => {


    if(!group || !token)
      return;



    if(
      socket.current &&
      (
        socket.current.readyState === WebSocket.OPEN ||
        socket.current.readyState === WebSocket.CONNECTING
      )
    ){

      return;

    }



    const ws = new WebSocket(

      `wss://tedcom-backend-system.onrender.com/ws/chat/${group.id}/?token=${token}`

    );


    socket.current = ws;



    ws.onopen = () => {

      setConnected(true);

      setError("");

    };



    ws.onerror = () => {

      setConnected(false);

    };



    ws.onclose = () => {

      setConnected(false);


      if(!reconnect.current)
        return;


      setTimeout(
        connectSocket,
        3000
      );

    };



    ws.onmessage = (event)=>{
 

      try{


        const payload =
          JSON.parse(event.data);



        if(payload.error){


          if(
            payload.error ===
            "Chat disabled"
          ){

            setChatEnabled(false);

          }
          else{

            setError(
              payload.error
            );

          }


          return;

        }




        if(
          payload.type !==
          "message"
        )
          return;



        const incoming: Message = {

          id:
            payload.data.id,


          sender:
            payload.data.sender.id,


          sender_email:
            payload.data.sender.email,


          content:
            payload.data.content,


          created_at:
            payload.data.created_at,

        };



        setMessages(prev=>{


          if(
            prev.some(
              item =>
              item.id === incoming.id
            )
          ){

            return prev;

          }


          return [
            ...prev,
            incoming
          ];

        });



        scrollToBottom();



      }catch(err){

        console.error(
          "Socket error:",
          err
        );

      }


    };


  };
    // ============================
  // SEND MESSAGE
  // ============================

 const sendMessage = () => {
  console.log("SEND CLICKED");

  if (!socket.current) return;

  console.log("READY STATE:", socket.current.readyState);

  const text = message.trim();

  if (!text) return;

  const payload = {
    message: text,
  };

  console.log("SENDING PAYLOAD:", payload);

  socket.current.send(JSON.stringify(payload));

  console.log("SENT");

  setMessage("");
};





  // ============================
  // TOGGLE CHAT ADMIN
  // ============================


  const toggleChat = async()=>{


    if(!group || !token)
      return;



    try{


      const res =
        await fetch(

          `${API_BASE}/api/groups/${group.id}/toggle-chat/`,

          {
            method:"POST",

            headers:{
              Authorization:
              `Bearer ${token}`,
            },

          }

        );



      const data =
        await res.json();



      if(!res.ok){

        throw new Error(
          data.message ||
          "Toggle failed"
        );

      }



      setChatEnabled(
        data.is_chat_active
      );


    }catch(err:any){

      setError(
        err.message
      );

    }


  };





  // ============================
  // CHECK LIVE STATUS
  // ============================


  const checkLiveStatus =
  async()=>{


    if(!group || !token)
      return;



    try{


      setCheckingLive(true);



      const res =
        await fetch(

          `${API_BASE}/api/live/${group.id}/status/`,

          {
            headers:{
              Authorization:
              `Bearer ${token}`,
            },
          }

        );



      const data:LiveStatus =
        await res.json();



      setLiveStatus(data);



      if(data.room_name){

        setLiveRoomName(
          data.room_name
        );

      }



    }catch(err){

      console.error(err);


    }finally{


      setCheckingLive(false);


    }


  };





  // ============================
  // JOIN LIVE CLASS
  // ============================


  const joinLiveClass =
  async()=>{


    if(!group || !token)
      return;



    try{


      setJoiningLive(true);

      setError("");



      const res =
        await fetch(

          `${API_BASE}/api/live/${group.id}/join/`,

          {

            method:"GET",

            headers:{
              Authorization:
              `Bearer ${token}`,
            },

          }

        );



      const data =
        await res.json();



      if(!res.ok){

        throw new Error(
          data.message ||
          "Join failed"
        );

      }



      setLiveToken(
        data.token
      );


      setLiveServerUrl(
        data.server_url
      );


      setLiveRoomName(
        data.room_name
      );



      setShowLiveModal(true);



    }catch(err:any){


      setError(
        err.message
      );


    }finally{


      setJoiningLive(false);


    }


  };





  // ============================
  // START LIVE ADMIN
  // ============================


  const startLiveClass =
  async()=>{


    if(!group || !token)
      return;



    try{


      setStartingLive(true);

      setError("");



      const statusRes =
        await fetch(

          `${API_BASE}/api/live/${group.id}/status/`,

          {
            headers:{
              Authorization:
              `Bearer ${token}`,
            },
          }

        );



      const status =
        await statusRes.json();



      if(status.is_live){

        await joinLiveClass();

        return;

      }





      const res =
        await fetch(

          `${API_BASE}/api/live/${group.id}/start/`,

          {

            method:"POST",

            headers:{

              Authorization:
              `Bearer ${token}`,

              "Content-Type":
              "application/json",

            },

            body:
              JSON.stringify({}),

          }

        );



      const data =
        await res.json();



      if(!res.ok){

        throw new Error(
          data.message ||
          "Unable to start live"
        );

      }



      setLiveRoomName(
        data.room_name
      );



      await joinLiveClass();



    }catch(err:any){


      setError(
        err.message
      );


    }finally{


      setStartingLive(false);


    }


  };





  // ============================
  // STOP LIVE ADMIN
  // ============================


  const stopLiveClass =
  async()=>{


    if(!group || !token)
      return;



    try{


      setStoppingLive(true);



      const res =
        await fetch(

          `${API_BASE}/api/live/${group.id}/stop/`,

          {

            method:"POST",

            headers:{

              Authorization:
              `Bearer ${token}`,

            },

          }

        );



      const data =
        await res.json();



      if(!res.ok){

        throw new Error(
          data.message ||
          "Unable to stop live"
        );

      }



      setShowLiveModal(false);

      setLiveToken("");

      setLiveServerUrl("");

      setLiveRoomName("");

      setLiveStatus(null);



    }catch(err:any){


      setError(
        err.message
      );


    }finally{


      setStoppingLive(false);


    }


  };





  // ============================
  // INITIAL LOAD
  // ============================


  useEffect(()=>{


    if(!group)
      return;



    reconnect.current = true;



    loadHistory();

    connectSocket();

    checkLiveStatus();



    setIsAdmin(
      group.is_admin
    );



    return ()=>{


      reconnect.current = false;



      if(socket.current){

        socket.current.close();

        socket.current = null;

      }


    };


  },[group]);





  // ============================
  // AUTO SCROLL
  // ============================


  useEffect(()=>{

    scrollToBottom();

  },[messages]);





  // ============================
  // EMPTY STATE
  // ============================


  if(!group){


    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-slate-100
      ">

        <div className="
          bg-white
          rounded-2xl
          shadow
          p-6
          text-center
        ">

          <h2 className="
            text-xl
            font-bold
          ">
            No Class Selected
          </h2>


          <p className="
            text-gray-500
            mt-2
          ">
            Please select a group first
          </p>


        </div>


      </div>

    );


  }
    return (

    <div className="
      flex
      h-screen
      flex-col
      bg-slate-100
      overflow-hidden
    ">


      {/* =========================
          HEADER
      ========================= */}

      <header className="
        flex
        items-center
        justify-between
        gap-3
        bg-white
        border-b
        px-3
        sm:px-6
        py-3
      ">


        {/* LEFT */}

        <div className="
          flex
          items-center
          gap-3
          min-w-0
        ">


          <button
            onClick={() => history.back()}
            title="Go back"
            className="
              p-2
              rounded-xl
              hover:bg-slate-100
              shrink-0
            "
          >

            <ArrowLeft
              className="h-5 w-5"
            />

          </button>




          <div className="
            h-10
            w-10
            rounded-full
            bg-blue-100
            flex
            items-center
            justify-center
            shrink-0
          ">

            <Users
              className="
                h-5
                w-5
                text-blue-600
              "
            />

          </div>



          <div className="
            min-w-0
          ">

            <h2 className="
              font-bold
              text-sm
              sm:text-lg
              truncate
            ">

              {group.name}

            </h2>


            <p className="
              text-xs
              text-gray-500
              truncate
              max-w-[180px]
              sm:max-w-md
            ">

              {group.description}

            </p>


          </div>


        </div>





        {/* RIGHT ACTIONS */}

        <div className="
          flex
          items-center
          gap-2
        ">


          {/* CONNECTION */}

          <div
            title={
              connected
              ? "Connected"
              : "Offline"
            }
            className={`
              p-2
              rounded-xl
              ${
                connected
                ? "text-green-600 bg-green-50"
                : "text-red-600 bg-red-50"
              }
            `}
          >

            {
              connected
              ?
              <Wifi className="h-4 w-4"/>
              :
              <WifiOff className="h-4 w-4"/>
            }


          </div>





          {/* JOIN LIVE */}

          {liveStatus?.is_live && (

            <button
              onClick={joinLiveClass}
              disabled={joiningLive}
              title="Join live class"
              className="
                p-2
                rounded-xl
                bg-green-600
                text-white
                hover:bg-green-700
                disabled:opacity-50
              "
            >

              <Video
                className="h-5 w-5"
              />

            </button>

          )}






          {/* ADMIN */}

          {isAdmin && (

            <div className="
              flex
              items-center
              gap-2
            ">


              <button
                onClick={startLiveClass}
                disabled={startingLive}
                title="Start live"
                className="
                  p-2
                  rounded-xl
                  bg-blue-600
                  text-white
                  hover:bg-blue-700
                  disabled:opacity-50
                "
              >

                <Play
                  className="h-5 w-5"
                />

              </button>





              <button
                onClick={stopLiveClass}
                disabled={stoppingLive}
                title="Stop live"
                className="
                  p-2
                  rounded-xl
                  bg-red-600
                  text-white
                  hover:bg-red-700
                  disabled:opacity-50
                "
              >

                <Square
                  className="h-5 w-5"
                />

              </button>





              <button
                onClick={toggleChat}
                title={
                  chatEnabled
                  ? "Disable chat"
                  : "Enable chat"
                }
                className={`
                  p-2
                  rounded-xl
                  text-white
                  ${
                    chatEnabled
                    ? "bg-red-600"
                    : "bg-green-600"
                  }
                `}
              >

                {
                  chatEnabled
                  ?
                  <MessageCircleOff
                    className="h-5 w-5"
                  />
                  :
                  <MessageCircle
                    className="h-5 w-5"
                  />
                }


              </button>


            </div>

          )}


        </div>


      </header>





      {/* =========================
          MESSAGES
      ========================= */}


      <main className="
        flex-1
        overflow-y-auto
        px-3
        sm:px-6
        py-4
        space-y-3
      ">



        {loading && (

          <p className="
            text-center
            text-gray-500
          ">

            Loading messages...

          </p>

        )}




        {!loading &&
        messages.length === 0 && (

          <div className="
            text-center
            text-gray-500
            mt-10
          ">

            No messages yet

          </div>

        )}




        {messages.map((msg)=>{


          const mine =
            msg.sender_email ===
            currentUser?.email;



          return (

            <div
              key={msg.id}
              className={`
                flex
                ${
                  mine
                  ? "justify-end"
                  : "justify-start"
                }
              `}
            >


              <div
                className={`
                  max-w-[85%]
                  sm:max-w-[70%]
                  rounded-2xl
                  px-4
                  py-3
                  shadow-sm
                  ${
                    mine
                    ?
                    "bg-blue-600 text-white rounded-br-md"
                    :
                    "bg-white border rounded-bl-md"
                  }
                `}
              >


                {!mine && (

                  <p className="
                    text-xs
                    font-semibold
                    text-blue-600
                    mb-1
                  ">

                    {msg.sender_email}

                  </p>

                )}



                <p className="
                  text-sm
                  whitespace-pre-wrap
                  break-words
                ">

                  {msg.content}

                </p>



                <p className={`
                  text-[10px]
                  mt-2
                  ${
                    mine
                    ?
                    "text-blue-100"
                    :
                    "text-gray-400"
                  }
                `}>

                  {
                    new Date(
                      msg.created_at
                    ).toLocaleTimeString()
                  }

                </p>


              </div>


            </div>

          );


        })}





        {error && (

          <div className="
            text-center
          ">

            <span className="
              inline-block
              bg-red-50
              text-red-600
              text-sm
              px-3
              py-2
              rounded-xl
            ">

              {error}

            </span>

          </div>

        )}





        {!chatEnabled && (

          <div className="
            text-center
          ">

            <span className="
              bg-yellow-100
              text-yellow-700
              px-3
              py-2
              rounded-xl
              text-sm
            ">

              Chat disabled by admin

            </span>

          </div>

        )}



        <div ref={bottomRef}/>


      </main>






      {/* =========================
          MESSAGE INPUT
      ========================= */}


      <footer className="
        bg-white
        border-t
        p-3
      ">


        <div className="
          flex
          items-end
          gap-3
        ">



          <textarea

            value={message}

            onChange={(e)=>{

              setMessage(
                e.target.value
              );

              if(error)
                setError("");

            }}


            onKeyDown={(e)=>{

              if(
                e.key === "Enter" &&
                !e.shiftKey
              ){

                e.preventDefault();

                if(
                  connected &&
                  chatEnabled &&
                  !sending
                ){

                  sendMessage();

                }

              }

            }}


            rows={1}

            placeholder={
              !connected
              ?
              "Connecting..."
              :
              chatEnabled
              ?
              "Type message..."
              :
              "Chat disabled"
            }


            disabled={
              !connected ||
              !chatEnabled ||
              sending
            }


            className="
              flex-1
              resize-none
              rounded-xl
              border
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-200
            "

          />





          <button

            onClick={sendMessage}

            disabled={
              !message.trim() ||
              !connected ||
              !chatEnabled ||
              sending
            }


            title="Send message"


            className="
              p-3
              rounded-xl
              bg-blue-600
              text-white
              hover:bg-blue-700
              disabled:bg-gray-300
            "

          >

            <Send
              className="h-5 w-5"
            />

          </button>



        </div>


      </footer>






      {/* LIVE MODAL */}

      {showLiveModal && (

        <LiveModal

          token={liveToken}

          serverUrl={liveServerUrl}

          roomName={liveRoomName}

          onClose={()=>
            setShowLiveModal(false)
          }

        />

      )}



    </div>

  );

}