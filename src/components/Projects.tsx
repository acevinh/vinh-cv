import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { PROJECTS } from '../content';
import type { Lang, Project } from '../content';
import { t } from '../hooks/useLang';
import './Projects.css';

/** DESIGN.md §7.5 — "subtle 3D tilt on pointer, max 6°". */
const MAX_TILT = 6;

/**
 * Pointer tilt for one card. Writes `--tilt-x` / `--tilt-y` custom properties
 * from a rAF-coalesced `pointermove`, never inline geometry, so the transform
 * stays on the compositor. Disabled on coarse pointers and under reduced
 * motion — a phone has no hover, and a tilt is exactly the kind of motion the
 * reduced-motion preference is asking us to drop.
 */
function useTilt() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const matches = (query: string) =>
      typeof window.matchMedia === 'function' && window.matchMedia(query).matches;
    if (matches('(pointer: coarse)') || matches('(prefers-reduced-motion: reduce)')) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { x, y } = pending;
      pending = null;
      el.style.setProperty('--tilt-x', `${x}deg`);
      el.style.setProperty('--tilt-y', `${y}deg`);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      pending = { x: -py * 2 * MAX_TILT, y: px * 2 * MAX_TILT };
      if (frame === 0) frame = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      pending = null;
      if (frame !== 0) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}

function IconArrow() {
  return (
    <svg
      className="project__icon"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7.5 12.5 12.5 7.5" />
      <path d="M8.5 7.5h4v4" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg
      className="project__icon project__chevron"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 8 10 12.5 14 8" />
    </svg>
  );
}

/** The href is the only honest label for an outbound link — show it, minus the scheme. */
const bareUrl = (href: string) => href.replace(/^https?:\/\//, '');

function ProjectCard({ project, lang, index }: { project: Project; lang: Lang; index: number }) {
  const [open, setOpen] = useState(false);
  const card = useTilt();
  const bodyId = `project-${project.id}-body`;

  const rows = [
    { key: 'problem', label: PROJECTS.labelProblem, value: project.problem },
    { key: 'approach', label: PROJECTS.labelApproach, value: project.approach },
    { key: 'result', label: PROJECTS.labelResult, value: project.result },
  ];

  return (
    <li
      className="projects__slot reveal"
      style={{ '--reveal-delay': `${index * 60}ms` } as CSSProperties}
    >
      <article ref={card} className="project glass glass--interactive" data-open={open}>
        <div className="project__head">
          <h3 className="project__name">{project.name}</h3>
          <a
            className="project__link mono no-print-url"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {bareUrl(project.href)}
            <IconArrow />
          </a>
        </div>

        <ul className="project__tags">
          {project.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>

        <div className="project__teaser" aria-hidden={open}>
          <p className="project__teaser-text muted">{t(project.teaser, lang)}</p>
        </div>

        <button
          type="button"
          className="project__toggle"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{t(open ? PROJECTS.collapse : PROJECTS.expand, lang)}</span>
          <IconChevron />
        </button>

        {/* `aria-expanded` on the trigger does not hide what it controls: while
            collapsed the body is clipped to a sliver but still in the
            accessibility tree. `aria-hidden` takes it out of that tree without
            affecting print, where the case study is force-expanded. */}
        <div className="project__expand" data-print-expand>
          <dl className="project__body" id={bodyId} aria-hidden={!open}>
            {rows.map((row) => (
              <div key={row.key} className="project__row">
                <dt className="project__label mono dim">{t(row.label, lang)}</dt>
                <dd className="project__text muted">{t(row.value, lang)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </li>
  );
}

export default function Projects({ lang }: { lang: Lang }) {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section__head">
          <span className="section__index">04</span>
          <h2>{t(PROJECTS.heading, lang)}</h2>
          <span className="section__rule" />
        </div>

        <ul className="projects__list">
          {PROJECTS.items.map((project, i) => (
            <ProjectCard key={project.id} project={project} lang={lang} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
