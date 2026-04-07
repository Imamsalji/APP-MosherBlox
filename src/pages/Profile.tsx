import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth";
import { UpdatePassword, UpdateProfile } from "../api/setting";
import { useNavigate } from "react-router-dom";
import Input from "../component/form/input/InputField";
import Toast from "../component/transaksi/Toast";

const Profile = () => {
  const token = JSON.parse(localStorage.getItem("user") as string);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const mutationEmail = useMutation({
    mutationFn: UpdateProfile,
    onSuccess: (data, variables, context) => {
      useAuthStore.getState().setUser(data.data);
      setShow(true);
    },
  });

  const mutationPassword = useMutation({
    mutationFn: UpdatePassword,
    onSuccess: (data, variables, context) => {
      console.log("Response data:", data.data);
    },
  });

  const handlePassword = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("current_password", form.current_password);
    formData.append("new_password", form.new_password);
    formData.append(
      "new_password_confirmation",
      form.new_password_confirmation,
    );
    formData.append("_method", "PUT");

    console.log(form);

    mutationPassword.mutate(formData);
    mutationEmail.mutate(formData);
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <Toast
        show={show}
        message="Data Profile Berhasil diUbah!"
        onClose={() => setShow(false)}
      />
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="bg-black/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-[0_0_30px_#a855f7] p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-[2px] shadow-[0_0_20px_#00ffff]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl font-bold text-white">
                  {user?.name?.charAt(0)}
                </div>
              </div>

              <button className="absolute bottom-0 right-0 bg-purple-600 text-xs px-2 py-1 rounded-full hover:brightness-125">
                Edit
              </button>
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_10px_#00ffff]">
                {user?.name}
              </h2>
              <p className="text-gray-400 text-sm mt-1">{user?.email}</p>

              <span className="inline-block mt-3 px-3 py-1 text-xs bg-purple-500/20 border border-purple-500 rounded-full text-purple-300">
                🚀 Member Active
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-purple-500/20"></div>

          {/* Form */}
          <form onSubmit={handlePassword}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-400">Nama</label>
                <Input
                  type="text"
                  id="name"
                  value={form.name}
                  // error={!!errors?.name}
                  // hint={errors?.name?.[0]}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <Input
                  type="text"
                  id="email"
                  value={form.email}
                  // error={!!errors?.name}
                  // hint={errors?.name?.[0]}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-400">Password Lama</label>
                <Input
                  type="password"
                  id="current_password"
                  placeholder="••••••••"
                  // error={!!errors?.name}
                  // hint={errors?.name?.[0]}
                  onChange={(e) =>
                    setForm({ ...form, current_password: e.target.value })
                  }
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-400">Password Baru</label>
                <Input
                  type="password"
                  id="new_password"
                  placeholder="••••••••"
                  // error={!!errors?.name}
                  // hint={errors?.name?.[0]}
                  onChange={(e) =>
                    setForm({ ...form, new_password: e.target.value })
                  }
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm text-gray-400">
                  Konfirmasi Password
                </label>
                <Input
                  type="password"
                  id="new_password_confirmation"
                  placeholder="••••••••"
                  // error={!!errors?.name}
                  // hint={errors?.name?.[0]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      new_password_confirmation: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-white font-semibold shadow-[0_0_20px_#00ffff] hover:brightness-125 transition"
              >
                💾 Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
