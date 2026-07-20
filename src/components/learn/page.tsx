import { useCallback, useEffect, useState } from "react";
import ClassForm from "../forms/class_form";
import GroupCode from "../forms/group_code";
import SearchGroup from "../forms/search";
import CreatedClasses from "./created_classes";
import {
  Video,
  Mic,
  Hand,
  ScreenShare,
  FileText,
  Upload,
  Calendar,
  Plus,
  Users,
  Search,
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

interface GroupsResponse {
  created_groups: Group[];
  joined_groups: Group[];
}

const API_BASE = "https://tedcom-backend-system.onrender.com";

export default function Classes() {
  const [showClassForm, setShowClassForm] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const [createdGroups, setCreatedGroups] = useState<Group[]>([]);
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGroups = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("access") ||
        sessionStorage.getItem("access");

      const res = await fetch(`${API_BASE}/api/groups/groups/me/`, {
        method: "GET",
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

      let data: GroupsResponse;

      try {
        data = JSON.parse(text);
      } catch {
        console.error("Non JSON response:", text);
        throw new Error("Server returned invalid response");
      }

      if (!res.ok) {
        throw new Error("Failed to load classes");
      }

      setCreatedGroups(data.created_groups || []);
      setJoinedGroups(data.joined_groups || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}

        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Classroom
            </h1>

            <p className="text-gray-600 mt-2">
              Attend live lessons, watch recordings,
              share files and collaborate with classmates.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white border border-gray-200 font-semibold text-sm hover:bg-gray-50 transition">
              <Calendar className="w-4 h-4" />
              Schedule
            </button>

            {/* NEW SEARCH BUTTON */}

            <button
              onClick={() => setShowSearchModal(true)}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 font-semibold text-sm hover:bg-blue-100 transition"
            >
              <Search className="w-4 h-4" />
              Search Classes
            </button>

            <button
              onClick={() => setShowJoinModal(true)}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition"
            >
              <Users className="w-4 h-4" />
              Join Class
            </button>

            <button
              onClick={() => setShowClassForm(true)}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              Create Class
            </button>
          </div>
        </div>

        {/* Live Class */}

        <section className="relative overflow-hidden rounded-3xl bg-blue-600 text-white p-8 shadow-sm">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-purple-400/30 blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-400/20 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                Live Now
              </span>

              <h2 className="text-3xl font-extrabold leading-tight mb-3">
                Classroom Session
              </h2>

              <p className="text-blue-100 leading-7 max-w-lg mb-6">
                Attend classes, collaborate with classmates
                and access learning resources in one place.
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition font-semibold">
                  <Video className="w-4 h-4" />
                  Join Live
                </button>

                <button className="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition">
                  <Mic className="w-4 h-4" />
                </button>

                <button className="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition">
                  <ScreenShare className="w-4 h-4" />
                </button>

                <button className="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition">
                  <Hand className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xs font-semibold text-blue-100"
                >
                  CAM {index + 1}
                </div>
              ))}
            </div>
          </div>
        </section>
                {/* Created & Joined Classes */}

        <CreatedClasses
          loading={loading}
          error={error}
          createdGroups={createdGroups}
          joinedGroups={joinedGroups}
        />

        {/* Shared Resources */}

        <section className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Shared Resources
            </h3>

            <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>

          <ul className="divide-y divide-gray-100">
            {[
              {
                name: "Module 4 — Wireframing.pdf",
                size: "2.4 MB",
              },
              {
                name: "UX Cheatsheet.docx",
                size: "1.1 MB",
              },
              {
                name: "Live Recording.mp4",
                size: "184 MB",
              },
              {
                name: "Voice Note.m4a",
                size: "8.2 MB",
              },
            ].map((file) => (
              <li
                key={file.name}
                className="flex items-center gap-4 py-4"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-900 truncate">
                    {file.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {file.size}
                  </p>
                </div>

                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Open
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Create Class Modal */}

        {showClassForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-2xl">
              <button
                onClick={() => setShowClassForm(false)}
                className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
              >
                ×
              </button>

              <ClassForm
                onClose={() => {
                  setShowClassForm(false);
                  fetchGroups();
                }}
              />
            </div>
          </div>
        )}
                {/* Join Group Modal */}

        {showJoinModal && (
          <GroupCode
            onClose={() => setShowJoinModal(false)}
            onJoined={() => {
              setShowJoinModal(false);
              fetchGroups();
            }}
          />
        )}

        {/* Search Groups Modal */}

        {showSearchModal && (
          <SearchGroup
            onClose={() => setShowSearchModal(false)}
            onJoined={() => {
              fetchGroups();
            }}
          />
        )}
      </div>
    </div>
  )
};