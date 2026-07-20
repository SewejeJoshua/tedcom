import { useState } from "react";
import api from "../../services/api";
import {
  Calendar,
  User,
  CheckCircle2,
  MessageSquare,
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

interface DisplayConcernProps {
  selectedCase: CounselingCase | null;
  refreshCases: () => Promise<void>;
}

export default function DisplayConcern({
  selectedCase,
  refreshCases,
}: DisplayConcernProps) {
  const [loading, setLoading] = useState(false);

  // Get token from either localStorage or sessionStorage
const token =
  localStorage.getItem("access") ||
  sessionStorage.getItem("access");

const auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const assignCase = async () => {
  if (!selectedCase) return;

  if (!token) {
    alert("Please login first.");
    return;
  }

  try {
    setLoading(true);

    const { data } = await api.post(
      `https://tedcom-backend-system.onrender.com/api/counseling/cases/${selectedCase.id}/pick/`,
      {},
      auth
    );

    console.log(data);

    alert(data?.message || "Case assigned successfully.");

    await refreshCases();
  } catch (err: any) {
    console.error(err);

    if (err.response?.status === 401) {
      alert("Your session has expired. Please login again.");
    } else {
      alert(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Unable to assign case."
      );
    }
  } finally {
    setLoading(false);
  }
};
  if (!selectedCase) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />

          <h3 className="text-lg font-semibold text-gray-700">
            No Concern Selected
          </h3>

          <p className="text-gray-500 mt-2">
            Select a concern from the right panel.
          </p>
        </div>
      </div>
    );
  }

  const assigned =
    selectedCase.status === "assigned" ||
    selectedCase.status === "active" ||
    selectedCase.counselor !== null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-gray-200 p-5">
        <h2 className="text-xl font-bold text-gray-900">
          Concern Details
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Review this concern before starting the conversation.
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-gray-500" />

                <span className="font-semibold text-gray-900">
                  Anonymous User #{selectedCase.user}
                </span>
              </div>

              <p className="text-gray-700 leading-7">
                {selectedCase.initial_message}
              </p>

              <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />

                {new Date(selectedCase.created_at).toLocaleString()}
              </div>

              {selectedCase.counselor_name && (
                <div className="mt-4 text-blue-600 font-medium">
                  Assigned to {selectedCase.counselor_name}
                </div>
              )}
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
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

          <div className="mt-8 flex justify-end">
            {assigned ? (
              <button
                disabled
                className="px-6 h-11 rounded-xl bg-gray-200 text-gray-600 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Assigned
              </button>
            ) : (
              <button
                onClick={assignCase}
                disabled={loading}
                className="px-6 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? "Assigning..." : "Assign to Me"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}