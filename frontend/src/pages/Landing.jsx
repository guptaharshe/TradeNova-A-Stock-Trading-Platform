import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// Professional Trading Chart with Drawing Animation
const TradingChart = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    let animationId;
    let drawProgress = 0;
    let time = 0;

    // Generate candlestick data
    const candleData = [];
    const numCandles = 40;
    let lastClose = 100;

    for (let i = 0; i < numCandles; i++) {
      const change = (Math.random() - 0.48) * 8;
      const open = lastClose;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 4;
      const low = Math.min(open, close) - Math.random() * 4;
      candleData.push({ open, close, high, low });
      lastClose = close;
    }

    // Generate world map dots pattern
    const worldDots = [];
    for (let i = 0; i < 300; i++) {
      worldDots.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.8 + height * 0.1,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    const drawChart = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark blue gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, "#0a1628");
      bgGradient.addColorStop(1, "#0d1f3c");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw world map dots with subtle animation
      worldDots.forEach((dot, i) => {
        const pulse = 1 + Math.sin(time * 0.02 + i * 0.1) * 0.3;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${dot.opacity * pulse})`;
        ctx.fill();
      });

      // Grid lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 5; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.setLineDash([3, 6]);
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Calculate price range
      const allPrices = candleData.flatMap(c => [c.high, c.low]);
      const minPrice = Math.min(...allPrices) - 5;
      const maxPrice = Math.max(...allPrices) + 5;
      const priceRange = maxPrice - minPrice;

      const candleWidth = (width - 100) / numCandles;
      const gap = candleWidth * 0.3;

      // Drawing animation progress
      const visibleCandles = Math.floor((drawProgress / 100) * numCandles);

      // Draw candlesticks with animation
      for (let i = 0; i < Math.min(visibleCandles, numCandles); i++) {
        const candle = candleData[i];
        const x = 40 + i * candleWidth;
        const isGreen = candle.close >= candle.open;

        // Calculate Y positions
        const highY = height - 40 - ((candle.high - minPrice) / priceRange) * (height - 80);
        const lowY = height - 40 - ((candle.low - minPrice) / priceRange) * (height - 80);
        const openY = height - 40 - ((candle.open - minPrice) / priceRange) * (height - 80);
        const closeY = height - 40 - ((candle.close - minPrice) / priceRange) * (height - 80);

        // Fade-in effect for new candles
        const fadeIn = i >= visibleCandles - 3 ? (visibleCandles - i) / 3 : 1;

        // Draw wick
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2 - gap / 2, highY);
        ctx.lineTo(x + candleWidth / 2 - gap / 2, lowY);
        ctx.strokeStyle = isGreen ? `rgba(16, 185, 129, ${fadeIn})` : `rgba(239, 68, 68, ${fadeIn})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw candle body with glow
        const bodyTop = Math.min(openY, closeY);
        const bodyHeight = Math.max(Math.abs(closeY - openY), 2);

        ctx.shadowColor = isGreen ? "#10B981" : "#EF4444";
        ctx.shadowBlur = 8 * fadeIn;

        ctx.fillStyle = isGreen ? `rgba(16, 185, 129, ${fadeIn})` : `rgba(239, 68, 68, ${fadeIn})`;
        ctx.fillRect(x, bodyTop, candleWidth - gap, bodyHeight);
        ctx.shadowBlur = 0;
      }

      // Draw trend line
      if (visibleCandles > 5) {
        ctx.beginPath();
        ctx.strokeStyle = "#3B82F6";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#3B82F6";
        ctx.shadowBlur = 10;

        for (let i = 0; i < Math.min(visibleCandles, numCandles); i++) {
          const candle = candleData[i];
          const x = 40 + i * candleWidth + candleWidth / 2 - gap / 2;
          const y = height - 40 - ((candle.close - minPrice) / priceRange) * (height - 80);

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Price labels on right
      ctx.font = "12px 'Segoe UI', system-ui";
      ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
      const priceSteps = 4;
      for (let i = 0; i <= priceSteps; i++) {
        const price = minPrice + (priceRange / priceSteps) * i;
        const y = height - 40 - ((price - minPrice) / priceRange) * (height - 80);
        ctx.fillText(price.toFixed(2), width - 55, y + 4);
      }

      // Animated cursor line
      if (visibleCandles > 0 && visibleCandles <= numCandles) {
        const cursorX = 40 + visibleCandles * candleWidth;
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
        ctx.lineWidth = 1;
        ctx.moveTo(cursorX, 20);
        ctx.lineTo(cursorX, height - 20);
        ctx.stroke();
        ctx.setLineDash([]);

        // Cursor glow
        const glowGradient = ctx.createRadialGradient(cursorX, height / 2, 0, cursorX, height / 2, 50);
        glowGradient.addColorStop(0, "rgba(59, 130, 246, 0.2)");
        glowGradient.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = glowGradient;
        ctx.fillRect(cursorX - 50, 0, 100, height);
      }

      // Progress drawing animation
      if (drawProgress < 100) {
        drawProgress += 0.8;
      } else {
        // After full draw, subtle continuous animation
        drawProgress = 100;
      }

      time++;
      animationId = requestAnimationFrame(drawChart);
    };

    drawChart();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10 blur-3xl rounded-full scale-110" />
      <canvas
        ref={canvasRef}
        width={900}
        height={380}
        className="relative z-10 w-full max-w-4xl mx-auto rounded-xl"
        style={{ filter: "drop-shadow(0 0 40px rgba(59, 130, 246, 0.15))" }}
      />
    </div>
  );
};

