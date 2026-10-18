import { createElement } from "react";
import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#C77D8B",
  background: "#11151A",
  ink: "#F3F4F2",
  muted: "#9AA4AF",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    id: "orbit-core",
    label: "Intro",
    poster: "/assets/world/scene-01-poster.png",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    clip: "/assets/world/scene-01.mp4",
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    title: "Build with intent.",
    body: "I turn ideas into thoughtful software, data-driven tools, and products people can use.",
    kicker: "CHAITANYA / COMPUTER SCIENCE",
    tags: ["Full-stack development", "AI / ML", "Software engineering"],
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
