"use client";

import { useEffect, useRef } from "react";

import { IImage } from "@/libs";
import { gsap } from "gsap";

interface IBannerInfo {
  image: IImage;
  index: number;
}

const BannerInfo = ({ image, index }: IBannerInfo) => {
  const descRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Description animation
    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: "power2.out" }
      );
    }

    // Title animation
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: -0.2, ease: "power2.out" } // overlap slightly
      );
    }

    return () => {
      tl.kill(); // cleanup old animations when slide changes
    };
  }, [index, image]);

  return (
    <div className=" mx-auto  flex flex-col justify-center items-start h-full gap-6 p-[25px] md:p-0">
      <p
        ref={descRef}
        className="text-sm text-light-text sm:text-base font-normal font-work-sans capitalize"
      >
        {image.description}
      </p>

      <h1
        ref={titleRef}
        className="text-[46px] text-light-text md:text-[64px] font-work-sans capitalize"
      >
        {image.title}
      </h1>
    </div>
  );
};

export default BannerInfo;
