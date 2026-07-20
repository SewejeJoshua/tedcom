import { useState } from "react";
import { Link } from "react-router-dom";

export default function Forgot() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Reset your password
          </h1>
          <p className="text-gray-600 mt-2">
            Enter your email and we’ll send a recovery link
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-400 focus:outline-none text-sm"
            />
          </div>

          {/* Submit */}
          <Link
            to="/auth/login"
            className="flex items-center justify-center h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            Send reset link
          </Link>

          {/* Back */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Remembered it?{" "}
            <Link
              to="/auth/login"
              className="text-gray-900 font-semibold hover:underline"
            >
              Back to sign in
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}