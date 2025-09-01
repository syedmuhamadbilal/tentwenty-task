"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { BannerImageProps } from "./types";

const BannerImage = ({ image, index, previousImage }: BannerImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reset and animate in sequence
    gsap.fromTo(
      el,
      { height: "100px", opacity: 0.5 },
      {
        height: "100%",
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
      }
    );
  }, [index]);

  return (
    <section className="absolute inset-0">
      {previousImage && (
        <div className="absolute inset-0">
          <Image
            src={previousImage.src}
            alt={previousImage.title}
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      <div
        ref={containerRef}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-50 h-[100px]"
      >
        <Image
          src={image.src}
          alt={image.title}
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    </section>
  );
};

export default BannerImage;
