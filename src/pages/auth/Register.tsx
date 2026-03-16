import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuthStore } from "../../store/auth";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirm,
      };

      const res = await api.post("/register", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      useAuthStore.getState().setAuth(res.data.token, res.data.user);

      navigate("/", {
        state: { message: "Register Berhasil" },
      });
    } catch (err: any) {
      console.log(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Register gagal");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05080f] relative overflow-hidden px-4 sm:px-6">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-fuchsia-500/10 to-cyan-500/10 blur-3xl" />

      {/* CARD */}
      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-[2px]
        bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400
        shadow-[0_0_40px_rgba(217,70,239,0.6)]"
      >
        <div className="bg-[#0b0f1a] rounded-[14px] p-8">
          <h1 className="text-3xl font-bold text-center text-fuchsia-400 tracking-widest">
            REGISTER
          </h1>

          <p className="text-center text-gray-400 text-sm mt-2">
            Create your cyber identity
          </p>

          {error && (
            <div className="bg-red-500/20 text-red-400 p-2 rounded mt-4 text-sm">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {["name", "email", "password", "confirm"].map((field) => (
              <div key={field}>
                <label className="text-sm text-gray-400 capitalize">
                  {field === "confirm" ? "Confirm Password" : field}
                </label>

                <input
                  type={field.includes("password") ? "password" : "text"}
                  value={(form as any)[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  className="
                    w-full mt-1 px-4 py-3 rounded-lg
                    bg-[#05080f] text-white
                    border border-purple-400/30
                    focus:outline-none focus:ring-2 focus:ring-purple-500
                  "
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 mt-6 rounded-lg
                bg-gradient-to-r from-purple-600 to-cyan-500
                text-black font-bold tracking-widest
                hover:brightness-125 transition
                shadow-[0_0_20px_rgba(34,211,238,0.6)]
              "
            >
              {loading ? "REGISTERING..." : "REGISTER"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-fuchsia-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
