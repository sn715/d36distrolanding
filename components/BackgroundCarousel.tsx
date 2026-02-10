"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CarouselItem = {
  src: string;
  alt: string;
};

type BackgroundCarouselProps =
  | {
      mode: "image";
      intervalMs?: number;
      images?: CarouselItem[];
    }
  | {
      mode: "video";
      videoSrc: string;
      posterSrc?: string;
      /**
       * Scales the video behind the mask without changing mask size.
       * Increase to "zoom in" so footage reaches letter edges.
       */
      videoScale?: number;
      /** CSS object-position value (e.g. "center", "50% 40%"). */
      videoObjectPosition?: string;
    };

const DEFAULT_IMAGES: CarouselItem[] = [
  // TODO: Replace with real D36 background images in /public/images
  { src: "/images/bg-1.jpg", alt: "Architectural background 1" },
  { src: "/images/bg-2.jpg", alt: "Architectural background 2" },
  { src: "/images/bg-3.jpg", alt: "Architectural background 3" }
];

export const BackgroundCarousel = (props: BackgroundCarouselProps) => {
  if (props.mode === "video") {
    const scale = props.videoScale ?? 1.22;
    const objectPosition = props.videoObjectPosition ?? "center";

    return (
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-white dark:bg-black">
        {/* Centered masked video: only the logo shape reveals the video */}
        <div className="relative w-[80vw] aspect-[4/1] overflow-hidden logo-video-mask">
          <video
            className="h-full w-full object-cover origin-center transform-gpu"
            autoPlay
            muted
            loop
            playsInline
            poster={props.posterSrc}
            style={{
              transform: `scale(${scale})`,
              objectPosition
            }}
          >
            <source src={props.videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }

  const intervalMs = props.intervalMs ?? 7000;
  const images = props.images ?? DEFAULT_IMAGES;

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered || images.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [hovered, intervalMs, images.length]);

  const current = images[index];

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div key={current.src} className="absolute inset-0 animate-fade-in">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/50" />
      </div>
    </div>
  );
};

