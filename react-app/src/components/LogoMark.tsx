// Monoline "BA" lettermark — shared by Nav, Footer, and the About panel so the
// brand mark stays identical everywhere instead of three divergent text badges.
// Mirrors public/favicon.svg (same paths/gradient) so the tab icon and in-app
// mark are the same logo, not just similarly-styled.
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logomark-gradient" x1="12" y1="14" x2="53" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F4E185" />
          <stop offset="1" stopColor="#AC8B56" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="16" fill="#0D0C0A" />
      <rect x="1" y="1" width="62" height="62" rx="15" fill="none" stroke="#AC8B56" strokeWidth="1" opacity="0.35" />

      <g fill="none" stroke="url(#logomark-gradient)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12,14 L12,50" />
        <path d="M12,14 C24,14 28,18 28,23 C28,28 24,32 12,32" />
        <path d="M12,32 C25,32 30,36 30,41 C30,46 25,50 12,50" />

        <path d="M37,50 L45,14 L53,50" />
        <path d="M40,37 L50,37" />
      </g>
    </svg>
  );
}
