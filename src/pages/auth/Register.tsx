import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05080f] relative overflow-hidden px-4 sm:px-6">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-fuchsia-500/10 to-cyan-500/10 blur-3xl" />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md rounded-2xl p-[2px]
        bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400
        shadow-[0_0_40px_rgba(217,70,239,0.6)]"
      >
        <div className="bg-[#0b0f1a] rounded-[14px] p-8">

          <h1 className="text-3xl font-bold text-center text-fuchsia-400 tracking-widest drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]">
            REGISTER
          </h1>

          <p className="text-center text-gray-400 text-sm mt-2">
            Create your cyber identity
          </p>

          <form className="mt-8 space-y-5">

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
              className="
                w-full py-3 mt-6 rounded-lg
                bg-gradient-to-r from-purple-600 to-cyan-500
                text-black font-bold tracking-widest
                hover:brightness-125 transition
                shadow-[0_0_20px_rgba(34,211,238,0.6)]
              "
            >
              REGISTER
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
