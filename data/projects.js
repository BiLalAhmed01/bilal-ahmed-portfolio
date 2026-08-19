/**
 * Centralized project data — single source of truth for the Projects system.
 * Consumed by projects-ui.js, which renders the filter bar and grid entirely
 * from PROJECTS/PROJECT_CATEGORIES below — no project content is hardcoded
 * in the UI layer.
 */

export const PROJECTS = [
  {
    id: "a11ylens",
    slug: "a11ylens",
    title: "A11yLens",
    shortTitle: "A11yLens",
    category: "AI & Automation",
    categories: ["AI & Automation"],
    year: null,
    yearLabel: null,
    featured: true,
    priority: 1,
    status: "completed",

    shortDescription: "AI accessibility and performance auditor that scans any website for WCAG failures and returns a prioritized, plain-language fix list.",
    description:
      "A11yLens is an AI-powered accessibility and performance auditor built for small business websites. It scans any URL for WCAG accessibility failures and performance issues, then generates a prioritized, plain-language fix list — so teams without dedicated accessibility expertise can find and fix problems before customers do. The scan runs with no signup required, across desktop and mobile.",

    technologies: ["Next.js", "AI/LLM", "WCAG"],
    role: null,
    platform: "Web App",
    country: null,

    image: "assets/project-a11ylens.png",
    thumbnail: "assets/project-a11ylens.png",
    gallery: [],
    imageStatus: "OK — homepage screenshot",

    githubUrl: null,
    liveUrl: "https://a11ylens-nine.vercel.app/index.html",
    linkStatus: "AVAILABLE",

    caseStudy: null,

    keyFeatures: [
      "Free automated WCAG accessibility scan for any URL",
      "Performance issue detection alongside accessibility failures",
      "Prioritized, plain-language fix list",
      "No signup required — desktop & mobile scanning",
    ],
    results: [],

    challenge: "",
    solution: "",
    architecture: "",

    reviewNotes: "",
  },

  {
    id: "orchis",
    slug: "orchis",
    title: "Orchis",
    shortTitle: "Orchis",
    category: "AI & Automation",
    categories: ["AI & Automation"],
    year: null,
    yearLabel: null,
    featured: true,
    priority: 2,
    status: "completed",

    shortDescription: "RAG-powered AI customer support agent that answers from an indexed knowledge base with a dashboard, conversation history, and analytics.",
    description:
      "Orchis is an AI customer support agent built on retrieval-augmented generation (RAG). It indexes a business's knowledge base and answers customer questions — product, ordering, payments, shipping, and returns — directly from that indexed content, with a full dashboard for conversation history, knowledge base management, and analytics. Powered by Llama 3.3 70B.",

    technologies: ["RAG", "Llama 3.3 70B", "Vector Search", "React"],
    role: null,
    platform: "Web App",
    country: null,

    image: "assets/project-orchis.png",
    thumbnail: "assets/project-orchis.png",
    gallery: [],
    imageStatus: "OK — app screenshot",

    githubUrl: "https://github.com/BiLalAhmed01/AI-Customer-Support-Agent-RAG-",
    liveUrl: null,
    linkStatus: "AVAILABLE",

    caseStudy: null,

    keyFeatures: [
      "RAG-based answers grounded in an indexed knowledge base",
      "Conversation history and analytics dashboard",
      "Suggested-question quick replies",
      "Light/dark mode",
    ],
    results: [],

    challenge: "",
    solution: "",
    architecture: "",

    reviewNotes: "",
  },

  {
    id: "firstreply",
    slug: "firstreply",
    title: "FirstReply",
    shortTitle: "FirstReply",
    category: "AI & Automation",
    categories: ["AI & Automation"],
    year: null,
    yearLabel: null,
    featured: true,
    priority: 3,
    status: "completed",

    shortDescription: "Instant AI lead-response tool for small businesses, answering missed calls and WhatsApp messages in seconds from their own FAQ and pricing.",
    description:
      "FirstReply answers missed calls and WhatsApp messages for small businesses in seconds, using the business's own FAQ and pricing, and only escalates to a human when a customer actually needs one. Built for solo operators and small teams who lose leads to slower competitors while manually replying to every inquiry.",

    technologies: ["AI/LLM", "WhatsApp API", "Automation"],
    role: null,
    platform: "Web App",
    country: null,

    image: "assets/project-firstreply.png",
    thumbnail: "assets/project-firstreply.png",
    gallery: [],
    imageStatus: "OK — homepage screenshot",

    githubUrl: "https://github.com/BiLalAhmed01/FirstReply",
    liveUrl: null,
    linkStatus: "AVAILABLE",

    caseStudy: null,

    keyFeatures: [
      "Instant AI replies to missed calls and WhatsApp messages",
      "Answers sourced from the business's own FAQ and pricing",
      "Human hand-off only when needed",
      "14-day free trial, no card required",
    ],
    results: [],

    challenge: "",
    solution: "",
    architecture: "",

    reviewNotes: "",
  },

  {
    id: "tailorly",
    slug: "tailorly",
    title: "Tailorly",
    shortTitle: "Tailorly",
    category: "AI & Automation",
    categories: ["AI & Automation"],
    year: null,
    yearLabel: null,
    featured: true,
    priority: 4,
    status: "completed",

    shortDescription: "Ethical AI job-application tailor that adapts a resume and cover letter to each role without fabricating experience.",
    description:
      "Tailorly tailors a resume and cover letter to each job opportunity without inventing claims. Every change it makes is explained, nothing is fabricated, and the candidate stays in control of what gets submitted — positioned around \"better applications, not more applications.\"",

    technologies: ["AI/LLM", "Next.js"],
    role: null,
    platform: "Web App",
    country: null,

    image: "assets/project-tailorly.png",
    thumbnail: "assets/project-tailorly.png",
    gallery: [],
    imageStatus: "OK — homepage screenshot",

    githubUrl: "https://github.com/BiLalAhmed01/Tailorly",
    liveUrl: null,
    linkStatus: "AVAILABLE",

    caseStudy: null,

    keyFeatures: [
      "Tailors resume and cover letter per job opportunity",
      "No fabricated claims — every change explained",
      "Candidate stays in control of submitted content",
    ],
    results: [],

    challenge: "",
    solution: "",
    architecture: "",

    reviewNotes: "",
  },

  {
    id: "fv-organization",
    slug: "fv-organization",
    title: "FV Organization",
    shortTitle: "FV Organization",
    category: "Web",
    categories: ["Web"],
    year: null,
    yearLabel: null,
    featured: true,
    priority: 5,
    status: "completed",

    shortDescription: "WordPress platform for a UK-registered cultural & professional organization, handling event registration, ticketing, and international membership.",
    description:
      "FV Organization (Future Vision Organization) is a UK-registered, certified organization operating internationally under the tagline \"Empowering Minds. Uniting Cultures. Shaping Tomorrow.\" The site hosts event registration and ticketing (e.g. the Pukhtoon Cultural Night 2026 in Liverpool), professional training/development listings, visa-support information for international attendees, and a partnership program for collaborating organizations. The organization reports 50+ events worldwide and 8,000+ participants across 15+ countries.",

    technologies: ["WordPress", "Elementor", "WooCommerce"],
    role: null,
    platform: "Web — WordPress",
    country: "United Kingdom",

    image: "assets/project-fv-organization.jpg",
    thumbnail: "assets/project-fv-organization.jpg",
    gallery: [],
    imageStatus: "OK — full-page screenshot supplied by client",

    githubUrl: null,
    liveUrl: "https://fvorganization.org.uk/home/",
    linkStatus: "AVAILABLE",

    caseStudy: null,

    keyFeatures: [
      "Event registration and ticketing",
      "Visa-support documentation for international participants",
      "Team and partnership pages",
      "Training/course listings",
    ],
    results: [],

    challenge: "",
    solution: "",
    architecture: "",

    reviewNotes: "KEEP — live client site, WordPress build with WooCommerce-powered ticketing.",
  },

  {
    id: "marked-property",
    slug: "marked-property",
    title: "Marked Property",
    shortTitle: "Marked Property",
    category: "Web",
    categories: ["Web"],
    year: null,
    yearLabel: null,
    featured: true,
    priority: 6,
    status: "completed",

    shortDescription: "Editorial-style site for an Australian commercial real estate consultancy specializing in retail leasing strategy and development.",
    description:
      "Marked Property is an Australian commercial real estate firm specializing in retail leasing strategy, development consultancy, and asset management across large-format retail, mixed-use developments, neighborhood activity centers, fuel/QSR sites, and childcare facilities. Positioned around the line \"the actual first step is following up,\" the site targets developers, investors, retailers and operators. The firm has won LFRA Agent of the Year (2023) and was a finalist in the 2021 Property Council Innovation Awards.",

    technologies: ["WordPress", "Elementor", "All in One SEO"],
    role: null,
    platform: "Web — WordPress",
    country: "Australia",

    image: "assets/project-marked-property.jpg",
    thumbnail: "assets/project-marked-property.jpg",
    gallery: [],
    imageStatus: "OK — full-page screenshot supplied by client",

    githubUrl: null,
    liveUrl: "https://markedproperty.com.au/",
    linkStatus: "AVAILABLE",

    caseStudy: null,

    keyFeatures: [
      "Editorial, typography-led homepage",
      "Sector/service pages (leasing strategy, development consultancy, asset management)",
      "SEO via All in One SEO plugin",
    ],
    results: [],

    challenge: "",
    solution: "",
    architecture: "",

    reviewNotes: "KEEP — live client site. Note: unrelated to the previously-removed 'Marked Property Website' project (different domain, different business — a real estate listings site vs. this commercial leasing consultancy).",
  },

  {
    id: "biba-rang",
    slug: "biba-rang",
    title: "Biba Rang",
    shortTitle: "Biba Rang",
    category: "Web",
    categories: ["Web"],
    year: null,
    yearLabel: null,
    featured: false,
    priority: 7,
    status: "completed",

    shortDescription: "WooCommerce fashion storefront for a footwear & accessories brand, with product variants, wishlists, and multi-category catalog browsing.",
    description:
      "Biba Rang is a Pakistan-based fashion e-commerce store selling footwear, bags, and accessories across branded collections (e.g. BR Vintage, BR Speedy, Eden Black Velvet), priced roughly PKR 9,800–15,890. Built on WordPress with WooCommerce, it includes product variants, wishlists, comparison tools, cart/checkout, and social sharing.",

    technologies: ["WordPress", "WooCommerce", "Elementor", "Slider Revolution"],
    role: null,
    platform: "Web — WooCommerce",
    country: "Pakistan",

    image: "assets/project-biba-rang.jpg",
    thumbnail: "assets/project-biba-rang.jpg",
    gallery: [],
    imageStatus: "OK — full-page screenshot supplied by client",

    githubUrl: null,
    liveUrl: "https://bibarang.com/",
    linkStatus: "AVAILABLE",

    caseStudy: null,

    keyFeatures: [
      "Product catalog with variants across multiple collections",
      "Wishlist and compare functionality",
      "Cart, checkout, and account/order history",
      "Social sharing and search",
    ],
    results: [],

    challenge: "",
    solution: "",
    architecture: "",

    reviewNotes: "KEEP — the only genuine e-commerce build (active WooCommerce store, not just the plugin present) among the six.",
  },

  {
    id: "wecall-llc",
    slug: "wecall-llc",
    title: "WeCall LLC",
    shortTitle: "WeCall LLC",
    category: "Web",
    categories: ["Web"],
    year: null,
    yearLabel: null,
    featured: true,
    priority: 8,
    status: "completed",

    shortDescription: "Marketing site for a lead-generation service connecting real estate, mortgage, and debt-relief professionals with qualified prospects.",
    description:
      "WeCall LLC is a lead-generation agency supplying \"high-intent prospects\" to sales teams in Real Estate, Mortgage, and Debt Relief. The site explains their data-verification process, tiered per-lead pricing (Starter/Premium/Enterprise), CRM integration, TCPA-compliant delivery, and lead-replacement guarantees, with a primary \"Book a Demo\" conversion path.",

    technologies: ["WordPress", "Elementor", "WooCommerce", "Site Kit by Google"],
    role: null,
    platform: "Web — WordPress",
    country: "United States",

    image: "assets/project-wecall.jpg",
    thumbnail: "assets/project-wecall.jpg",
    gallery: [],
    imageStatus: "OK — full-page screenshot supplied by client",

    githubUrl: null,
    liveUrl: "https://wecall.llc/",
    linkStatus: "AVAILABLE",

    caseStudy: null,

    keyFeatures: [
      "Tiered pricing presentation (Starter / Premium / Enterprise)",
      "Demo-booking conversion flow",
      "Service pages by vertical (Real Estate, Mortgage, Debt Relief)",
      "Google Site Kit analytics integration",
    ],
    results: [],

    challenge: "",
    solution: "",
    architecture: "",

    reviewNotes: "KEEP — clearest B2B/SaaS-adjacent positioning of the six (lead-gen service business, tiered pricing, demo funnel).",
  },

  {
    id: "coastal-valley-construction-cleaning",
    slug: "coastal-valley-construction-cleaning",
    title: "Coastal Valley Construction Cleaning",
    shortTitle: "Coastal Valley",
    category: "Web",
    categories: ["Web"],
    year: null,
    yearLabel: null,
    featured: false,
    priority: 9,
    status: "completed",

    shortDescription: "Local service business site for a licensed post-construction cleanup company serving Santa Barbara & San Luis Obispo counties, with quote-request flow.",
    description:
      "Coastal Valley Construction Cleaning is a CSLB-licensed (C61/D63) post-construction cleaning company based in Santa Maria, CA, serving Santa Barbara and San Luis Obispo counties. The site covers residential, commercial, and industrial cleanup (debris removal, rough/final cleaning, window cleaning, surface detailing) for contractors, builders, developers, and property managers, with a four-step process (assessment → estimate → cleanup → inspection) and a free-quote request flow.",

    technologies: ["WordPress", "Elementor", "All in One SEO", "Site Kit by Google"],
    role: null,
    platform: "Web — WordPress",
    country: "United States",

    image: "assets/project-coastal-valley.jpg",
    thumbnail: "assets/project-coastal-valley.jpg",
    gallery: [],
    imageStatus: "OK — full-page screenshot supplied by client",

    githubUrl: null,
    liveUrl: "https://constructioncleaning.biz/",
    linkStatus: "AVAILABLE",

    caseStudy: null,

    keyFeatures: [
      "Free-estimate / quote-request flow",
      "Service-area and process pages (assessment → estimate → cleanup → inspection)",
      "Licensing and contact info prominent for trust signals",
      "Local SEO (All in One SEO, Google Site Kit)",
    ],
    results: [],

    challenge: "",
    solution: "",
    architecture: "",

    reviewNotes: "KEEP — clean example of a local-service lead-gen build with a real quote-request conversion path.",
  },

  {
    id: "samab-international",
    slug: "samab-international",
    title: "Samab International",
    shortTitle: "Samab International",
    category: "Web",
    categories: ["Web"],
    year: null,
    yearLabel: null,
    featured: false,
    priority: 10,
    status: "completed",

    shortDescription: "B2B catalog site for a Sialkot-based sportswear manufacturer, showcasing custom team kits and apparel with bulk quote requests.",
    description:
      "Samab International is a sportswear and performance-gear manufacturer based in Sialkot, Pakistan (with a Turkey contact line), producing team kits (football, baseball, rugby), gym wear, track suits, hoodies, jerseys, and accessories for bulk/B2B buyers under the line \"Your Kit. Your Identity. Our Craft.\" The site organizes products by department and drives \"Request a Quote\" conversions for custom bulk orders.",

    technologies: ["WordPress", "Elementor", "WooCommerce"],
    role: null,
    platform: "Web — WordPress",
    country: "Pakistan",

    image: "assets/project-samab-international.jpg",
    thumbnail: "assets/project-samab-international.jpg",
    gallery: [],
    imageStatus: "OK — full-page screenshot supplied by client",

    githubUrl: null,
    liveUrl: "https://samabinternational.com/",
    linkStatus: "AVAILABLE",

    caseStudy: null,

    keyFeatures: [
      "Department/category-based product catalog",
      "Bulk quote-request flow for B2B buyers",
      "Article/search feature for product content",
    ],
    results: [],

    challenge: "",
    solution: "",
    architecture: "",

    reviewNotes: "KEEP — live client site.",
  },
];

/**
 * Categories surfaced for the future filter UI (Phase 4). "All" plus every
 * category actually used by a project above — no empty categories invented.
 *
 * Ordered to match the site's Web-first brand positioning (Web Development
 * primary, AI & Automation secondary): any category not listed here falls
 * back to alphabetical order after the ones that are.
 */
const CATEGORY_ORDER = ["Web", "SaaS", "AI & Automation", "AI & ML", "Mobile", "Engineering"];

export const PROJECT_CATEGORIES = [
  "All",
  ...Array.from(new Set(PROJECTS.flatMap((p) => p.categories))).sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  }),
];
