import { useState } from "react";
import { Users, X, Loader2 } from "lucide-react";

const API_BASE = "https://tedcom-backend-system.onrender.com";

interface GroupCodeProps {
  onClose: () => void;
  onJoined: () => void;
}

export default function GroupCode({
  onClose,
  onJoined,
}: GroupCodeProps) {
  const [groupCode, setGroupCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupCode.trim()) {
      setError("Please enter a group code.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const token =
        localStorage.getItem("access") ||
        sessionStorage.getItem("access");

      const res = await fetch(
        `${API_BASE}/api/groups/groups/join-by-code/`,
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
          body: JSON.stringify({
            code: groupCode.trim().toUpperCase(),
          }),
        }
      );

      const data = await res.json();

      // Handle successful responses
      if (res.ok) {
        setMessage(data.message || "Joined successfully!");

        setTimeout(() => {
          onJoined();
        }, 1000);

        return;
      }

      // Handle "already requested/already member" response
      if (data.message === "Request already exists") {
        setMessage("You have already requested to join this group.");

        setTimeout(() => {
          onJoined();
        }, 1000);

        return;
      }

      throw new Error(
        data.message ||
          data.detail ||
          data.error ||
          "Unable to join group."
      );
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

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Users className="h-8 w-8 text-blue-600" />
          </div>

          <h2 className="text-center text-2xl font-bold text-gray-900">
            Join Class
          </h2>

          <p className="mt-2 text-center text-sm text-gray-500">
            Enter the group code provided by your instructor.
          </p>

          <form
            onSubmit={handleJoin}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Group Code
              </label>

              <input
                type="text"
                value={groupCode}
                onChange={(e) =>
                  setGroupCode(e.target.value.toUpperCase())
                }
                placeholder="e.g. 233AE595"
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 uppercase tracking-widest outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold transition hover:bg-gray-100 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join Group"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}