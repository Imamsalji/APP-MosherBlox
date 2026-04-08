import { useEffect, useRef, useState } from "react";

interface Slide {
  id: number;
  tag: string;
  tagClass: string;
  avatarClass: string;
  title: string;
  description: string;
  author: string;
  initials: string;
  emoji: string;
  bgClass: string;
}

const slides: Slide[] = [
  {
    id: 1,
    tag: "Gaya Hidup",
    tagClass: "bg-green-900/60 text-green-300",
    avatarClass: "bg-green-900/60 text-green-300",
    title: "Hidup minimalis: mulai dari hal kecil",
    description:
      "Lima langkah sederhana untuk melepaskan barang yang tidak perlu dan menemukan ketenangan.",
    author: "Andi R.",
    initials: "AR",
    emoji: "🌿",
    bgClass: "bg-green-950/40",
  },
  {
    id: 2,
    tag: "Teknologi",
    tagClass: "bg-blue-900/60 text-blue-300",
    avatarClass: "bg-blue-900/60 text-blue-300",
    title: "Kecerdasan buatan di tangan semua orang",
    description:
      "Bagaimana AI mengubah cara kita bekerja, berkreasi, dan belajar dalam kehidupan sehari-hari.",
    author: "Dina S.",
    initials: "DS",
    emoji: "💡",
    bgClass: "bg-blue-950/40",
  },
  {
    id: 3,
    tag: "Desain",
    tagClass: "bg-amber-900/60 text-amber-300",
    avatarClass: "bg-amber-900/60 text-amber-300",
    title: "Warna yang berbicara: psikologi visual",
    description:
      "Mengapa pilihan warna mempengaruhi perasaan pengguna dan bagaimana memanfaatkannya.",
    author: "Nina P.",
    initials: "NP",
    emoji: "🎨",
    bgClass: "bg-amber-950/40",
  },
  {
    id: 4,
    tag: "Karir",
    tagClass: "bg-purple-900/60 text-purple-300",
    avatarClass: "bg-purple-900/60 text-purple-300",
    title: "Produktivitas tanpa burnout: rahasia para profesional",
    description:
      "Strategi nyata yang digunakan oleh pemimpin industri untuk tetap fokus dan sehat.",
    author: "Bayu K.",
    initials: "BK",
    emoji: "🚀",
    bgClass: "bg-purple-950/40",
  },
  {
    id: 5,
    tag: "Travel",
    tagClass: "bg-rose-900/60 text-rose-300",
    avatarClass: "bg-rose-900/60 text-rose-300",
    title: "Destinasi tersembunyi di Nusantara yang menakjubkan",
    description:
      "Tujuh tempat luar biasa yang belum banyak dikenal wisatawan dan cara terbaik menuju ke sana.",
    author: "Laras H.",
    initials: "LH",
    emoji: "🌍",
    bgClass: "bg-rose-950/40",
  },
];

const getVisible = (): number => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
};

const ArticleCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(getVisible);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxIndex = slides.length - visible;

  const startAuto = (max: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev >= max ? 0 : prev + 1));
    }, 4000);
  };

  useEffect(() => {
    startAuto(maxIndex);

    const handleResize = () => {
      const v = getVisible();
      const max = slides.length - v;
      setVisible(v);
      setCurrent(0);
      startAuto(max);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, maxIndex));
    setCurrent(clamped);
    startAuto(maxIndex);
  };

  const GAP = 16;
  const cardWidth = `calc((100% - ${GAP * (visible - 1)}px) / ${visible})`;

  return (
    <section className="py-12 px-4 sm:px-8 lg:px-16">
      {/* <section className="bg-gray-950 py-12 px-4 sm:px-8 lg:px-16"> */}
      {/* Header */}
      <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1">
        Artikel pilihan
      </p>

      <div className="flex items-start sm:items-end justify-between gap-4 mb-6 flex-col sm:flex-row">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Jelajahi konten terbaru
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Temukan inspirasi, tips, dan cerita menarik untuk hari ini.
          </p>
        </div>

        {/* Prev / Next */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition-colors disabled:opacity-25 disabled:cursor-not-allowed text-lg leading-none"
          >
            ‹
          </button>
          <button
            onClick={() => goTo(current + 1)}
            disabled={current === maxIndex}
            className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition-colors disabled:opacity-25 disabled:cursor-not-allowed text-lg leading-none"
          >
            ›
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(calc(-${current} * (${cardWidth} + ${GAP}px)))`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              style={{ width: cardWidth, flexShrink: 0 }}
              className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden hover:border-gray-600 transition-colors duration-200 group"
            >
              {/* Thumbnail */}
              <div
                className={`w-full aspect-video flex items-center justify-center text-5xl ${slide.bgClass}`}
              >
                {slide.emoji}
              </div>

              {/* Content */}
              <div className="p-4">
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${slide.tagClass}`}
                >
                  {slide.tag}
                </span>

                <h3 className="text-sm font-semibold text-white leading-snug mb-2 group-hover:text-gray-200 transition-colors">
                  {slide.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                  {slide.description}
                </p>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${slide.avatarClass}`}
                    >
                      {slide.initials}
                    </div>
                    <span className="text-xs text-gray-400">
                      {slide.author}
                    </span>
                  </div>
                  <button className="text-xs font-semibold border border-gray-700 rounded-lg px-3 py-1.5 text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition-colors">
                    Baca →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex gap-2 items-center justify-center mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-white"
                : "w-1.5 bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ArticleCarousel;
