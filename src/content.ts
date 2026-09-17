/**
 * Single source of truth for every string on the page.
 * Never write user-facing copy inline in a component — add it here and read it through `useLang`.
 * Derived from CONTENT.md.
 */

export type Lang = 'en' | 'vi';

/** One translated string. */
export type L = { en: string; vi: string };

/** One translated list. Both arrays must be the same length. */
export type LL = { en: string[]; vi: string[] };

/**
 * A live, publicly verifiable product the candidate works on.
 *
 * Deliberately phrased as work *on* a product, never as authorship: the Shopify
 * app shipped in 2020, years before he joined. `rating` and `reviews` are public
 * figures from the store listing and go stale — re-check them before sending
 * the CV anywhere.
 */
export interface ShippedProduct {
  id: string;
  name: string;
  href: string;
  /** Selects the platform mark rendered next to the name. */
  platform: 'shopify' | 'shopline';
  /** The store's own listing icon, served from /public. */
  icon: string;
  /**
   * OMITTED ON PURPOSE when the public rating would mislead. The Shopline app
   * is "5 stars (1 review)": true, and dishonest to print as 5 stars. A number
   * only earns its place here when the sample behind it is worth citing.
   */
  rating?: string;
  reviews?: string;
  /** One short factual line under the name — never a claim, always checkable. */
  meta: L;
  blurb: L;
}

export interface TimelineNode {
  id: string;
  /** Rendered in mono. Not translated — dates are dates. */
  period: string;
  role: L;
  org: string;
  /** Exactly one node may be current. It carries the only accent dot on the page. */
  current?: boolean;
  bullets: LL;
  /** Only the current role carries these. */
  products?: ShippedProduct[];
}

export interface SkillGroup {
  id: string;
  label: L;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  href: string;
  tags: string[];
  /**
   * One short line shown on the collapsed card. Deliberately its own string
   * rather than a CSS clamp of `problem` — a 2-line clamp lands mid-word.
   */
  teaser: L;
  problem: L;
  approach: L;
  result: L;
}

export interface Certification {
  id: string;
  name: L;
  issuer: string;
  date: L;
  /** Absent when the credential has no public verification page. */
  verifyHref?: string;
}

export interface Fact {
  id: string;
  label: L;
  value: L;
}

export interface NavItem {
  id: string;
  label: L;
}

// ---------------------------------------------------------------------------

export const IDENTITY = {
  displayName: 'Vinh Van',
  fullName: 'Vần Ngọc Vinh',
  email: 'work.vinh.vn@gmail.com',
  github: 'https://github.com/acevinh',
  githubHandle: 'github.com/acevinh',
  /** This page's own repository — the footer's "Source on GitHub" link. */
  sourceRepo: 'https://github.com/acevinh/vinh-cv',
} as const;

export const NAV: NavItem[] = [
  { id: 'about', label: { en: 'About', vi: 'Giới thiệu' } },
  { id: 'experience', label: { en: 'Experience', vi: 'Kinh nghiệm' } },
  { id: 'skills', label: { en: 'Skills', vi: 'Kỹ năng' } },
  { id: 'projects', label: { en: 'Projects', vi: 'Dự án' } },
  { id: 'ai', label: { en: 'AI', vi: 'AI' } },
  { id: 'contact', label: { en: 'Contact', vi: 'Liên hệ' } },
];

export const HERO = {
  eyebrow: {
    en: 'Fullstack Developer · Hanoi',
    vi: 'Lập trình viên Fullstack · Hà Nội',
  } satisfies L,
  lede: {
    en: "I build product-grade web apps in NestJS and React — and I've spent the last year making AI agents a dependable part of how I ship, not a demo.",
    vi: 'Tôi xây dựng ứng dụng web mức sản phẩm bằng NestJS và React — và dành năm qua để biến AI agent thành một phần đáng tin trong quy trình làm việc, không phải thứ để trình diễn.',
  } satisfies L,
  ctaContact: { en: 'Get in touch', vi: 'Liên hệ' } satisfies L,
  ctaResume: { en: 'Résumé (PDF)', vi: 'Tải CV (PDF)' } satisfies L,
  ctaGithub: { en: 'GitHub', vi: 'GitHub' } satisfies L,
  scrollHint: { en: 'Scroll', vi: 'Cuộn xuống' } satisfies L,
};

