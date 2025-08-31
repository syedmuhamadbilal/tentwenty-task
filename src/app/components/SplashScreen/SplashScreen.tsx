"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !textRef.current || !pathRef.current) return;

    const ctx = gsap.context(() => {
      const path = pathRef.current!;
      const text = textRef.current!;
      const container = containerRef.current!;

      const length = path.getTotalLength();
      gsap.set(text, { autoAlpha: 0, y: 30 });
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.to(container, {
            autoAlpha: 0,
            duration: 1,
            delay: 0.6,
            onComplete: () => setIsVisible(false),
          });
        },
      });

      tl.to(text, { autoAlpha: 1, y: 0, duration: 1 });
      tl.to(
        path,
        { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut" },
        "+=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        background:
          "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 40%, #fbc2eb 70%, #a18cd1 100%)",
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    >
      {/* Title */}
      <div ref={textRef} className="text-3xl md:text-8xl font-bold text-white">
        Welcome To TenTwenty Task
      </div>

      {/* Spacer */}
      <div className="h-[200px]" />

      {/* ECG-style Line */}
      <svg
        className="w-full"
        height="200"
        viewBox="0 0 1920 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="
            M 0 150
            Q 160 100, 320 150
            L 360 150 L 380 40 L 400 180 L 420 120 L 440 150
            Q 600 200, 800 150
            L 820 150 L 840 60 L 860 200 L 880 120 L 900 150
            Q 1100 100, 1300 150
            L 1340 150 L 1360 50 L 1380 180 L 1400 130 L 1420 150
            Q 1600 200, 1800 150
            L 1920 150
          "
          stroke="url(#heartbeatGradient)"
          strokeWidth="3"
          fill="transparent"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="heartbeatGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff6a00" />
            <stop offset="50%" stopColor="#ff3d7f" />
            <stop offset="100%" stopColor="#8e44ad" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SplashScreen;
