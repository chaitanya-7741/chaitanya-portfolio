import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Database,
  Layers3,
  Mail,
  Menu,
  Radar,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { ResumeChat } from "@/components/resume-chat/resume-chat";

export const Route = createFileRoute("/")({ component: Index });

type ProjectCategory = "AI / ML" | "Full stack";
type ProjectFilter = "All work" | ProjectCategory;

type Project = {
  number: string;
  title: string;
  kind: string;
  categories: ProjectCategory[];
  description: string;
  stack: string[];
  architecture?: {
    nodes: { id: string; label: string; description: string }[];
    flow: string[];
  };
  visual: string;
  image: string;
  icon: typeof Code2;
  repo?: string;
  demo?: string;
  status?: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "EC2 Predictive Monitoring",
    kind: "Machine learning / cloud reliability",
    categories: ["AI / ML", "Full stack"],
    description:
      "A monitoring workflow that collects EC2 resource signals and uses machine learning to anticipate possible service instability before a crash, with a React dashboard and FastAPI backend.",
    stack: ["Python", "FastAPI", "Machine Learning", "React"],
    architecture: {
      flow: ["signals", "python", "model", "fastapi", "react"],
      nodes: [
        { id: "signals", label: "EC2 signals", description: "Resource signals are collected from the EC2 monitoring workflow as input for analysis." },
        { id: "python", label: "Python", description: "Python is part of the project stack and supports the monitoring and machine-learning workflow." },
        { id: "model", label: "ML model", description: "Machine learning uses the collected resource signals to anticipate possible service instability." },
        { id: "fastapi", label: "FastAPI", description: "The FastAPI backend connects the monitoring workflow to the dashboard." },
        { id: "react", label: "React dashboard", description: "The React dashboard presents monitoring information to the user." },
      ],
    },
    visual: "monitor",
    image: "/assets/project-monitoring.svg",
    icon: Radar,
    status: "Project in development",
  },
  {
    number: "02",
    title: "Mirai Botnet Detection",
    kind: "AI / network security",
    categories: ["AI / ML"],
    description:
      "A FastAPI inference service built around a trained joblib model to classify network-flow inputs for Mirai botnet detection, paired with a frontend concept for visual analytics.",
    stack: ["Python", "FastAPI", "scikit-learn", "React"],
    architecture: {
      flow: ["traffic", "fastapi", "python", "model", "react"],
      nodes: [
        { id: "traffic", label: "Network flow", description: "Network-flow input is submitted for Mirai botnet classification." },
        { id: "fastapi", label: "FastAPI", description: "The FastAPI inference service receives the flow input and coordinates a model prediction." },
        { id: "python", label: "Python", description: "Python runs the model-backed inference service." },
        { id: "model", label: "Joblib model", description: "The trained joblib model classifies the network-flow input." },
        { id: "react", label: "React analytics", description: "A frontend concept presents visual analytics for the classification workflow." },
      ],
    },
    visual: "network",
    image: "/assets/project-botnet.svg",
    icon: Radar,
    status: "Model-backed API",
  },
  {
    number: "03",
    title: "GeoVision AI",
    kind: "Computer vision / geospatial AI",
    categories: ["AI / ML", "Full stack"],
    description:
      "A satellite-image segmentation project using U-Net with a ResNet34 encoder to identify seven classes in the DeepGlobe dataset, with an API and web interface.",
    stack: ["PyTorch", "U-Net", "FastAPI", "React", "AWS S3"],
    architecture: {
      flow: ["image", "react", "fastapi", "model", "result"],
      nodes: [
        { id: "image", label: "Satellite image", description: "A satellite image from the DeepGlobe dataset is the input to the segmentation workflow." },
        { id: "react", label: "Web interface", description: "The web interface lets users interact with the image-segmentation application." },
        { id: "fastapi", label: "FastAPI", description: "An API serves the trained segmentation workflow." },
        { id: "model", label: "U-Net + ResNet34", description: "A U-Net with a ResNet34 encoder predicts seven semantic classes for the image." },
        { id: "result", label: "Segmentation", description: "The model produces a pixel-level semantic segmentation result." },
      ],
    },
    visual: "geovision",
    image: "/assets/project-geovision.svg",
    icon: Layers3,
    repo: "https://github.com/chaitanya-7741/GeoVision-AI",
    demo: "https://geovision-nw17.onrender.com/",
    status: "Live demo + source",
  },
  {
    number: "04",
    title: "Course Outcome Agent",
    kind: "Education analytics / automation",
    categories: [],
    description:
      "An attainment-calculation workflow that brings CO statements, CO-PO/PSO mapping, question-wise marks, assignments, quizzes, and internal and semester weighting into one structured process.",
    stack: ["Python", "Data processing", "Automation"],
    visual: "attainment",
    image: "/assets/project-outcomes.svg",
    icon: Database,
    repo: "https://github.com/chsschaitanya45-oss/courseoutcome",
    demo: "https://courseoutcome.onrender.com/",
    status: "Live demo + source",
  },
  {
    number: "05",
    title: "SavorBites Restaurant Website",
    kind: "Restaurant website / frontend",
    categories: [],
    description:
      "My first website, built with HTML, CSS, and JavaScript. SavorBites introduced me to creating a complete restaurant experience for the web, from visual design to interactive details.",
    stack: ["HTML", "CSS", "JavaScript"],
    visual: "restaurant",
    image: "/assets/project-restaurant.svg",
    icon: Braces,
    repo: "https://github.com/chaitanya-7741/savorbites4",
    demo: "https://savorr.netlify.app/",
    status: "First website / live",
  },
  {
    number: "06",
    title: "AI Career Counsellor",
    kind: "Full-stack application",
    categories: ["Full stack"],
    description:
      "A MERN-stack career guidance application concept that helps students explore pathways and connect their skills and interests with possible career directions.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    architecture: {
      flow: ["student", "react", "express", "mongodb", "guidance"],
      nodes: [
        { id: "student", label: "Skills & interests", description: "Students explore career pathways by connecting their skills and interests." },
        { id: "react", label: "React", description: "The React interface is part of the MERN application concept." },
        { id: "express", label: "Express + Node.js", description: "Express and Node.js form the backend stack for this MERN project." },
        { id: "mongodb", label: "MongoDB", description: "MongoDB is the database in the listed MERN stack; the project summary does not specify its schema or stored records." },
        { id: "guidance", label: "Career pathways", description: "The application concept helps students explore possible career directions. Implementation details for its recommendations have not been specified." },
      ],
    },
    visual: "career",
    image: "/assets/project-career.svg",
    icon: Sparkles,
    status: "MERN project",
  },
];

