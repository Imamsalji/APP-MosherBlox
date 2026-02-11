import { useNavigate } from "react-router-dom";
type CyberpunkCardProps = {
  title: string;
  image: string;
  tag?: string;
};

const CyberpunkCard = ({ title, image, tag }: CyberpunkCardProps) => {
  const navigate = useNavigate();
  
  const gameDetail = async (id: string) => {
        console.log(id);
        navigate(`/detail-game/${id}`);
    };
  return (
    <div className="relative group">

      {/* Neon Glow */}
      <div
        className="
          absolute -inset-1
          rounded-2xl
          bg-gradient-to-r
          from-cyan-400
          via-fuchsia-500
          to-purple-600
          opacity-60
          blur-2xl
          group-hover:opacity-100
          transition
          duration-500
        "
      />

      {/* Card */}
      <div
        className="
          relative
          bg-[#0b0f1a]
          rounded-2xl
          border
          border-cyan-400/30
          overflow-hidden
          shadow-[0_0_30px_rgba(34,211,238,0.25)]
          transition
          duration-300
          group-hover:-translate-y-1
        "
      >

        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="
              w-full h-full
              object-cover
              group-hover:scale-110
              transition
              duration-500
            "
          />

          {/* Scanline Effect */}
          <div className="
            absolute inset-0
            bg-[linear-gradient(
              rgba(255,255,255,0.03)_1px,
              transparent_1px
            )]
            bg-[size:100%_4px]
            opacity-30
            pointer-events-none
          " />
        </div>

        {/* Content */}
        <div className="p-3 text-white">

          {tag && (
            <span
              className="
                inline-block
                mb-2
                px-2 py-0.5
                text-[10px]
                font-semibold
                tracking-widest
                text-cyan-300
                border
                border-cyan-400/40
                rounded
              "
            >
              {tag}
            </span>
          )}

          <h3 className="text-sm md:text-base font-bold tracking-wide">
            {title}
          </h3>

          <button
            className="
              mt-4
              w-full
              py-2
              rounded-md
              bg-gradient-to-r
              from-cyan-500
              to-fuchsia-600
              text-xs md:text-sm
              font-semibold
              tracking-widest
              hover:brightness-125
              transition
            "
            onClick={() => gameDetail(tag!)}
          >
            ACCESS
          </button>
        </div>

      </div>
    </div>
  );
};

export default CyberpunkCard;
