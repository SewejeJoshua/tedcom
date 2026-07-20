import { useEffect, useState } from "react";
import {
  Search,
  Users,
  X,
  Loader2,
  Lock,
  Globe,
} from "lucide-react";

interface Group {
  id: number;
  name: string;
  description: string;
  visibility: string;
  is_paid: boolean;
  amount: string;
  created_at: string;
}

interface SearchGroupProps {
  onClose: () => void;
  onJoined: () => void;
}

const API_BASE = "https://tedcom-backend-system.onrender.com";

export default function SearchGroup({
  onClose,
  onJoined,
}: SearchGroupProps) {
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [joiningId, setJoiningId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const token =
    localStorage.getItem("access") ||
    sessionStorage.getItem("access");

  useEffect(() => {
    const trimmed = query.trim();

    // Don't search until user types at least 2 characters
    if (trimmed.length < 2) {
      setGroups([]);
      setLoading(false);
      setError("");
      return;
    }

    const timeout = setTimeout(() => {
      searchGroups(trimmed);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const searchGroups = async (searchText: string) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/api/groups/`, {
        headers: {
          "Content-Type": "application/json",
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },
      });

      const text = await res.text();

      let data: Group[];

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error("Unable to fetch classes");
      }

      const filtered = data.filter(
        (group) =>
          group.name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          group.description
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );

      setGroups(filtered);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const joinGroup = async (id: number) => {
    try {
      setJoiningId(id);

      const res = await fetch(
        `${API_BASE}/api/groups/${id}/join/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

      const text = await res.text();

      let data: any = {};

      try {
        data = JSON.parse(text);
      } catch {}

      if (!res.ok) {
        alert(data.message || "Unable to join class.");
        return;
      }

      alert(data.message || "Joined successfully.");

      onJoined();

      searchGroups(query.trim());
    } catch {
      alert("Something went wrong.");
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Search Classes
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Search for a class by its name or description.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b bg-gray-50 p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type at least 2 letters to search..."
              className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* Waiting for search */}
          {query.trim().length < 2 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="mb-4 h-14 w-14 text-gray-300" />

              <h3 className="text-xl font-semibold text-gray-700">
                Search for a class
              </h3>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                Start typing the class name or description to find available
                classes.
              </p>
            </div>
          )}

          {/* Loading */}
          {query.trim().length >= 2 && loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-9 w-9 animate-spin text-blue-600" />
            </div>
          )}

          {/* Error */}
          {query.trim().length >= 2 && !loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {/* Empty */}
          {query.trim().length >= 2 &&
            !loading &&
            !error &&
            groups.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Users className="mb-4 h-14 w-14 text-gray-300" />

                <h3 className="text-xl font-semibold text-gray-700">
                  No classes found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try another keyword or search term.
                </p>
              </div>
            )}
                      {/* Search Results */}
          {query.trim().length >= 2 &&
            !loading &&
            !error &&
            groups.length > 0 && (
              <div className="space-y-4 overflow-y-auto pr-2">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {group.name}
                          </h3>

                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                              group.visibility === "public"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {group.visibility === "public" ? (
                              <Globe className="h-3.5 w-3.5" />
                            ) : (
                              <Lock className="h-3.5 w-3.5" />
                            )}

                            {group.visibility}
                          </span>

                          {group.is_paid && (
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                              ₦{group.amount}
                            </span>
                          )}
                        </div>

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          {group.description}
                        </p>

                        <p className="mt-4 text-xs text-gray-400">
                          Created{" "}
                          {new Date(
                            group.created_at
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <button
                          onClick={() => joinGroup(group.id)}
                          disabled={joiningId === group.id}
                          className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {joiningId === group.id ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Joining...
                            </>
                          ) : (
                            <>
                              <Users className="h-4 w-4" />
                              Join
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
                    </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t bg-white px-6 py-4">
          <p className="text-sm text-gray-500">
            {query.trim().length >= 2 && !loading
              ? `${groups.length} ${
                  groups.length === 1 ? "class" : "classes"
                } found`
              : "Search to find available classes"}
          </p>

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}