import TitleSection from "@/app/components/TitleSection";
import styles from "./OptionsCatalogSection.module.css";
import { IoHomeSharp, IoGiftSharp, IoLibrarySharp } from "react-icons/io5";
import { HiLightBulb } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function OptionCatalogSection() {
  const catalogsOptions = [
    { icon: IoGiftSharp, title: "Presentes", link: "/catalog/?categoria=presentes" },
    { icon: IoHomeSharp, title: "Para o Lar", link: "/catalog/?categoria=paraCasa" },
    { icon: HiLightBulb, title: "Personalizados", link: "/catalog/?categoria=personalizados" },
    { icon: IoLibrarySharp, title: "Catálogo completo", link: "/catalog" },
  ];

  return (
    <section className={styles.section} id="catalog-section">
      <TitleSection
        text="Lembranças, Decorações, Personalizados e muito mais na ArteMauricio"
        highLight="ArteMauricio"
        highLightColor="var(--st-color)"
        textColor="var(--nd-color)"
        uniqueKey={1}
      />
      <nav>
        <ul>
          {catalogsOptions.map(({ icon: Icon, title, link }, index) => (
            <li key={index}>
              <a href={link} className={styles.li_cont_one}>
                <div className={styles.icon_and_text}>
                  <i><Icon /></i>
                  <h2>{title}</h2>
                </div>
                <div>
                  <MdKeyboardArrowRight className={styles.icon_arrow} />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
