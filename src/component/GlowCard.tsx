type GlowCardProps = {
  Dcart: {
    id: number
    qty: number
  };
  title: string;
  image: string;
  description?: string;
  children?: React.ReactNode;
  onChange: (id: number , qty: number) => void
};

const GlowCard = ({Dcart, title, image, description, children, onChange}: GlowCardProps) => {
  return (
    <div className="relative group">

      {/* Glow Background */}
      <div
        className="
          absolute -inset-0.5
          rounded-2xl
          bg-gradient-to-r
          from-indigo-500
          via-purple-500
          to-pink-500
          opacity-40
          blur-xl
          group-hover:opacity-70
          transition
          duration-300
        "
      />

      {/* Card */}
      <div
        className="
          relative
          bg-slate-900
          rounded-2xl
          overflow-hidden
          shadow-xl
          transition
          duration-300
          group-hover:-translate-y-1
        "
      >

        {/* Image */}
        <div className="aspect-[3/4]">
          <img
            src={image}
            alt={title}
            className="
              w-full h-full
              object-cover
            "
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm md:text-base">
            {title}
          </h3>

          {description && (
            <p className="mt-1 text-xs md:text-sm text-gray-400">
              {description}
            </p>
          )}

          <button
            className="
              mt-4
              w-full
              py-2
              rounded-lg
              text-xs md:text-sm
              text-cyan-300
              bg-black
              border border-cyan-400
              shadow-[0_0_10px_#22d3ee]
              hover:shadow-[0_0_18px_#22d3ee]
              hover:text-white
              transition-all
              duration-300
              flex
              items-center
              justify-center
              gap-2
              relative
              tracking-wider
            "
            onClick={() => onChange(Dcart.id,Dcart.qty)}>

            ADD TO CART
            {children}
          </button>
        </div>

      </div>
    </div>
  );
};

export default GlowCard;
