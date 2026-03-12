"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundCarouselProps = {
  videoSrc: string;
  videoSources?: string[];
  videoScale?: number;
  videoObjectPosition?: string;
};

export const BackgroundCarousel = (props: BackgroundCarouselProps) => {
  const scale = props.videoScale ?? 1.22;
  const objectPosition = props.videoObjectPosition ?? "center";
  const hasVideoList =
    Array.isArray(props.videoSources) && props.videoSources.length > 0;
  const length =
    hasVideoList && props.videoSources ? props.videoSources.length : 1;

  const [randomIndex, setRandomIndex] = useState(0);
  const [src, setSrc] = useState(props.videoSrc);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pick random video after mount (avoids hydration mismatch)
  useEffect(() => {
    if (hasVideoList && props.videoSources && length > 0) {
      const idx = Math.floor(Math.random() * length);
      setRandomIndex(idx);
      setSrc(props.videoSources[idx]);
    } else {
      setSrc(props.videoSrc);
    }
  }, [hasVideoList, length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Programmatically play whenever src changes — required for mobile browsers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset and reload so the new src is picked up without remounting
    video.load();

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked — silently ignore; the video stays paused
      });
    };

    // Some browsers fire canplay synchronously, others asynchronously
    if (video.readyState >= 3) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", tryPlay);
    };
  }, [src]);

  const isMov = /\.mov$/i.test(src);
  const sourceType = isMov ? "video/quicktime" : "video/mp4";

  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center bg-white dark:bg-black">
      <div
        className="relative aspect-[4/1] overflow-hidden logo-video-mask"
        style={{ width: "var(--logo-width)" }}
      >
        <video
          ref={videoRef}
          // NO key prop — avoids remounting which breaks mobile autoplay
          className="h-full w-full object-cover origin-center transform-gpu"
          autoPlay
          muted
          loop
          playsInline
          // Needed for older iOS Safari
          {...({ "webkit-playsinline": "true" } as Record<string, string>)}
          preload="auto"
          style={{
            transform: `scale(${scale})`,
            objectPosition,
          }}
        >
          <source src={src} type={sourceType} />
        </video>
      </div>
    </div>
  );
};