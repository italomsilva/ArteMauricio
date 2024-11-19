
import TitleSection from "@/app/components/TitleSection";
import styles from "./OptionsCatalogSection.module.css";
import { IoHomeSharp } from "react-icons/io5";
import { IoGiftSharp } from "react-icons/io5";
import { IoLibrarySharp } from "react-icons/io5";
import { HiLightBulb } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState, useEffect } from "react";

export default function OptionCatalogSection() {
  const catalogsOptions = [
    {
      icon: <IoGiftSharp />,
      title: "Presentes",
      link: "#",
    },
    {
      icon: <IoHomeSharp />,
      title: "Para o Lar",
      link: "#",
    },
    {
      icon: <HiLightBulb />,
      title: "Personalizados",
      link: "#",
    },
    {
      icon: <IoLibrarySharp />,
      title: "Catálogo completo",
      link: "#",
    },
  ];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return ( isLoading == true? <section className={styles.loading}><div><AiOutlineLoading3Quarters/></div></section>:
    <section className={styles.section} id="catalog-section">
      <TitleSection
        text="Lembranças, Decorações, Personalizados e muito mais na ArteMauricio"
        highLight="ArteMauricio"
        highLightColor="#4dd3cb"
        textColor="#1F363D"
        uniqueKey={1}
      ></TitleSection>
      <nav>
        <ul>
          {catalogsOptions.map((card, index) => {
            return (
              <li key={index}>
                <a href={card.link} className={styles.li_cont_one}>
                  <div className={styles.icon_and_text}>
                    <i>{card.icon}</i>
                    <h2>{card.title}</h2>
                  </div>
                  <div>
                    <MdKeyboardArrowRight className={styles.icon_arrow}/>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
