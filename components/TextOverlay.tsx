import type { FC } from "react";

type TextOverlayProps = {
  subtitle?: string;
};

export const TextOverlay: FC<TextOverlayProps> = ({ subtitle }) => {
  return (
    <div
      className="pointer-events-none absolute bottom-6 left-4 right-4 md:bottom-10 md:left-10 md:right-auto animate-fade-in-up"
      style={{ animationDelay: "0.4s" }}
    >
      <div className="flex flex-col gap-1 text-left">
        <h1 className="text-1xl font-semibold tracking-tight text-black drop-shadow-sm md:text-3xl lg:text-5xl dark:text-white">
          D36 DISTRIBUTION
        </h1>
        {subtitle && (
          <p className="max-w-md text-xs text-neutral-700/80 drop-shadow-sm md:text-sm dark:text-neutral-300/80">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

