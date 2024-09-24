import TitleSection from "@/app/components/TitleSection";
import MyButton from "@/app/components/MyButton";
import styles from "./AboutSection.module.css"
export default function AboutSection() {
  return (
    <section id="section_sobre" className={styles.section}>
      <TitleSection
        text="Quem somos? Saiba um pouco mais sobre a ArteMauricio"
        highLight="ArteMauricio"
        highLightColor="#4dd3cb"
        textColor="#000000"
       key={300}
      />
      <div className={styles.image_cont}>
        <MyButton classNm={null} link="#" text="Conheça nossa história"></MyButton>
      </div>
      <h3>Onde a Natureza Encontra a Criatividade</h3>
      <p>Explore nossa coleção de lembranças autênticas, feitas à mão com materiais naturais. Cada peça captura a essência tropical, perfeita para presentear ou guardar como uma recordação especial.</p>
      <div className={styles.btn}>
        <a href=""></a>
        <a href=""></a>
      </div>
    </section>
  );
}
