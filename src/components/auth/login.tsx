import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../Logo";

const API_BASE =
  import.meta.env.VITE_TEDCOM_API ||
  import.meta.env.TEDCOM_API ||
  "https://tedcom-backend-system.onrender.com";

interface LoginResponse {
  user: {
    id: number;
    username: string | null;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
  };
  access: string;
  refresh: string;
}

export default function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const saveAuth = (data: LoginResponse) => {
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem("access", data.access);
    storage.setItem("refresh", data.refresh);
    storage.setItem("user", JSON.stringify(data.user));

    // Clear the opposite storage
    if (remember) {
      sessionStorage.clear();
    } else {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
    }
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!identifier.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: identifier.trim(),
          password,
        }),
      });

      const data: Partial<LoginResponse> = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          (data as any)?.detail ||
            (data as any)?.message ||
            "Invalid credentials."
        );
      }

      if (!data.access || !data.refresh || !data.user) {
        throw new Error("Authentication failed.");
      }

      saveAuth(data as LoginResponse);

      navigate("/home", {
        replace: true,
      });
    } catch (err: any) {
     
      setError(err.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center px-6">
      {/* Logo - Top Left */}
      <div className="absolute top-6 left-6">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl border border-gray-100 p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in to continue to your account
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email or Phone
            </label>

            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Segs@example.com"
              className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full h-12 rounded-xl border border-gray-300 px-4 pr-20 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600 font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-blue-600"
              />

              Remember me
            </label>

            <Link
              to="/auth/forgot"
              className="font-medium text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-blue-600 text-white font-semibold transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

           

          

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="font-semibold text-blue-600 hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}