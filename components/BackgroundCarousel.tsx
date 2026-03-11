"use client";

import { useEffect, useState } from "react";

type BackgroundCarouselProps = {
  /**
   * Fallback video source if no `videoSources` array is provided.
   */
  videoSrc: string;
  /**
   * Optional list of videos to randomly choose from on initial load.
   * A single item will behave like `videoSrc`.
   */
  videoSources?: string[];
  /**
   * Scales the video behind the mask without changing mask size.
   * Increase to "zoom in" so footage reaches letter edges.
   */
  videoScale?: number;
  /** CSS object-position value (e.g. "center", "50% 40%"). */
  videoObjectPosition?: string;
};

export const BackgroundCarousel = (props: BackgroundCarouselProps) => {
  const scale = props.videoScale ?? 1.22;
  const objectPosition = props.videoObjectPosition ?? "center";
  const hasVideoList =
    Array.isArray(props.videoSources) && props.videoSources.length > 0;
  const length = hasVideoList && props.videoSources ? props.videoSources.length : 1;
  // Use 0 on first render so server and client match (avoids hydration error).
  // After mount, pick a random video so each full load gets a different one.
  const [randomIndex, setRandomIndex] = useState(0);
  useEffect(() => {
    if (hasVideoList && length > 0) setRandomIndex(Math.floor(Math.random() * length));
  }, [hasVideoList, length]);
  const chosenVideoSrc =
    hasVideoList && props.videoSources
      ? props.videoSources[randomIndex]
      : props.videoSrc;

  const isMov = /\.mov$/i.test(chosenVideoSrc);
  const sourceType = isMov ? "video/quicktime" : "video/mp4";

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-white dark:bg-black">
      <div
        className="relative aspect-[4/1] overflow-hidden logo-video-mask"
        style={{ width: "var(--logo-width)" }}
      >
        <video
          key={chosenVideoSrc}
          className="h-full w-full object-cover origin-center transform-gpu"
          autoPlay
          muted
          loop
          playsInline
          style={{
            transform: `scale(${scale})`,
            objectPosition
          }}
        >
          <source src={chosenVideoSrc} type={sourceType} />
        </video>
      </div>
    </div>
  );
};

