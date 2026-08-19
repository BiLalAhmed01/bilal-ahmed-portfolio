export interface ExperienceEntry {
  index: string;
  role: string;
  company: string;
  date: string;
  type: "Remote" | "Onsite" | "Hybrid";
  location?: string;
  featured?: boolean;
  image: string;
  bullets: string[];
  tags: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    index: "01",
    role: "Software Developer",
    company: "RoboSoft Works",
    date: "Jun 2025 — Present",
    type: "Remote",
    featured: true,
    image: "https://images.unsplash.com/photo-1487338875411-8880f74114a2?auto=format&fit=crop&w=1200&q=80",
    bullets: [
      "Design, develop, and maintain responsive, SEO-friendly websites, including e-commerce, portfolio, corporate, and service provider websites, by customizing themes, templates, layouts, and UI components to improve performance, accessibility, and user experience.",
      "Develop and troubleshoot custom web solutions using WordPress, Elementor, HTML, CSS, JavaScript, and REST APIs, delivering tailored functionality for client requirements and building feature-rich websites for businesses across multiple industries, with transferable experience in theme-based platforms such as Shopify.",
      "Build AI-powered content automation workflows using JavaScript and Python, integrating third-party APIs, including Google Gemini, to streamline content generation, automate repetitive tasks, and reduce manual effort.",
      "Manage source code, version control, and collaborative development workflows using Git and GitHub, ensuring efficient code reviews, issue resolution, and timely project delivery while adhering to development best practices.",
    ],
    tags: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript", "REST APIs", "Python", "Google Gemini", "Git", "GitHub", "SEO", "Automation"],
  },
  {
    index: "02",
    role: "Supervisor QA",
    company: "PTCL",
    date: "Jan 2026 — Present",
    type: "Onsite",
    location: "Islamabad, Pakistan",
    image: "https://images.unsplash.com/photo-1785682117028-6fcf2c0b515b?auto=format&fit=crop&w=1200&q=80",
    bullets: [
      "Conduct detailed technical audits and inspections against defined deployment and quality standards, following documented instructions precisely.",
      "Prepare and review QA documentation and reports, strengthening process transparency and accountability.",
      "Collaborate with cross-functional technical teams to diagnose and resolve system faults efficiently.",
    ],
    tags: ["Quality Assurance", "Technical Auditing", "Technical Inspections", "Documentation", "Reporting", "Troubleshooting", "Process Compliance", "Technical Operations"],
  },
  {
    index: "03",
    role: "Software Developer",
    company: "NESCOM Collaboration Project",
    date: "Nov 2024 — Nov 2025",
    type: "Hybrid",
    image: "https://images.unsplash.com/photo-1580063665860-af92a61c2810?auto=format&fit=crop&w=1200&q=80",
    bullets: [
      "Developed a Digital Instantaneous Frequency Measurement (DIFM) algorithm for real-time multi-signal detection within the 1–2 GHz RF spectrum.",
      "Implemented Python, MATLAB, DSP, and FFT-based signal processing techniques for frequency estimation and multi-signal analysis.",
      "Evaluated and optimized signal detection accuracy, processing efficiency, and reliability under varying noise and signal conditions.",
      "Developed a GUI-based interface for signal visualization, analysis, and interaction with the detection and processing workflow.",
      "Collaborated with NESCOM technical teams in a hybrid project to test, refine, and validate the system for electronic warfare and real-time RF signal analysis applications.",
    ],
    tags: ["Python", "Machine Learning", "MATLAB", "DSP", "GUI"],
  },
  {
    index: "04",
    role: "Web Development Summer Intern",
    company: "InfinityBits",
    date: "Jun 2023 — Aug 2023",
    type: "Onsite",
    location: "Islamabad, Pakistan",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    bullets: [
      "Developed and optimized responsive web and mobile applications using React.js and Flutter.",
      "Enhanced UI/UX using modern development frameworks and best practices to improve usability and responsiveness.",
      "Customized WordPress themes and plugins in an Agile team environment, gaining hands-on experience in template and storefront development.",
    ],
    tags: ["React.js", "Flutter", "WordPress", "UI/UX", "Agile"],
  },
];
