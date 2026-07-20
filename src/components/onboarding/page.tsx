import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  HeartHandshake,
  ShoppingBag,
  GraduationCap,
} from "lucide-react";

import { Logo } from "../Logo";

const steps = [
  {
    icon: HeartHandshake,
    title: "Find safe counsel, anonymously.",
    body: "Talk to verified counselors without revealing who you are. Mood check-ins, crisis support, and community circles.",
    color: "purple",
  },
  {
    icon: ShoppingBag,
    title: "Trade with people nearby.",
    body: "Discover local vendors, skilled workers and services in your neighborhood — with maps, ratings and instant chat.",
    color: "emerald",
  },
  {
    icon: GraduationCap,
    title: "Learn live, together.",
    body: "Join virtual classrooms with live audio/video, assignments, file sharing and a focused student community.",
    color: "amber",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);

  const current = steps[step];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;

  const colorMap: Record<string, string> = {
    purple: "bg-purple-100 text-purple-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <Logo size="sm" />

        <Link
          to="/auth/role"
          className="text-sm text-gray-500 hover:text-gray-800 transition"
        >
          Skip
        </Link>
      </div>

      {/* Center Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-300">
          
          {/* Icon */}
          <div
            className={`mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-2xl ${colorMap[current.color]}`}
          >
            <Icon className="w-9 h-9" />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {current.title}
          </h1>

          {/* Body */}
          <p className="text-gray-600 leading-relaxed">
            {current.body}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-md mx-auto">
        
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step
                  ? "w-8 bg-gray-900"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Button */}
        {isLast ? (
          <Link
            to="/auth/role"
            className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}