import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Logo } from "../Logo";

export default function Splash() {
  return (
    <div className="mesh-bg min-h-screen grid place-items-center px-6">
      <div className="max-w-xl text-center animate-fade-up">
        <div className="flex justify-center mb-8">
          <div className="transition-transform duration-300 hover:scale-105">
            <Logo size="lg" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter text-balance mb-5 text-foreground">
          Welcome to the town square.
        </h1>

        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10 text-pretty leading-relaxed">
          A safe, smart community for counsel, commerce and classrooms — built
          for Africa, designed for everyone.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/onboarding"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-200"
          >
            Get started <ArrowRight className="size-4" />
          </Link>

          <Link
            to="/auth/login"
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-accent transition-colors duration-200"
          >
            I have an account
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mt-12">
          Already onboarded?{" "}
          <Link
            to="/home"
            className="text-foreground font-medium underline-offset-4 hover:underline transition"
          >
            Skip to dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}





 
