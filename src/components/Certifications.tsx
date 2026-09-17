import type { CSSProperties } from 'react';
import { CERTIFICATIONS } from '../content';
import type { Lang } from '../content';
import { t } from '../hooks/useLang';
import './Certifications.css';

function IconArrow() {
  return (
    <svg
      className="cert__icon"
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

export default function Certifications({ lang }: { lang: Lang }) {
  return (
    <section className="section certs">
      <div className="container">
        <div className="section__head">
          <span className="section__index">06</span>
          <h2>{t(CERTIFICATIONS.heading, lang)}</h2>
          <span className="section__rule" />
        </div>

        <ul className="certs__list">
          {CERTIFICATIONS.items.map((cert, i) => (
            <li
              key={cert.id}
              className="cert glass reveal"
              style={{ '--reveal-delay': `${i * 60}ms` } as CSSProperties}
            >
              <h3 className="cert__name">{t(cert.name, lang)}</h3>
              <p className="cert__issuer muted">{cert.issuer}</p>
              <p className="cert__date mono dim">{t(cert.date, lang)}</p>
              {cert.verifyHref ? (
                <a
                  className="cert__verify mono"
                  href={cert.verifyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(CERTIFICATIONS.verify, lang)}
                  <IconArrow />
                </a>
              ) : null}
            </li>
          ))}
        </ul>

        <p className="certs__note dim reveal">{t(CERTIFICATIONS.issuedTo, lang)}</p>
      </div>
    </section>
  );
}
