"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const videoRef = useRef<HTMLVideoElement | null>(null);
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

  const attemptPlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    // Some mobile browsers won't honor autoplay reliably without an explicit play().
    // This is safe because we're muted + playsInline.
    const p = el.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // Ensure the new src is loaded, then try to play.
    el.load();
    attemptPlay();
  }, [chosenVideoSrc, attemptPlay]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-white dark:bg-black">
      <div
        className="relative aspect-[4/1] overflow-hidden logo-video-mask"
        style={{ width: "var(--logo-width)" }}
      >
        <video
          key={chosenVideoSrc}
          ref={videoRef}
          className="h-full w-full object-cover origin-center transform-gpu"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          onCanPlay={attemptPlay}
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

