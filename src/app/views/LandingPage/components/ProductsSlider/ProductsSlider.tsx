"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";
import { ProductSliderData } from "@/libs";
import { useMediaQuery } from "@/components/hooks";

gsap.registerPlugin(Draggable);

const ProductsSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [activeIndex, setActiveIndex] = useState(1);

  // cursor state
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const slides = slidesRef.current;
    const slideWidth = window.innerWidth * (isMobile ? 0.62 : 0.43);

    const updateSlides = (index: number) => {
      const shiftX = isMobile ? -(slideWidth * 0.5) : -(slideWidth * 0.35);

      slides.forEach((slide, i) => {
        let offset = i - index;
        if (offset > slides.length / 2) offset -= slides.length;
        if (offset < -slides.length / 2) offset += slides.length;

        if (Math.abs(offset) > slides.length / 2 - 1) {
          gsap.set(slide, { x: offset * slideWidth + shiftX });
        } else {
          gsap.to(slide, {
            x: offset * slideWidth + shiftX,
            scale: offset === 0 ? 1 : 0.85,
            rotate: offset === 0 ? 0 : offset < 0 ? -10 : 10,
            duration: 0.6,
            ease: "power3.out",
          });
        }
      });
    };

    updateSlides(activeIndex);

    const draggable = Draggable.create(containerRef.current, {
      type: "x",
      inertia: true,
      onDragEnd: function () {
        const dir = this.getDirection("start");
        setActiveIndex((prev) => {
          let newIndex = prev;
          if (dir === "left") newIndex = (prev + 1) % slides.length;
          if (dir === "right")
            newIndex = (prev - 1 + slides.length) % slides.length;
          updateSlides(newIndex);
          return newIndex;
        });
        gsap.to(containerRef.current, { x: 0, duration: 0.4 });
      },
    });

    return () => {
      draggable[0]?.kill();
    };
  }, [isMobile, activeIndex]);

  return (
    <div
      className="flex flex-col mb-16 md:mb-28 relative cursor-none"
      onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Section Header */}
      <div className="flex flex-col justify-center items-center gap-y-8 pt-20 xl:pt-56 xl:pb-[100px] pb-16">
        <h1 className="xl:text-[56px] text-3xl xl:leading-[72px] leading-10 text-black">
          Quality Products
        </h1>
        <p className="m-0 text-product-description text-base md:text-xl leading-[100%] max-w-[312px] md:max-w-[665px] px-[50px] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Slider */}
      <div className="flex flex-col items-center pt-4 h-screen max-w-full overflow-hidden">
        <div ref={containerRef} className="relative flex cursor-none">
          {" "}
          {/* hide default cursor */}
          {ProductSliderData.map((item, i) => (
            <div
              key={`${item.src}${i}`}
              ref={(el) => {
                if (el) slidesRef.current[i] = el;
              }}
              className="absolute cursor-none"
            >
              <div className="flex flex-col items-center w-[230px] h-auto sm:w-[320px] xl:w-[440px]">
                {/* Image */}
                <div className="w-full h-[330px] sm:h-[500px] xl:h-[620px] rounded-xl shadow-lg overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    width={600}
                    height={800}
                  />
                </div>
                {activeIndex === i && (
                  <div className="mt-3 text-center">
                    <h3 className="text-2xl font-medium leading-10 text-black md:font-normal md:text-4xl md:leading-[60px]">
                      {item.client}
                    </h3>
                    <p className="text-base leading-[100%] text-product-description md:text-2xl md:leading-6">
                      {item.location}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Cursor */}
      {isHovering && (
        <div
          className="fixed z-[1500] pointer-events-none flex items-center justify-center
                     w-16 h-16 md:w-24 md:h-24 rounded-full bg-white text-black text-sm md:text-xl "
          style={{ left: cursorPos.x - 32, top: cursorPos.y - 32 }}
        >
          Drag
        </div>
      )}
    </div>
  );
};

export default ProductsSlider;
