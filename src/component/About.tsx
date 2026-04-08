import React, { useState, useEffect } from "react";
import {
  Gamepad2,
  Zap,
  Users,
  Shield,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function AboutUsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const stats = [
    {
      icon: Users,
      label: "Pelanggan",
      value: "50K+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      label: "Transaksi",
      value: "100K+",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      label: "Kecepatan",
      value: "< 5 Min",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Shield,
      label: "Keamanan",
      value: "100%",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const features = [
    {
      title: "Robux Instan",
      description:
        "Dapatkan Robux langsung ke akun Anda tanpa delay atau verifikasi rumit",
      icon: Sparkles,
    },
    {
      title: "Harga Kompetitif",
      description:
        "Kami menawarkan harga terbaik di pasaran dengan berbagai pilihan paket",
      icon: TrendingUp,
    },
    {
      title: "Aman & Terpercaya",
      description:
        "Sistem pembayaran terenkripsi dan akun Anda dijamin 100% aman",
      icon: Shield,
    },
    {
      title: "Layanan 24/7",
      description:
        "Tim customer service kami siap membantu kapan saja Anda membutuhkan",
      icon: Zap,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-screen opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen opacity-20 blur-3xl animate-pulse"></div>
        <div
          className="absolute w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen opacity-10 blur-3xl"
          style={{
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transition: "all 0.3s ease-out",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header Section */}
        <div
          className={`max-w-4xl mx-auto text-center mb-16 sm:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          onMouseMove={handleMouseMove}
        >
          <div className="inline-block mb-4 sm:mb-6">
            <span className="text-sm sm:text-base font-bold tracking-widest uppercase bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tentang Kami
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Platform Robux Terpercaya
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Kami adalah penyedia layanan Robux Gift in Game terdepan di
            Indonesia dengan jutaan pelanggan puas. Bergabunglah dengan
            komunitas gamer terbesar dan nikmati pengalaman berbelanja yang
            aman, cepat, dan terpercaya.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`group relative p-6 sm:p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--color-from), var(--color-to))`,
                  }}
                ></div>

                <div
                  className={`relative z-10 bg-gradient-to-r ${stat.color} rounded-xl p-3 w-fit mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Mengapa Memilih Kami?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDelay: isVisible
                      ? `${200 + index * 100}ms`
                      : "0ms",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-cyan-600/0 group-hover:from-purple-600/10 group-hover:to-cyan-600/10 rounded-2xl transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-purple-500/30 backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 rounded-full mix-blend-screen opacity-10 blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500 rounded-full mix-blend-screen opacity-10 blur-3xl -z-10"></div>

            <Gamepad2 className="w-16 h-16 mx-auto mb-6 text-purple-400 animate-bounce" />

            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Siap Bermain dengan Robux Unlimited?
            </h3>
            <p className="text-slate-300 mb-8 text-base sm:text-lg">
              Dapatkan akses instant ke ribuan game Roblox dan tingkatkan
              pengalaman gaming Anda sekarang juga.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transform">
                Mulai Sekarang
              </button>
              <button className="px-8 py-3 sm:py-4 border-2 border-cyan-500 hover:bg-cyan-500/10 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 text-cyan-400">
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
