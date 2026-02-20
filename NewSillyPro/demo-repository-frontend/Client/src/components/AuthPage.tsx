import { useState, useMemo, useRef } from "react";
import { Mail, Lock, User, Eye, EyeOff, Code, Terminal, GitBranch, Zap , LockIcon } from "lucide-react";

const generateStars = (count: number) => {
  const colors = ['#ffffff', '#60a5fa', '#a78bfa', '#ec4899', '#06b6d4', '#f97316', '#22c55e', '#fbbf24', '#f472b6', '#6366f1'];

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 0.5, // more variation
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: Math.random() * 8 + 5, // slower + varied for dynamic brightness
    delay: Math.random() * 8,
    opacity: Math.random() * 0.8 + 0.1, // enhanced brightness variation
  }));
};


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Memoize stars to prevent re-generation on every render
  const stars = useMemo(() => generateStars(200), []); // Increased star count
  const shootingStars = useMemo(() => [
    { id: 1, top: '15%', left: '5%', delay: '0s', duration: '2s' },
    { id: 2, top: '40%', left: '10%', delay: '2s', duration: '2.5s' },
    { id: 3, top: '70%', left: '15%', delay: '4s', duration: '2s' },
    { id: 4, top: '20%', left: '85%', delay: '1s', duration: '2.2s' },
    { id: 5, top: '60%', left: '90%', delay: '3s', duration: '2.5s' },
  ], []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Signing up...", formData);
  };

  const toggleMode = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    // Allow time for animations to complete (1s main transition + slight buffer)
    const animationDuration = 1150;

    // Toggle the mode immediately; the CSS delays will handle the sequence
    setIsLogin(!isLogin);

    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-x-hidden relative" style={{
      background: 'linear-gradient(135deg, rgba(5, 6, 8, 1) 0%, rgba(15, 12, 25, 0.8) 25%, rgba(8, 10, 20, 0.7) 50%, rgba(12, 8, 28, 0.6) 75%, rgba(5, 6, 8, 1) 100%)',
    }}>
      {/* Animated Deep Space Background - Pure Black with Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Stars Container */}
        <div className="stars-container">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full animate-twinkle"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                backgroundColor: star.color,
                opacity: star.opacity,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
                boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px rgba(255, 255, 255, 0.6), 0 0 ${star.size * 4}px rgba(255, 255, 255, 0.3)`,
              }}
            />
          ))}

          {/* Shooting Stars */}
          {shootingStars.map((star) => (
            <div
              key={star.id}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: star.top,
                left: star.left,
                animation: `shootingStar ${star.duration} ease-in-out infinite`,
                animationDelay: star.delay,
                boxShadow: '0 0 10px 2px rgba(255,255,255,0.8)',
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Auth Container */}
      <div className="relative z-10 w-full flex items-center justify-center px-4">
        {/* Outer Viewport: 800px wide - Clipping Mask Only */}
        <div
          className="relative overflow-visible"
          style={{ width: '800px', height: '600px' }}
        >
          {/* Inner Sliding Container: 300 (Left) + 500 (Form) + 300 (Right) = 1100px */}
          <div
            className={`flex h-full ease-in-out ${isLogin ? 'translate-x-0' : 'translate-x-[-300px]'
              }`}
            style={{ width: '1100px', transition: 'transform 1000ms ease-in-out' }}
          >
            {/* 1. LEFT Circle Section (Login Mode Decoration) */}
            <div
              className={`w-[300px] h-full relative ease-in-out rounded-l-full border-y border-l border-white/10  bg-transparent backdrop-blur-xl ${isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
              style={{
                transition: 'all 1000ms ease-in-out',
                background: 'linear-gradient(135deg, rgba(20, 20, 40, 0.3) 0%, rgba(10, 10, 20, 0.15) 100%)',
                boxShadow: 'inset 20px 0 30px rgba(255, 255, 255, 0.05), -10px 0 40px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Left Circle Content */}
              <div className="absolute inset-0 flex-col items-center justify-center hidden md:flex center">
                <img src="/vectorink-vectorizer-result.svg" alt="Developers" className="w-20 h-20 animate-float object-contain filter drop-shadow-lg" />
              </div>

              {/* Stars inside circle */}
              <div className="absolute inset-0 rounded-l-full overflow-hidden">
                {stars.slice(0, 30).map((star) => (
                  <div
                    key={`left-star-${star.id}`}
                    className="absolute rounded-full animate-twinkle"
                    style={{
                      left: `${star.x}%`,
                      top: `${star.y}%`,
                      width: star.size * 0.7,
                      height: star.size * 0.7,
                      backgroundColor: star.color,
                      opacity: star.opacity * 0.7,
                      animationDelay: `${star.delay}s`,
                      animationDuration: `${star.duration}s`,
                      boxShadow: `0 0 ${star.size}px rgba(255, 255, 255, 0.5)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* 2. CENTER Form Section */}
            <div
                className={`w-[500px] h-full relative bg-gray-900/40 backdrop-blur-xl border-y ease-in-out
                ${
                  isLogin
                    ? "border-blue-400/20 shadow-[0_0_25px_rgba(96,165,250,0.15)]"
                    : "border-purple-400/20 shadow-[0_0_25px_rgba(192,132,252,0.15)]"
                }
                ${isLogin ? "rounded-r-[3.5rem] border-r" : "rounded-l-[3.5rem] border-l"}
                `}
                style={{ transition: 'all 1000ms ease-in-out' }}
              >
              <div className="p-10 h-full flex flex-col justify-center">
                <div className="relative h-[420px]">
                  {/* Login Form */}
                  <div
                    className={`ease-in-out absolute inset-0 ${isLogin
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    style={{
                      transition: isLogin ? 'all 1000ms ease-in-out 130ms' : 'all 1000ms ease-in-out 0ms'
                    }}
                  >
                    <div className="mb-10 text-center">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <Terminal className="w-6 h-6 text-blue-400" />
                        <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">Authentication</span>
                      </div>
                      <h1 className="text-4xl font-bold text-white mb-2">Developer Access</h1>
                      <p className="text-gray-400 text-sm">Initialize your session with credentials</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 group-focus-within:text-blue-300 transition-colors" />
                        <input
                          type="email"
                          placeholder="username@dev.io"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-12 py-4 bg-gray-800/20 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-all"
                          required
                        />
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 group-focus-within:text-blue-300 transition-colors" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full px-12 py-4 bg-gray-800/20 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-all"
                          required
                        />
                      </div>
                      <button type="submit" className="w-full py-4 bg-blue-600 text-white hover:bg-blue-500 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98]">
                        Initialize
                      </button>
                    </form>
                    <div className="mt-8 text-center">
                      <p className="text-gray-400 text-sm">New here?</p>
                      <button onClick={toggleMode} className="text-blue-400 text-sm font-small hover:cursor-pointer hover:text-purple-400 hover:pl-3 transition-all duration-300" disabled={isAnimating}>
                        Create an account
                      </button>
                    </div>
                  </div>

                  {/* Signup Form */}
                  <div
                    className={`ease-in-out absolute inset-0 ${!isLogin
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    style={{
                      transition: !isLogin ? 'all 1000ms ease-in-out 130ms' : 'all 1000ms ease-in-out 0ms'
                    }}
                  >
                    <div className="mb-5 text-center">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <GitBranch className="w-6 h-6 text-purple-400" />
                        <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">Registration</span>
                      </div>
                      <h1 className="text-4xl font-bold text-white mb-2">Register Account</h1>
                      <p className="text-gray-400 text-sm">Join the developer community</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-300 transition-colors" />
                        <input
                          type="text"
                          placeholder="Developer name"
                          className="w-full px-12 py-4 bg-gray-800/20 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
                          required
                        />
                      </div>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-300 transition-colors" />
                        <input
                          type="email"
                          placeholder="phluxo@domain.dev"
                          className="w-full px-12 py-4 bg-gray-800/20 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
                          required
                        />
                      </div>
                      <div className="relative group">
                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-300 transition-colors" />
                        <input
                          type="text"
                          placeholder="Password"
                          className="w-full px-12 py-4 bg-gray-800/20 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
                          required
                        />
                      </div>
                      <button type="submit" className="w-full py-4 bg-purple-600 text-white hover:bg-purple-500 rounded-lg font-medium transition-all shadow-lg shadow-purple-500/30 active:scale-[0.98]">
                        Register
                      </button>
                    </form>
                    <div className="mt-8 text-center">
                      <p className="text-gray-400 text-sm">Already a member?</p>
                      <button onClick={toggleMode} className="text-purple-600 text-sm font-small hover:cursor-pointer hover:text-blue-400 hover:pr-3 transition-all duration-300" disabled={isAnimating}>
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. RIGHT Circle Section (Signup Mode Decoration) */}
            <div
              className={`w-[300px] h-full relative ease-in-out rounded-r-full border-y border-r border-white/10 bg-transparent backdrop-blur-xl ${!isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
              style={{
                transition: 'all 1000ms ease-in-out',
                background: 'linear-gradient(225deg, rgba(20, 20, 40, 0.3) 0%, rgba(10, 10, 20, 0.15) 100%)',
                boxShadow: 'inset -10px 0 30px rgba(255, 255, 255, 0.05), 10px 0 40px rgba(0, 0, 0, 0.5)',
              }}
            >

              {/* Right Circle Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/vectorink-vectorizer-result.svg" alt="Developers" className="w-20 h-20 animate-float object-contain filter drop-shadow-lg" />
              </div>

              {/* Stars inside circle */}
              <div className="absolute inset-0 rounded-r-full overflow-hidden">
                {stars.slice(30, 60).map((star) => (
                  <div
                    key={`right-star-${star.id}`}
                    className="absolute rounded-full animate-twinkle"
                    style={{
                      left: `${star.x}%`,
                      top: `${star.y}%`,
                      width: star.size * 0.7,
                      height: star.size * 0.7,
                      backgroundColor: star.color,
                      opacity: star.opacity * 0.7,
                      animationDelay: `${star.delay}s`,
                      animationDuration: `${star.duration}s`,
                      boxShadow: `0 0 ${star.size}px rgba(255, 255, 255, 0.5)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.1; transform: scale(0.9); }
          25% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
          75% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 0.1; transform: scale(0.9); }
        }
        
        @keyframes shootingStar {
          0% { transform: translateX(0) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateX(100vw) translateY(100vh); opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-twinkle {
          animation: twinkle var(--duration) ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;