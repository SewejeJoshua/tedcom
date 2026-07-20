import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../Logo";
import {
  Heart,
  GraduationCap,
  BookOpen,
  ShoppingBag,
  Store,
  Wrench,
  User as UserIcon,
  ArrowRight,
} from "lucide-react";

const roles = [
  {
    id: "counselor",
    label: "Counselor",
    desc: "Offer guidance & support",
    icon: Heart,
    color: "purple",
  },
  {
    id: "student",
    label: "Student",
    desc: "Join classes & learn",
    icon: GraduationCap,
    color: "emerald",
  },
  {
    id: "teacher",
    label: "Teacher",
    desc: "Run virtual classrooms",
    icon: BookOpen,
    color: "amber",
  },
  {
    id: "buyer",
    label: "Buyer",
    desc: "Discover nearby vendors",
    icon: ShoppingBag,
    color: "emerald",
  },
  {
    id: "seller",
    label: "Seller",
    desc: "List products to sell",
    icon: Store,
    color: "purple",
  },
  {
    id: "service",
    label: "Service Provider",
    desc: "Offer skilled services",
    icon: Wrench,
    color: "amber",
  },
  {
    id: "user",
    label: "Regular user",
    desc: "Just exploring Tedcomm",
    icon: UserIcon,
    color: "gray",
  },
];

export default function Role() {
  const [selected, setSelected] = useState("student");

  const colorMap: Record<string, string> = {
    purple: "bg-purple-100 text-purple-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-yellow-100 text-yellow-700",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-8">
      {/* Logo - Top Left */}
      <div className="absolute top-6 left-6">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          How will you use Tedcom?
        </h1>
        <p className="text-gray-600 mt-2">
          Pick a role to personalize your experience. You can change it later.
        </p>
      </div>

      {/* Roles Grid */}
      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roles.map((r) => {
          const Icon = r.icon;
          const active = selected === r.id;

          return (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              className={`text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                active
                  ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[r.color]}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Text */}
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {r.label}
                </p>
                <p className="text-xs text-gray-500">
                  {r.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="mt-8 max-w-3xl mx-auto w-full">
        <Link
          to="/auth/signup"
          className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          Continue <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}