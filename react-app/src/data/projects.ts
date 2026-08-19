export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  categories: string[];
  priority: number;
  shortDescription: string;
  technologies: string[];
  image: string;
  githubUrl: string | null;
  liveUrl: string | null;
}

export const PROJECTS: Project[] = [
  {
    id: "a11ylens",
    slug: "a11ylens",
    title: "A11yLens",
    category: "AI & Automation",
    categories: ["AI & Automation"],
    priority: 1,
    shortDescription:
      "AI accessibility and performance auditor that scans any website for WCAG failures and returns a prioritized, plain-language fix list.",
    technologies: ["Next.js", "AI/LLM", "WCAG"],
    image: "/assets/project-a11ylens.webp",
    githubUrl: null,
    liveUrl: "https://a11ylens-nine.vercel.app/index.html",
  },
  {
    id: "orchis",
    slug: "orchis",
    title: "Orchis",
    category: "AI & Automation",
    categories: ["AI & Automation"],
    priority: 2,
    shortDescription:
      "RAG-powered AI customer support agent that answers from an indexed knowledge base with a dashboard, conversation history, and analytics.",
    technologies: ["RAG", "Llama 3.3 70B", "Vector Search", "React"],
    image: "/assets/project-orchis.webp",
    githubUrl: "https://github.com/BiLalAhmed01/AI-Customer-Support-Agent-RAG-",
    liveUrl: null,
  },
  {
    id: "firstreply",
    slug: "firstreply",
    title: "FirstReply",
    category: "AI & Automation",
    categories: ["AI & Automation"],
    priority: 3,
    shortDescription:
      "Instant AI lead-response tool for small businesses, answering missed calls and WhatsApp messages in seconds from their own FAQ and pricing.",
    technologies: ["AI/LLM", "WhatsApp API", "Automation"],
    image: "/assets/project-firstreply.webp",
    githubUrl: "https://github.com/BiLalAhmed01/FirstReply",
    liveUrl: null,
  },
  {
    id: "tailorly",
    slug: "tailorly",
    title: "Tailorly",
    category: "AI & Automation",
    categories: ["AI & Automation"],
    priority: 4,
    shortDescription:
      "Ethical AI job-application tailor that adapts a resume and cover letter to each role without fabricating experience.",
    technologies: ["AI/LLM", "Next.js"],
    image: "/assets/project-tailorly.webp",
    githubUrl: "https://github.com/BiLalAhmed01/Tailorly",
    liveUrl: null,
  },
  {
    id: "fv-organization",
    slug: "fv-organization",
    title: "FV Organization",
    category: "Web",
    categories: ["Web"],
    priority: 5,
    shortDescription:
      "WordPress platform for a UK-registered cultural & professional organization, handling event registration, ticketing, and international membership.",
    technologies: ["WordPress", "Elementor", "WooCommerce"],
    image: "/assets/project-fv-organization.webp",
    githubUrl: null,
    liveUrl: "https://fvorganization.org.uk/home/",
  },
  {
    id: "marked-property",
    slug: "marked-property",
    title: "Marked Property",
    category: "Web",
    categories: ["Web"],
    priority: 6,
    shortDescription:
      "Editorial-style site for an Australian commercial real estate consultancy specializing in retail leasing strategy and development.",
    technologies: ["WordPress", "Elementor", "All in One SEO"],
    image: "/assets/project-marked-property.webp",
    githubUrl: null,
    liveUrl: "https://markedproperty.com.au/",
  },
  {
    id: "biba-rang",
    slug: "biba-rang",
    title: "Biba Rang",
    category: "Web",
    categories: ["Web"],
    priority: 7,
    shortDescription:
      "WooCommerce fashion storefront for a footwear & accessories brand, with product variants, wishlists, and multi-category catalog browsing.",
    technologies: ["WordPress", "WooCommerce", "Elementor", "Slider Revolution"],
    image: "/assets/project-biba-rang.webp",
    githubUrl: null,
    liveUrl: "https://bibarang.com/",
  },
  {
    id: "wecall-llc",
    slug: "wecall-llc",
    title: "WeCall LLC",
    category: "Web",
    categories: ["Web"],
    priority: 8,
    shortDescription:
      "Marketing site for a lead-generation service connecting real estate, mortgage, and debt-relief professionals with qualified prospects.",
    technologies: ["WordPress", "Elementor", "WooCommerce", "Site Kit by Google"],
    image: "/assets/project-wecall.webp",
    githubUrl: null,
    liveUrl: "https://wecall.llc/",
  },
  {
    id: "coastal-valley-construction-cleaning",
    slug: "coastal-valley-construction-cleaning",
    title: "Coastal Valley Construction Cleaning",
    category: "Web",
    categories: ["Web"],
    priority: 9,
    shortDescription:
      "Local service business site for a licensed post-construction cleanup company serving Santa Barbara & San Luis Obispo counties, with quote-request flow.",
    technologies: ["WordPress", "Elementor", "All in One SEO", "Site Kit by Google"],
    image: "/assets/project-coastal-valley.webp",
    githubUrl: null,
    liveUrl: "https://constructioncleaning.biz/",
  },
  {
    id: "samab-international",
    slug: "samab-international",
    title: "Samab International",
    category: "Web",
    categories: ["Web"],
    priority: 10,
    shortDescription:
      "B2B catalog site for a Sialkot-based sportswear manufacturer, showcasing custom team kits and apparel with bulk quote requests.",
    technologies: ["WordPress", "Elementor", "WooCommerce"],
    image: "/assets/project-samab-international.webp",
    githubUrl: null,
    liveUrl: "https://samabinternational.com/",
  },
];

const CATEGORY_ORDER = ["Web", "AI & Automation"];

export const PROJECT_CATEGORIES: string[] = [
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
