'use client'

import TitleSection from "@/app/components/TitleSection";
import styles from "./OptionsCatalogSection.module.css";
import { IoHomeSharp } from "react-icons/io5";
import { IoGiftSharp } from "react-icons/io5";
import { IoLibrarySharp } from "react-icons/io5";
import { HiLightBulb } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState, useEffect } from "react";
import classNames from "classnames";

export default function OptionCatalogSection() {
  const catalogsOptions = [
    {
      icon: <IoGiftSharp />,
      title: "Presentes",
      link: "#",
      text: "Explore nossa coleção de lembranças autênticas, feitas à mão com materiais naturais. Cada peça captura a essência tropical, perfeita para presentear ou guardar como uma recordação especial.",
    },
    {
      icon: <IoHomeSharp />,
      title: "Para o Lar",
      link: "#",
      text: "Descubra itens exclusivos para decorar e organizar sua casa. Desde quadros até porta-chaves, nossos produtos trazem um toque de charme rústico e originalidade para qualquer ambiente.",
    },
    {
      icon: <HiLightBulb />,
      title: "Personalizados",
      link: "#",
      text: "Na arteMauricio, você pode criar algo verdadeiramente único. Personalize nossos produtos com nomes, frases ou desenhos especiais, e transforme qualquer peça em um presente inesquecível.",
    },
    {
      icon: <IoLibrarySharp />,
      title: "Catálogo completo",
      link: "#",
      text: "Navegue pelo nosso catálogo completo e descubra a variedade de produtos artesanais que oferecemos. De itens decorativos a utilitários, temos algo para todos os gostos e estilos.",
    },
  ];
  const [ativado, setAtivado] = useState(false);
  const [indexClicked, setIndexClicked] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleArrowClick=(index:number)=>{
    if(indexClicked==index){
      setAtivado(!ativado);
    } else {
      setIndexClicked(index);
      setAtivado(true);
    }
  }

  return ( isLoading == true? <section className={styles.loading}><div><AiOutlineLoading3Quarters/></div></section>:
    <section className={styles.section} id="catalog-section">
      <TitleSection
        text="Lembranças, Decorações, Personalizados e muito mais na ArteMauricio"
        highLight="ArteMauricio"
        highLightColor="#4dd3cb"
        textColor="#1F363D"
        key={1}
      ></TitleSection>
      <nav>
        <ul>
          {catalogsOptions.map((card, index) => {
            return (
              <li key={index}>
                <a href={card.link} className={styles.li_cont_one}>
                  <div className={styles.icon_and_text}>
                    <i>{card.icon}</i>
                    <a href={card.link}>{card.title}</a>
                  </div>
                  <div className={classNames(styles.icon_arrow, (ativado==true? styles.ativado: null))}>
                    <i onClick={(evt)=>{evt.preventDefault();handleArrowClick(index)}}>
                      <MdKeyboardArrowDown />
                    </i>
                  </div>
                </a>
                <div className={classNames(styles.li_cont_two,(index == indexClicked? (ativado==true? styles.ativado: null): null))}>
                  <p>{card.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
