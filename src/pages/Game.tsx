import { useEffect, useState } from "react";
import {getGames,getGameDetail} from "../api/game";
import type {Game} from "../types/Game";
import type {Product} from "../types/Product";
import { useNavigate, useParams } from "react-router-dom";
import GlowCard from "../component/GlowCard";
import logo from './../assets/img/logoMosher.jpeg';
import CyberpunkSpinner from "../component/transaksi/CyberpunkSpinner";
import { getCart } from '../api/cart'
import type { CartItem } from '../types/Cart'
import Toast from "./../component/transaksi/Toast"

type CartRow = {
  id: number
  qty: number
}

type Props = {
  id: number
  DCart: CartRow[]
}

const CekCart = ({ id, DCart }: Props) => {
    const [attr, setAttr] = useState(false);
    const [total, setTotal] = useState<number>(0)

    const fetchCart = async () => {
        try {
            const tCart = DCart.find(x => x.id === id)
            if (tCart) {
                setAttr(true)
                setTotal(tCart.qty)
            }else {
                setAttr(false)
                setTotal(0)
            }
        } catch (error) {
            console.error(error)
        } 
    }

    useEffect(() => {
        fetchCart()
    }, [id])

    if (attr) {
        return (<span
            className="
                absolute
                -top-2
                -right-2
                bg-fuchsia-500
                text-black
                text-[10px]
                font-bold
                px-2
                py-0.5
                rounded-full
                shadow-[0_0_8px_#ff00ff]
                animate-bounce
            "
        >
            {total}
        </span>);
    }else{
        return
    }
};

export default function Game() {
    const [cartem, setCartem] = useState<CartRow[]>([])
    const { slug } = useParams();
    const [game, setGame] = useState<Game[]>([])
    const [show, setShow] = useState(false)
    
    const handleCheckout = async (id: number) => {
        console.log("Tambah ke cart:", id)
        setShow(true)
    }

    useEffect(() => {
        if (!slug) return
        const load = async () => {
            try {
                const data = await getCart()

                const ids = data.items.map((item: CartItem) => ({
                    id: item.product_id,
                    qty: item.qty
                }))

                setCartem(ids)

                const gameData = await getGameDetail(slug)
                setGame(gameData)

            } catch (err) {
                console.error(err)
            }
        }

        load()
    }, [slug])
    if (!game) return null
    console.log('cartem');
    console.log(cartem);
    

    return (
    <section id="games" className="container mx-auto px-6 md:px-10 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-['Comic_Sans_MS',_cursive] font-bold mb-10">Games</h2>
        <Toast
            show={show}
            message="Game Berhasil Di Tambahkan! "
            onClose={() => setShow(false)}
        />
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
                {game.map((item:Game) => (
                    <GlowCard id={item.id} title={item.name} image={logo} description='' onChange={handleCheckout} >
                        <CekCart id={item.id} DCart={cartem}/>
                        {/* <span
                            className="
                                absolute
                                -top-2
                                -right-2
                                bg-fuchsia-500
                                text-black
                                text-[10px]
                                font-bold
                                px-2
                                py-0.5
                                rounded-full
                                shadow-[0_0_8px_#ff00ff]
                                animate-bounce
                            "
                        >
                            3
                        </span> */}
                    </GlowCard>
                ))}
                </div>
            )}
            
    </section>
    );
}