export const ABOUT = {
  heading: { en: 'About', vi: 'Giới thiệu' } satisfies L,
  paragraphs: {
    en: [
      "I'm a fullstack developer in Hanoi. I started as a PHP/Laravel backend apprentice in May 2025 and moved into a product team, where I now work across a NestJS API and a React TypeScript frontend — on the same published Shopify app I joined as an intern.",
      'What I care about is the unglamorous half of shipping: knowing what a change breaks before you make it, and being able to prove it works afterwards. That is also why I put real effort into working with AI agents — I write the guardrails first, then let them move fast inside those.',
    ],
    vi: [
      'Tôi là lập trình viên fullstack tại Hà Nội. Tôi bắt đầu với vị trí học việc backend PHP/Laravel từ tháng 5/2025, rồi chuyển vào team product, hiện làm cả API NestJS lẫn frontend React TypeScript — trên chính ứng dụng Shopify đã phát hành mà tôi vào làm từ kỳ thực tập.',
      'Thứ tôi quan tâm là nửa không hào nhoáng của việc ship: biết một thay đổi sẽ làm hỏng cái gì trước khi làm, và chứng minh được nó chạy đúng sau khi làm. Đó cũng là lý do tôi đầu tư nghiêm túc vào cách làm việc với AI agent — viết rào chắn trước, rồi mới để chúng chạy nhanh bên trong rào đó.',
    ],
  } satisfies LL,
};

export const FACTS: Fact[] = [
  {
    id: 'based',
    label: { en: 'Based in', vi: 'Nơi ở' },
    value: { en: 'Hanoi, Vietnam', vi: 'Hà Nội, Việt Nam' },
  },
  {
    id: 'since',
    label: { en: 'Working since', vi: 'Đi làm từ' },
    value: { en: 'May 2025', vi: '05/2025' },
  },
  {
    id: 'languages',
    label: { en: 'Languages', vi: 'Ngôn ngữ' },
    value: {
      en: 'Vietnamese (native), English (professional reading & writing)',
      vi: 'Tiếng Việt (bản ngữ), Tiếng Anh (đọc/viết chuyên môn)',
    },
  },
  {
    id: 'open',
    label: { en: 'Open to', vi: 'Đang tìm' },
    value: { en: 'Fullstack Developer roles', vi: 'Vị trí Fullstack Developer' },
  },
];

export const EXPERIENCE = {
  heading: { en: 'Experience', vi: 'Kinh nghiệm' } satisfies L,
  educationHeading: { en: 'Education', vi: 'Học vấn' } satisfies L,
  /** Labels for the live-product strip on the current role. */
  productLabel: {
    en: 'Fullstack developer on',
    vi: 'Lập trình viên fullstack của',
  } satisfies L,
  productReviews: { en: 'reviews', vi: 'đánh giá' } satisfies L,
  /** Screen-reader-only; `{store}` is filled with the platform's own name. */
  productView: { en: 'View on the {store} App Store', vi: 'Xem trên {store} App Store' } satisfies L,
  education: {
    school: 'FPT Polytechnic',
    field: {
      en: 'Backend Development (PHP / Laravel)',
      vi: 'Lập trình Backend (PHP / Laravel)',
    } satisfies L,
  },
};

