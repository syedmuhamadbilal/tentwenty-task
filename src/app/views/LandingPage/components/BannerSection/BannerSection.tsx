"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { BannerData } from "@/libs";
import BannerImage from "./components/BannerImage";
import BannerInfo from "./components/BannerInfo";
import BannerNav from "./components/BannerNav";
const BannerSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevSlide, setPrevSlide] = useState<
    (typeof BannerData)[0] | undefined
  >(undefined);
  const [progressPercent, setProgressPercent] = useState(0);
  const [hovering, setHovering] = useState(false);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Clean any previous timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create GSAP timeline for progress
    const tl = gsap.timeline({
      onComplete: () => {
        // When one cycle finishes → move to next slide
        setPrevSlide(BannerData[activeIndex]);
        setActiveIndex((prev) => (prev + 1) % BannerData.length);
      },
    });

    tl.to(
      {},
      {
        duration: 8000 / 1000, // ms → seconds
        ease: "linear",
        onUpdate: () => {
          setProgressPercent(tl.progress() * 100);
        },
      }
    );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  // Manual next button
  const goNext = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    setPrevSlide(BannerData[activeIndex]);
    setActiveIndex((prev) => (prev + 1) % BannerData.length);
    setProgressPercent(0);
  };

  return (
    <div className="w-full h-[100dvh] overflow-hidden">
      <BannerImage
        image={BannerData[activeIndex]}
        index={activeIndex}
        previousImage={prevSlide}
      />
      <div className="absolute inset-0">
        <div className="max-w-[1440px] mx-auto h-full relative">
          <div className="absolute h-full flex items-center md:pl-[135px]">
            <BannerInfo image={BannerData[activeIndex]} index={activeIndex} />
          </div>
          <BannerNav
            currentImage={BannerData[activeIndex]}
            nextImage={BannerData[(activeIndex + 1) % BannerData.length]}
            progressPercent={progressPercent}
            isButtonHovered={hovering}
            handleNext={goNext}
            handleMouseEnter={() => setHovering(true)}
            handleMouseLeave={() => setHovering(false)}
            imageSelected={activeIndex}
            totalImages={BannerData.length}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
