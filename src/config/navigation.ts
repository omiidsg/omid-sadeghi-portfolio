export type NavItem = {
  label: string;
  href: string;
};

export const navigationItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];
