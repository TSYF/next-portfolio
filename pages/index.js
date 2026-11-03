import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ProjectVisual from "../components/ProjectVisual";
import { archiveProjects, featuredProjects } from "../data/projects";
import { clamp, getHeroFrame, getServiceFrame } from "../lib/motion";

const services = [
  {
    number: "01",
    title: "Web Dev",
    description:
      "Beautiful, tailored web applications with an equal measure of engineering and taste. Built to represent your brand, your values, and the people using them.",
    tags: ["Interface design", "Front-end engineering", "Brand-led experiences"],
  },
  {
    number: "02",
    title: "Software and Systems Architecture",
    description:
      "Software structures designed around the business, from modular applications and data models to distributed systems that can grow without losing clarity.",
    tags: ["Application architecture", "Cloud infrastructure", "Technical leadership"],
  },
  {
    number: "03",
    title: "DevOps & Automation",
    description:
      "Delivery pipelines, containers, observability, and automation that make software easier to ship, operate, and improve.",
    tags: ["CI/CD & DevSecOps", "Containers & cloud", "Logs, metrics & traces"],
  },
];

const experience = [
  { period: "2026 — Now", company: "Falabella", role: "Full Stack Engineer" },
  { period: "2025 — 2026", company: "Focal", role: "Engineering Consultant" },
  {
    period: "2025",
    company: "Ubiquity",
    role: "Systems Architecture · Security · IT Leadership",
  },
  { period: "2024 — 2025", company: "GTrack", role: "Senior Full Stack Engineer" },
  { period: "2023 — 2024", company: "Stech", role: "Full Stack Engineer" },
  { period: "2022 — 2023", company: "Facturacion.cl", role: "Full Stack Engineer" },
];

const skills = [
  "TypeScript",
  "Rust",
  "Python",
  "Go",
  "Java",
  "React",
  "Vue",
  "NestJS",
  "Kubernetes",
  "AWS",
  "GCP",
  "Terraform",
  "Docker",
  "PostgreSQL",
  "GraphQL",
];

