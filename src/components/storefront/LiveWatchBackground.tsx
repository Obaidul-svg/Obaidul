import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Clock, Sparkles, Film, Eye } from 'lucide-react';

export type BackgroundMode = 'video' | 'live-dial' | 'picture';

interface LiveWatchBackgroundProps {
  primaryColor?: string;
  accentColor?: string;
  className?: string;
  defaultMode?: BackgroundMode;
  onModeChange?: (mode: BackgroundMode) => void;
}

export const LiveWatchBackground: React.FC<LiveWatchBackgroundProps> = ({
  primaryColor = '#0F172A',
  accentColor = '#2A7B9B',
  className = '',
  defaultMode = 'live-dial',
  onModeChange,
}) => {
  const [mode, setMode] = useState<BackgroundMode>(defaultMode);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dhakaTime, setDhakaTime] = useState<string>('');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animFrameIdRef = useRef<number>(0);

  // Update Dhaka (BST GMT+6) / Local Time String
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        setDhakaTime(formatter.format(now));
      } catch {
        const now = new Date();
        setDhakaTime(now.toLocaleTimeString());
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle mode change
  const handleSelectMode = (newMode: BackgroundMode) => {
    setMode(newMode);
    if (onModeChange) onModeChange(newMode);
  };

  // HTML5 Video Play / Pause control
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying && mode === 'video') {
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, mode]);

  // Live Horology Mechanical Movement Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    let startTime = performance.now();

    // Subtle particles for floating atelier atmosphere
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      opacity: number;
      pulse: number;
    }> = [];

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        speedY: -(Math.random() * 0.4 + 0.1),
        opacity: Math.random() * 0.5 + 0.15,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Helper: Draw gear with teeth
    const drawGear = (
      x: number,
      y: number,
      radius: number,
      teeth: number,
      rotation: number,
      color: string,
      innerColor: string,
      lineWidth: number = 2
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      ctx.beginPath();
      const toothDepth = radius * 0.12;
      const step = (Math.PI * 2) / teeth;

      for (let i = 0; i < teeth; i++) {
        const angle = i * step;
        const outerAngle1 = angle + step * 0.2;
        const outerAngle2 = angle + step * 0.4;
        const innerAngle1 = angle + step * 0.6;
        const innerAngle2 = angle + step * 0.8;

        const rOuter = radius;
        const rInner = radius - toothDepth;

        if (i === 0) {
          ctx.moveTo(Math.cos(angle) * rInner, Math.sin(angle) * rInner);
        } else {
          ctx.lineTo(Math.cos(angle) * rInner, Math.sin(angle) * rInner);
        }
        ctx.lineTo(Math.cos(outerAngle1) * rOuter, Math.sin(outerAngle1) * rOuter);
        ctx.lineTo(Math.cos(outerAngle2) * rOuter, Math.sin(outerAngle2) * rOuter);
        ctx.lineTo(Math.cos(innerAngle1) * rInner, Math.sin(innerAngle1) * rInner);
        ctx.lineTo(Math.cos(innerAngle2) * rInner, Math.sin(innerAngle2) * rInner);
      }
      ctx.closePath();

      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      // Inner spoke cutouts
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.72, 0, Math.PI * 2);
      ctx.strokeStyle = innerColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Center arbor/pivot
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = innerColor;
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 4 or 5 spokes
      const spokes = 5;
      for (let s = 0; s < spokes; s++) {
        const sAngle = (s * Math.PI * 2) / spokes;
        ctx.beginPath();
        ctx.moveTo(Math.cos(sAngle) * (radius * 0.2), Math.sin(sAngle) * (radius * 0.2));
        ctx.lineTo(Math.cos(sAngle) * (radius * 0.72), Math.sin(sAngle) * (radius * 0.72));
        ctx.strokeStyle = innerColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = (currentTime: number) => {
      const elapsed = (currentTime - startTime) * 0.001;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw atmospheric background particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.pulse += 0.03;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const currentOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // MANOVA logo Teal glow for particles
        ctx.fillStyle = `rgba(42, 123, 155, ${currentOpacity})`;
        ctx.shadowColor = '#2A7B9B';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Center point for the giant background watch movement (offset toward right-center for gorgeous backdrop)
      const isMobile = width < 768;
      const centerX = isMobile ? width * 0.5 : width * 0.68;
      const centerY = height * 0.5;
      const baseRadius = Math.min(width, height) * (isMobile ? 0.44 : 0.42);

      // 2. Dial Outer Ring & Measurement Track (MANOVA Teal & Slate)
      ctx.save();
      ctx.translate(centerX, centerY);

      // Outer bezel glow ring
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius * 1.15, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(42, 123, 155, 0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Main bezel track
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(42, 123, 155, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Minute ticks (60 divisions) & 1/5th second micro ticks
      for (let i = 0; i < 60; i++) {
        const angle = (i * Math.PI) / 30;
        const isMajor = i % 5 === 0;
        const tickLength = isMajor ? baseRadius * 0.09 : baseRadius * 0.04;
        const r1 = baseRadius - 2;
        const r2 = r1 - tickLength;

        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
        ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
        ctx.strokeStyle = isMajor ? 'rgba(255, 255, 255, 0.6)' : 'rgba(42, 123, 155, 0.25)';
        ctx.lineWidth = isMajor ? 2 : 1;
        ctx.stroke();

        // 12 Major Roman / Arabic numerals accent in subtle gold/teal
        if (isMajor && !isMobile) {
          const numAngle = angle - Math.PI / 2;
          const numR = baseRadius - baseRadius * 0.16;
          const numX = Math.cos(numAngle) * numR;
          const numY = Math.sin(numAngle) * numR;
          const val = i === 0 ? 12 : i / 5;

          ctx.font = '11px sans-serif';
          ctx.fillStyle = 'rgba(212, 175, 55, 0.35)'; // champagne gold accent
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(val.toString(), numX, numY);
        }
      }

      ctx.restore();

      // 3. Interlocking Mechanical Gears (Live Motion)
      const rotSpeed = isPlaying ? elapsed * 0.4 : 0;

      // Central Great Wheel
      drawGear(
        centerX,
        centerY,
        baseRadius * 0.58,
        32,
        rotSpeed * 0.4,
        'rgba(42, 123, 155, 0.28)',
        'rgba(15, 23, 42, 0.45)',
        2.5
      );

      // Upper-Right Escapement Gear
      const g2X = centerX + Math.cos(-0.6) * (baseRadius * 0.48);
      const g2Y = centerY + Math.sin(-0.6) * (baseRadius * 0.48);
      drawGear(
        g2X,
        g2Y,
        baseRadius * 0.26,
        18,
        -rotSpeed * 0.8,
        'rgba(212, 175, 55, 0.32)',
        'rgba(42, 123, 155, 0.2)',
        1.5
      );

      // Lower-Left Intermediate Wheel
      const g3X = centerX + Math.cos(2.4) * (baseRadius * 0.44);
      const g3Y = centerY + Math.sin(2.4) * (baseRadius * 0.44);
      drawGear(
        g3X,
        g3Y,
        baseRadius * 0.32,
        22,
        -rotSpeed * 0.65,
        'rgba(42, 123, 155, 0.3)',
        'rgba(15, 23, 42, 0.35)',
        1.8
      );

      // 4. Tourbillon / Balance Wheel Escapement (Oscillates at 4Hz)
      const tourbX = centerX + Math.cos(1.2) * (baseRadius * 0.42);
      const tourbY = centerY + Math.sin(1.2) * (baseRadius * 0.42);
      const tourbRadius = baseRadius * 0.22;

      ctx.save();
      ctx.translate(tourbX, tourbY);
      const oscillation = isPlaying ? Math.sin(elapsed * 18) * 0.9 : 0;
      ctx.rotate(oscillation);

      // Balance wheel rim
      ctx.beginPath();
      ctx.arc(0, 0, tourbRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.55)'; // Gold balance
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Regulating screws along rim
      for (let s = 0; s < 8; s++) {
        const sA = (s * Math.PI * 2) / 8;
        ctx.beginPath();
        ctx.arc(Math.cos(sA) * tourbRadius, Math.sin(sA) * tourbRadius, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      // Balance bridge arm
      ctx.beginPath();
      ctx.moveTo(-tourbRadius, 0);
      ctx.lineTo(tourbRadius, 0);
      ctx.strokeStyle = 'rgba(42, 123, 155, 0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Center ruby jewel pivot
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#E11D48'; // Ruby jewel
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // 5. Live Clock Hands (Accurate Dhaka/Local Time)
      const now = new Date();
      // Calculate smooth angles
      const ms = now.getMilliseconds();
      const sec = now.getSeconds() + ms / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;

      const secAngle = (sec * Math.PI) / 30 - Math.PI / 2;
      const minAngle = (min * Math.PI) / 30 - Math.PI / 2;
      const hrAngle = (hr * Math.PI) / 6 - Math.PI / 2;

      ctx.save();
      ctx.translate(centerX, centerY);

      // Hour Hand (Polished steel sword hand with luminous slot)
      ctx.save();
      ctx.rotate(hrAngle);
      ctx.beginPath();
      ctx.moveTo(-baseRadius * 0.08, 0);
      ctx.lineTo(0, -baseRadius * 0.035);
      ctx.lineTo(baseRadius * 0.42, 0);
      ctx.lineTo(0, baseRadius * 0.035);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fill();
      ctx.strokeStyle = '#2A7B9B';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Minute Hand (Extended tapered lance hand)
      ctx.save();
      ctx.rotate(minAngle);
      ctx.beginPath();
      ctx.moveTo(-baseRadius * 0.1, 0);
      ctx.lineTo(0, -baseRadius * 0.03);
      ctx.lineTo(baseRadius * 0.68, 0);
      ctx.lineTo(0, baseRadius * 0.03);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
      ctx.strokeStyle = '#2A7B9B';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Sweeping Second Hand (Signature MANOVA Teal with counterweight)
      ctx.save();
      ctx.rotate(secAngle);
      ctx.beginPath();
      ctx.moveTo(-baseRadius * 0.22, 0);
      ctx.lineTo(baseRadius * 0.82, 0);
      ctx.strokeStyle = '#2A7B9B';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#2A7B9B';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Second hand counter-weight circle
      ctx.beginPath();
      ctx.arc(-baseRadius * 0.14, 0, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#2A7B9B';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Center Arbor Cap
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#0F172A';
      ctx.fill();
      ctx.strokeStyle = '#2A7B9B';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // 6. Sapphire Crystal Dynamic Light Glare Reflection
      const glarePhase = (elapsed * 0.2) % 1;
      const glareGradient = ctx.createLinearGradient(
        -baseRadius + glarePhase * (baseRadius * 2.5),
        -baseRadius,
        baseRadius * 0.4 + glarePhase * (baseRadius * 2.5),
        baseRadius
      );
      glareGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      glareGradient.addColorStop(0.5, 'rgba(42, 123, 155, 0.08)');
      glareGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.05)');
      glareGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(0, 0, baseRadius * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = glareGradient;
      ctx.fill();

      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying]);

  return (
    <div className={`absolute inset-0 overflow-hidden select-none pointer-events-none ${className}`}>
      {/* 1. Base Layer: Deep obsidian slate matched with MANOVA logo */}
      <div 
        className="absolute inset-0 bg-[#0B1320]"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 70% 50%, #0F1D30 0%, #080F1A 60%, #050A12 100%)',
        }}
      />

      {/* 2. Mode: Video Background */}
      {mode === 'video' && (
        <div className="absolute inset-0 transition-opacity duration-700">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover mix-blend-screen opacity-45 scale-105 transition-opacity duration-1000 ${
              videoLoaded && !videoError ? 'opacity-45' : 'opacity-0'
            }`}
            poster="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=80"
          >
            {/* Direct reliable video stream */}
            <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
            />
          </video>

          {/* If video fails or while loading, render high-res luxury watch movement loop with Ken-Burns */}
          {(!videoLoaded || videoError) && (
            <div
              className="absolute inset-0 bg-cover bg-center animate-pulse opacity-40 mix-blend-screen"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1920&q=85")',
                animationDuration: '14s',
              }}
            />
          )}
        </div>
      )}

      {/* 3. Mode: Picture Background (Studio Masterpiece) */}
      {mode === 'picture' && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-35 mix-blend-screen scale-105"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=85")',
          }}
        />
      )}

      {/* 4. Canvas: Real-time Live Watch Calibre & Sweeping Second Hand */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90 transition-opacity duration-500"
      />

      {/* 5. Logo Teal Ambient Glow Orbs */}
      {/* Primary Teal Ambient Light (#2A7B9B from MANOVA logo) */}
      <div 
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #2A7B9B 0%, rgba(42, 123, 155, 0.1) 70%, transparent 100%)',
        }}
      />
      {/* Secondary Soft Slate Glow */}
      <div 
        className="absolute bottom-10 left-10 w-[420px] h-[420px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #1E5B73 0%, transparent 75%)',
        }}
      />

      {/* 6. Precision Horological Reticle & Watermark */}
      <div className="absolute top-8 left-8 hidden lg:flex items-center gap-2 opacity-30 text-[10px] font-mono tracking-widest text-[#2A7B9B]">
        <span>CALIBRE MAN-820</span>
        <span>•</span>
        <span>28,800 VPH</span>
        <span>•</span>
        <span>AUTOMATIC SKELETON</span>
      </div>

      {/* 7. Vignette & High-Contrast Gradient Mask so Bengali and English text is crystal clear */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(8, 15, 26, 0.94) 0%, rgba(11, 19, 32, 0.85) 45%, rgba(11, 19, 32, 0.4) 75%, rgba(8, 15, 26, 0.88) 100%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, rgba(8, 15, 26, 0.7) 0%, transparent 70%), linear-gradient(180deg, rgba(8, 15, 26, 0.6) 0%, transparent 30%, transparent 70%, rgba(8, 15, 26, 0.85) 100%)',
        }}
      />

      {/* 8. Interactive Atmospheric Controls (Bottom Bar, pointer-events enabled) */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 z-30 pointer-events-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Dhaka Real Time + Calibre Live Indicator */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-[#2A7B9B]/30 text-stone-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#2A7B9B] animate-pulse" />
          <Clock className="w-3.5 h-3.5 text-[#2A7B9B]" />
          <span className="font-mono font-medium text-[11px] sm:text-xs">
            ঢাকা সময়: <strong className="text-white">{dhakaTime || 'Live BST'}</strong>
          </span>
          <span className="hidden sm:inline text-stone-500">•</span>
          <span className="hidden sm:inline text-[10px] text-stone-400 font-sans tracking-wide">
            সুইচিং মুভমেন্ট
          </span>
        </div>

        {/* Right: Background Mode Selector (Video / Live Calibre / Studio Picture) */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/60 shadow-lg">
          <button
            onClick={() => handleSelectMode('live-dial')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              mode === 'live-dial'
                ? 'bg-[#2A7B9B] text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
            title="লাইভ ঘড়ির মুভমেন্ট ও ডায়াল"
          >
            <Sparkles className="w-3 h-3" />
            <span>লাইভ ঘড়ি</span>
          </button>

          <button
            onClick={() => handleSelectMode('video')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              mode === 'video'
                ? 'bg-[#2A7B9B] text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
            title="সিনেমাটিক ভিডিও ব্যাকগ্রাউন্ড"
          >
            <Film className="w-3 h-3" />
            <span>ভিডিও রিল</span>
          </button>

          <button
            onClick={() => handleSelectMode('picture')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              mode === 'picture'
                ? 'bg-[#2A7B9B] text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
            title="স্টুডিও কোয়ালিটি ছবি"
          >
            <Eye className="w-3 h-3" />
            <span>ছবি</span>
          </button>

          {/* Pause / Play Mechanism */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800/80 ml-1 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Motion' : 'Play Motion'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
};
