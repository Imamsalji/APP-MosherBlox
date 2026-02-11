import { useState } from "react";
import qris from "./../../assets/img/logoMosher.jpeg";

const CyberpunkPayment = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

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
              UPLOAD PROOF
            </h3>

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
                TAP OR DROP IMAGE
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>

            {preview && (
              <div className="mt-4">
                <p className="text-xs text-gray-400 mb-2">
                  PREVIEW
                </p>
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
          </div>

        </div>
      </div>
    </section>
  );
};

export default CyberpunkPayment;
