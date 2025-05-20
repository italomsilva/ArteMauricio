'use client'
import AboutSection from "./pages/main_page/about_section/AboutSection";
import HomeSection from "./pages/main_page/home_section/HomeSection";
import OptionCatalogSection from "./pages/main_page/options_catalog_section.ts/OptionsCatalogsection";

export default function Home() {
  return (
    <main>
      <HomeSection/>
      <OptionCatalogSection/>
      <AboutSection />
    </main>
  );
}
