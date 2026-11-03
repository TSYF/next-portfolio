import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ProjectVisual from "./ProjectVisual";

const toneColors = {
  cyan: "#0891b2",
  orange: "#ea580c",
  violet: "#7c3aed",
};

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function ProjectCaseStudy({ project, nextProject }) {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    const progress = progressRef.current;
    if (!root || !hero || !progress) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
      progress.style.transform = `scaleX(${pageProgress})`;
      if (motionQuery.matches) return;
      const heroProgress = Math.min(
        1,
        Math.max(0, window.scrollY / Math.max(window.innerHeight, 1)),
      );
      hero.style.setProperty("--case-p", heroProgress.toFixed(4));
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
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const elements = [...root.querySelectorAll("[data-case-reveal]")];
    root.classList.add("case-has-js");
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
  }, []);

  return (
    <div className={`case-page case-tone--${project.tone}`} ref={rootRef}>
      <Head>
        <title>{project.title} — Tomás Yañez</title>
        <meta name="description" content={project.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content={toneColors[project.tone]} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <div className="case-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
      <header className="site-header case-header">
        <Link className="brand" href="/" aria-label="Tomás Yañez, back to the home page">
          &lt;dev-tom&gt;
        </Link>
        <nav className="main-nav" aria-label="Case study navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <a className="nav-contact" href="mailto:tomas.yanez.f@gmail.com">
            Let’s talk <ArrowUpRight />
          </a>
        </nav>
      </header>

      <main>
        <section className="case-hero" ref={heroRef} aria-labelledby="case-title">
          <div className="case-watermark" aria-hidden="true">
            {project.number}
          </div>
          <div className="case-shell">
            <Link className="case-back" href="/#work">
              <ArrowLeft /> Selected work
            </Link>
            <div className="case-hero-grid">
              <div className="case-hero-copy">
                <p className="section-label">
                  Case study {project.number} · {project.year}
                </p>
                <h1 id="case-title">{project.title}</h1>
                <p className="case-summary">{project.summary}</p>
                <ul className="case-tags" aria-label="Core technology">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="case-actions">
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    View repository <ArrowUpRight />
                  </a>
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Open live project <ArrowUpRight />
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="case-hero-visual">
                <ProjectVisual project={project} eager />
              </div>
            </div>
            <div className="case-hero-meta">
              <div>
                <span>Year</span>
                <strong>{project.year}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{project.status}</strong>
              </div>
              <div>
                <span>Scope</span>
                <strong>
                  {project.featured ? "Engineering & open source" : "Design & development"}
                </strong>
              </div>
            </div>
          </div>
        </section>

        <section className="case-overview" aria-labelledby="case-overview-title">
          <div className="case-shell case-overview-grid" data-case-reveal>
            <div>
              <p className="section-label">01 · The idea</p>
              <h2 id="case-overview-title">
                The thinking
                <br />
                behind <em>{project.title}.</em>
              </h2>
            </div>
            <div className="case-overview-copy">
              <p>{project.overview}</p>
              <blockquote>
                <span>The challenge</span>
                <p>{project.challenge}</p>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="case-architecture" aria-labelledby="case-architecture-title">
          <div className="case-shell">
            <div className="case-section-heading" data-case-reveal>
              <p className="section-label section-label--light">02 · Under the hood</p>
              <h2 id="case-architecture-title">
                How it fits
                <br />
                <em>together.</em>
              </h2>
              <div className="case-stack" aria-label="Full technology stack">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="case-architecture-list">
              {project.architecture.map((item, index) => (
                <article key={item.title} data-case-reveal>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="case-highlights" aria-labelledby="case-highlights-title">
          <div className="case-shell">
            <div className="case-highlights-heading" data-case-reveal>
              <p className="section-label">03 · Highlights</p>
              <h2 id="case-highlights-title">
                What’s <em>inside.</em>
              </h2>
            </div>
            <div className="case-highlight-grid">
              {project.highlights.map((highlight, index) => (
                <div className="case-highlight" key={highlight} data-case-reveal>
                  <span>0{index + 1}</span>
                  <p>{highlight}</p>
                </div>
              ))}
            </div>

            {project.code ? (
              <figure className="case-code" data-case-reveal>
                <figcaption>
                  <span>{project.code.label}</span>
                  <small>{project.code.language}</small>
                </figcaption>
                <pre>
                  <code>{project.code.content}</code>
                </pre>
              </figure>
            ) : null}

            {project.note ? (
              <aside className="case-note" data-case-reveal>
                <span>What’s next</span>
                <h3>{project.note.title}</h3>
                <p>{project.note.description}</p>
              </aside>
            ) : null}
          </div>
        </section>

        <Link
          className={`case-next case-tone--${nextProject.tone}`}
          href={`/work/${nextProject.slug}`}
        >
          <span>Next case study · {nextProject.number}</span>
          <strong>{nextProject.title}</strong>
          <i>
            <ArrowUpRight />
          </i>
        </Link>
      </main>

      <footer className="case-footer">
        <Link className="brand brand--footer" href="/">
          &lt;dev-tom&gt;
        </Link>
        <p>Software Engineer · Santiago, Chile</p>
        <a href="mailto:tomas.yanez.f@gmail.com">tomas.yanez.f@gmail.com</a>
      </footer>
    </div>
  );
}
