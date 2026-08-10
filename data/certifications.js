/**
 * Centralized certification data — single source of truth for the
 * Certifications system. Consumed by certifications-ui.js, which renders
 * the grid and modal entirely from CERTIFICATIONS below — no certificate
 * content is hardcoded in the UI layer.
 *
 * Every field here is taken directly from the certificate PDF itself
 * (recipient name, certificate title, issuer, "Certificate of Completion"
 * wording). None of the source certificates include an issue date,
 * credential ID, or a verification link, so those fields are omitted
 * rather than invented — add them only if a future certificate actually
 * has them.
 */

export const CERTIFICATIONS = [
  {
    id: "claude-vertex-ai",
    title: "Claude with Google Vertex AI",
    issuer: "Anthropic",
    type: "Certificate of Completion",
    category: "AI & Automation",
    pdf: "certifications/claude-vertex-ai.pdf",
    cover: "certifications/claude-vertex-ai.webp",
    downloadName: "bilal-ahmed-claude-vertex-ai.pdf",
  },
  {
    id: "ai-capabilities-limitations",
    title: "AI Fluency: AI Capabilities & Limitations",
    issuer: "Anthropic",
    type: "Certificate of Completion",
    category: "AI & Automation",
    pdf: "certifications/ai-capabilities-limitations.pdf",
    cover: "certifications/ai-capabilities-limitations.webp",
    downloadName: "bilal-ahmed-ai-capabilities-limitations.pdf",
  },
  {
    id: "claude-code-101",
    title: "Claude Code 101",
    issuer: "Anthropic",
    type: "Certificate of Completion",
    category: "AI & Automation",
    pdf: "certifications/claude-code-101.pdf",
    cover: "certifications/claude-code-101.webp",
    downloadName: "bilal-ahmed-claude-code-101.pdf",
  },
  {
    id: "claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    type: "Certificate of Completion",
    category: "AI & Automation",
    pdf: "certifications/claude-101.pdf",
    cover: "certifications/claude-101.webp",
    downloadName: "bilal-ahmed-claude-101.pdf",
  },
  {
    id: "ai-fluency-framework",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    type: "Certificate of Completion",
    category: "AI & Automation",
    pdf: "certifications/ai-fluency-framework.pdf",
    cover: "certifications/ai-fluency-framework.webp",
    downloadName: "bilal-ahmed-ai-fluency-framework.pdf",
  },
];
