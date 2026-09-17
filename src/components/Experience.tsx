import type { CSSProperties } from 'react';

import { EXPERIENCE, TIMELINE, type Lang, type ShippedProduct } from '../content';
import { t, tl } from '../hooks/useLang';
import { ShopifyMark, ShoplineMark } from './PlatformLogos';

import './Experience.css';

const STORE_NAME: Record<ShippedProduct['platform'], string> = {
  shopify: 'Shopify',
  shopline: 'SHOPLINE',
};

/**
 * One live product behind the current role.
 *
 * A CV that says "I ship product-grade web apps" with nothing shippable on the
 * page is asking to be taken on faith. Each of these is a real link to a public
 * store listing, carrying that store's own icon and its platform mark — which
 * together say "this person works on shipped commerce products" faster than any
 * sentence could. The label says *developer on*, which is what he is; the
 * Shopify app shipped in 2020, years before he joined, so nothing here claims
 * authorship.
 *
 * `rating` is optional and the Shopline app deliberately has none: its listing
 * reads "5 (1)". Printing five stars off a single review is the kind of true
 * statement that costs you the interview.
 *
 * The icons are the stores' published listing images — decorative, since the
 * product name sits beside them in text — and both they and the platform marks
 * are dropped in print, where each row collapses to one running line.
 */
function ShippedProductRow({
  product,
  lang,
}: {
  product: ShippedProduct;
  lang: Lang;
}): JSX.Element {
  const store = STORE_NAME[product.platform];
  const Mark = product.platform === 'shopify' ? ShopifyMark : ShoplineMark;

  return (
    <a
      className="shipped glass glass--interactive"
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="shipped__mark" aria-hidden="true">
        <img src={product.icon} alt="" width="512" height="512" loading="lazy" decoding="async" />
      </span>

      <span className="shipped__name">{product.name}</span>

      <span className="shipped__platform">
        {/* Optically matched, not numerically: Shopify's lockup is a bag plus a
            lowercase wordmark, SHOPLINE's is all-caps, so equal heights would
            make the all-caps mark look larger. */}
        <Mark className="shipped__logo" height={product.platform === 'shopify' ? 18 : 13} />
      </span>

      <span className="shipped__meta mono">
        {product.rating ? (
          <>
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
            <span className="shipped__sep" aria-hidden="true">
              ·
            </span>
          </>
        ) : null}
        {t(product.meta, lang)}
      </span>

      <span className="shipped__blurb">{t(product.blurb, lang)}</span>

      <span className="visually-hidden">
        {t(EXPERIENCE.productView, lang).replace('{store}', store)}
      </span>
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

                {node.products?.length ? (
                  <div className="shipped-group">
                    <p className="shipped-group__label mono">
                      {t(EXPERIENCE.productLabel, lang)}
                    </p>
                    {node.products.map((product) => (
                      <ShippedProductRow key={product.id} product={product} lang={lang} />
                    ))}
                  </div>
                ) : null}
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
