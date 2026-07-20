import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/axios";

import {
  Send,
  Heart,
  Smile,
  Meh,
  Frown,
  UserCheck,
} from "lucide-react";


import DisplayConcern from "./display_concern";
import ListConcern from "./list_concern";
import ApplyModal from "./apply_modal";



interface CounselingCase {

  id: number;

  user: number;

  counselor: number | null;

  counselor_name: string | null;

  initial_message: string;

  status: string;

  created_at: string;

}



const moods = [

  {
    id:"great",
    icon:Smile,
    label:"Great",
    color:"text-emerald-600 bg-emerald-100",
  },


  {
    id:"okay",
    icon:Meh,
    label:"Okay",
    color:"text-amber-600 bg-amber-100",
  },


  {
    id:"low",
    icon:Frown,
    label:"Low",
    color:"text-purple-600 bg-purple-100",
  },

];





export default function Counsel(){


const navigate = useNavigate();





const [mood,setMood] =
useState("okay");



// Backend role

const [
isCounselor,
setIsCounselor
] = useState(false);



const [
checkingRole,
setCheckingRole
] = useState(true);





const [
showApplyModal,
setShowApplyModal
] = useState(false);





const [
cases,
setCases
] = useState<CounselingCase[]>([]);




const [
selectedCase,
setSelectedCase
] = useState<CounselingCase | null>(null);





const [
concern,
setConcern
] = useState("");





const [
loading,
setLoading
] = useState(true);





const [
sending,
setSending
] = useState(false);





/* =====================================================
   CHECK USER ROLE
===================================================== */


const checkRole = async()=>{


try{


const {data} =
await api.get(
"/api/counseling/is-counselor/"
);



console.log(
"Role:",
data
);



setIsCounselor(
Boolean(data.is_counselor)
);



}

catch(err){


console.error(
"Role check failed:",
err
);



setIsCounselor(false);



}


finally{


setCheckingRole(false);


}



};










/* =====================================================
   LOAD COUNSELING CASES
===================================================== */


const loadCases = async()=>{


try{


setLoading(true);





if(isCounselor){



const [
pendingRes,
assignedRes
] = await Promise.all([


api.get(
"/api/counseling/cases/"
),



api.get(
"/api/counseling/my-cases/"
),



]);




const allCases = [

...assignedRes.data,

...pendingRes.data,

];




setCases(allCases);




if(allCases.length > 0){


setSelectedCase(
(prev)=>
prev ?? allCases[0]
);


}
else{


setSelectedCase(null);


}



}

else{



const {data} =
await api.get(
"/api/counseling/my-requests/"
);




setCases(data);



if(data.length > 0){


setSelectedCase(
(prev)=>
prev ?? data[0]
);


}

else{


setSelectedCase(null);


}



}




}

catch(err){


console.error(
"Loading cases failed:",
err
);



}

finally{


setLoading(false);


}



};









/* =====================================================
   INITIAL LOAD
===================================================== */


useEffect(()=>{


checkRole();



},[]);






useEffect(()=>{


if(!checkingRole){


loadCases();


}



},[
checkingRole,
isCounselor
]);









/* =====================================================
   SUBMIT NEW CONCERN
===================================================== */


const submitConcern = async()=>{


if(!concern.trim())
return;



try{


setSending(true);



await api.post(

"/api/counseling/cases/create/",

{

initial_message:concern,

}

);





setConcern("");



await loadCases();



}

catch(err:any){


console.error(err);



alert(

err.response?.data?.detail ||

err.response?.data?.message ||

"Unable to submit concern."

);



}

finally{


setSending(false);


}



};









/* =====================================================
   APPLY AS COUNSELOR
===================================================== */


const applyAsCounselor = async()=>{


try{


await api.post(

"/api/counseling/request/",

{}

);




setShowApplyModal(false);



alert(
"Application submitted successfully. Await admin approval."
);



}

catch(err:any){


console.error(err);



alert(

err.response?.data?.detail ||

err.response?.data?.message ||

"Unable to submit application."

);



}



};









/* =====================================================
   OPEN CHAT PAGE
===================================================== */


const openChat = (
id:number
)=>{


navigate(
`/counseling/chat/${id}`
);



};

/* =====================================================
   WAIT FOR ROLE CHECK
===================================================== */

if (checkingRole) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg font-semibold text-gray-600">
        Checking account...
      </div>
    </div>
  );
}

  return (
    <>
      <ApplyModal
        open={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        onSubmit={applyAsCounselor}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-8">

        {/* HEADER */}

        <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Counseling Center
            </h1>

            <p className="text-gray-600 mt-2">
              Anonymous, secure and confidential counseling support.
            </p>

          </div>

          {!isCounselor && (
            <button
              onClick={() => setShowApplyModal(true)}
              className="h-11 px-5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              Apply as Counselor
            </button>
          )}

        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr_320px] gap-6">

          {/* ===================================
                  LEFT SIDEBAR
          =================================== */}

          <aside className="space-y-5">

            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">

              <div className="flex items-center gap-2 mb-4">

                <Heart className="w-5 h-5 text-purple-600" />

                <h2 className="font-bold">
                  Wellness Check-in
                </h2>

              </div>

              <p className="text-sm text-gray-500 mb-5">
                How are you feeling today?
              </p>

              <div className="grid grid-cols-3 gap-3">

                {moods.map((m) => {

                  const Icon = m.icon;

                  return (

                    <button
                      key={m.id}
                      onClick={() => setMood(m.id)}
                      className={`rounded-xl border p-3 transition ${
                        mood === m.id
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >

                      <div
                        className={`w-10 h-10 rounded-lg mx-auto flex items-center justify-center ${m.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <p className="text-xs font-semibold mt-2">
                        {m.label}
                      </p>

                    </button>

                  );
                })}

              </div>

            </div>

          </aside>

          {/* ===========================
                CENTER PANEL
          =========================== */}

          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[calc(100vh-11rem)] overflow-hidden">
                      {/* ===========================
                COUNSELOR VIEW
            =========================== */}

            {isCounselor ? (
              <>
                <div className="border-b border-gray-200 p-5">
                  <h2 className="text-xl font-bold">
                    Counseling Cases
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Select a case to review or continue a conversation.
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto bg-slate-50 p-6">

                  {loading ? (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      Loading...
                    </div>
                  ) : !selectedCase ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Heart className="w-12 h-12 mx-auto text-blue-600 mb-4" />

                        <h3 className="text-lg font-semibold">
                          No Case Selected
                        </h3>

                        <p className="text-gray-500 mt-2">
                          Select a counseling case from the right panel.
                        </p>
                      </div>
                    </div>
                  ) : selectedCase.status === "assigned" ||
                    selectedCase.status === "active" ? (

                    <div className="flex flex-col items-center justify-center h-full text-center">

                      <Heart className="w-14 h-14 text-blue-600 mb-4" />

                      <h2 className="text-2xl font-bold">
                        Chat Ready
                      </h2>

                      <p className="text-gray-500 mt-2 max-w-md">
                        This counseling case has already been assigned.
                        Click below to continue chatting.
                      </p>

                      <button
                        onClick={() => openChat(selectedCase.id)}
                        className="mt-6 px-6 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                      >
                        Open Chat
                      </button>

                    </div>

                  ) : (

                    <DisplayConcern
                      selectedCase={selectedCase}
                      refreshCases={loadCases}
                    />

                  )}

                </div>
              </>
            ) : (
              <>
                {/* ===========================
                    COUNSELEE VIEW
                =========================== */}

                <div className="border-b border-gray-200 p-5">

                  <h2 className="text-xl font-bold">
                    My Counseling Requests
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Submit a concern and continue chatting once a counselor
                    accepts your request.
                  </p>

                </div>

                <div className="flex-1 overflow-y-auto bg-slate-50 p-6">

                  {loading ? (

                    <div className="h-full flex items-center justify-center text-gray-500">
                      Loading...
                    </div>

                  ) : cases.length === 0 ? (

                    <div className="h-full flex flex-col items-center justify-center text-center">

                      <Heart className="w-14 h-14 text-blue-600 mb-4" />

                      <h3 className="text-lg font-semibold">
                        No concerns yet
                      </h3>

                      <p className="text-gray-500 mt-2 max-w-md">
                        Enter your concern below and a counselor will respond
                        as soon as one becomes available.
                      </p>

                    </div>

                  ) : (

                    <div className="space-y-4">

                      {cases.map((item) => (

                        <div
                          key={item.id}
                          className={`rounded-2xl border p-5 ${
                            selectedCase?.id === item.id
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 bg-white"
                          }`}
                        >

                          <button
                            onClick={() => setSelectedCase(item)}
                            className="w-full text-left"
                          >

                            <div className="flex justify-between items-start gap-4">

                              <div className="flex-1">

                                <p className="text-gray-900 leading-7">
                                  {item.initial_message}
                                </p>

                                <p className="text-xs text-gray-500 mt-3">
                                  {new Date(
                                    item.created_at
                                  ).toLocaleString()}
                                </p>

                                {item.counselor_name && (
                                  <p className="mt-2 text-sm text-blue-600">
                                    Counselor: {item.counselor_name}
                                  </p>
                                )}

                              </div>

                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  item.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : item.status === "assigned"
                                    ? "bg-blue-100 text-blue-700"
                                    : item.status === "active"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {item.status}
                              </span>

                            </div>

                          </button>

                          {(item.status === "assigned" ||
                            item.status === "active") && (

                            <button
                              onClick={() => openChat(item.id)}
                              className="mt-5 h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                            >
                              Open Chat
                            </button>

                          )}

                        </div>

                      ))}

                    </div>

                  )}

                </div>

                {/* CREATE CONCERN */}

                <div className="border-t border-gray-200 p-5">

                  <div className="flex gap-3">

                    <input
                      value={concern}
                      onChange={(e) => setConcern(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && submitConcern()
                      }
                      placeholder="Enter your concern..."
                      className="flex-1 h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
                    />

                    <button
                      onClick={submitConcern}
                      disabled={sending}
                      className="h-12 w-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center disabled:opacity-60"
                    >
                      <Send className="w-5 h-5" />
                    </button>

                  </div>

                </div>

              </>
            )}

          </section>
                    {/* ===========================
                RIGHT SIDEBAR
          =========================== */}

          {isCounselor ? (
            <ListConcern
              cases={cases}
              selectedCase={selectedCase}
              setSelectedCase={setSelectedCase}
            />
          ) : (
            <aside className="space-y-5">

              {/* Summary */}

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <h3 className="text-lg font-bold text-gray-900 mb-5">
                  My Requests
                </h3>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span className="text-gray-500">Total</span>

                    <span className="font-semibold">
                      {cases.length}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Pending
                    </span>

                    <span className="font-semibold text-yellow-600">
                      {
                        cases.filter(
                          (c) => c.status === "pending"
                        ).length
                      }
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Assigned
                    </span>

                    <span className="font-semibold text-blue-600">
                      {
                        cases.filter(
                          (c) =>
                            c.status === "assigned" ||
                            c.status === "active"
                        ).length
                      }
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Closed
                    </span>

                    <span className="font-semibold">
                      {
                        cases.filter(
                          (c) => c.status === "closed"
                        ).length
                      }
                    </span>
                  </div>

                </div>

              </div>

              {/* Selected Request */}

              {selectedCase && (

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Selected Request
                  </h3>

                  <p className="text-sm text-gray-700 leading-7">
                    {selectedCase.initial_message}
                  </p>

                  {selectedCase.counselor_name && (
                    <p className="mt-4 text-sm text-blue-600">
                      Counselor: {selectedCase.counselor_name}
                    </p>
                  )}

                  <div className="mt-5">

                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedCase.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : selectedCase.status === "assigned"
                          ? "bg-blue-100 text-blue-700"
                          : selectedCase.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {selectedCase.status}
                    </span>

                  </div>

                  {(selectedCase.status === "assigned" ||
                    selectedCase.status === "active") && (

                    <button
                      onClick={() => openChat(selectedCase.id)}
                      className="w-full mt-5 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      Open Chat
                    </button>

                  )}

                </div>

              )}

              {/* Wellness Tip */}

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Today's Wellness Tip
                </h3>

                <p className="text-sm text-gray-600 leading-7">
                  Speaking with someone early can often prevent stress
                  from becoming overwhelming. Every small step toward
                  seeking help is a positive one.
                </p>

              </div>

            </aside>
          )}

        </div>

      </div>
    </>
  );
}