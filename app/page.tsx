import { BackgroundCarousel } from "@/components/BackgroundCarousel";
import { HeroFooter } from "@/components/HeroFooter";

export default function HomePage() {
  return (
    <main className="relative flex h-[100svh] min-h-[100svh] flex-col overflow-hidden text-black dark:text-white">
      <BackgroundCarousel
        videoSrc="/videos/converted_renao.mp4"
        videoSources={[
          "/videos/converted_renao.mp4",
          "/videos/converted_zayn.mp4",
          "/videos/converted_rahul.mp4",
          "/videos/converted_hasan.mp4",  
        ]}
      />

      <HeroFooter />
    </main>
  );
}

