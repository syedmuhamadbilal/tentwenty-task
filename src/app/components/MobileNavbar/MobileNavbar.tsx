"use client";
import { useState, useEffect } from "react";
import { cn } from "@/libs";
import { NavbarLinksData } from "../Navbar/utils";
import { CloseMenuIcon } from "@/components/Icons";
import Link from "next/link";

interface MobileMenuProps {
  visible?: boolean;
  onDismissMobileMenu: () => void;
}
const MobileNavbar = ({ visible, onDismissMobileMenu }: MobileMenuProps) => {
  const [shouldRender, setShouldRender] = useState(false); // Controls initial render
  const [isAnimating, setIsAnimating] = useState(false); // Tracks animation state

  useEffect(() => {
    if (visible) {
      // When visible becomes true, enable rendering and start animation
      setShouldRender(true);
      setIsAnimating(true);
      document.body.classList.add("overflow-hidden"); // When navbar open disable scrolling
    } else if (shouldRender) {
      // Start closing animation before unmounting
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsAnimating(false); // Reset animation state
      }, 1500); // Matches animation duration (0.8s)
      return () => {
        clearTimeout(timer); // Cleanup timer on re-render
        document.body.classList.remove("overflow-hidden"); // When navbar closed enable scrolling
      };
    }
  }, [visible, shouldRender]);

  if (!shouldRender) {
    // Prevent rendering entirely if not visible
    return null;
  }
  return (
    <div
      id="animatedDiv"
      className={cn(
        "fixed inset-0 z-[2100] top-0 ",
        isAnimating
          ? visible
            ? "block animate-slideFromTop "
            : "block animate-slideToTop"
          : "block"
      )}
    >
      <div className="relative h-full w-full">
        <div className="bg-darkest_white backdrop-blur-[80px] flex flex-col w-full h-full p-2">
          <div className="flex flex-col px-4 py-[60px] h-full">
            <div
              className="flex justify-end items-center mb-10"
              onClick={onDismissMobileMenu}
            >
              <CloseMenuIcon />
            </div>
            <div className="flex flex-col gap-20 items-center justify-center">
              {NavbarLinksData.map((item, index) => (
                <Link
                  href={item.route}
                  onClick={onDismissMobileMenu}
                  key={`${index}${item.name}`}
                  className="font-bold text-center no-underline text-white text-40"
                >
                  {item?.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
