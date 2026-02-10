import type { FC } from "react";

type CTAProps = {
  platformUrl?: string;
  instagramHandle?: string;
};

export const CTA: FC<CTAProps> = ({
  platformUrl = "https://platform.d36distro.com",
}) => {
  const instagramUrl = `https://www.instagram.com/d36world/`;

  return (
    <div
      className="pointer-events-none absolute bottom-6 right-4 flex flex-col items-end gap-3 md:bottom-10 md:right-10 md:flex-row md:items-center animate-fade-in-up"
      style={{ animationDelay: "0.6s" }}
    >
      <a
        href={platformUrl}
        id="platform"
        className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-black/30 bg-white/70 px-6 py-2 text-xs font-medium uppercase tracking-[0.25em] text-black backdrop-blur-sm transition hover:border-black hover:bg-white md:text-[0.7rem] dark:border-white/40 dark:bg-white/10 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
      >
        Enter Platform
      </a>

      <a
        href={instagramUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Visit D36 Distribution on Instagram"
        className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/25 bg-white/70 text-black/70 backdrop-blur-sm transition hover:border-black hover:text-black dark:border-white/40 dark:bg-black/40 dark:text-white/80 dark:hover:border-white dark:hover:text-white"
      >
        {/* Simple Instagram glyph – replace with custom SVG if desired */}
        <span className="sr-only">Instagram</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="0.8" fill="currentColor" />
        </svg>
      </a>
    </div>
  );
};

