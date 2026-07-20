import {
  MessageSquare,
  Clock,
  CheckCircle2,
  UserCheck,
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

interface ListConcernProps {
  cases: CounselingCase[];
  selectedCase: CounselingCase | null;
  setSelectedCase: (item: CounselingCase) => void;
}

export default function ListConcern({
  cases,
  selectedCase,
  setSelectedCase,
}: ListConcernProps) {
  return (
    <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm h-[calc(100vh-11rem)] flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-5">
        <h2 className="text-lg font-bold text-gray-900">
          Concerns
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          {cases.length} Case{cases.length !== 1 && "s"}
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {cases.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm p-6 text-center">
            No concerns available.
          </div>
        ) : (
          cases.map((item) => {
            const active = selectedCase?.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedCase(item)}
                className={`w-full text-left border-b border-gray-100 p-4 transition ${
                  active
                    ? "bg-blue-50 border-l-4 border-l-blue-600"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />

                      <span className="font-semibold text-gray-900 text-sm">
                        Case #{item.id}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {item.initial_message}
                    </p>

                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>

                    {item.counselor_name && (
                      <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
                        <UserCheck className="w-3 h-3" />
                        {item.counselor_name}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
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

                    {item.counselor && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}