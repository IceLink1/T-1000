export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "School project",
  description: "",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navItemsAdmin: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Admin",
      href: "/admin",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
  ],
  navMenuItemsAdmin: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Admin",
      href: "/admin",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
  ],
  links: {
    github: "https://github.com/IceLink1",
    sponsor: "https://icelink.uz",
  },
};
