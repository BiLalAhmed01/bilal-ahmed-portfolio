import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Static poster shown before the background video decodes its first frame —
// an inline SVG re-creating the same gradient + two glow blobs as the
// fallback layers below, so there's no visual mismatch/flash between poster
// and fallback while the video (a third-party CDN URL, load time unknown)
// is still loading. No new binary asset — kept as a data URI.
const HERO_POSTER =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%221600%22%20height%3D%22900%22%20viewBox%3D%220%200%201600%20900%22%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230d0c0a%22/%3E%0A%3Cstop%20offset%3D%2255%25%22%20stop-color%3D%22%23070706%22/%3E%0A%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230a0908%22/%3E%0A%3C/linearGradient%3E%0A%3CradialGradient%20id%3D%22glowA%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgb%28172%2C139%2C86%29%22%20stop-opacity%3D%220.35%22/%3E%0A%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22rgb%28172%2C139%2C86%29%22%20stop-opacity%3D%220%22/%3E%0A%3C/radialGradient%3E%0A%3CradialGradient%20id%3D%22glowB%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22rgb%28172%2C139%2C86%29%22%20stop-opacity%3D%220.2%22/%3E%0A%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22rgb%28172%2C139%2C86%29%22%20stop-opacity%3D%220%22/%3E%0A%3C/radialGradient%3E%0A%3C/defs%3E%0A%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url%28%23bg%29%22/%3E%0A%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%22420%22%20fill%3D%22url%28%23glowA%29%22/%3E%0A%3Ccircle%20cx%3D%221600%22%20cy%3D%22900%22%20r%3D%22360%22%20fill%3D%22url%28%23glowB%29%22/%3E%0A%3C/svg%3E";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
// Nav items and copy are Bilal Ahmed's portfolio sections, not the original
// Prisma demo content. The background is a CSS gradient/grid/noise stack
// originally used a CSS gradient/grid/glow fallback because this video URL
// initially failed to load in testing; confirmed working on retry against
// the source demo (https://21st.dev/@rahil1202/components/prisma-hero), so
// it's restored here exactly as the original component specifies. The
// gradient/grid/glow layers stay underneath as a fallback background in
// case the video is slow to load or fails for a given viewer. The
// page-level fixed <Nav> (Nav.tsx) is the site's single navigation, so this
// component no longer renders its own — a second floating nav here would
// just duplicate it.
// True when the visitor has asked their browser/OS to conserve mobile data
// (Chrome's Data Saver -> navigator.connection.saveData, or the standards
// track prefers-reduced-data media feature). Read once at mount — this is
// about respecting an explicit user preference, not something that should
// silently change the video mid-session.
function wantsReducedData(): boolean {
  if (typeof navigator !== "undefined") {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return true;
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-reduced-data: reduce)").matches;
  }
  return false;
}

const PrismaHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedData] = useState(wantsReducedData);

  // Pause the looping background video whenever the tab is backgrounded or
  // the hero scrolls out of view — it has no visual effect while hidden but
  // would otherwise keep decoding frames and burning CPU/battery for the
  // rest of the session.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Visitors asking to conserve mobile data get the static poster/fallback
    // background instead of a forced 16MB fetch — same visual fallback this
    // component already shows while the video is still loading.
    if (reducedData) return;

    // Some mobile browsers (in-app webviews like Instagram/Facebook, some
    // Android builds with Data Saver on) still refuse the programmatic
    // play() call even though the element is muted + playsInline + autoplay.
    // Setting `muted` as a JS property (not just the JSX attribute) matches
    // what those browsers actually check, and retrying play() on the first
    // touch/click recovers the rest without needing a visible "tap to play"
    // control or a heavier preload.
    video.muted = true;

    let isIntersecting = true;
    const retryOnGesture = () => {
      video.play().catch(() => {});
    };
    const sync = () => {
      if (isIntersecting && !document.hidden) {
        video.play().catch(() => {
          document.addEventListener("touchstart", retryOnGesture, { once: true, passive: true });
          document.addEventListener("click", retryOnGesture, { once: true });
        });
      } else {
        video.pause();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(video);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      document.removeEventListener("touchstart", retryOnGesture);
      document.removeEventListener("click", retryOnGesture);
    };
  }, [reducedData]);

  return (
    <section className="h-full w-full">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">

        {/* Fallback background — shows behind/before the video */}
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#0d0c0a_0%,#070706_55%,#0a0908_100%)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(172,139,86,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(172,139,86,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 40%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 40%, transparent 90%)",
          }}
        />
        <div className="absolute -left-40 -top-56 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(172,139,86,0.35)_0%,transparent_70%)] blur-[110px]" />
        <div className="absolute -bottom-56 -right-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(172,139,86,0.2)_0%,transparent_70%)] blur-[110px]" />

        {/* Background video */}
        <video
          ref={videoRef}
          autoPlay={!reducedData}
          loop
          muted
          playsInline
          preload={reducedData ? "metadata" : "auto"}
          poster={HERO_POSTER}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate nofullscreen"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-2 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">

            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.07em] text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14.5vw] xl:text-[13.5vw] 2xl:text-[14vw]"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text="Bilal Ahmed" showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 lg:pb-10">

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs text-primary/70 sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
              >
                AI Engineer and web developer building AI agents, automation systems, and full-stack/WordPress websites — turning ideas into scalable digital products.
              </motion.p>

              <motion.a
                href="#projects"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-2 self-start rounded-full bg-primary py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
              >
                View Selected Work
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
                </span>
              </motion.a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
