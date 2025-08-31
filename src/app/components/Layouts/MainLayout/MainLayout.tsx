"use client";
import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false);
  }, [setMobileMenu]);

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true);
  }, [setMobileMenu]);

  return (
    <>
      <Navbar
        onPresentMobileMenu={handlePresentMobileMenu}
        onDismissMobileMenu={handleDismissMobileMenu}
        visible={mobileMenu}
      />
      <MobileNavbar
        visible={mobileMenu}
        onDismissMobileMenu={handleDismissMobileMenu}
      />
      {children}
    </>
  );
};
