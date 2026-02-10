import { BackgroundCarousel } from "@/components/BackgroundCarousel";
import { CTA } from "@/components/CTA";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { TextOverlay } from "@/components/TextOverlay";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden text-black dark:text-white">
      {/* Default: video background. Swap to mode=\"image\" when desired. */}
      <BackgroundCarousel
        mode="video"
        videoSrc="/videos/background.mp4" // TODO: provide real video in /public/videos
        posterSrc="/images/bg-1.jpg" // TODO: provide real poster image in /public/images
      />

      <div className="pointer-events-none absolute right-4 top-4 z-20 md:right-10 md:top-6">
        <div className="pointer-events-auto">
          <DarkModeToggle />
        </div>
      </div>

      <TextOverlay />
      <CTA />
    </main>
  );
}