const Landing = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0A0F1F] overflow-hidden">

      {/* Animated background gradients - Emerald/Cyan/Gold theme */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary glow - emerald */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-600/25 blur-[150px] rounded-full animate-pulse-slow" />
        {/* Secondary glow - cyan */}
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: "1s" }} />
        {/* Accent glow - gold */}
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-amber-500/15 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl px-6 py-12">

        {/* TradeNova Brand */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent drop-shadow-2xl">
              Trade
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
              Nova
            </span>
          </h1>
          <div className="mx-auto mt-4 w-48 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-amber-500 rounded-full shadow-lg shadow-cyan-500/50 transition-all duration-300 hover:w-56 hover:shadow-cyan-500/60" />
        </div>

        {/* Taglines */}
        <div className="space-y-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            <span className="text-emerald-400">Unleash Your</span> <span className="text-cyan-400">Trading Potential</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Advanced charting, real-time market data, and lightning-fast execution.
            Join thousands of successful traders today.
          </p>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {["Live Charts", "Instant Execution", "Secure Trading", "Zero Hidden Fees"].map((feature, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Link
            to="/signup"
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-cyan-600 to-teal-600 text-white font-semibold text-lg shadow-lg shadow-emerald-500/30 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <span className="relative flex items-center gap-2">
              Start Trading
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>

          <Link
            to="/login"
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-cyan-600 to-teal-600 text-white font-semibold text-lg shadow-lg shadow-emerald-500/30 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <span className="relative flex items-center gap-2">
              Login
            </span>
          </Link>
        </div>

        {/* Trading Chart with Drawing Animation */}
        <div className="relative w-full max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          {/* Floating stats */}
          <div className="hidden md:block">
            <div className="absolute -top-4 -left-8 bg-[#1A2238]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-emerald-500/30 shadow-xl shadow-emerald-500/20 animate-float z-20">
              <p className="text-xs text-gray-400">NIFTY 50</p>
              <p className="text-lg font-bold text-emerald-400">+1.24%</p>
            </div>
            <div className="absolute top-1/4 -right-12 bg-[#1A2238]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-cyan-500/30 shadow-xl shadow-cyan-500/20 animate-float z-20" style={{ animationDelay: "0.5s" }}>
              <p className="text-xs text-gray-400">SENSEX</p>
              <p className="text-lg font-bold text-cyan-400">+0.89%</p>
            </div>
            <div className="absolute -bottom-4 left-1/4 bg-[#1A2238]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-amber-500/30 shadow-xl shadow-amber-500/20 animate-float z-20" style={{ animationDelay: "1s" }}>
              <p className="text-xs text-gray-400">BANKNIFTY</p>
              <p className="text-lg font-bold text-amber-400">+2.15%</p>
            </div>
          </div>

          {/* Chart container */}
          <div className="relative p-6 bg-[#1A2238]/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-white">Market Overview</span>
                <span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-md animate-pulse">LIVE</span>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 text-xs bg-white/5 text-gray-400 rounded-md cursor-pointer hover:bg-white/10 transition">1D</span>
                <span className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-md">1W</span>
                <span className="px-3 py-1 text-xs bg-white/5 text-gray-400 rounded-md cursor-pointer hover:bg-white/10 transition">1M</span>
              </div>
            </div>
            <TradingChart />
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: "1s" }}>
          <p className="text-gray-500 text-sm mb-4">Trusted by traders across India</p>
          <div className="flex justify-center gap-8 text-gray-600">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">50K+</p>
              <p className="text-xs text-gray-500">Active Traders</p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">₹100Cr+</p>
              <p className="text-xs text-gray-500">Daily Volume</p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-xs text-gray-500">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
