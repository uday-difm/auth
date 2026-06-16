import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (auth) {
        await auth.register(formData);
      }
      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-neutral-900 to-stone-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-stone-900/60 backdrop-blur-xl border border-stone-800 rounded-2xl shadow-2xl p-8 relative z-10 hover:border-stone-800/80 transition-all duration-300">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-500 text-stone-950 font-black text-xl mb-4 shadow-lg shadow-green-500/20">
            T
          </div>
          <h2 className="text-3xl font-extrabold text-stone-100 tracking-tight">Create Account</h2>
          <p className="text-stone-400 mt-2 text-sm">Join TaskFlow to organize your tasks</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6 flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-stone-300 text-xs font-semibold uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-stone-950/50 border border-stone-800 focus:border-green-500/80 rounded-xl py-3 px-4 text-gray-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-green-500/30 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-stone-300 text-xs font-semibold uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-stone-950/50 border border-stone-800 focus:border-green-500/80 rounded-xl py-3 px-4 text-gray-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-green-500/30 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-stone-300 text-xs font-semibold uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-stone-950/50 border border-stone-800 focus:border-green-500/80 rounded-xl py-3 px-4 text-gray-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-green-500/30 transition-all duration-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-green-500/50 disabled:to-emerald-600/50 disabled:cursor-not-allowed text-stone-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-green-500/10 hover:shadow-green-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-stone-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating Account...
              </>
            ) : (
              "Get Started"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-800 text-center text-sm text-stone-400">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:text-green-400 font-semibold transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
