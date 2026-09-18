# Work evidence — drafting notes

Raw material for CV bullets and interview answers. **Not page copy** — nothing here is rendered.
`CONTENT.md` remains the single source of truth for every string on the site.

**This repository is public.** Everything below is written at the level of a public product
listing: what the feature does for a merchant, and what the engineering judgement was. No employer
system names, no file or table names, no internal links, no customer data, no fine-grained
operational numbers.

**Status discipline:** each entry is tagged. Only entries marked `SHIPPED` may be phrased as
shipped work on the CV. `DESIGNED` means the design and implementation plan are complete and
reviewed, and no code has been merged yet — phrase those as *designed* or *planned*.

Bullet format, per the standard already used on the page: 15–30 words, 1–2 lines, 3–5 bullets per
role. Google's XYZ shape — *accomplished X, measured by Y, by doing Z*.

---

## 1. Delivery detection for file-based product feeds — `DESIGNED` (2026-09)

**The merchant's problem.** A store publishes a product file and pastes its URL into an ad
channel. From that point the app knows nothing: it reports a successful sync every day while the
channel may never have collected the file once. Merchants lost weeks of ad spend to a step nobody
told them was still outstanding, and support had no way to separate "the app is broken" from "the
channel was never configured".

**What I found before writing any code.**

- The published file is streamed through the application itself rather than redirected to object
  storage, which means every collection attempt had *already* been passing through our own request
  handler. The feature needed no new infrastructure — only a record of traffic that was already
  arriving. That observation removed most of the proposed scope.
- Only two of the six supported channels publish the identity their crawler uses. For the other
  four it is undocumented. Rather than guess and ship a detector that quietly mislabels feeds, I
  split the work: first release records traffic and keeps the raw identifier, and detection for the
  undocumented channels is calibrated from a week of real traffic before any merchant-facing email
  depends on it. Telling a merchant "nobody has collected your feed" when in fact somebody has, and
  we simply failed to recognise them, is worse than saying nothing.
- The obvious place to record each collection was the existing per-feed history. I traced five
  separate mechanisms that would have broken if I had — most severely, a retention rule that keeps
  the most recent N entries per feed without distinguishing their kind, so a feed collected hourly
  would have erased its own real history within a day. The records are merged at read time instead.

**Candidate bullet.** *Designed delivery detection for file-based product feeds after finding the
signal already passed through our own request path — no new infrastructure, and support gained a
first-party answer to "did the channel ever collect this?"*

**Interview angle.** Good demonstration of reading the platform's constraints before designing:
knowing which vendors document their crawlers, and refusing the convenient storage location once
its retention rule was understood.

---

## 2. Collapsing a two-screen mapping setup into one — `DESIGNED` (2026-09)

**The merchant's problem.** The final value of a product attribute was decided by two things — a
default value and any override rules — and those two things lived on different screens. The
override screen opened empty and asked merchants to write a condition *before* choosing which
attribute it applied to, so almost nobody found the feature. The value preview ran on a fixed set
of sample tokens rather than a real product, so a mapping mistake only surfaced when the channel
rejected hundreds of items.

**What I found before writing any code.**

- The specification asked for drag-to-reorder rule priority. Reading the server, the priority value
  was never read at all and the query had no ordering clause — the real precedence was whatever
  order the database happened to return. The new interface would have let merchants rearrange rules
  with no effect on their feed. This is only visible by reading both ends; no amount of interface
  testing would have surfaced it.
- Making ordering real needed no schema change. A small in-memory sort on the read paths gives the
  same result as a new column plus a data backfill, without a maintenance window.
- The same rule logic runs in two places — on the server when the feed is built, and in the browser
  to preview values the merchant has not saved yet. I wrote out a behaviour-by-behaviour comparison
  of the two so they cannot drift, down to details like one operator being case-sensitive while its
  neighbour is not, and unknown operators having to fail closed rather than guess. Without that,
  the preview tells merchants one thing and the delivered feed does another.
- Tightening a plan restriction to the moment of saving would start rejecting saves for existing
  customers on lower tiers who can currently save these rules. I raised that as a rollout question
  with a query to size the affected group, before implementation rather than after.

**Candidate bullet.** *Merged a two-screen attribute setup into one and made its live preview run
on a real product — after finding the drag-to-reorder priority the spec assumed was never read by
the server.*

**Interview angle.** The strongest example of reading across a stack: the specification, the
interface and the database all looked consistent, and the behaviour was still dead.

---

## 3. How to use these two together

Both entries say the same thing about how I work, so on the CV they are stronger as one line than
as two feature descriptions:

> *Finds the real constraint before writing code — what the system already provides, what is
> quietly dead, and what will break if you take the obvious path.*

That is the gap the page currently has: it lists what was built, not what was judged.
