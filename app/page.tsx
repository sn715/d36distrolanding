import { BackgroundCarousel } from "@/components/BackgroundCarousel";
import { HeroFooter } from "@/components/HeroFooter";

export default function HomePage() {
  return (
    <main className="relative flex h-screen min-h-0 flex-col overflow-hidden text-black dark:text-white">
      <BackgroundCarousel
        mode="video"
        videoSrc="/videos/background.mp4"
        posterSrc="/images/bg-1.jpg"
      />

      <HeroFooter />
    </main>
  );
}

