import { createElement } from "react";
import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#F15A24",
  background: "#F5F1E8",
  ink: "#171714",
  muted: "#77766E",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    id: "orbit-core",
    label: "Intro",
    portrait: "/assets/world/chaitanya-portrait.png",
    poster: "/assets/world/scene-01-poster.png",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    clip: "/assets/world/scene-01.mp4",
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    title: "CHAITANYA.\nBuild with intent.",
    body: "Full-stack developer and software engineer in the making. I build useful digital experiences across web, AI, and data.",
    kicker: "CHAITANYA / COMPUTER SCIENCE",
    tags: ["Full-stack development", "AI / ML", "Creative engineering"],
    actions: createElement("div", { className: "hero-actions" }, [
      createElement("a", { className: "hero-action hero-action-primary", href: "#projects", key: "projects" }, "Explore projects"),
      createElement("a", { className: "hero-action hero-action-secondary", href: "#contact", key: "contact" }, "Contact Chaitanya"),
    ]),
    align: "left",
    scroll: 2.2,
    linger: 0.12,
    objectPosition: "58% 50%",
    mobileObjectPosition: "56% 50%",
  },
];
