import logoheader from './../assets/img/WhatsApp_Image_2026-01-06_at_14.50.23-removebg-preview (1).png';
import { useEffect, useState } from "react";
import gaming1 from "./../assets/img/gaming1.jpg";
import gaming2 from "./../assets/img/gaming2.jpg";
import gaming3 from "./../assets/img/gaming3.jpg";
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "NEON BATTLE",
    subtitle: "Top up game dengan kecepatan cahaya",
    image: gaming1,
  },
  {
    id: 2,
    title: "CYBER REALM",
    subtitle: "Pembayaran aman & instan",
    image:gaming2,
  },
  {
    id: 3,
    title: "QUANTUM POWER",
    subtitle: "Dominasi arena tanpa delay",
    image: gaming3,
  },
];

export default function Header() {
    
    const [active, setActive] = useState(0);
    
    return (
        <header id="home" className="container header-bg mx-auto px-6 md:px-10 py-10 md:py-16 flex flex-col md:flex-row items-center text-center md:text-left">
            <div className="md:w-1/2 space-y-6" data-aos="fade-up">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">Lorem ipsum  place holder text</h1>
                <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto md:mx-0">Dapatkan produk berkualitas dengan proses cepat, harga bersahabat, dan pelayanan ramah. Cocok untuk kamu yang nggak mau ribet dan ingin transaksi tanpa drama!</p>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center w-full" data-aos="zoom-in">
            {/* start FRAME */}
            <div className="
                relative z-10
                w-full max-w-5xl
                h-[220px] md:h-[380px]
                rounded-3xl
                p-[2px]
                bg-gradient-to-r
                from-cyan-400
                via-fuchsia-500
                to-purple-600
                shadow-[0_0_40px_rgba(34,211,238,0.5)]
                "
            >
                <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#0b0f1a]">

                    {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`
                        absolute inset-0 transition-opacity duration-1000
                        ${index === active ? "opacity-100" : "opacity-0"}
                        `}
                    >
                        <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/20" />

                        <div className="absolute inset-0 flex items-center">
                        <div className="px-6 md:px-12 text-white">

                            <h2 className="text-xl md:text-4xl font-bold tracking-widest text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                            {slide.title}
                            </h2>

                            <p className="mt-3 max-w-md text-sm md:text-base text-gray-300">
                            {slide.subtitle}
                            </p>

                            <button
                            className="
                                mt-6 px-6 py-3 rounded-lg
                                bg-gradient-to-r from-cyan-500 to-fuchsia-600
                                text-black font-bold tracking-widest text-sm
                                hover:brightness-125 transition
                                shadow-[0_0_20px_rgba(217,70,239,0.6)]
                            "
                            >
                            TOP UP NOW
                            </button>

                        </div>
                        </div>
                    </div>
                    ))}

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                        key={index}
                        onClick={() => setActive(index)}
                        className={`
                            w-3 h-3 rounded-full transition
                            ${
                            index === active
                                ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                                : "bg-white/30"
                            }
                        `}
                        />
                    ))}
                    </div>

                </div>
            </div>
            {/* finish */}
                {/* <div className="relative w-full max-w-[300px] md:max-w-md">
                    <div className=" rounded-3xl p-3 transform rotate-6 md:rotate-12 shadow-2xl">
                        <img style={{ background: 'transparent' }} src={logoheader} />
                    </div>
                </div> */}
            </div>
        </header>
    )
}