const skillGroups = [
  { title: "Frontend", items: ["React.js", "JavaScript", "HTML", "CSS", "Responsive UI"] },
  { title: "Backend", items: ["Node.js", "Express.js", "FastAPI", "REST APIs"] },
  { title: "Data & AI", items: ["Python", "Machine Learning", "PyTorch", "scikit-learn"] },
  { title: "Databases & tools", items: ["MongoDB", "MySQL", "Git", "AWS S3"] },
];

function Index() {
  const pointerCursorRef = useRef<HTMLDivElement>(null);
  const portraitSceneRef = useRef<HTMLDivElement>(null);
  const projectToEnterRef = useRef<string | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [filter, setFilter] = useState<ProjectFilter>("All work");
  const [openArchitecture, setOpenArchitecture] = useState<string | null>(null);
  const [selectedArchitectureNodes, setSelectedArchitectureNodes] = useState<Record<string, string>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [siriiChatOpen, setSiriiChatOpen] = useState(false);
  const [showDeveloperNote, setShowDeveloperNote] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [universeProjectId, setUniverseProjectId] = useState(projects[0].number);
  const [headerPinned, setHeaderPinned] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const filters: ProjectFilter[] = ["All work", "AI / ML", "Full stack"];
  const visibleProjects = projects.filter((project) => {
    return filter === "All work" || project.categories.includes(filter);
  });
  const selectedUniverseProject =
    projects.find((project) => project.number === universeProjectId) ?? projects[0];

  useEffect(() => {
    const projectToEnter = projectToEnterRef.current;
    if (!projectToEnter || filter !== "All work") return;
    document
      .getElementById(`project-world-${projectToEnter}`)
      ?.scrollIntoView({ behavior: recruiterMode ? "instant" : "smooth", block: "start" });
    projectToEnterRef.current = null;
  }, [filter, recruiterMode]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => setIsPageLoading(false), reduceMotion ? 250 : 1050);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!recruiterMode) return;
    document
      .getElementById("recruiter-mode-overview")
      ?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [recruiterMode]);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 80) {
        setHeaderPinned(false);
        setHeaderVisible(true);
        previousScrollY = currentScrollY;
        return;
      }

      setHeaderPinned(true);
      if (Math.abs(currentScrollY - previousScrollY) >= 4) {
        setHeaderVisible(currentScrollY < previousScrollY);
        previousScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

      if (event.key === "Escape") {
        setSiriiChatOpen(false);
        setMenuOpen(false);
        setShowDeveloperNote(false);
        return;
      }

      if (isTyping) return;
      if (event.key === "/") {
        event.preventDefault();
        setSiriiChatOpen(true);
      } else if (event.key === "?") {
        setShowDeveloperNote(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const cursor = pointerCursorRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!cursor || !finePointer.matches || reducedMotion.matches) return;

    const magneticTargets = document.querySelectorAll<HTMLElement>(
      ".hero-action, .ask-sirii-prompt, .nav-contact, .filter-tab, .resume-button, .contact-socials a, .send-button, .back-top",
    );
    magneticTargets.forEach((target) => target.classList.add("is-magnetic"));
    let activeTarget: HTMLElement | null = null;

    const resetMagneticTarget = () => {
      if (!activeTarget) return;
      activeTarget.style.setProperty("--magnetic-x", "0px");
      activeTarget.style.setProperty("--magnetic-y", "0px");
      activeTarget = null;
    };

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add("is-visible");

      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              ".hero-action, .ask-sirii-prompt, .nav-contact, .filter-tab, .resume-button, .contact-socials a, .send-button, .back-top",
            )
          : null;

      if (target !== activeTarget) {
        resetMagneticTarget();
        activeTarget = target;
      }

      if (!activeTarget) return;
      const bounds = activeTarget.getBoundingClientRect();
      const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
      const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
      activeTarget.style.setProperty("--magnetic-x", `${offsetX}px`);
      activeTarget.style.setProperty("--magnetic-y", `${offsetY}px`);
      cursor.classList.toggle("is-hovering", true);
    };

    const handlePointerOut = (event: globalThis.PointerEvent) => {
      if (event.relatedTarget !== null) return;
      cursor.classList.remove("is-visible", "is-hovering");
      resetMagneticTarget();
    };

    const handlePointerLeaveTarget = () => {
      resetMagneticTarget();
      cursor.classList.remove("is-visible", "is-hovering");
    };

    const handlePointerOver = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const target =
        event.target instanceof Element
          ? event.target.closest(
              ".hero-action, .ask-sirii-prompt, .nav-contact, .filter-tab, .resume-button, .contact-socials a, .send-button, .back-top",
            )
          : null;
      cursor.classList.toggle("is-hovering", Boolean(target));
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerleave", handlePointerLeaveTarget);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerleave", handlePointerLeaveTarget);
      resetMagneticTarget();
      magneticTargets.forEach((target) => {
        target.classList.remove("is-magnetic");
        target.style.removeProperty("--magnetic-x");
        target.style.removeProperty("--magnetic-y");
      });
    };
  }, []);

  useEffect(() => {
    const scene = portraitSceneRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!scene || !finePointer.matches || reducedMotion.matches) return;

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = scene.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      scene.style.setProperty("--portrait-rotate-x", `${-y * 7}deg`);
      scene.style.setProperty("--portrait-rotate-y", `${x * 9}deg`);
      scene.style.setProperty("--portrait-light-x", `${(x + 0.5) * 100}%`);
      scene.style.setProperty("--portrait-light-y", `${(y + 0.5) * 100}%`);
    };

    const resetScene = () => {
      scene.style.setProperty("--portrait-rotate-x", "0deg");
      scene.style.setProperty("--portrait-rotate-y", "0deg");
      scene.style.setProperty("--portrait-light-x", "50%");
      scene.style.setProperty("--portrait-light-y", "42%");
    };

    scene.addEventListener("pointermove", handlePointerMove);
    scene.addEventListener("pointerleave", resetScene);
    return () => {
      scene.removeEventListener("pointermove", handlePointerMove);
      scene.removeEventListener("pointerleave", resetScene);
      resetScene();
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const revealTargets = document.querySelectorAll<HTMLElement>(
      [
        "#main-content > section > .section-topline",
        ".projects-section .section-heading-row",
        ".projects-section .project-toolbar",
        ".project-card",
        ".about-copy",
        ".about-visual",
        ".education-strip",
        ".education-list article",
        ".skills-heading",
        ".skill-group",
        ".skills-bottomline",
        ".process-left",
        ".process-steps article",
        ".credentials-layout > div",
        ".credential-list article",
        ".resume-band",
        ".contact-copy",
        ".contact-socials a",
        ".contact-form",
        ".site-footer",
      ].join(", "),
    );

    if (!("IntersectionObserver" in window)) return;

    const siblingIndexes = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-scroll-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );

    revealTargets.forEach((element) => {
      const parent = element.parentElement;
      const siblingIndex = parent ? siblingIndexes.get(parent) ?? 0 : 0;
      if (parent) siblingIndexes.set(parent, siblingIndex + 1);
      element.style.setProperty(
        "--reveal-delay",
        `${Math.min(siblingIndex, 3) * 50}ms`,
      );
      element.classList.add("scroll-reveal");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [filter]);

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    if (!name || !email || !message) {
      setFormStatus("Please complete each field before sending.");
      return;
    }
    const targetEmail: string = "chsschaitanya20@gmail.com";
    if (!targetEmail || targetEmail === "YOUR_EMAIL@example.com") {
      setFormStatus("The contact form is not configured yet. Please use the contact links below.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`);
    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${subject}&body=${body}`;
    setFormStatus("Opening Gmail compose. Review your message before sending.");
  }

  return (
    <main className={`portfolio-shell${recruiterMode ? " is-recruiter-mode" : ""}`} aria-busy={isPageLoading}>
      {isPageLoading && (
        <div className="page-loader" role="status" aria-live="polite">
          <div className="page-loader-content">
            <span className="brand-symbol page-loader-symbol" aria-hidden="true"><span /><span /><i /></span>
            <span className="page-loader-name">CH<span>.</span></span>
            <span className="page-loader-label">Preparing your portfolio</span>
            <span className="page-loader-track" aria-hidden="true"><span /></span>
          </div>
        </div>
      )}
      <div inert={isPageLoading}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header${headerPinned ? " is-pinned" : ""}${headerVisible ? "" : " is-hidden"}`}>
        <a className="brand-lockup" href="#top" aria-label="Chaitanya home">
          <span className="brand-symbol" aria-hidden="true"><span /><span /><i /></span>
          <span className="brand-name">CH<span>.</span></span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a onClick={() => setMenuOpen(false)} href="#about">About</a>
          <a onClick={() => setMenuOpen(false)} href="#skills">Skills</a>
          <a onClick={() => setMenuOpen(false)} href="#projects">Projects</a>
          <a onClick={() => setMenuOpen(false)} href="#certifications">Credentials</a>
          <button
            className="recruiter-mode-toggle"
            type="button"
            aria-pressed={recruiterMode}
            onClick={() => {
              setRecruiterMode((enabled) => !enabled);
              setMenuOpen(false);
            }}
          >
            <span className="recruiter-mode-indicator" aria-hidden="true" />
            Recruiter mode
          </button>
          <a onClick={() => setMenuOpen(false)} className="nav-contact" href="#contact">Let's talk <ArrowUpRight size={14} /></a>
        </nav>
        <button className="mobile-menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} type="button">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <div id="top" className="cinema-intro">
        <div className="hero-side-label">COMPUTER SCIENCE <span aria-hidden="true">·</span> INDEPENDENT BUILDER</div>
        <button
          className="ask-sirii-prompt"
          type="button"
          onClick={() => setSiriiChatOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={siriiChatOpen}
        >
          <Sparkles size={15} />
          <span>Ask Sirii</span>
          <span className="ask-sirii-prompt-hint">Curious about my work?</span>
        </button>
        <section className="portfolio-universe" aria-labelledby="universe-title">
          <div className="universe-intro">
            <span className="universe-kicker">A SMALL UNIVERSE / SIX WORLDS</span>
            <h1 id="universe-title">Builds with<br /><em>their own gravity.</em></h1>
            <p>Start at the center. Choose a world to explore the work orbiting around it.</p>
          </div>
          <div className="universe-stage">
            <div className="universe-orbit universe-orbit--outer" aria-hidden="true" />
            <div className="universe-orbit universe-orbit--inner" aria-hidden="true" />
            <div className="universe-worlds" role="group" aria-label="Choose a project world">
              {projects.map((project) => {
                const WorldIcon = project.icon;
                const isSelected = universeProjectId === project.number;
                return (
                  <button
                    className={`universe-world universe-world--${project.visual}${isSelected ? " is-selected" : ""}`}
                    key={project.number}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setUniverseProjectId(project.number)}
                  >
                    <span className="universe-world-globe" aria-hidden="true">
                      <WorldIcon size={20} strokeWidth={1.7} />
                    </span>
                    <span className="universe-world-label">
                      <small>WORLD / {project.number}</small>
                      <strong>{project.title}</strong>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="universe-core" role="img" aria-label="Chaitanya at the center of the portfolio universe">
              <span className="universe-core-halo" aria-hidden="true" />
              <img src="/assets/world/chaitanya-portrait.png" alt="" />
              <span className="universe-core-label">CHAITANYA / CORE</span>
            </div>
          </div>
          <div className={`universe-selected universe-selected--${selectedUniverseProject.visual}`} aria-live="polite">
            <div className="universe-selected-meta">
              <span>SELECTED WORLD / {selectedUniverseProject.number}</span>
              <span>{selectedUniverseProject.kind}</span>
            </div>
            <div className="universe-selected-content">
              <div>
                <h2>{selectedUniverseProject.title}</h2>
                <p>{selectedUniverseProject.description}</p>
              </div>
              <button
                className="universe-enter"
                type="button"
                onClick={() => {
                  if (filter === "All work") {
                    document
                      .getElementById(`project-world-${selectedUniverseProject.number}`)
                      ?.scrollIntoView({ behavior: recruiterMode ? "instant" : "smooth", block: "start" });
                    return;
                  }
                  projectToEnterRef.current = selectedUniverseProject.number;
                  setFilter("All work");
                }}
              >
                Enter this world <ArrowDownRight size={17} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
        <div className="hero-bottomline">
          <span>PORTFOLIO / 2026</span>
          <span>INTERACTIVE FILM / 7.5 SEC <ArrowDownRight size={15} /></span>
          <button
            className="system-status"
            type="button"
            onClick={() => setShowDeveloperNote((visible) => !visible)}
            aria-expanded={showDeveloperNote}
            aria-controls="system-note"
            title="A small note from the developer"
          >
            <span className="system-status-dot" aria-hidden="true" />
            SYSTEM ONLINE
          </button>
        </div>
        {showDeveloperNote && (
          <p className="system-note" id="system-note" role="status">
            All systems nominal. Press <kbd>/</kbd> to chat with Sirii, or <kbd>Esc</kbd> to close.
          </p>
        )}
      </div>

      {recruiterMode && (
        <nav
          className="recruiter-mode-overview"
          id="recruiter-mode-overview"
          aria-label="Recruiter quick links"
        >
          <div>
            <span className="recruiter-mode-eyebrow">RECRUITER VIEW / ACTIVE</span>
            <p>Key information, with motion reduced.</p>
          </div>
          <div className="recruiter-mode-links">
            <a href="#recruiter-resume">Resume</a>
            <a href="#skills">Technical skills</a>
            <a href="#projects">Projects &amp; contributions</a>
            <a href="#certifications">Certifications</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      )}

      <div id="main-content">
        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="about-copy">
            <div className="section-topline"><span className="section-index">ABOUT ME</span><span className="section-count">CSE / SOFTWARE ENGINEERING</span></div>
            <h2 id="about-title">Curious by nature.<br /><em>Builder by choice.</em></h2>
            <p className="about-body">I'm Chaitanya, a Computer Science Engineering student at VFSTR University, working toward a career in software engineering.</p>
            <div className="about-story">
              <span>WHY I ENJOY BUILDING</span>
              <p>I like taking an idea, understanding the problem behind it, and turning it into something people can try. Building across interfaces, APIs, and AI helps me see how the pieces fit together—and each project gives me a new reason to learn.</p>
            </div>
            <dl className="about-details">
              <div>
                <dt>EDUCATION</dt>
                <dd>B.Tech in Computer Science Engineering<br />VFSTR University · 2023–2027 expected</dd>
              </div>
              <div>
                <dt>CAREER GOALS</dt>
                <dd>Opportunities in software engineering, full-stack development, and AI/ML</dd>
              </div>
              <div>
                <dt>INTERESTS</dt>
                <dd>Web development, AI/ML, reading, and hands-on technology experiments</dd>
              </div>
              <div>
                <dt>VALUES</dt>
                <dd>Curiosity, continuous learning, practical problem-solving, and collaboration</dd>
              </div>
            </dl>
            <a className="text-link" href="#education">Explore my education <ArrowUpRight size={16} /></a>
          </div>
          <div ref={portraitSceneRef} className="about-visual about-visual--portrait" role="img" aria-label="Portrait of Chaitanya">
            <span className="visual-coordinate coord-a">CH / PROFILE</span>
            <span className="visual-coordinate coord-b">SYSTEMS / BUILD</span>
            <div className="portrait-depth-stage" aria-hidden="true">
              <div className="portrait-orbit portrait-orbit--one"></div>
              <div className="portrait-orbit portrait-orbit--two"></div>
              <div className="portrait-orbit portrait-orbit--three"></div>
              <div className="portrait-photo-frame">
                <img src="/assets/chaitanya-portrait.jpeg" alt="" className="about-portrait-image" />
              </div>
            </div>
            <div className="visual-caption"><span>FIG. 01</span><span>CHAITANYA / SOFTWARE ENGINEERING</span></div>
          </div>
</section>

        <section className="skills-section section recruiter-highlight" id="skills" aria-labelledby="skills-title">
          <div className="section-topline"><span className="section-index">01 / CAPABILITIES</span><span className="section-count">TOOLS OF THE TRADE</span></div>
          <div className="skills-heading"><h2 id="skills-title">A practical <em>toolkit.</em></h2><p>Technologies I've used in coursework, prototypes, and projects. I have not assigned proficiency levels.</p></div>
          <div className="skill-groups">
            <article className="skill-group"><div className="skill-group-head"><span>01</span><h3>Frontend</h3></div><ul><li>HTML <span aria-hidden="true">✓</span></li><li>CSS <span aria-hidden="true">✓</span></li><li>React.js <span aria-hidden="true">✓</span></li><li>JavaScript <span aria-hidden="true">✓</span></li></ul></article>
            <article className="skill-group"><div className="skill-group-head"><span>02</span><h3>Backend</h3></div><ul><li>Node.js <span aria-hidden="true">✓</span></li><li>Express.js <span aria-hidden="true">✓</span></li><li>REST APIs <span aria-hidden="true">✓</span></li></ul></article>
            <article className="skill-group"><div className="skill-group-head"><span>03</span><h3>Programming</h3></div><ul><li>Python <span aria-hidden="true">✓</span></li><li>Java <small>(basics)</small></li></ul></article>
            <article className="skill-group"><div className="skill-group-head"><span>04</span><h3>Databases &amp; tools</h3></div><ul><li>MongoDB <span aria-hidden="true">✓</span></li><li>MySQL <span aria-hidden="true">✓</span></li><li>Git <span aria-hidden="true">✓</span></li><li>VS Code <span aria-hidden="true">✓</span></li><li>MS Office <span aria-hidden="true">✓</span></li></ul></article>
          </div>
          <div className="skills-bottomline"><span><Code2 size={16} /> CURRENT FOCUS</span><p>Building clean APIs and accessible interfaces, applying machine learning, and thinking through the full product experience.</p></div>
        </section>

        <section className="section projects-section recruiter-highlight" id="projects" aria-labelledby="projects-title">
          <div className="section-topline"><span className="section-index">02 / SELECTED WORK</span><span className="section-count">2024 / 2026</span></div>
          <div className="section-heading-row">
            <h2 id="projects-title">Things I've <em>built.</em></h2>
            <p>Experiments in AI, useful software, and systems that turn complicated inputs into something clearer.</p>
          </div>
          <div className="project-toolbar">
            <div className="filter-tabs" aria-label="Filter projects">
              {filters.map((item) => <button key={item} type="button" className={filter === item ? "filter-tab active" : "filter-tab"} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
            </div>
            <span className="project-total">{String(visibleProjects.length).padStart(2, "0")} PROJECTS</span>
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => {
              return <article className={`project-card project-${project.visual}`} id={`project-world-${project.number}`} key={project.number}>
                <div className={`project-art art-${project.visual}`} aria-hidden="true">
                  <img className="project-art-image" src={project.image} alt="" loading="lazy" decoding="async" />
                  <span className="project-art-index">{project.number} / CH</span>
                  <span className="art-type">{project.kind.toUpperCase()}</span>
                </div>
                <div className="project-copy">
                  <div className="project-card-meta"><span>{project.number} / 06</span><span>{project.status}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="stack-list">{project.stack.map((stack) => <li key={stack}>{stack}</li>)}</ul>
                  {project.architecture && (() => {
                    const architectureId = `project-architecture-${project.number}`;
                    const isArchitectureOpen = openArchitecture === project.number;
                    const selectedNodeId =
                      selectedArchitectureNodes[project.number] ?? project.architecture.nodes[0].id;
                    const selectedNode = project.architecture.nodes.find(
                      (node) => node.id === selectedNodeId,
                    ) ?? project.architecture.nodes[0];

                    return (
                      <div className="project-architecture">
                        <button
                          className="architecture-toggle"
                          type="button"
                          aria-expanded={isArchitectureOpen}
                          aria-controls={architectureId}
                          onClick={() => {
                            setOpenArchitecture(isArchitectureOpen ? null : project.number);
                            if (!isArchitectureOpen) {
                              setSelectedArchitectureNodes((current) => ({
                                ...current,
                                [project.number]: selectedNode.id,
                              }));
                            }
                          }}
                        >
                          <span>Explore system flow</span>
                          <span className="architecture-toggle-hint">
                            {isArchitectureOpen ? "Close" : "Interactive"}
                            <ArrowRight size={14} aria-hidden="true" />
                          </span>
                        </button>
                        {isArchitectureOpen && (
                          <div
                            className="architecture-panel"
                            id={architectureId}
                            aria-label={`${project.title} system architecture`}
                          >
                            <div className="architecture-flow" aria-label="Click a step to learn about it">
                              {project.architecture.flow.map((nodeId, index) => {
                                const node = project.architecture?.nodes.find(
                                  (item) => item.id === nodeId,
                                );
                                if (!node) return null;

                                return (
                                  <div className="architecture-flow-step" key={node.id}>
                                    <button
                                      className="architecture-node"
                                      type="button"
                                      aria-pressed={selectedNodeId === node.id}
                                      onClick={() =>
                                        setSelectedArchitectureNodes((current) => ({
                                          ...current,
                                          [project.number]: node.id,
                                        }))
                                      }
                                    >
                                      {node.label}
                                    </button>
                                    {index < project.architecture!.flow.length - 1 && (
                                      <ArrowRight
                                        className="architecture-flow-arrow"
                                        size={14}
                                        aria-hidden="true"
                                      />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="architecture-detail" aria-live="polite" aria-atomic="true">
                              <span>{selectedNode.label}</span>
                              <p>{selectedNode.description}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                  <div className="project-links">
                    <div className="project-link-actions">
                      {project.repo && <a className="project-link" href={project.repo} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={15} /></a>}
                      {project.demo && <a className="project-link project-link-secondary" href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} /></a>}
                      {!project.repo && !project.demo && <span className="project-placeholder">Repository link to be added</span>}
                    </div>
                    {(project.repo || project.demo) && <span className="project-card-icon"><ArrowUpRight size={18} /></span>}
                  </div>
                </div>
              </article>;
            })}
          </div>
          <p className="section-footnote">Project summaries reflect the scope currently documented. Verify each demo, outcome, screenshot, and repository link before sharing this portfolio.</p>
        </section>

        <section className="process-section" aria-labelledby="process-title">
          <div className="process-left"><div className="section-topline"><span className="section-index">HOW I WORK</span></div><h2 id="process-title">From question<br />to <em>working software.</em></h2><p>Good engineering is a sequence of small, verifiable decisions.</p></div>
          <div className="process-steps"><article><span>01</span><div><h3>Understand</h3><p>Define the problem, the user, and what a useful result should look like.</p></div><ChevronRight size={18}/></article><article><span>02</span><div><h3>Prototype</h3><p>Choose a focused stack and get the smallest end-to-end version working.</p></div><ChevronRight size={18}/></article><article><span>03</span><div><h3>Validate</h3><p>Check behavior, edge cases, and whether the solution answers the original need.</p></div><ChevronRight size={18}/></article><article><span>04</span><div><h3>Refine</h3><p>Improve clarity, reliability, performance, and the experience around the core feature.</p></div><ChevronRight size={18}/></article></div>
        </section>

        <section className="credentials-section section recruiter-highlight" id="certifications" aria-labelledby="certifications-title">
          <div className="section-topline"><span className="section-index">03 / MILESTONES</span><span className="section-count">LEARNING &amp; CREDENTIALS</span></div>
          <section className="education-strip" id="education" aria-labelledby="education-title">
            <div className="education-strip-head"><span className="section-index">EDUCATION</span><span className="section-count">ACADEMIC RECORD</span></div>
            <h3 id="education-title">Learning, one milestone at a time.</h3>
            <div className="education-list">
              <article><span className="education-year">2023–PRESENT</span><div><h4>Bachelor of Technology in Computer Science Engineering</h4><p>VFSTR University, Vadlamudi</p></div><strong>CGPA: 7.03</strong></article>
              <article><span className="education-year">2021–2023</span><div><h4>Intermediate (MPC)</h4><p>SASI Junior College</p></div><strong>79.6%</strong></article>
              <article><span className="education-year">2020–2021</span><div><h4>Secondary School Certificate</h4><p>Montessori School</p></div><strong>99%</strong></article>
            </div>
          </section>
          <div className="credentials-layout"><div><h2 id="certifications-title">Always in <em>progress.</em></h2><p className="credentials-intro">This section highlights certificates, courses, and milestones. Details are included only when they can be verified.</p><a className="text-link" href="#contact">Ask me about my work <ArrowUpRight size={16}/></a></div><div className="credential-list">
            <article><span className="credential-mark"><Layers3 size={19}/></span><div><h3>Public Speaking — NPTEL</h3><p>NPTEL · 2025</p><span className="credential-todo">LISTED ON RESUME</span></div><span className="credential-year">2025</span></article>
            <article><span className="credential-mark"><Database size={19}/></span><div><h3>Cambridge PET Certificate</h3><p>Cambridge English</p><span className="credential-todo">DETAILS TO BE CONFIRMED</span></div><span className="credential-year">—</span></article>
            <article><span className="credential-mark"><Sparkles size={19}/></span><div><h3>Smart India Hackathon</h3><p>Participation certificate</p><span className="credential-todo">LISTED ON RESUME</span></div><span className="credential-year">—</span></article>
            <article><span className="credential-mark"><Sparkles size={19}/></span><div><h3>University Hackathon</h3><p>Certificate of appreciation</p><span className="credential-todo">LISTED ON RESUME</span></div><span className="credential-year">—</span></article>
          </div></div>
        </section>

        <section className="resume-band recruiter-highlight" id="recruiter-resume" aria-label="Resume download"><div className="resume-icon"><Braces size={24}/></div><div><span className="resume-eyebrow">THE ONE-PAGE VERSION</span><h2>Want the concise version?</h2><p>A quick overview of my education, skills, and project experience.</p></div><a className="resume-button" href="/assets/chaitanya-resume.pdf" download="Chaitanya-Resume.pdf" aria-label="Download Chaitanya's resume as a PDF">Download resume <ArrowUpRight size={17}/></a></section>

        <section className="contact-section section recruiter-highlight" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy"><div className="section-topline"><span className="section-index">04 / CONTACT</span><span className="section-count">OPEN TO OPPORTUNITIES</span></div><h2 id="contact-title">Have a good<br /><em>problem to solve?</em></h2><p>I'm interested in internships, entry-level opportunities, collaborative projects, and thoughtful conversations about software.</p><div className="contact-socials"><a href="https://github.com/chaitanya-7741" target="_blank" rel="noreferrer"><GithubLogo size={17}/> GitHub <ArrowUpRight size={14}/></a><a href="https://www.linkedin.com/in/chunchula-chaitanya-b8918532a" target="_blank" rel="noreferrer"><LinkedinLogo size={17}/> LinkedIn <ArrowUpRight size={14}/></a><a href="https://mail.google.com/mail/?view=cm&fs=1&to=chsschaitanya20%40gmail.com&su=Hello%20Chaitanya&body=Hi%20Chaitanya%2C%0A%0AI%20visited%20your%20portfolio%20and%20wanted%20to%20connect.%0A%0AName%3A%20%0AMessage%3A%20" target="_blank" rel="noreferrer"><Mail size={17}/> Email <ArrowUpRight size={14}/></a><a href="https://wa.me/919121731449?text=Hi%20Chaitanya%2C%20I%20visited%20your%20portfolio%20and%20wanted%20to%20connect." target="_blank" rel="noreferrer"><Send size={17}/> WhatsApp <ArrowUpRight size={14}/></a></div></div>
          <form className="contact-form" onSubmit={handleContact}>
            <div className="form-heading"><span>CONTACT FORM</span><span>01 / 03</span></div>
            <label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" placeholder="Name" autoComplete="name" required />
            <label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            <label htmlFor="contact-message">What would you like to discuss?</label><textarea id="contact-message" name="message" rows={4} placeholder="A role, an idea, a project..." required />
            <button className="send-button" type="submit">Prepare email <Send size={16}/></button>
            {formStatus && <p className="form-status" role="status">{formStatus}</p>}
            <p className="form-note">The form opens a pre-addressed email draft. Review it before sending.</p>
          </form>
        </section>
      </div>

      <footer className="site-footer"><a className="brand-lockup" href="#top"><span className="brand-symbol" aria-hidden="true"><span/><span/><i/></span><span className="brand-name">CH<span>.</span></span></a><p>Designed with curiosity. Built with care.</p><a href="#top" className="back-top">BACK TO TOP <ArrowUpRight size={14}/></a><span className="footer-year">© {new Date().getFullYear()} Chaitanya</span></footer>
      <ResumeChat isOpen={siriiChatOpen} onOpenChange={setSiriiChatOpen} />
      </div>
      <div ref={pointerCursorRef} className="portfolio-cursor" aria-hidden="true" />
    </main>
  );
}
