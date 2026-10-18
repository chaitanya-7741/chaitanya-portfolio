import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type PointerEvent } from "react";
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
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";

export const Route = createFileRoute("/")({ component: Index });

type Project = {
  number: string;
  title: string;
  kind: string;
  description: string;
  stack: string[];
  visual: string;
  icon: typeof Code2;
  repo?: string;
  status?: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "EC2 Predictive Monitoring",
    kind: "Machine learning / cloud reliability",
    description:
      "A monitoring workflow that collects EC2 resource signals and uses machine learning to anticipate possible service instability before a crash, with a React dashboard and FastAPI backend.",
    stack: ["Python", "FastAPI", "Machine Learning", "React"],
    visual: "monitor",
    icon: Radar,
    status: "Project in development",
  },
  {
    number: "02",
    title: "Mirai Botnet Detection",
    kind: "AI / network security",
    description:
      "A FastAPI inference service built around a trained joblib model to classify network-flow inputs for Mirai botnet detection, paired with a frontend concept for visual analytics.",
    stack: ["Python", "FastAPI", "scikit-learn", "React"],
    visual: "network",
    icon: Radar,
    status: "Model-backed API",
  },
  {
    number: "03",
    title: "GeoVision AI",
    kind: "Computer vision / geospatial AI",
    description:
      "Satellite-image semantic segmentation using a U-Net architecture with a ResNet34 encoder, trained for seven classes on a DeepGlobe image dataset and served through an API and web interface.",
    stack: ["PyTorch", "U-Net", "FastAPI", "React", "AWS S3"],
    visual: "geovision",
    icon: Layers3,
    status: "Research prototype",
  },
  {
    number: "04",
    title: "Course Outcome Agent",
    kind: "Education analytics / automation",
    description:
      "An attainment-calculation workflow that brings CO statements, CO-PO/PSO mapping, question-wise marks, assignments, quizzes, and internal/semester weighting into one structured process.",
    stack: ["Python", "Data processing", "Automation"],
    visual: "attainment",
    icon: Database,
    repo: "https://github.com/chsschaitanya45-oss/courseoutcome",
    status: "Repository available",
  },
  {
    number: "05",
    title: "MeetMate AI",
    kind: "AI productivity / full stack",
    description:
      "An AI meeting assistant concept for transcription, summaries, and multilingual translation, designed to help teams turn conversations into clear next steps.",
    stack: ["AI", "Web development", "Transcription"],
    visual: "meetmate",
    icon: Braces,
    status: "Project concept",
  },
  {
    number: "06",
    title: "AI Career Counsellor",
    kind: "Full-stack application",
    description:
      "A MERN-stack career guidance application concept that helps students explore pathways and connect their skills and interests with possible career directions.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    visual: "career",
    icon: Sparkles,
    status: "MERN project",
  },
];

const skillGroups = [
  { title: "Frontend", items: ["React.js", "JavaScript", "HTML", "CSS", "Responsive UI"] },
  { title: "Backend", items: ["Node.js", "Express.js", "FastAPI", "REST APIs"] },
  { title: "Data & AI", items: ["Python", "Machine Learning", "PyTorch", "scikit-learn"] },
  { title: "Data stores & tools", items: ["MongoDB", "MySQL", "Git", "AWS S3"] },
];

