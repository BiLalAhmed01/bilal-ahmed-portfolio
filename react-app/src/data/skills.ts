export interface Skill {
  name: string;
  logo?: string;
  mono?: string;
}

export interface SkillCategory {
  num: string;
  title: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    num: "01",
    title: "Web Development",
    skills: [
      { name: "React", logo: "/icons/react.svg" },
      { name: "Next.js", logo: "/icons/nextdotjs.svg" },
      { name: "JavaScript", logo: "/icons/javascript.svg" },
      { name: "HTML", logo: "/icons/html5.svg" },
      { name: "CSS", logo: "/icons/css3.svg" },
      { name: "Tailwind", logo: "/icons/tailwindcss.svg" },
    ],
  },
  {
    num: "02",
    title: "Backend",
    skills: [
      { name: "Node.js", logo: "/icons/nodedotjs.svg" },
      { name: "FastAPI", logo: "/icons/fastapi.svg" },
    ],
  },
  {
    num: "03",
    title: "CMS & E-Commerce",
    skills: [
      { name: "WordPress", logo: "/icons/wordpress.svg" },
      { name: "Elementor", logo: "/icons/elementor.svg" },
      { name: "WooCommerce", logo: "/icons/woocommerce.svg" },
      { name: "Shopify", logo: "/icons/shopify.svg" },
    ],
  },
  {
    num: "04",
    title: "AI & Automation",
    skills: [
      { name: "Python", logo: "/icons/python.svg" },
      { name: "Gemini API", logo: "/icons/googlegemini.svg" },
      { name: "LLM Integrations", mono: "L" },
      { name: "AI Agents", mono: "A" },
      { name: "Workflow Automation", mono: "W" },
      { name: "TensorFlow", logo: "/icons/tensorflow.svg" },
      { name: "Scikit-learn", logo: "/icons/scikitlearn.svg" },
      { name: "OpenCV", logo: "/icons/opencv.svg" },
    ],
  },
  {
    num: "05",
    title: "Mobile",
    skills: [{ name: "Flutter", logo: "/icons/flutter.svg" }],
  },
  {
    num: "06",
    title: "Tools & Platforms",
    skills: [
      { name: "Git", logo: "/icons/git.svg" },
      { name: "GitHub", logo: "/icons/github.svg" },
      { name: "Figma", logo: "/icons/figma.svg" },
      { name: "REST APIs", mono: "R" },
      { name: "Firebase", logo: "/icons/firebase.svg" },
    ],
  },
];
