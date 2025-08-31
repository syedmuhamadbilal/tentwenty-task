import React from "react";
import { INavbarProps, NavbarLinksData } from "./utils";
import Link from "next/link";
import { ForwardArrowIcon, MenuIcon } from "../Icons";

const Navbar = ({
  onDismissMobileMenu,
  onPresentMobileMenu,
  visible,
}: INavbarProps) => {
  return (
    <nav className="fixed md:mt-5  w-full flex z-[2000]">
      <div className="w-full md:mx-5">
        <div className="bg-white flex justify-between items-center py-4 pl-7 pr-6 md:py-8 md:pl-10 md:pr-8 ">
          <div className=" space-x-5 items-center hidden md:flex">
            {NavbarLinksData.map((nav, index) => {
              return (
                <Link
                  href={nav.route}
                  key={`${nav.name} ${index}`}
                  className="text-sm text-black "
                >
                  {nav.name}
                </Link>
              );
            })}
          </div>
          <button className="flex items-center justify-between space-x-4 text-base py-[10px] pl-4 pr-3 border border-black bg-background ">
            <span>Contact us </span> <ForwardArrowIcon />
          </button>
          <div
            className="md:hidden "
            onClick={() =>
              visible ? onDismissMobileMenu() : onPresentMobileMenu()
            }
          >
            <MenuIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