function Index() {
  const [filter, setFilter] = useState("All work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const filters = ["All work", "AI / ML", "Full stack"];
  const visibleProjects = projects.filter((project) => {
    if (filter === "AI / ML") return /Machine learning|AI|Computer vision|security|analytics/i.test(project.kind);
    if (filter === "Full stack") return /full stack|productivity|application/i.test(project.kind) || project.stack.includes("React");
    return true;
  });

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
    const targetEmail = "YOUR_EMAIL@example.com";
    if (targetEmail === "YOUR_EMAIL@example.com") {
      setFormStatus("Contact form is designed. Add your real email in index.tsx to enable email handoff.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`);
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    setFormStatus("Your email app should open with the message ready to send.");
  }

  return (
    <main className="portfolio-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Chaitanya home">
          <span className="brand-symbol" aria-hidden="true"><span /><span /><i /></span>
          <span className="brand-name">CH<span>.</span></span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a onClick={() => setMenuOpen(false)} href="#projects">Projects</a>
          <a onClick={() => setMenuOpen(false)} href="#about">About</a>
          <a onClick={() => setMenuOpen(false)} href="#skills">Skills</a>
          <a onClick={() => setMenuOpen(false)} href="#certifications">Credentials</a>
          <a onClick={() => setMenuOpen(false)} className="nav-contact" href="#contact">Let's talk <ArrowUpRight size={14} /></a>
        </nav>
        <button className="mobile-menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} type="button">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <div id="top" className="cinema-intro">
        <div className="hero-side-label">COMPUTER SCIENCE <span>•</span> INDEPENDENT BUILDER</div>
        <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} className="portfolio-scroll-story" />
        <div className="hero-bottomline"><span>PORTFOLIO / 2026</span><span>INTERACTIVE FILM / 7.5 SEC <ArrowDownRight size={15} /></span></div>
      </div>

      <div id="main-content">
        <section className="section projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-topline"><span className="section-index">SELECTED WORK</span><span className="section-count">2024 / 2026</span></div>
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
              const Icon = project.icon;
              return <article className={`project-card project-${project.visual}`} key={project.number}>
                <div className={`project-art art-${project.visual}`} aria-hidden="true">
                  <div className="art-frame"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-orbit orbit-three" /><div className="art-core"><Icon size={29} strokeWidth={1.25} /></div><span className="art-coordinate">{project.number} / CH</span><span className="art-cross cross-a">+</span><span className="art-cross cross-b">+</span></div>
                  <span className="art-type">{project.kind.toUpperCase()}</span>
                </div>
                <div className="project-copy">
                  <div className="project-card-meta"><span>{project.number} / 06</span><span>{project.status}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="stack-list">{project.stack.map((stack) => <li key={stack}>{stack}</li>)}</ul>
                  <div className="project-links">
                    {project.repo ? <a className="project-link" href={project.repo} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={15} /></a> : <span className="project-placeholder">Repository link to be added</span>}
                    <span className="project-card-icon"><ArrowUpRight size={18} /></span>
                  </div>
                </div>
              </article>;
            })}
          </div>
          <p className="section-footnote">Project summaries reflect current known scope. Add verified demos, screenshots, outcomes, and repository links before applying.</p>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="about-copy">
            <div className="section-topline"><span className="section-index">A LITTLE ABOUT ME</span><span className="section-count">CS / SOFTWARE</span></div>
            <h2 id="about-title">Curious by nature.<br /><em>Builder by choice.</em></h2>
            <p className="about-lede">I'm Chaitanya, a computer science student interested in building software that solves real problems.</p>
            <p className="about-body">I enjoy moving between frontend experiences, backend APIs, and AI/ML experiments. My approach is practical: understand the problem, build a clear solution, test it, and keep improving the details.</p>
            <div className="about-facts"><div><span>01</span><p>Learn by building</p></div><div><span>02</span><p>Think in systems</p></div><div><span>03</span><p>Keep it useful</p></div></div>
            <a className="text-link" href="#contact">Start a conversation <ArrowUpRight size={16} /></a>
          </div>
          <div className="about-visual" onPointerMove={(event: PointerEvent<HTMLDivElement>) => { const rect = event.currentTarget.getBoundingClientRect(); const px = ((event.clientX - rect.left) / rect.width - .5) * 2; const py = ((event.clientY - rect.top) / rect.height - .5) * 2; event.currentTarget.style.setProperty("--dx", `${px * 14}px`); event.currentTarget.style.setProperty("--dy", `${py * 14}px`); event.currentTarget.style.setProperty("--rx", `${py * -7}deg`); event.currentTarget.style.setProperty("--ry", `${px * 10}deg`); }} onPointerLeave={(event) => { event.currentTarget.style.setProperty("--dx", "0px"); event.currentTarget.style.setProperty("--dy", "0px"); event.currentTarget.style.setProperty("--rx", "0deg"); event.currentTarget.style.setProperty("--ry", "0deg"); }}>
            <div className="about-visual-grid" />
            <div className="depth-orb"><div className="depth-ring ring-a"/><div className="depth-ring ring-b"/><div className="depth-ring ring-c"/><div className="depth-ring ring-d"/><div className="depth-center"><span>CH</span><i /></div><div className="depth-satellite satellite-a"/><div className="depth-satellite satellite-b"/></div>
            <div className="visual-caption"><span>FIG. 01</span><span>INTERACTIVE FIELD / POINTER-DRIVEN DEPTH</span></div>
            <span className="visual-coordinate coord-a">17° 23' N</span><span className="visual-coordinate coord-b">SYSTEMS / 01</span>
          </div>
        </section>

        <section className="skills-section section" id="skills" aria-labelledby="skills-title">
          <div className="section-topline"><span className="section-index">TOOLS OF THE TRADE</span><span className="section-count">ALWAYS LEARNING</span></div>
          <div className="skills-heading"><h2 id="skills-title">A practical <em>toolkit.</em></h2><p>Technologies I've used across coursework, prototypes, and projects. Proficiency levels are intentionally not self-scored.</p></div>
          <div className="skill-groups">{skillGroups.map((group, index) => <div className="skill-group" key={group.title}><div className="skill-group-head"><span>0{index + 1}</span><h3>{group.title}</h3></div><ul>{group.items.map((item) => <li key={item}>{item}<Check size={14} /></li>)}</ul></div>)}</div>
          <div className="skills-bottomline"><span><Code2 size={16} /> CURRENT FOCUS</span><p>Clean APIs, accessible interfaces, applied machine learning, and end-to-end product thinking.</p></div>
        </section>

        <section className="process-section" aria-labelledby="process-title">
          <div className="process-left"><div className="section-topline"><span className="section-index">HOW I WORK</span></div><h2 id="process-title">From question<br />to <em>working software.</em></h2><p>Good engineering is a sequence of small, verifiable decisions.</p></div>
          <div className="process-steps"><article><span>01</span><div><h3>Understand</h3><p>Define the problem, the user, and what a useful result should look like.</p></div><ChevronRight size={18}/></article><article><span>02</span><div><h3>Prototype</h3><p>Choose a focused stack and get the smallest end-to-end version working.</p></div><ChevronRight size={18}/></article><article><span>03</span><div><h3>Validate</h3><p>Check behavior, edge cases, and whether the solution answers the original need.</p></div><ChevronRight size={18}/></article><article><span>04</span><div><h3>Refine</h3><p>Improve clarity, reliability, performance, and the experience around the core feature.</p></div><ChevronRight size={18}/></article></div>
        </section>

        <section className="credentials-section section" id="certifications" aria-labelledby="certifications-title">
          <div className="section-topline"><span className="section-index">LEARNING & CREDENTIALS</span><span className="section-count">VERIFIED DETAILS ONLY</span></div>
          <div className="credentials-layout"><div><h2 id="certifications-title">Always in <em>progress.</em></h2><p className="credentials-intro">A space for verified certificates, courses, and milestones. Add each credential only when you have the official title and proof.</p><a className="text-link" href="#contact">Ask me about my work <ArrowUpRight size={16}/></a></div><div className="credential-list"><article><span className="credential-mark"><Layers3 size={19}/></span><div><h3>Certification title</h3><p>Provider / issuing organization</p><span className="credential-todo">PLACEHOLDER · ADD CERTIFICATE</span></div><span className="credential-year">YEAR</span></article><article><span className="credential-mark"><Database size={19}/></span><div><h3>Course or technical credential</h3><p>Provider / issuing organization</p><span className="credential-todo">PLACEHOLDER · ADD CERTIFICATE</span></div><span className="credential-year">YEAR</span></article><article><span className="credential-mark"><Sparkles size={19}/></span><div><h3>Achievement or workshop</h3><p>Event / institution</p><span className="credential-todo">PLACEHOLDER · ADD PROOF</span></div><span className="credential-year">YEAR</span></article></div></div>
        </section>

        <section className="resume-band" aria-label="Resume download"><div className="resume-icon"><Braces size={24}/></div><div><span className="resume-eyebrow">THE ONE-PAGE VERSION</span><h2>Want the concise version?</h2><p>Add your latest resume PDF to make it available here.</p></div><a className="resume-button" href="#contact" aria-label="Request resume via contact">Resume PDF <ArrowUpRight size={17}/></a></section>

        <section className="contact-section section" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy"><div className="section-topline"><span className="section-index">YOUR TURN</span><span className="section-count">OPEN TO OPPORTUNITIES</span></div><h2 id="contact-title">Have a good<br /><em>problem to solve?</em></h2><p>I'm interested in internships, entry-level opportunities, collaborative projects, and thoughtful conversations about software.</p><div className="contact-socials"><a href="https://github.com/chsschaitanya45-oss" target="_blank" rel="noreferrer"><GithubLogo size={17}/> GitHub <ArrowUpRight size={14}/></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><LinkedinLogo size={17}/> LinkedIn <span className="social-todo">replace with profile</span></a><a href="mailto:YOUR_EMAIL@example.com"><Mail size={17}/> Email <span className="social-todo">add real address</span></a></div></div>
          <form className="contact-form" onSubmit={handleContact}>
            <div className="form-heading"><span>CONTACT FORM</span><span>01 / 03</span></div>
            <label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" placeholder="Name" autoComplete="name" required />
            <label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            <label htmlFor="contact-message">What would you like to discuss?</label><textarea id="contact-message" name="message" rows={4} placeholder="A role, an idea, a project..." required />
            <button className="send-button" type="submit">Prepare message <Send size={16}/></button>
            {formStatus && <p className="form-status" role="status">{formStatus}</p>}
            <p className="form-note">The form prepares an email handoff. Replace the placeholder address in the code before launch.</p>
          </form>
        </section>
      </div>

      <footer className="site-footer"><a className="brand-lockup" href="#top"><span className="brand-symbol" aria-hidden="true"><span/><span/><i/></span><span className="brand-name">CH<span>.</span></span></a><p>Designed with curiosity. Built with care.</p><a href="#top" className="back-top">BACK TO TOP <ArrowUpRight size={14}/></a><span className="footer-year">© {new Date().getFullYear()} Chaitanya</span></footer>
    </main>
  );
}
