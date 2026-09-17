import type { CSSProperties } from 'react';

import { EXPERIENCE, TIMELINE, type Lang, type ShippedProduct } from '../content';
import { t, tl } from '../hooks/useLang';

import './Experience.css';

/**
 * The live product behind the current role.
 *
 * A CV that says "I ship product-grade web apps" with nothing shippable on the
 * page is asking to be taken on faith. This is the one place the claim becomes
 * checkable in a click — so it is a real link, carrying the store's own public
 * icon and rating. The label says *developer on*, which is what he is; the app
 * shipped in 2020, years before he joined, so it never claims authorship.
 *
 * The icon is the store's published listing image and is the only raster on the
 * page. It is decorative here — the product name sits next to it in text — so
 * it is `alt=""`, and it is dropped in print, where the strip collapses to one
 * running line (Experience.css @media print).
 */
function ShippedInto({ product, lang }: { product: ShippedProduct; lang: Lang }): JSX.Element {
  return (
    <a
      className="shipped glass glass--interactive"
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="shipped__mark" aria-hidden="true">
        <img src="/omega-feed-icon.png" alt="" width="512" height="512" loading="lazy" decoding="async" />
      </span>

      <span className="shipped__label mono">{t(EXPERIENCE.productLabel, lang)}</span>

      <span className="shipped__name">{product.name}</span>

      <span className="shipped__meta mono">
        <svg
          className="shipped__star"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="none"
          aria-hidden="true"
        >
          <path d="M10 1.8l2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5 2.7 1-5.6-4.1-3.9 5.6-.8z" />
        </svg>
        {product.rating}
        <span className="shipped__sep" aria-hidden="true">
          ·
        </span>
        {product.reviews} {t(EXPERIENCE.productReviews, lang)}
      </span>

      <span className="shipped__blurb">{t(product.blurb, lang)}</span>

      <span className="visually-hidden">{t(EXPERIENCE.productView, lang)}</span>
    </a>
  );
}

/** Section 02 — the timeline, newest first. The current node carries the page's only accent dot. */
export default function Experience({ lang }: { lang: Lang }): JSX.Element {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section__head reveal">
          <span className="section__index">02</span>
          <h2>{t(EXPERIENCE.heading, lang)}</h2>
          <span className="section__rule" />
        </div>

        <ol className="timeline">
          {TIMELINE.map((node, i) => (
            <li
              key={node.id}
              className={`timeline__node reveal${node.current ? ' is-current' : ''}`}
              style={{ '--reveal-delay': `${i * 60}ms` } as CSSProperties}
            >
              <span className="timeline__dot" aria-hidden="true" />

              <p className="timeline__period mono">{node.period}</p>

              <div className="timeline__body">
                <div className="timeline__title">
                  <h3 className="timeline__role">{t(node.role, lang)}</h3>
                  <span className="timeline__org mono">{node.org}</span>
                </div>

                <ul className="timeline__bullets">
                  {tl(node.bullets, lang).map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>

                {node.product ? <ShippedInto product={node.product} lang={lang} /> : null}
              </div>
            </li>
          ))}
        </ol>

        <div className="education reveal">
          <span className="education__label mono">{t(EXPERIENCE.educationHeading, lang)}</span>
          <p className="education__line">
            <svg
              className="education__icon"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 3.4 18.2 7 10 10.6 1.8 7Z" />
              <path d="M5.4 8.6v4.1c0 1.1 2.1 2.1 4.6 2.1s4.6-1 4.6-2.1V8.6" />
            </svg>
            <span className="education__school mono">{EXPERIENCE.education.school}</span>
            <span className="education__field">{t(EXPERIENCE.education.field, lang)}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
