export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: string;
  description: string;
  type: string;
  pdf: string;
  cover: string;
  downloadName: string;
  verifyUrl: string;
}

// Titles/descriptions verified against the course pages on
// anthropic.skilljar.com — "Claude on Google Cloud" and "AI Capabilities and
// Limitations" are the official titles there (not the shorthand used on the
// certificate graphic itself).
export const CERTIFICATIONS: Certification[] = [
  {
    id: "claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    category: "Claude Platform",
    description:
      "How to use Claude for everyday work tasks — core features, prompting basics, and where to go for more advanced learning.",
    type: "Certificate of Completion",
    pdf: "/certifications/claude-101.pdf",
    cover: "/certifications/claude-101.webp",
    downloadName: "bilal-ahmed-claude-101.pdf",
    verifyUrl: "https://verify.skilljar.com/c/uu8wicgzxfht",
  },
  {
    id: "claude-code-101",
    title: "Claude Code 101",
    issuer: "Anthropic",
    category: "Developer Tools",
    description:
      "Using Claude Code in a real development workflow — installation, configuration, and advanced customization for AI coding agents.",
    type: "Certificate of Completion",
    pdf: "/certifications/claude-code-101.pdf",
    cover: "/certifications/claude-code-101.webp",
    downloadName: "bilal-ahmed-claude-code-101.pdf",
    verifyUrl: "https://verify.skilljar.com/c/9ndnsnfc3qqw",
  },
  {
    id: "ai-capabilities-limitations",
    title: "AI Capabilities and Limitations",
    issuer: "Anthropic",
    category: "AI Fluency",
    description:
      "A working mental model of how modern generative AI systems behave and why — recognizing unexpected outputs and responding with a targeted fix.",
    type: "Certificate of Completion",
    pdf: "/certifications/ai-capabilities-limitations.pdf",
    cover: "/certifications/ai-capabilities-limitations.webp",
    downloadName: "bilal-ahmed-ai-capabilities-limitations.pdf",
    verifyUrl: "https://verify.skilljar.com/c/feovybrmod6i",
  },
  {
    id: "ai-fluency-framework",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    category: "AI Fluency",
    description:
      "Practical skills for effective, efficient, ethical and safe AI collaboration — the 4D Framework, developed with academic partners.",
    type: "Certificate of Completion",
    pdf: "/certifications/ai-fluency-framework.pdf",
    cover: "/certifications/ai-fluency-framework.webp",
    downloadName: "bilal-ahmed-ai-fluency-framework.pdf",
    verifyUrl: "https://verify.skilljar.com/c/q2e92kbxd7x4",
  },
  {
    id: "claude-vertex-ai",
    title: "Claude on Google Cloud",
    issuer: "Anthropic",
    category: "Cloud Integration",
    description:
      "Integrating and deploying Claude models on Google Cloud's Vertex AI — from basic API requests through tool use, RAG, and MCP.",
    type: "Certificate of Completion",
    pdf: "/certifications/claude-vertex-ai.pdf",
    cover: "/certifications/claude-vertex-ai.webp",
    downloadName: "bilal-ahmed-claude-vertex-ai.pdf",
    verifyUrl: "https://verify.skilljar.com/c/x95yro4wju7p",
  },
];