function ArrowUpRight({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ArrowDown({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v15m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SocialIcon({ name }) {
  if (name === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.17-3.37-1.17-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.82c.85 0 1.71.12 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (name === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M5.35 7.9H2.2V21h3.15V7.9ZM3.77 3A1.84 1.84 0 1 0 3.8 6.68 1.84 1.84 0 0 0 3.77 3ZM21.8 13.47c0-3.95-2.11-5.79-4.93-5.79-2.27 0-3.29 1.25-3.86 2.12V7.9H9.86V21h3.15v-7.29c0-1.92.36-3.78 2.75-3.78 2.35 0 2.38 2.2 2.38 3.9V21h3.66v-7.53Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42a2.5 2.5 0 0 0-1.76 1.77A26.1 26.1 0 0 0 2 12a26.1 26.1 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.6 22 13.8 22 12s0-3.6-.42-4.81ZM10 15.2V8.8l5.2 3.2-5.2 3.2Z" />
    </svg>
  );
}

function useCinematicMotion(rootRef, heroRef, servicesRef, aboutRef, progressRef) {
  useEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    const servicesNode = servicesRef.current;
    const about = aboutRef.current;
    const progress = progressRef.current;
    if (!root || !hero || !servicesNode || !about || !progress) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
      progress.style.transform = `scaleX(${clamp(pageProgress)})`;

      if (motionQuery.matches) return;

      const heroRect = hero.getBoundingClientRect();
      const heroRange = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const heroFrame = getHeroFrame(-heroRect.top / heroRange, window.innerWidth < 640);

      hero.style.setProperty("--hero-p", heroFrame.progress.toFixed(4));
      hero.classList.toggle("hero-is-expanded", heroFrame.expanded);
      hero.style.setProperty("--hero-clip", heroFrame.clip);
      hero.style.setProperty("--hero-image-transform", heroFrame.imageTransform);

      const serviceRect = servicesNode.getBoundingClientRect();
      const serviceRange = Math.max(servicesNode.offsetHeight - window.innerHeight, 1);
      const serviceFrame = getServiceFrame(-serviceRect.top / serviceRange, services.length);
      servicesNode.style.setProperty("--service-p", serviceFrame.progress.toFixed(4));
      servicesNode.dataset.active = String(serviceFrame.activeIndex);
      serviceFrame.opacities.forEach((opacity, index) => {
        servicesNode.style.setProperty(`--service-o-${index + 1}`, opacity.toFixed(4));
      });
      servicesNode.style.setProperty("--morph-radius", serviceFrame.radius);

      const aboutRect = about.getBoundingClientRect();
      const aboutProgress = clamp(
        (window.innerHeight - aboutRect.top) / (window.innerHeight + aboutRect.height),
      );
      about.style.setProperty("--about-p", aboutProgress.toFixed(4));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    motionQuery.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      motionQuery.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [aboutRef, heroRef, progressRef, rootRef, servicesRef]);
}

function useReveals(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const elements = [...root.querySelectorAll("[data-reveal]")];
    root.classList.add("has-js");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [rootRef]);
}

export default function Portfolio() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const progressRef = useRef(null);

  useCinematicMotion(rootRef, heroRef, servicesRef, aboutRef, progressRef);
  useReveals(rootRef);

  return (
    <>
      <Head>
        <title>Tomás Yañez — Software Engineer</title>
        <meta
          name="description"
          content="The portfolio of Tomás Yañez, a Software Engineer based in Santiago, Chile. Thoughtful digital products, resilient systems, and a decade of curiosity."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0891b2" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preload" as="image" href="/images/tomas-hero.jpg" fetchPriority="high" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,300..800&family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="portfolio" ref={rootRef}>
        <div className="page-progress" aria-hidden="true">
          <span ref={progressRef} />
        </div>

        <header className="site-header">
          <a className="brand" href="#home" aria-label="Tomás Yañez, back to the beginning">
            &lt;dev-tom&gt;
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#about">About</a>
            <a className="nav-contact" href="mailto:tomas.yanez.f@gmail.com">
              Let’s talk <ArrowUpRight />
            </a>
          </nav>
        </header>

        <main>
          <section className="hero-scene" id="home" ref={heroRef} aria-labelledby="hero-title">
            <div className="hero-stage">
              <div className="hero-atmosphere" aria-hidden="true">
                <span className="hero-orbit hero-orbit--one" />
                <span className="hero-orbit hero-orbit--two" />
                <span className="hero-cross">+</span>
              </div>

              <div className="hero-portrait" aria-hidden="true">
                <img
                  src="/images/tomas-hero.jpg"
                  alt=""
                  width="1500"
                  height="2000"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="hero-portrait-shade" />
              </div>

              <div className="hero-intro">
                <p className="hero-kicker">
                  <span /> Software Engineer <span className="kicker-divider">/</span> Santiago,
                  Chile
                </p>
                <h1 id="hero-title">
                  <span className="hero-greeting">Hi, I am</span>
                  <span className="hero-name-line">Tomás</span>
                  <span className="hero-name-line hero-name-line--accent">
                    Yañez<span className="hero-period">.</span>
                  </span>
                </h1>
                <p className="hero-summary">
                  Software systems, designed with precision
                  <br /> and built with <em>soul.</em>
                </p>
                <div className="hero-actions">
                  <a className="button button--dark" href="#work">
                    Explore my work <ArrowDown />
                  </a>
                  <a className="text-link" href="#about">
                    A little about me <span>↗</span>
                  </a>
                </div>
              </div>

              <div className="hero-stamp" aria-hidden="true">
                <span>10</span>
                <small>
                  years of
                  <br />
                  curiosity
                </small>
              </div>

              <div className="hero-finale">
                <p>01 · The human layer</p>
                <h2>
                  Curiosity, <em>compiled.</em>
                </h2>
                <span>A decade of learning. Five-plus years building professionally.</span>
              </div>

              <div className="scroll-cue" aria-hidden="true">
                <span>Scroll to unfold</span>
                <i />
              </div>
            </div>
          </section>

          <section
            className="services-scene"
            id="services"
            ref={servicesRef}
            data-active="0"
            aria-labelledby="services-title"
          >
            <div className="services-stage">
              <div className="services-grid">
                <div className="services-heading">
                  <p className="section-label section-label--light">02 · What I do</p>
                  <h2 id="services-title">
                    Three crafts.
                    <br /> One <em>obsession.</em>
                  </h2>
                </div>

                <div className="service-copies">
                  {services.map((service, index) => (
                    <article
                      className={`service-copy service-copy--${index + 1}`}
                      key={service.title}
                    >
                      <span className="service-number">{service.number}</span>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <ul aria-label={`${service.title} capabilities`}>
                        {service.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>

                <div className="morph-wrap" aria-hidden="true">
                  <div className="morph-window">
                    <div className="morph-color morph-color--orange" />
                    <div className="morph-color morph-color--violet" />
                    <div className="morph-color morph-color--cyan" />
                    <div className="mockup mockup--web">
                      <div className="mockup-bar">
                        <i /> <i /> <i /> <span>tomás.dev</span>
                      </div>
                      <div className="web-canvas">
                        <div className="web-type">Aa</div>
                        <div className="web-blocks">
                          <i /> <i /> <i />
                        </div>
                        <span>DESIGN / BUILD / CARE</span>
                      </div>
                    </div>
                    <div className="mockup mockup--desktop">
                      <div className="desktop-sidebar">
                        <b>t.</b>
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                      <div className="desktop-canvas">
                        <span>WORKSPACE / 02</span>
                        <div className="desktop-row desktop-row--wide" />
                        <div className="desktop-grid">
                          <i />
                          <i />
                          <i />
                          <i />
                        </div>
                        <div className="desktop-terminal">ready_</div>
                      </div>
                    </div>
                    <div className="mockup mockup--automation">
                      <div className="automation-heading">
                        <span>DELIVERY PIPELINE / 03</span>
                        <i />
                      </div>
                      <div className="automation-pipeline">
                        <div>
                          <small>01</small>
                          <strong>Commit</strong>
                          <span>source</span>
                        </div>
                        <b>→</b>
                        <div>
                          <small>02</small>
                          <strong>Verify</strong>
                          <span>test · scan</span>
                        </div>
                        <b>→</b>
                        <div>
                          <small>03</small>
                          <strong>Ship</strong>
                          <span>deploy</span>
                        </div>
                      </div>
                      <div className="automation-telemetry">
                        <span>
                          <i /> Build passed
                        </span>
                        <span>
                          <i /> Observability live
                        </span>
                        <div>
                          <b />
                          <b />
                          <b />
                          <b />
                          <b />
                          <b />
                          <b />
                          <b />
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="morph-note">Form follows curiosity.</span>
                </div>

                <div className="services-footer">
                  <a className="button button--cream" href="#work">
                    My Work <ArrowDown />
                  </a>
                  <div className="scene-pagination" aria-hidden="true">
                    <span>01</span>
                    <i>
                      <b />
                    </i>
                    <span>03</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="work-section" id="work" aria-labelledby="work-title">
            <div className="section-shell">
              <div className="work-heading" data-reveal>
                <p className="section-label">03 · Selected work</p>
                <h2 id="work-title">
                  A selection of my
                  <br /> range of <em>work.</em>
                </h2>
                <p>
                  Developer tools, low-level systems, and the early products that shaped how I
                  think.
                </p>
              </div>

              <div className="project-list">
                {featuredProjects.map((project, index) => (
                  <Link
                    className={`project-card project-card--${project.tone} project-card--${index + 1}`}
                    href={`/work/${project.slug}`}
                    key={project.title}
                    data-reveal
                    aria-label={`${project.title}, read case study`}
                  >
                    <div className="project-meta">
                      <span>{project.number}</span>
                      <div>
                        <h3>{project.title}</h3>
                        <p>{project.summary}</p>
                      </div>
                      <span className="project-arrow">
                        <ArrowUpRight />
                      </span>
                    </div>
                    <ProjectVisual project={project} />
                    <div className="project-tags" aria-label="Technology">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="archive-block" data-reveal>
                <div className="archive-heading">
                  <p className="section-label">From the archive</p>
                  <p>Early products, preserved as case studies rather than the main event.</p>
                </div>
                <div className="archive-list">
                  {archiveProjects.map((project) => (
                    <Link
                      className="archive-link"
                      href={`/work/${project.slug}`}
                      key={project.slug}
                    >
                      <div className="archive-thumb">
                        <img src={project.image} alt="" width="900" height="900" loading="lazy" />
                      </div>
                      <span>{project.number}</span>
                      <div>
                        <h3>{project.title}</h3>
                        <p>{project.summary}</p>
                      </div>
                      <i>
                        <ArrowUpRight />
                      </i>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            className="experience-section"
            id="experience"
            aria-labelledby="experience-title"
          >
            <div className="section-shell">
              <div className="experience-heading" data-reveal>
                <p className="section-label section-label--light">04 · Experience</p>
                <h2 id="experience-title">
                  Built in the
                  <br /> <em>real world.</em>
                </h2>
              </div>

              <div className="stat-composition" data-reveal>
                <div className="stat stat--large">
                  <strong>
                    5<span>+</span>
                  </strong>
                  <p>
                    years professional
                    <br />
                    experience
                  </p>
                </div>
                <div className="stat stat--small">
                  <strong>10</strong>
                  <p>
                    years programming
                    <br />
                    independently
                  </p>
                </div>
                <div className="stat stat--small stat--accent">
                  <strong>
                    17K<span>+</span>
                  </strong>
                  <p>
                    users on one product
                    <br />I helped improve
                  </p>
                </div>
              </div>

              <div className="timeline" data-reveal>
                {experience.map((item, index) => (
                  <article className="timeline-row" key={item.company}>
                    <span className="timeline-index">0{index + 1}</span>
                    <time>{item.period}</time>
                    <h3>{item.company}</h3>
                    <p>{item.role}</p>
                  </article>
                ))}
              </div>
            </div>

            <div
              className="skill-marquee"
              role="group"
              aria-label={`Technical skills: ${skills.join(", ")}`}
            >
              <div aria-hidden="true">
                {[...skills, ...skills].map((skill, index) => (
                  <span key={`${skill}-${index}`}>
                    {skill}
                    <i />
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section
            className="about-section"
            id="about"
            ref={aboutRef}
            aria-labelledby="about-title"
          >
            <div className="about-orbit" aria-hidden="true" />
            <div className="section-shell about-grid">
              <div className="about-portrait-column" data-reveal>
                <div className="about-portrait">
                  <img
                    src="/images/tomas-about.webp"
                    alt="Tomas explaining something while looking at the camera man"
                    width="853"
                    height="1280"
                    loading="lazy"
                  />
                </div>
                <div className="about-note">
                  <span>Based in</span>
                  <strong>Santiago, Chile</strong>
                  <i>33.4489° S</i>
                </div>
              </div>

              <div className="about-copy" data-reveal>
                <p className="section-label section-label--light">05 · Who I am</p>
                <h2 id="about-title">
                  Software Dev
                  <br />
                  based in <em>Santiago.</em>
                </h2>
                <p>
                  I am a very curious person and full of enthusiasm. I always try to improve myself
                  and give the best of me in everything I do, I love working on a team and tend to
                  boost the teams I&apos;m part of with motivation and leadership.
                </p>
                <p>
                  Apart from Computer Science, I like chess, basketball and exercising. Although the
                  thing that motivates me the most and always pushes me past my limits is
                  fatherhood. I have a beautiful daughter for whom I strive to be the best father in
                  the world.
                </p>
                <ul className="interest-list" aria-label="Interests">
                  <li>Chess</li>
                  <li>Basketball</li>
                  <li>Exercise</li>
                  <li>Fatherhood</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="contact-section" id="contact" aria-labelledby="contact-title">
            <div className="contact-shape" aria-hidden="true" />
            <div className="section-shell contact-inner" data-reveal>
              <p className="section-label">06 · Your move</p>
              <h2 id="contact-title">
                Have a hard problem?
                <br /> <em>Good.</em>
              </h2>
              <p className="contact-lead">Let’s make something thoughtful, useful, and alive.</p>
              <a className="email-link" href="mailto:tomas.yanez.f@gmail.com">
                <span>tomas.yanez.f@gmail.com</span>
                <i>
                  <ArrowUpRight />
                </i>
              </a>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <a className="brand brand--footer" href="#home">
            &lt;dev-tom&gt;
          </a>
          <p>Software Engineer · Santiago, Chile</p>
          <div className="social-links">
            <a
              href="https://github.com/TSYF"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub, opens in a new tab"
            >
              <SocialIcon name="GitHub" />
            </a>
            <a
              href="https://linkedin.com/in/tomas-yanez"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn, opens in a new tab"
            >
              <SocialIcon name="LinkedIn" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCaB8Ho8PfpYr-R8Sfa_hL8A"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube, opens in a new tab"
            >
              <SocialIcon name="YouTube" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
