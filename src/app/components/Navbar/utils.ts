export const NavbarLinksData = [
  { name: "About", route: "/about" },
  { name: "News", route: "/news" },
  { name: "Services", route: "/services" },
  { name: "Our Team", route: "/our-team" },
  { name: "Make Enquiry", route: "/make-enquiry" },
];

export interface INavbarProps {
  onPresentMobileMenu: () => void;
  onDismissMobileMenu: () => void;
  visible: boolean;
}