export const TIMELINE: TimelineNode[] = [
  {
    id: 'fullstack',
    period: '2026.01 — Present',
    role: { en: 'Fullstack Developer', vi: 'Lập trình viên Fullstack' },
    org: 'XIPAT',
    current: true,
    bullets: {
      en: [
        'Ship features end to end across a NestJS 11 + TypeScript API and a React 18 + TypeScript frontend.',
        'Refactor and extend code I did not write, on an app that has been live for merchants since 2020.',
        'Build the frontend against a generated API client, so a backend contract change is coordinated across both repos in a single change instead of breaking the client silently.',
        'Build embedded Shopify app surfaces with Polaris and the Admin GraphQL API.',
        'Run AI agents against a written process I maintain — the same rules published in claude-skills.',
      ],
      vi: [
        'Triển khai tính năng đầu-cuối trên API NestJS 11 + TypeScript và frontend React 18 + TypeScript.',
        'Refactor và mở rộng phần code không do mình viết, trên một app đã chạy thật cho merchant từ 2020.',
        'Frontend build trên API client sinh tự động, nên mọi thay đổi hợp đồng API phía backend được đồng bộ hai repo trong cùng một thay đổi, thay vì làm hỏng client một cách âm thầm.',
        'Xây giao diện Shopify embedded app bằng Polaris và Admin GraphQL API.',
        'Vận hành AI agent theo bộ quy trình do tôi tự viết và duy trì — chính là bộ đã public ở claude-skills.',
      ],
    },
    products: [
      {
        id: 'omega-feed',
        name: 'Omega Google & Facebook Feed',
        href: 'https://apps.shopify.com/google-shopping-feed-pro',
        platform: 'shopify',
        icon: '/omega-feed-icon.png',
        rating: '4.9',
        reviews: '110',
        meta: { en: 'Live since 2020', vi: 'Chạy thật từ 2020' },
        blurb: {
          en: "I've worked on this one since my internship — feature work, refactors and day-to-day development across the NestJS API and the React admin UI.",
          vi: 'Tôi làm trên sản phẩm này từ kỳ thực tập — phát triển tính năng, refactor và xử lý công việc hằng ngày trên cả API NestJS lẫn giao diện quản trị React.',
        },
      },
      {
        id: 'feednexa-shopline',
        name: 'FeedNexa — Multiple Feed',
        href: 'https://apps.shopline.com/detail/feednexa_multiple_feed',
        platform: 'shopline',
        icon: '/shopline-feed-icon.png',
        // No rating: the listing says 5 stars from a single review.
        meta: {
          en: 'Google · Meta · TikTok · Pinterest · Bing',
          vi: 'Google · Meta · TikTok · Pinterest · Bing',
        },
        blurb: {
          en: 'The same problem on a second commerce platform — generating and syncing XML product feeds out to the ad channels. Newer and smaller than the Shopify app, and the reason I can say the domain transfers rather than just the codebase.',
          vi: 'Cùng bài toán đó trên một nền tảng thương mại khác — sinh và đồng bộ feed sản phẩm XML sang các kênh quảng cáo. Mới hơn và quy mô nhỏ hơn app Shopify, và là lý do tôi có thể nói rằng cái chuyển giao được là hiểu biết về lĩnh vực, không chỉ là codebase.',
        },
      },
    ],
  },
  {
    id: 'probation',
    period: '2025.11 — 2025.12',
    role: { en: 'Probation', vi: 'Thử việc' },
    org: 'XIPAT',
    bullets: {
      en: ['Moved from PHP onto the TypeScript stack — NestJS on the backend, React on the frontend.'],
      vi: ['Chuyển từ PHP sang stack TypeScript — NestJS phía backend, React phía frontend.'],
    },
  },
  {
    id: 'intern',
    period: '2025.07 — 2025.10',
    role: { en: 'Backend Intern', vi: 'Thực tập Backend' },
    org: 'XIPAT',
    bullets: {
      en: ['PHP and Laravel backend work, plus first production React + TypeScript frontend work.'],
      vi: ['Làm backend PHP/Laravel, đồng thời bắt đầu làm frontend React + TypeScript thật.'],
    },
  },
  {
    id: 'apprentice',
    period: '2025.05 — 2025.06',
    role: { en: 'Apprentice', vi: 'Học việc' },
    org: 'XIPAT',
    bullets: {
      en: ['Entered the team as an apprentice; learned the codebase and the review process.'],
      vi: ['Vào team ở vị trí học việc; học codebase và quy trình review.'],
    },
  },
];

