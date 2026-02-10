"use client";

import React from "react";

type LogoCutoutProps = {
  /** Adjusts overall logo size; responsive via Tailwind classes from parent */
  className?: string;
};

/**
 * Logo cutout "window" using CSS mask.
 * The full-viewport background is rendered underneath; this element simply
 * reveals the background through the D36 logo shape.
 *
 * For best results, use a solid white logo with transparent background at
 * /public/images/d36-logo.png. White areas will be visible, transparent areas
 * will be masked out.
 */
export const LogoCutout: React.FC<LogoCutoutProps> = ({ className }) => {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div
        className={`aspect-[4/1] w-[90vw] min-w-[220px] md:w-[40vw] ${className ?? ""}`}
        style={{
          WebkitMaskImage: "url(/images/d36-logo.png)",
          maskImage: "url(/images/d36-logo.png)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          // Make the logo shape visible against the dark background.
          // The mask ensures only the logo shape is filled.
          backgroundColor: "#000000"
        }}
        aria-hidden="true"
      />
    </div>
  );
};

