import { CONTACT, IDENTITY } from '../content';
import type { Lang } from '../content';
import { t } from '../hooks/useLang';
import { useCopy } from '../hooks/useCopy';
import { GitHubMark } from './PlatformLogos';
import './Contact.css';

/** Hand-drawn to match every other icon on the page — 20×20, 1.6 stroke. */
function IconMail({ className = 'contact__lead-icon' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.4" y="4.6" width="15.2" height="10.8" rx="2.2" />
      <path d="m3.4 6.4 5.5 4.1a1.8 1.8 0 0 0 2.2 0l5.5-4.1" />
    </svg>
  );
}

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
  // Derived, not a second copy of the address: below about 340px even the
  // smallest size in the clamp cannot hold this on one line, and a break has to
  // land somewhere. `<wbr>` offers the browser the only sensible place — before
  // the @ — so the fallback reads as two halves of an address rather than as
  // `work.vinh.vn@gmail.c / om`. It contributes no character, so selecting and
  // copying the address still yields exactly IDENTITY.email.
  const [emailUser, emailDomain] = IDENTITY.email.split('@');

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

            {/* No target="_blank" on either mailto: one handled by a desktop
                mail client would otherwise leave an empty tab behind. */}
            <div className="contact__address-row">
              <a className="contact__address" href={mailto}>
                <IconMail />
                <span className="contact__address-text">
                  {emailUser}
                  <wbr />@{emailDomain}
                </span>
              </a>
            </div>

            {/* The address stays a link — it is the thing to read, and it has to
                stay selectable. But reading an address is not the action, so the
                action gets its own control instead of hiding inside the text.
                Own row, because three items on one line wrapped awkwardly at
                around 1100px. */}
            <div className="contact__actions no-print">
              <a className="btn btn--accent contact__send" href={mailto}>
                <IconMail className="contact__icon" />
                <span>{t(CONTACT.send, lang)}</span>
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
              <GitHubMark height={15} className="contact__lead-icon" />
              <span className="contact__github-text">{IDENTITY.githubHandle}</span>
              <IconArrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
