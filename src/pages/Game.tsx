import { useEffect, useState } from "react";
import {getGames,getGameDetail} from "../api/game";
import type {Game} from "../types/Game";
import type {Product} from "../types/Product";
import { useNavigate, useParams } from "react-router-dom";
import GlowCard from "../component/GlowCard";
import logo from './../assets/img/logoMosher.jpeg';
import CyberpunkSpinner from "../component/transaksi/CyberpunkSpinner";
import { getCart } from '../api/cart'

type Props = {
  id: number;
  DCart:[]
};

const CekCart = ({ id, DCart }: Props) => {
    const [attr, setAttr] = useState(false);
    const [total, setTotal] = useState<number>(0)
    let ini=[];
    let tCart=[];

    const fetchCart = async () => {
        try {
            const data = await getCart()
            // ini=data.items;
            ini = data.items;
            tCart = ini.find(x => x.product_id === id)
            // console.log('asdasdasd');
            // console.log(ini.find(x => x.product_id === id));
            // console.log(ini.find(x => x.product_id === id) !== undefined);
            // console.log('=================');
            if (ini.find(x => x.product_id === id) !== undefined) {
                setAttr(ini.find(x => x.product_id === id) !== undefined)
                setTotal(tCart.qty)
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
    const { slug } = useParams();
    if (!slug) return null
    const [game, setGame] = useState<Game | []>([])
    // const [products, setProducts] = useState<Product | []>([])
    // const [gamelist, setGamelist] = useState();
    const handleClick = () => {
        alert('Button diklik!')
    }

    useEffect(() => {
        getGameDetail(slug).then(setGame)
    }, [slug])
    if (!game) return null
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
                {game.map((item:Game) => (
                    <GlowCard title={item.name} image={logo} description=''>
                        <CekCart id={item.id}/>
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