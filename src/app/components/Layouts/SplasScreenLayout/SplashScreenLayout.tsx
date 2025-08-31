"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";

export const SplashScreenWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showSplash, setShowSplash] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Only run splash on home page `/`
    if (pathname === "/") {
      const hasSeen = sessionStorage.getItem("splashShown");
      if (hasSeen) {
        setShowSplash(false);
      } else {
        const timer = setTimeout(() => {
          setShowSplash(false);
          sessionStorage.setItem("splashShown", "true");
        }, 4000); // match your GSAP timeline length
        return () => clearTimeout(timer);
      }
    } else {
      setShowSplash(false);
    }
  }, [pathname]);

  if (showSplash && pathname === "/") return <SplashScreen />;
  return <>{children}</>;
};
