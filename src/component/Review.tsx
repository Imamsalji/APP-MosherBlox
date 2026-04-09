import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Review() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const reviews = [
    {
      id: 1,
      name: "Reza Pratama",
      role: "Gamer Pro",
      avatar: "👨‍💻",
      rating: 5,
      text: "Layanan terbaik yang pernah saya gunakan! Robux langsung masuk ke akun tanpa perlu menunggu. Prosesnya sangat cepat dan aman. Highly recommended!",
      verified: true,
      platform: "Roblox",
    },
    {
      id: 2,
      name: "Maya Kusuma",
      role: "Content Creator",
      avatar: "👩‍🎬",
      rating: 5,
      text: "Saya sudah beli berkali-kali dan selalu memuaskan. Customer service mereka sangat responsif dan membantu. Harga juga paling kompetitif di pasaran!",
      verified: true,
      platform: "Roblox",
    },
    {
      id: 3,
      name: "Ade Suryanto",
      role: "Streamer",
      avatar: "🎮",
      rating: 5,
      text: "Platform yang benar-benar bisa dipercaya. Saya sudah transfer jutaan dan tidak ada masalah sama sekali. Terima kasih sudah membuat gaming jadi lebih mudah!",
      verified: true,
      platform: "Roblox",
    },
    {
      id: 4,
      name: "Siti Rahma",
      role: "Student Gamer",
      avatar: "👩‍🎓",
      rating: 5,
      text: "Promo mereka sangat bagus dan terjangkau untuk anak muda seperti saya. Pembayaran bisa via berbagai metode. Puas banget dengan layanannya!",
      verified: true,
      platform: "Roblox",
    },
    {
      id: 5,
      name: "Budi Hartono",
      role: "Business Owner",
      avatar: "👨‍💼",
      rating: 5,
      text: "Sebagai reseller, saya sangat terbantu dengan harga grosir mereka. Sistem yang transparan dan support team yang helpful 24/7. Best choice!",
      verified: true,
      platform: "Roblox",
    },
  ];

  const goToSlide = (index: any) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlay(false);
  };

  const renderStars = (rating: any) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "fill-amber-400 text-amber-400" : "text-slate-600"
        }`}
      />
    ));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-600 rounded-full mix-blend-screen opacity-15 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-screen opacity-15 blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-12 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block mb-4 sm:mb-6">
            <span className="text-sm sm:text-base font-bold tracking-widest uppercase bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Testimoni Pelanggan
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              Kepuasan Pelanggan Kami
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Ribuan pelanggan puas telah mempercayai kami untuk kebutuhan Robux
            mereka. Baca testimoni nyata dari komunitas gamer kami.
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative mb-12 sm:mb-16">
          {/* Review Cards Container */}
          <div className="relative h-auto">
            <div className="overflow-hidden rounded-3xl">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    index === currentSlide
                      ? "opacity-100 translate-x-0"
                      : index < currentSlide
                        ? "opacity-0 translate-x-full"
                        : "opacity-0 -translate-x-full"
                  }`}
                  style={{
                    pointerEvents: index === currentSlide ? "auto" : "none",
                  }}
                >
                  <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-purple-900/60 backdrop-blur-xl border border-slate-700/50 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>

                    <div className="relative z-10">
                      {/* Quote Icon */}
                      <div className="mb-8">
                        <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 opacity-50" />
                      </div>

                      {/* Review Text */}
                      <p className="text-xl sm:text-2xl font-medium text-white mb-8 leading-relaxed">
                        "{review.text}"
                      </p>

                      {/* Rating */}
                      <div className="flex gap-1 mb-8">
                        {renderStars(review.rating)}
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-3xl sm:text-4xl">
                              {review.avatar}
                            </div>
                            {review.verified && (
                              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  ✓
                                </span>
                              </div>
                            )}
                          </div>

                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-white">
                              {review.name}
                            </h3>
                            <p className="text-slate-400 text-sm sm:text-base">
                              {review.role}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-sm font-semibold text-cyan-300">
                            {review.platform}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Spacer untuk height */}
              <div className="invisible w-full">
                <div className="p-8 sm:p-12 lg:p-16 rounded-3xl">
                  <div className="text-2xl font-medium mb-8 h-16"></div>
                  <div className="flex gap-1 mb-8"></div>
                  <div className="h-16"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 sm:-translate-x-20 z-20 p-3 sm:p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 sm:translate-x-20 z-20 p-3 sm:p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mb-12 sm:mb-16 flex-wrap">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-8 h-3 bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/50"
                  : "w-3 h-3 bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2 sm:gap-8">
          {[
            { number: "10K+", label: "Review Positif" },
            { number: "4.9/5", label: "Rating Rata-rata" },
            { number: "99.8%", label: "Kepuasan Pelanggan" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-cyan-500/50 text-center transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20 transform hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${400 + index * 100}ms` : "0ms",
              }}
            >
              <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
                {stat.number}
              </div>
              <p className="text-slate-400 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse-custom {
          0%, 100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.25;
          }
        }

        .animate-pulse {
          animation: pulse-custom 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
