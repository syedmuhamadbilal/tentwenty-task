"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { IBannerNavProps } from "./types";

const BannerNav = ({
  nextImage,
  progressPercent,
  isButtonHovered,
  handleNext,
  handleMouseEnter,
  handleMouseLeave,
  imageSelected,
  totalImages,
}: IBannerNavProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  const currentImage = formatNumber(imageSelected + 1);
  const totalImagesCount = formatNumber(totalImages);
  useEffect(() => {
    if (!overlayRef.current) return;

    if (isButtonHovered) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [isButtonHovered]);

  return (
    <div>
      <div className="absolute left-6 md:left-[135px] bottom-[5%] -translate-y-1/2 flex flex-col gap-4 z-1">
        <div className="relative">
          <div className="p-4 h-[115px] w-[115px] md:h-[138px] md:w-[138px] relative flex items-center justify-center">
            <div
              className="absolute inset-0"
              style={{
                background: `conic-gradient(
                from -43deg,
                white ${progressPercent * 3.6}deg,
                rgba(255, 255, 255, 0.5) ${progressPercent * 3.6}deg
              )`,
                mask: "linear-gradient(#eee 0 0) content-box, linear-gradient(#eee 0 0)",
                maskComposite: "exclude",
                padding: "4px",
              }}
            />
            <button
              onClick={handleNext}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[77px] h-[77px] md:w-[93px] md:h-[93px] overflow-hidden group relative"
            >
              <Image
                src={nextImage.src}
                alt={nextImage.title}
                width={100}
                height={100}
                className="object-cover w-full h-full"
                unoptimized
                priority
              />

              <div
                ref={overlayRef}
                className="absolute inset-0 cursor-pointer bg-black/50 flex items-center justify-center opacity-0"
              >
                <span className="text-light-text font-work-sans font-normal text-base">
                  Next
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute left-[162px] md:left-[306px] bottom-[18%] flex items-center gap-4 text-light-text">
        <span className="text-sm md:text-base ">{currentImage}</span>
        <div className="w-[103px] h-[1px] bg-light-text"></div>
        <span className="text-sm md:text-base ">{totalImagesCount}</span>
      </div>
    </div>
  );
};

export default BannerNav;
