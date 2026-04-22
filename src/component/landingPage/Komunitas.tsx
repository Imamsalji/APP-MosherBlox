const Komunitas = () => {
  return (
    <section
      id="komunitas"
      className="relative bg-gray-950 container mx-auto px-6 md:px-10 py-20 text-center overflow-hidden"
    >
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-14 text-cyan-400 tracking-widest ">
          GABUNG KOMUNITAS KAMI
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card */}
          <div className="group p-6 rounded-2xl border border-cyan-500/20 bg-black/40 backdrop-blur-lg hover:shadow-[0_0_25px_#00ffff] transition-all duration-300">
            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-3xl shadow-[0_0_20px_#00ffff] group-hover:scale-110 transition">
              💡
            </div>
            <h4 className="mt-6 text-lg font-bold text-white group-hover:text-cyan-400">
              WhatsApp Group
            </h4>
          </div>

          {/* Card */}
          <div className="group p-6 rounded-2xl border border-pink-500/20 bg-black/40 backdrop-blur-lg hover:shadow-[0_0_25px_#ff00ff] transition-all duration-300">
            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-3xl shadow-[0_0_20px_#ff00ff] group-hover:scale-110 transition">
              🚀
            </div>
            <h4 className="mt-6 text-lg font-bold text-white group-hover:text-pink-400">
              Discord
            </h4>
          </div>

          {/* Card */}
          <div className="group p-6 rounded-2xl border border-purple-500/20 bg-black/40 backdrop-blur-lg hover:shadow-[0_0_25px_#a855f7] transition-all duration-300">
            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 text-3xl shadow-[0_0_20px_#a855f7] group-hover:scale-110 transition">
              ⚡
            </div>
            <h4 className="mt-6 text-lg font-bold text-white group-hover:text-purple-400">
              Instagram
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Komunitas;