export const SKILLS = {
  heading: { en: 'Skills', vi: 'Kỹ năng' } satisfies L,
  groups: [
    {
      id: 'backend',
      label: { en: 'Backend', vi: 'Backend' },
      items: [
        'NestJS',
        'TypeScript',
        'Node.js',
        'PHP',
        'Laravel',
        'TypeORM',
        'REST API design',
        'Job queues (BullMQ)',
        'OpenAPI',
      ],
    },
    {
      id: 'frontend',
      label: { en: 'Frontend', vi: 'Frontend' },
      items: [
        'React 18',
        'TypeScript',
        'Redux Toolkit',
        'RTK Query',
        'Vite',
        'Shopify Polaris',
        'CSS architecture',
      ],
    },
    {
      id: 'data',
      label: { en: 'Data & Infra', vi: 'Dữ liệu & Hạ tầng' },
      items: ['MySQL', 'MongoDB', 'PostgreSQL + pgvector', 'Redis', 'S3-compatible storage', 'Docker'],
    },
    {
      id: 'ai',
      label: { en: 'AI & Tooling', vi: 'AI & Công cụ' },
      items: ['Claude Code', 'Agent skills', 'Playwright', 'Git', 'Code generation'],
    },
  ] satisfies SkillGroup[],
};

export const PROJECTS = {
  heading: { en: 'Projects', vi: 'Dự án' } satisfies L,
  labelProblem: { en: 'Problem', vi: 'Vấn đề' } satisfies L,
  labelApproach: { en: 'Approach', vi: 'Cách làm' } satisfies L,
  labelResult: { en: 'Result', vi: 'Kết quả' } satisfies L,
  expand: { en: 'Read the case study', vi: 'Xem chi tiết' } satisfies L,
  collapse: { en: 'Close', vi: 'Thu gọn' } satisfies L,
  items: [
    {
      id: 'visic',
      name: 'Visic',
      href: 'https://github.com/acevinh/visic',
      tags: ['NestJS 11', 'React', 'TypeScript', 'PostgreSQL', 'pgvector', 'SSE', 'RAG'],
      teaser: {
        en: 'LLM answers you cannot trace back to your own documents.',
        vi: 'Câu trả lời của LLM không truy ngược được về tài liệu của bạn.',
      },
      problem: {
        en: 'An LLM answer you cannot trace back to a source is useless when the source is your own documents — you end up verifying every sentence by hand.',
        vi: 'Một câu trả lời của LLM mà không truy ngược được về nguồn thì vô dụng khi nguồn chính là tài liệu của bạn — cuối cùng vẫn phải kiểm tay từng câu.',
      },
      approach: {
        en: 'A NestJS 11 + TypeORM API with JWT access/refresh (refresh tokens stored hashed). Uploaded documents are parsed, chunked and embedded into PostgreSQL with pgvector at 768 dimensions. A question runs top-k retrieval, and only the retrieved chunks are allowed into the prompt. Tokens stream back over SSE to a React + TypeScript client that renders citations inline. The model sits behind an LlmProvider interface so it can be swapped without touching the app.',
        vi: 'API NestJS 11 + TypeORM, JWT access/refresh (refresh token lưu dạng băm). Tài liệu upload được parse, cắt chunk và embed vào PostgreSQL + pgvector 768 chiều. Mỗi câu hỏi chạy truy hồi top-k, và chỉ những chunk truy hồi được mới được đưa vào prompt. Token stream về client React + TypeScript qua SSE, hiển thị trích dẫn ngay trong câu trả lời. Model nằm sau interface LlmProvider nên thay được mà không đụng vào ứng dụng.',
      },
      result: {
        en: 'A working end-to-end MVP — sign in, upload, embed, ask, get an answer with citations — running entirely on a free-tier model, at zero operating cost.',
        vi: 'MVP chạy thông đầu-cuối — đăng nhập, upload, embed, hỏi, nhận câu trả lời kèm trích dẫn — chạy hoàn toàn trên model free-tier, chi phí vận hành bằng 0.',
      },
    },
    {
      id: 'claude-skills',
      name: 'claude-skills',
      href: 'https://github.com/acevinh/claude-skills',
      tags: ['Claude Code', 'Agent skills', 'Developer tooling', 'Open source'],
      teaser: {
        en: 'Most agent failures are process failures, not reasoning failures.',
        vi: 'Phần lớn lỗi của agent là lỗi quy trình, không phải lỗi suy luận.',
      },
      problem: {
        en: 'Most agent failures I hit were not reasoning failures. They were process failures: a one-line fix quietly becoming a refactor, a convention cited that the repo never had, and "done" claimed on a check that never ran.',
        vi: 'Phần lớn lỗi tôi gặp với agent không phải lỗi suy luận, mà là lỗi quy trình: một sửa đổi một dòng lặng lẽ phình thành refactor, trích dẫn một quy ước mà repo chưa từng có, và báo "xong" cho một bước kiểm tra chưa từng chạy.',
      },
      approach: {
        en: 'Four skills, each encoding one habit. Route by file count before editing. Review a diff only against rule docs opened in this session — never a remembered rule. Never claim a gate passed without pasting its output. Persist every test case to a ledger the next session can re-run, so test coverage compounds instead of resetting.',
        vi: 'Bốn skill, mỗi cái đóng gói một thói quen. Định tuyến theo số file trước khi sửa. Review diff chỉ dựa trên tài liệu quy ước đã mở trong phiên đó — không bao giờ dựa vào trí nhớ. Không báo pass nếu chưa dán output thật. Ghi mọi test case vào một ledger để phiên sau chạy lại được, nhờ đó độ phủ test tích luỹ thay vì mất trắng.',
      },
      result: {
        en: 'Published as an open-source pack — extracted from daily use on a production codebase and rewritten to carry no project specifics.',
        vi: 'Đã public dạng open-source — rút ra từ việc dùng hằng ngày trên codebase thật và viết lại để không còn dính đặc thù dự án nào.',
      },
    },
  ] satisfies Project[],
};

