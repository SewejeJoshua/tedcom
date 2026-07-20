import { useState } from "react";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";

export default function Profile() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-8">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Set up your profile
        </h1>
        <p className="text-gray-600 mt-2">
          A few details so the community can recognise you.
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">

        {/* Avatar + Upload */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-emerald-400 flex items-center justify-center text-white font-bold text-xl">
            KA
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
          >
            <Camera className="w-4 h-4" />
            Upload photo
          </button>
        </div>

        {/* Name */}
        <div>
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Display name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kwame A."
            className="mt-1 w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-400 focus:outline-none text-sm"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            City / region
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Accra, Ghana"
            className="mt-1 w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-400 focus:outline-none text-sm"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell the community a little about yourself…"
            rows={4}
            className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-400 focus:outline-none text-sm resize-none"
          />
        </div>

        {/* Submit */}
        <Link
          to="/home"
          className="flex items-center justify-center w-full h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          Enter Tedcomm
        </Link>
      </div>
    </div>
  );
}