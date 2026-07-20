import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../Logo";

const API_BASE =
  import.meta.env.VITE_TEDCOM_API ||
  import.meta.env.TEDCOM_API ||
  "https://tedcom-backend-system.onrender.com";

interface RegisterResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  access: string;
  refresh: string;
}

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const saveAuth = (data: RegisterResponse) => {
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: data.id,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
      })
    );
  };

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const parts = name.trim().split(" ");

      const first_name = parts.shift() || "";
      const last_name = parts.join(" ");

      const response = await fetch(
        `${API_BASE}/api/auth/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            first_name,
            last_name,
            phone_number: phone.trim(),
            password,
            confirm_password: confirmPassword,
          }),
        }
      );

      const data: Partial<RegisterResponse> =
        await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          (data as any)?.detail ||
            (data as any)?.message ||
            Object.values(data || {}).flat().join("\n") ||
            "Registration failed."
        );
      }

      if (
        !data.access ||
        !data.refresh ||
        !data.id
      ) {
        throw new Error(
          "Registration completed but authentication failed."
        );
      }

      saveAuth(data as RegisterResponse);

      navigate("/auth/login", {
        replace: true,
      });
    } catch (err: any) {
      
      setError(err.message || "Registration failed.");
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

      <div className="w-full max-w-md rounded-3xl bg-white border border-gray-100 shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Join Tedcom and get started today.
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="John Doe"
              className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="john@example.com"
              className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>

            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="08123456789"
              className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword ? "text" : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Minimum 8 characters"
                className="w-full h-12 rounded-xl border border-gray-300 px-4 pr-20 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 text-sm font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm password"
                className="w-full h-12 rounded-xl border border-gray-300 px-4 pr-20 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 text-sm font-medium"
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm whitespace-pre-line text-red-600">
              {error}
            </div>
          )}

          <p className="text-xs text-gray-500 leading-6">
            By creating an account you agree to our
            Terms of Service and Privacy Policy.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-blue-600 text-white font-semibold transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}