export const AI_SECTION = {
  heading: { en: 'Working with AI', vi: 'Làm việc với AI' } satisfies L,
  paragraphs: {
    en: [
      'I use AI agents every working day, and the lesson has been that the model is rarely the bottleneck. The process is.',
      'Left unconstrained, an agent will widen a one-line fix into a refactor, cite a convention the repo never had, and report success on a check it never ran. So I write the constraints down instead of hoping.',
      "What I'd bring to a team is not “I use AI” — it's a working method for using it without losing control of the codebase.",
    ],
    vi: [
      'Tôi dùng AI agent mỗi ngày làm việc, và bài học rút ra là: model hiếm khi là nút thắt. Quy trình mới là.',
      'Nếu không ràng buộc, agent sẽ biến một sửa đổi một dòng thành refactor, trích dẫn một quy ước mà repo chưa từng có, và báo thành công cho một bước kiểm tra nó chưa từng chạy. Nên tôi viết ràng buộc ra thay vì hy vọng.',
      'Thứ tôi mang tới cho team không phải là "tôi biết dùng AI" — mà là một phương pháp làm việc để dùng nó mà không mất kiểm soát codebase.',
    ],
  } satisfies LL,
  /** The four rules, rendered as a numbered list. */
  rules: {
    en: [
      'Route by file count before editing — the count decides, not how small it feels.',
      'Review a diff only against rule docs opened in that session. Never a remembered rule.',
      'Never claim a gate passed without pasting its output.',
      'Leave every test case in a file the next session can re-run.',
    ],
    vi: [
      'Định tuyến theo số file trước khi sửa — số file quyết định, không phải cảm giác "việc này nhỏ".',
      'Review diff chỉ dựa trên tài liệu quy ước đã mở trong phiên đó. Không bao giờ dựa vào trí nhớ.',
      'Không báo pass nếu chưa dán output thật.',
      'Để lại mọi test case trong một file mà phiên sau chạy lại được.',
    ],
  } satisfies LL,
  evidenceLabel: {
    en: 'The rules above are published, not claimed',
    vi: 'Bộ quy tắc trên đã được public, không phải chỉ nói suông',
  } satisfies L,
};

