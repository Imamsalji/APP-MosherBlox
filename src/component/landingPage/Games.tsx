import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getGames } from "../../api/game";
import CyberpunkSpinner from "../transaksi/CyberpunkSpinner";
import { Game } from "../../types/Game";
import CyberpunkCard from "../transaksi/CyberpunkCard";

const Games = () => {
  const navigate = useNavigate();

  const { data: game, isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });
  if (isLoading) return <CyberpunkSpinner size={50} text="Loading" />;
  return (
    <section
      id="games"
      className="container mx-auto px-2 md:px-10 py-5 text-center"
    >
      <h2 className="text-2xl md:text-3xl font-['Comic_Sans_MS',_cursive] font-bold mb-10">
        Games
      </h2>
      <div
        className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-6
                gap-6
            "
      ></div>
      <div
        className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-6
                gap-2
            "
      >
        {game?.map((item: Game) => (
          <CyberpunkCard
            title={item.name}
            image={item.image_url}
            tag={item.slug}
          />
        ))}
      </div>
      <button
        className="mt-8 border border-purple-500 text-purple-400 hover:brightness-150 px-6 py-2 rounded-full text-sm w-full md:w-auto"
        onClick={() => navigate(`/game`)}
      >
        {" "}
        VIEW MORE GAMES
      </button>
    </section>
  );
};

export default Games;
