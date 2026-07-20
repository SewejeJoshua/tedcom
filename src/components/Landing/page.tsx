import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Logo } from "../Logo";

export default function Splash() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-xl text-center animate-pulse sm:animate-none">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="transition-transform duration-300 hover:scale-105">
            <Logo size="lg" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-5">
          Welcome to the town square.
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          A safe, smart community for counsel, commerce and classrooms — built
          for Africa, designed for everyone.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <Link
            to="/onboarding"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all duration-200"
          >
            Get started <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/auth/login"
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition-colors duration-200"
          >
            I have an account
          </Link>
        </div>

        {/* Footer link */}
         

      </div>
    </div>
  );
}