export const CERTIFICATIONS = {
  heading: { en: 'Certifications', vi: 'Chứng chỉ' } satisfies L,
  verify: { en: 'Verify', vi: 'Xác thực' } satisfies L,
  issuedTo: {
    en: 'Certificates are issued to “Vinh Ace”.',
    vi: 'Chứng chỉ được cấp cho tên “Vinh Ace”.',
  } satisfies L,
  items: [
    {
      id: 'claude-code',
      name: { en: 'Claude Code in Action', vi: 'Claude Code in Action' },
      issuer: 'Anthropic Education',
      date: { en: 'Apr 2026', vi: '04/2026' },
      verifyHref: 'https://verify.skilljar.com/c/quhis252443d',
    },
    {
      id: 'agent-skills',
      name: { en: 'Introduction to Agent Skills', vi: 'Introduction to Agent Skills' },
      issuer: 'Anthropic Education',
      date: { en: 'Apr 2026', vi: '04/2026' },
      verifyHref: 'https://verify.skilljar.com/c/ytamcsc3sxu6',
    },
    {
      id: 'shopify-apps',
      name: { en: 'Developing Apps for Shopify', vi: 'Developing Apps for Shopify' },
      issuer: 'Shopify Academy',
      date: { en: 'Apr 2026', vi: '04/2026' },
    },
  ] satisfies Certification[],
};

export const CONTACT = {
  heading: { en: 'Contact', vi: 'Liên hệ' } satisfies L,
  lede: {
    en: 'Open to Fullstack Developer roles. The fastest way to reach me is email.',
    vi: 'Đang tìm vị trí Fullstack Developer. Cách nhanh nhất để liên hệ là email.',
  } satisfies L,
  copy: { en: 'Copy', vi: 'Sao chép' } satisfies L,
  copied: { en: 'Copied', vi: 'Đã chép' } satisfies L,
  emailSubject: {
    en: 'Fullstack Developer role',
    vi: 'Cơ hội Fullstack Developer',
  } satisfies L,
};

export const FOOTER = {
  built: {
    en: 'Built with React, TypeScript and Vite. No tracking, no cookies.',
    vi: 'Xây bằng React, TypeScript và Vite. Không theo dõi, không cookie.',
  } satisfies L,
  source: { en: 'Source on GitHub', vi: 'Mã nguồn trên GitHub' } satisfies L,
};

export const UI = {
  /**
   * The theme toggle carries `aria-pressed`, so its label must name the state
   * the control represents, not the action — "Switch to dark … pressed" is
   * incoherent (DESIGN.md §11).
   */
  themeLabel: { en: 'Light mode', vi: 'Chế độ nền sáng' } satisfies L,
  langLabel: { en: 'Language', vi: 'Ngôn ngữ' } satisfies L,
  print: { en: 'Print / Save as PDF', vi: 'In / Lưu PDF' } satisfies L,
  skipToContent: { en: 'Skip to content', vi: 'Tới nội dung chính' } satisfies L,
};
