export default function StartButton() {
  return (
    <div className="flex items-center justify-center gap-6 mt-10">
      
      {/* GET STARTED — SKY GLASS */}
      <button className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-md overflow-hidden transition-all duration-500 active:scale-95">
        
        {/* Glass Base */}
        <span className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-sky-400/25 to-sky-200/10 border border-sky-300/30 rounded-md transition-all duration-500 group-hover:bg-gray-500 group-hover:animate-[metallic_5s_linear_infinite]" />

        {/* Light Refraction Edge */}
        <span className="absolute inset-0 rounded-md shadow-[inset_0_0_25px_rgba(255,255,255,0.25)] transition-all duration-500" />

        {/* Shine Sweep */}
        <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.7),transparent)] translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />

        {/* Colored Glow on Hover */}
        <span className="absolute inset-0 rounded-md transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.8),0_0_60px_rgba(56,189,248,0.4)]" />

        <span className="relative z-10 text-sky-100 group-hover:text-black transition-colors duration-500">
          Get Started
        </span>
      </button>

      {/* GET A DEMO — GREEN GLASS */}
      <button className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-md overflow-hidden transition-all duration-500 active:scale-95">
        
        {/* Glass Base */}
        <span className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-emerald-400/25 to-emerald-200/10 border border-emerald-300/30 rounded-md transition-all duration-500 group-hover:bg-white group-hover:animate-[metallic_5s_linear_infinite]" />

        {/* Light Refraction Edge */}
        <span className="absolute inset-0 rounded-md shadow-[inset_0_0_25px_rgba(255,255,255,0.25)] transition-all duration-500" />

        {/* Shine Sweep */}
        <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.7),transparent)] translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />

        {/* Colored Glow on Hover */}
        <span className="absolute inset-0 rounded-md transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.8),0_0_60px_rgba(16,185,129,0.4)]" />

        <span className="relative z-10 text-emerald-100 group-hover:text-black transition-colors duration-500">
          Get a Demo
        </span>
      </button>

    </div>
  );
}
