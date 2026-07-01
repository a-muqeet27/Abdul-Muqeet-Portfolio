import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollProgress, BackToTop } from "@/components/layout/ScrollProgress";
import { HomeSection } from "@/components/sections/Home";
import { AboutSection } from "@/components/sections/About";
import { EducationSection } from "@/components/sections/Education";
import { ExperienceSection } from "@/components/sections/Experience";
import { ProjectsSection } from "@/components/sections/Projects";
import { TechnologiesSection } from "@/components/sections/Technologies";
import { DownloadSection } from "@/components/sections/Download";
import { ConnectSection } from "@/components/sections/Connect";

export default function Home() {
  return (
    <SmoothScroll>
      <PageTransition>
        <ScrollProgress />
        <Navbar />
        <main>
          <HomeSection />
          <AboutSection />
          <EducationSection />
          <ExperienceSection />
          <ProjectsSection />
          <TechnologiesSection />
          <DownloadSection />
          <ConnectSection />
        </main>
        <Footer />
        <BackToTop />
      </PageTransition>
    </SmoothScroll>
  );
}
