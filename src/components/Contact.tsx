import { CONTACT, IDENTITY } from '../content';
import type { Lang } from '../content';
import { t } from '../hooks/useLang';
import { useCopy } from '../hooks/useCopy';
import './Contact.css';

function IconCopy() {
  return (
    <svg
      className="contact__icon"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7.5 3.5h7a2 2 0 0 1 2 2v7" />
      <rect x="3.5" y="7.5" width="9" height="9" rx="2" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      className="contact__icon"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 10.5 8 14l7.5-8" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg
      className="contact__icon"
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

export default function Contact({ lang }: { lang: Lang }) {
  const { copied, copy } = useCopy();
  const mailto = `mailto:${IDENTITY.email}?subject=${encodeURIComponent(t(CONTACT.emailSubject, lang))}`;

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section__head">
          <span className="section__index">07</span>
          <h2>{t(CONTACT.heading, lang)}</h2>
          <span className="section__rule" />
        </div>

        <div className="contact__grid">
          <div className="contact__panel glass glass--interactive reveal">
            <p className="contact__lede muted">{t(CONTACT.lede, lang)}</p>

            <div className="contact__address-row">
              {/* No target="_blank": a mailto handled by a desktop mail client
                  would otherwise leave an empty tab behind. */}
              <a className="contact__address" href={mailto}>
                {IDENTITY.email}
              </a>

              <button
                type="button"
                className="btn btn--glass contact__copy"
                data-copied={copied}
                onClick={() => copy(IDENTITY.email)}
              >
                {copied ? <IconCheck /> : <IconCopy />}
                <span>{t(copied ? CONTACT.copied : CONTACT.copy, lang)}</span>
              </button>
            </div>

            {/* DESIGN.md §8 — the "toast". The button only morphs visually, so
                without this a screen-reader user gets no confirmation. The
                region is rendered empty from the first paint and only its text
                changes: a live region injected together with its content is
                frequently not announced. */}
            <p className="visually-hidden" role="status" aria-live="polite">
              {copied ? t(CONTACT.copied, lang) : ''}
            </p>

            <a
              className="contact__github mono no-print-url"
              href={IDENTITY.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {IDENTITY.githubHandle}
              <IconArrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
