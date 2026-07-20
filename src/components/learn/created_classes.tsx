import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video } from "lucide-react";

export interface Group {
  id: number;
  name: string;
  description: string;
  visibility: string;
  is_paid: boolean;
  amount: string;
  created_at: string;
}

interface CreatedClassesProps {
  loading: boolean;
  error: string;
  createdGroups: Group[];
  joinedGroups: Group[];
}

export default function CreatedClasses({
  loading,
  error,
  createdGroups,
  joinedGroups,
}: CreatedClassesProps) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"created" | "joined">(
    "created"
  );

  const groups =
    activeTab === "created"
      ? createdGroups
      : joinedGroups;

  const title =
    activeTab === "created"
      ? "Created Classes"
      : "Joined Classes";

  const emptyMessage =
    activeTab === "created"
      ? "You haven't created any classes yet."
      : "You haven't joined any classes yet.";

  const iconBg =
    activeTab === "created"
      ? "bg-blue-100 text-blue-700"
      : "bg-emerald-100 text-emerald-700";

  const buttonBg =
    activeTab === "created"
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-emerald-600 hover:bg-emerald-700";

  const dateLabel =
    activeTab === "created"
      ? "Created"
      : "Joined";

  const handleOpenClass = (group: Group) => {
    navigate("/learn/chatroom", {
      state: {
        group,
      },
    });
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {title}
        </h2>

        <div className="inline-flex rounded-xl bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab("created")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === "created"
                ? "bg-white shadow text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Created ({createdGroups.length})
          </button>

          <button
            onClick={() => setActiveTab("joined")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === "joined"
                ? "bg-white shadow text-emerald-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Joined ({joinedGroups.length})
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-gray-500">
          Loading classes...
        </div>
      )}

      {error && (
        <div className="text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && groups.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
          {emptyMessage}
        </div>
      )}

      {!loading && !error && groups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {groups.map((c) => (
            <article
              key={c.id}
              className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${iconBg}`}
              >
                <Video className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                {c.name}
              </h3>

              <p className="text-sm text-gray-500 mb-5 line-clamp-2">
                {c.description}
              </p>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Visibility</span>

                  <span className="font-semibold capitalize">
                    {c.visibility}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Access</span>

                  <span
                    className={`font-semibold ${
                      c.is_paid
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {c.is_paid
                      ? `₦${c.amount}`
                      : "Free"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>{dateLabel}</span>

                  <span className="font-semibold">
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleOpenClass(c)}
                className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold text-white transition ${buttonBg}`}
              >
                Open Class
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}