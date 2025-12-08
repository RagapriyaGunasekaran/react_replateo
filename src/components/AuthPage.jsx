import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { login, register, googleLogin, user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [tab, setTab] = useState("login"); // login or register
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (tab === "login") {
        await login(form.email, form.password);
        addToast("Logged in successfully!", "success");
      } else {
        await register(form.email, form.password, form.name);
        addToast("Account created successfully!", "success");
      }
      navigate("/dashboard");
    } catch (err) {
      addToast("Authentication error", "error");
    }

    setLoading(false);
  };

  return (
    <section className="page-section relative">

      {/* ORANGE GLASS GRADIENT BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200" />

      <div className="page-container flex justify-center">

        <div
          className="
            w-full max-w-md p-10 rounded-3xl
            bg-gradient-to-br from-white/40 to-white/20 
            backdrop-blur-2xl border border-white/30 
            shadow-xl shadow-orange-300/40
            animate-fadeIn
          "
        >

          {/* TABS */}
          <div className="flex justify-around mb-8">
            <button
              onClick={() => setTab("login")}
              className={`
                px-6 py-2 font-semibold rounded-xl transition
                ${tab === "login" 
                  ? "bg-orange-600 text-white shadow-md shadow-orange-400/40" 
                  : "bg-white/40 text-orange-700 border border-white/20"}
              `}
            >
              Login
            </button>

            <button
              onClick={() => setTab("register")}
              className={`
                px-6 py-2 font-semibold rounded-xl transition
                ${tab === "register" 
                  ? "bg-orange-600 text-white shadow-md shadow-orange-400/40" 
                  : "bg-white/40 text-orange-700 border border-white/20"}
              `}
            >
              Register
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name Field (Register Only) */}
            {tab === "register" && (
              <div>
                <label className="text-orange-800 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="
                    w-full p-3 mt-1 rounded-xl bg-white/50
                    border border-white/40 shadow-inner
                    focus:ring-2 focus:ring-orange-500 focus:bg-white/70 transition
                  "
                  placeholder="Enter your full name"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-orange-800 font-medium">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="
                  w-full p-3 mt-1 rounded-xl bg-white/50
                  border border-white/40 shadow-inner
                  focus:ring-2 focus:ring-orange-500 focus:bg-white/70 transition
                "
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-orange-800 font-medium">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="
                  w-full p-3 mt-1 rounded-xl bg-white/50
                  border border-white/40 shadow-inner
                  focus:ring-2 focus:ring-orange-500 focus:bg-white/70 transition
                "
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot Password (Login Only) */}
            {tab === "login" && (
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-orange-600 hover:underline text-sm"
                >
                  Forgot Password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 rounded-xl font-semibold text-white
                bg-orange-600 hover:bg-orange-700
                shadow-lg shadow-orange-400/40
                disabled:opacity-50 transition
              "
            >
              {loading ? "Processing..." : tab === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-white/40" />

          {/* Google Login */}
          <button
            onClick={async () => {
              try {
                await googleLogin();
                addToast("Logged in with Google!", "success");
                navigate("/dashboard");
              } catch (err) {
                addToast("Google login failed", "error");
              }
            }}
            className="
              w-full py-3 flex items-center justify-center gap-3
              bg-white/70 hover:bg-white/90 border border-white/40
              rounded-xl shadow-lg shadow-orange-300/30 transition
            "
          >
            <img
              src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
              className="w-5 h-5"
            />
            <span className="font-semibold text-orange-800">Continue with Google</span>
          </button>

        </div>
      </div>
    </section>
  );
}
