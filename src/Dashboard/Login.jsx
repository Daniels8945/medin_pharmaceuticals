import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "../assets/logo.png";

export default function Login() {
  const [isPending, setIsPending] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [focused, setFocused] = React.useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError("");
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch {
      setError("Incorrect email or password. Please try again.");
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex font-raleway">

      {/* ── Left panel — brand ─────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden bg-[#0f4a2a]">

        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-green-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-green-500/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-green-500/10 pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <img src={logo} alt="Medin Logo" className="h-9 brightness-0 invert" />
        </div>

        {/* Centre quote */}
        <div className="relative z-10 flex flex-col gap-6">
          <div className="w-10 h-[3px] bg-green-400 rounded-full" />
          <h2 className="text-white text-[2.4rem] font-bold leading-[1.2] tracking-tight">
            Healthy innovations<br />
            <span className="text-green-400">for a healthier</span><br />
            Nigeria.
          </h2>
          <p className="text-green-200/70 text-[15px] leading-relaxed max-w-xs">
            Making quality healthcare affordable and accessible across the Nigerian health sector.
          </p>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10">
          <p className="text-green-400/60 text-xs tracking-widest uppercase">
            Admin Portal · Medin Pharmaceuticals
          </p>
        </div>
      </div>

      {/* ── Right panel — form ─────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-zinc-50 px-6 py-12">
        <div className="w-full max-w-[400px] flex flex-col gap-8">

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center">
            <img src={logo} alt="Medin Logo" className="h-8" />
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-400">
              Sign in to your admin account to continue.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-zinc-700">
                Email address
              </label>
              <div className={`relative flex items-center rounded-xl border-2 bg-white transition-all duration-200 ${
                focused === "email"
                  ? "border-green-500 shadow-sm shadow-green-100"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}>
                <svg className={`absolute left-3.5 w-4 h-4 transition-colors duration-200 ${focused === "email" ? "text-green-500" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  required
                  autoComplete="email"
                  placeholder="you@medinpharma.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  className="w-full h-12 pl-10 pr-4 bg-transparent rounded-xl text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-semibold text-zinc-700">
                  Password
                </label>
                <button type="button" className="text-xs text-green-600 hover:text-green-700 font-medium transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className={`relative flex items-center rounded-xl border-2 bg-white transition-all duration-200 ${
                focused === "password"
                  ? "border-green-500 shadow-sm shadow-green-100"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}>
                <svg className={`absolute left-3.5 w-4 h-4 transition-colors duration-200 ${focused === "password" ? "text-green-500" : "text-zinc-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  className="w-full h-12 pl-10 pr-12 bg-transparent rounded-xl text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3.5 text-zinc-400 hover:text-zinc-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="relative mt-1 h-12 w-full rounded-xl bg-green-500 hover:bg-green-600 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 text-white font-bold text-[15px] shadow-md shadow-green-200 flex items-center justify-center gap-2 overflow-hidden group"
            >
              {isPending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-center text-zinc-400">
            Restricted access · Medin Pharmaceuticals Admin
          </p>
        </div>
      </div>

    </div>
  );
}