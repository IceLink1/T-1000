export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "School project",
  description: "",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Admin",
      href: "/admin",
    },
    // {
    //   label: "Questions",
    //   href: "/questions",
    // },
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
  links: {
    github: "https://github.com/IceLink1",
    sponsor: "https://icelink.uz",
  },
};
