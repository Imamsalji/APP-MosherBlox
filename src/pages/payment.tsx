import { useEffect, useState } from "react";
import qris from "./../assets/img/logoMosher.jpeg";
import { getRoblox } from "../api/order";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type dataupload = {
  email: string;
  username: string;
  file: File | null;
};

const Payment = () => {
  const [form, setForm] = useState<dataupload>({
    email: "",
    username: "",
    file: null,
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    file: null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | "">("");
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState(query);
  const navigate = useNavigate();

  const validate = () => {
    let newErrors: any = {};

    // Name
    if (!form.username.trim()) {
      newErrors.username = "Name wajib diisi";
    }

    // ✅ Email Required
    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else {
      // ✅ Email Format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(form.email)) {
        newErrors.email = "Format email tidak valid";
      }
    }

    // ✅ File Required
    if (!form.file) {
      newErrors.file = "File wajib diupload";
    } else {
      // ✅ Validasi tipe file (contoh: hanya gambar)
      const allowedTypes = ["image/jpeg", "image/png"];

      if (!allowedTypes.includes(form.file.type)) {
        newErrors.file = "File harus berupa JPG atau PNG";
      }

      // ✅ Validasi ukuran file (contoh: max 2MB)
      const maxSize = 2 * 1024 * 1024;

      if (form.file.size > maxSize) {
        newErrors.file = "Ukuran file maksimal 2MB";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      file,
    }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      console.log(errors);
      return;
    }

    try {
      console.log(form);

      navigate("/products");
    } catch (error) {
      console.error(error);
    }
  };

  // debounce 500ms
  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(query);
    }, 1000);

    return () => clearTimeout(t);
  }, [query]);

  // hit API setelah debounce
  useEffect(() => {
    if (!debounced) return;
    const load = async () => {
      try {
        const data = await getRoblox(debounced);
        console.log(data);
        setAvatar(data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [debounced]);

  return (
    <section className="relative py-20 bg-[#05080f] overflow-hidden text-white">
      {/* OUTER GLOW */}
      <div
        className="
          pointer-events-none
          absolute -inset-16
          bg-gradient-to-r
          from-cyan-500/20
          via-fuchsia-500/20
          to-purple-600/20
          blur-3xl
        "
      />

      {/* RADIAL CORE GLOW */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_top,
            rgba(34,211,238,0.18),
            transparent_60%
          )]
        "
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10">
        {/* TITLE */}
        <h2
          className="
            text-xl md:text-3xl
            font-bold
            tracking-widest
            text-cyan-400
            mb-12
          "
        >
          PAYMENT GATE
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* PAYMENT METHOD */}
          <div
            className="
              p-6
              rounded-2xl
              bg-[#0b0f1a]
              border
              border-cyan-400/30
              shadow-[0_0_30px_rgba(34,211,238,0.25)]
            "
          >
            <h3 className="text-lg font-bold tracking-widest mb-6 text-cyan-300">
              QRIS PAYMENT
            </h3>

            {/* QR IMAGE */}
            <div className="flex justify-center">
              <div
                className="
                  relative
                  p-4
                  rounded-xl
                  bg-black
                  border
                  border-cyan-400/40
                  shadow-[0_0_20px_rgba(34,211,238,0.4)]
                "
              >
                <img
                  src={qris}
                  alt="QRIS"
                  className="w-48 h-48 object-contain"
                />

                {/* SCANLINE */}
                <div
                  className="
                    pointer-events-none
                    absolute inset-0
                    bg-[linear-gradient(
                      rgba(255,255,255,0.05)_1px,
                      transparent_1px
                    )]
                    bg-[size:100%_4px]
                  "
                />
              </div>
            </div>

            <p className="mt-6 text-xs text-center text-gray-400">
              Scan QRIS menggunakan e-wallet atau mobile banking Anda
            </p>
          </div>

          {/* UPLOAD PROOF */}
          <div
            className="
              p-6
              rounded-2xl
              bg-[#0b0f1a]
              border
              border-fuchsia-500/30
              shadow-[0_0_30px_rgba(217,70,239,0.25)]
            "
          >
            <h3 className="text-lg font-bold tracking-widest mb-6 text-fuchsia-400">
              Pembayaran
            </h3>

            <form onSubmit={handleSubmit}>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="
                  w-full mt-1 px-4 py-3 mb-3 rounded-lg
                  bg-[#05080f] text-white
                  border border-cyan-400/30
                  focus:outline-none focus:ring-2 focus:ring-cyan-400
                "
              />
              <label className="text-sm text-gray-400">Username Roblox</label>
              <input
                type="username"
                onChange={(e) => {
                  const value = e.target.value;

                  setForm((prev) => ({
                    ...prev,
                    username: value,
                  }));

                  setQuery(value);
                }}
                className="
                  w-full mt-1 px-4 py-3 mb-3 rounded-lg
                  bg-[#05080f] text-white
                  border border-cyan-400/30
                  focus:outline-none focus:ring-2 focus:ring-cyan-400
                "
              />
              {avatar && (
                <div className="mt-4 mb-4">
                  <p className="text-xs text-gray-400 mb-2">Ava Roblox</p>
                  <img
                    src={avatar}
                    alt="Preview"
                    className="
                    max-h-30
                    object-contain
                    rounded-lg
                    border
                    border-fuchsia-400/30
                  "
                  />
                </div>
              )}

              <label
                className="
                flex flex-col items-center justify-center
                h-48
                border-2 border-dashed
                border-fuchsia-400/40
                rounded-xl
                cursor-pointer
                hover:bg-fuchsia-500/5
                transition
              "
              >
                <span className="text-xs tracking-widest text-gray-400">
                  Upload File Bukti Pembayaran
                </span>
                <input
                  onChange={handleUpload}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>

              {preview && (
                <div className="mt-4">
                  <p className="text-xs text-gray-400 mb-2">PREVIEW</p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="
                    w-full
                    max-h-64
                    object-contain
                    rounded-lg
                    border
                    border-fuchsia-400/30
                  "
                  />
                </div>
              )}

              <button
                className="
                mt-6
                w-full
                py-3
                rounded-lg
                bg-gradient-to-r
                from-cyan-500
                to-fuchsia-600
                font-bold
                tracking-widest
                text-sm
                hover:brightness-140
                transition
              "
              >
                CONFIRM PAYMENT
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
