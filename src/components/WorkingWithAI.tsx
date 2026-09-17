import type { CSSProperties } from 'react';
import { AI_SECTION } from '../content';
import type { Lang } from '../content';
import { t, tl } from '../hooks/useLang';
import './WorkingWithAI.css';

/** The published rules. Named in the brief; the link text is the URL itself. */
const SKILLS_REPO = 'https://github.com/acevinh/claude-skills';

function IconArrow() {
  return (
    <svg
      className="ai__icon"
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

export default function WorkingWithAI({ lang }: { lang: Lang }) {
  const [lead, ...rest] = tl(AI_SECTION.paragraphs, lang);
  const rules = tl(AI_SECTION.rules, lang);

  return (
    <section id="ai" className="section ai">
      <div className="container">
        <div className="section__head">
          <span className="section__index">05</span>
          <h2>{t(AI_SECTION.heading, lang)}</h2>
          <span className="section__rule" />
        </div>

        <div className="ai__grid">
          <div className="ai__statement reveal">
            <p className="ai__lead">{lead}</p>
            {rest.map((paragraph, i) => (
              <p
                key={i}
                className="ai__para muted"
                style={{ '--reveal-delay': `${(i + 1) * 60}ms` } as CSSProperties}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ol className="ai__rules">
            {rules.map((rule, i) => (
              <li
                key={i}
                className="ai__rule reveal"
                style={{ '--reveal-delay': `${i * 60}ms` } as CSSProperties}
              >
                <span className="ai__num mono" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="ai__rule-text">{rule}</span>
              </li>
            ))}
          </ol>

          <p className="ai__evidence reveal">
            <span className="ai__evidence-label dim">{t(AI_SECTION.evidenceLabel, lang)}</span>
            <a
              className="ai__evidence-link mono no-print-url"
              href={SKILLS_REPO}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SKILLS_REPO.replace(/^https?:\/\//, '')}
              <IconArrow />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
