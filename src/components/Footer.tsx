import { FOOTER, IDENTITY } from '../content';
import type { Lang } from '../content';
import { t } from '../hooks/useLang';
import './Footer.css';

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__built dim">{t(FOOTER.built, lang)}</p>
        <a
          className="footer__source mono dim"
          href={IDENTITY.sourceRepo}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t(FOOTER.source, lang)}
        </a>
      </div>
    </footer>
  );
}
