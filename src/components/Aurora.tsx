import './Aurora.css';

/**
 * The aurora engine (DESIGN.md §5).
 *
 * Four blurred radial-gradient blobs on a fixed, non-interactive layer behind
 * everything. Motion is pure CSS — four long `transform`-only keyframes with
 * staggered negative delays so the blobs never line up and the composition
 * never repeats within a visit. No canvas, no rAF, no WebGL: once the
 * animations are handed to the compositor this costs ~0% CPU.
 *
 * Colour comes from `--aurora-1..4` and strength from `--aurora-alpha`, so the
 * light theme dims the whole layer with no extra rules here.
 *
 * The veil on top is a contrast device, not decoration. Text contrast has to
 * hold against the pixels actually behind it, and the blobs lift the local
 * backdrop far away from the page colour — measured at up to rgb(185,195,218)
 * in light and rgb(6,76,96) in dark, which put 51 text runs under WCAG AA even
 * though every token passed against the nominal background. Washing the page
 * colour back over the layer compresses that range while keeping the hue, and
 * it helps both themes because in each one the text and the drift run in
 * opposite directions.
 */
export default function Aurora(): JSX.Element {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__blob aurora__blob--a" />
      <div className="aurora__blob aurora__blob--b" />
      <div className="aurora__blob aurora__blob--c" />
      <div className="aurora__blob aurora__blob--d" />
      <div className="aurora__veil" />
    </div>
  );
}
