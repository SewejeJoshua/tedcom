import { useState } from "react";

const API_BASE =
  import.meta.env.VITE_TEDCOM_API ||
  import.meta.env.TEDCOM_API ||
  "https://tedcom-backend-system.onrender.com";

type ClassFormProps = {
  onClose: () => void;
};

export default function ClassForm({ onClose }: ClassFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [isPaid, setIsPaid] = useState(false);
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Class name is required.");
      return;
    }

    if (isPaid && !amount) {
      setError("Please enter an amount.");
      return;
    }

    setLoading(true);

    try {
      const token =
        localStorage.getItem("access") ||
        sessionStorage.getItem("access");

      const response = await fetch(`${API_BASE}/api/groups/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
        body: JSON.stringify({
          name,
          description,
          visibility,
          is_paid: isPaid,
          amount: isPaid ? amount : "0",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            data?.message ||
            Object.values(data || {}).flat().join("\n") ||
            "Failed to create class."
        );
      }

      setSuccess("Class created successfully.");

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Create Class
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full hover:bg-gray-100 text-xl"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Class Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter class name"
            className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Visibility
          </label>

          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="paid"
            type="checkbox"
            checked={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
            className="w-5 h-5 accent-blue-600"
          />

          <label
            htmlFor="paid"
            className="font-medium text-gray-700"
          >
            Paid Class
          </label>
        </div>

        {isPaid && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount
            </label>

            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-red-600 text-sm whitespace-pre-line">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-green-600 text-sm">
            {success}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">

          <button
            type="button"
            onClick={onClose}
            className="px-5 h-11 rounded-xl border border-gray-300 font-medium hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 h-11 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Class"}
          </button>

        </div>
      </form>
    </div>
  );
}