import type { FC } from "react";
import { DarkModeToggle } from "./DarkModeToggle";

type HeroFooterProps = {
  subtitle?: string;
  platformUrl?: string;
  instagramHandle?: string;
};

/**
 * Bottom bar aligned with the logo cutout: left = "D36 DISTRIBUTION", right = CTA.
 * Uses CSS variable --logo-width so changing it in globals.css keeps logo and this bar in sync.
 */
export const HeroFooter: FC<HeroFooterProps> = ({
  subtitle,
  platformUrl = "https://platform.d36distro.com",
  instagramHandle = "d36world"
}) => {
  const instagramUrl = `https://www.instagram.com/${instagramHandle}/`;

  return (
    <div
      className="pointer-events-none absolute left-0 right-0 bottom-4 px-3 pb-[env(safe-area-inset-bottom)] md:bottom-8 md:px-0 animate-fade-in-up"
      style={{ animationDelay: "0.4s" }}
    >
      {/* Same width as logo, centered; change --logo-width in globals.css to match logo */}
      <div
        className="pointer-events-auto mx-auto flex items-end justify-between gap-4"
        style={{ width: "var(--logo-width)", maxWidth: "100%", minWidth: 0 }}
      >
        {/* Left: text aligned with logo left edge */}
        <div className="flex flex-col gap-1 text-left">
          <h1 className="font-univers text-base font-normal tracking-tight text-black drop-shadow-sm md:text-lg lg:text-xl dark:text-white">
            D36 DISTRIBUTION
          </h1>
          {subtitle && (
            <p className="max-w-md text-xs text-neutral-700/80 drop-shadow-sm md:text-sm dark:text-neutral-300/80">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right: CTA in one row (Enter / Enter Platform, IG, mode toggle) */}
        <div className="flex shrink-0 flex-row items-center gap-2">
          <a
            href={platformUrl}
            id="platform"
            className="font-univers inline-flex shrink-0 items-center justify-center rounded-full border border-black/30 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-black backdrop-blur-sm transition hover:border-black hover:bg-white md:px-6 md:text-[0.7rem] dark:border-white/40 dark:bg-white/10 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
          >
            <span className="md:hidden">Enter</span>
            <span className="hidden md:inline">Enter Platform</span>
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit D36 Distribution on Instagram"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/25 bg-white/70 text-black/70 backdrop-blur-sm transition hover:border-black hover:text-black dark:border-white/40 dark:bg-black/40 dark:text-white/80 dark:hover:border-white dark:hover:text-white"
          >
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
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};
