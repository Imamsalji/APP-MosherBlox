import { useEffect, useState } from "react";
import GlowCard from "../component/GlowCard";
import logo from './../assets/img/logoMosher.jpeg';

export default function Game() {
    useEffect(() => {
    }, []);

    return (
        <section id="games" className="container mx-auto px-6 md:px-10 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-['Comic_Sans_MS',_cursive] font-bold mb-10">Games</h2>
            <div
            className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-6
                gap-6
            "
            >
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((item) => (
            <GlowCard
                title="Mobile Legends"
                image={logo}
                description="Top up cepat & aman"
            />
            ))}
            </div>
    </section>
    );
}