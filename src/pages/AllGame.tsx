import { useEffect, useState } from "react";
import {getGames} from "../api/game";
import type {Game} from "../types/Game";
import logo from './../assets/img/logoMosher.jpeg';
import CyberpunkCard from "../component/transaksi/CyberpunkCard";
import CyberpunkSpinner from "../component/transaksi/CyberpunkSpinner";

export default function AllGame() {
    const [game, setGame] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const data = await getGames()
                setGame(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchGame()
    }, []);
    console.log(game);
    

    return (
    <section id="games" className="container mx-auto px-6 md:px-10 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-['Comic_Sans_MS',_cursive] font-bold mb-10">Games</h2>
            {game.length === 0 ? (
                <CyberpunkSpinner size={80} text="Loading" />
            ) : (
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
                {game.map((item) => (
                <CyberpunkCard
                    title={item.name}
                    image={logo}
                    tag={item.slug}
                />
                ))}
            </div>
            )}
    </section>
    );
}