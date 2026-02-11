import api from "../../api/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import { useAuthStore } from '../../store/auth'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
      console.log(data);
      
      try {
          // const res = await api.post("/login", { email, password });
          const res = await api.post("/login", data);
          console.log(res.data);
          
          // localStorage.setItem("token", 'imam salji anjay');
          useAuthStore.getState().setAuth(
            res.data.token,
            res.data.user
          )

          navigate("/game");
      } catch (err) {
        console.log('login');
        if (axios.isAxiosError(err)) {
          console.log(err.response?.data.message);
          setError(err.response?.data.message);
        } else {
          console.log(err);
        }
      }
  };

  useEffect(() => {
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05080f] relative overflow-hidden px-4 sm:px-6">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-purple-600/10 blur-3xl" />

      {/* CARD */}
      <div
        className="
          relative z-10 w-full max-w-md
          rounded-2xl p-[2px]
          bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600
          shadow-[0_0_40px_rgba(34,211,238,0.5)]
        "
      >
        <div className="bg-[#0b0f1a] rounded-[14px] p-8">

          <h1 className="text-3xl font-bold text-center text-cyan-400 tracking-widest drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
            LOGIN
          </h1>

          <p className="text-center text-gray-400 text-sm mt-2">
            Access your cyber account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">

            {/* <div className="mb-4 p-4 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 text-sm">
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Login berhasil!</span>
              </div>
            </div> */}

            {error && (
              <div className="mb-4 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                <div className="flex items-center gap-2">
                  <span>❌</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                {...register("email")}
                className="
                  w-full mt-1 px-4 py-3 rounded-lg
                  bg-[#05080f] text-white
                  border border-cyan-400/30
                  focus:outline-none focus:ring-2 focus:ring-cyan-400
                "
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-400">Password</label>
              <input
                type="password"
                {...register("password")}
                className="
                  w-full mt-1 px-4 py-3 rounded-lg
                  bg-[#05080f] text-white
                  border border-fuchsia-500/30
                  focus:outline-none focus:ring-2 focus:ring-fuchsia-500
                "
              />
            </div>
            <div className="flex items-center justify-between mb-1">
              {/* Kiri: checkbox + remember me */}
              <label className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                />
                <span className="text-gray-400 ms-2 text-sm font-medium text-heading select-none">
                  Remember me
                </span>
              </label>

              {/* Kanan: forgot password */}
              <a href="#" className="text-sm text-red-400 hover:underline">
                Forgot Password?
              </a>
            </div>
            {/* BUTTON */}
            <button
              type="submit"
              className="
                w-full py-3 mt-6 rounded-lg
                bg-gradient-to-r from-cyan-500 to-fuchsia-600
                text-black font-bold tracking-widest
                hover:brightness-125 transition
                shadow-[0_0_20px_rgba(217,70,239,0.6)]
              "
            >
              LOGIN
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Belum punya akun?{" "}
            <Link to="/register" className="text-cyan-400 hover:underline">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
