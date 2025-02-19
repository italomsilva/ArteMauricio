import TitleSection from "@/app/components/TitleSection";
import MyButton from "@/app/components/MyButton";
import styles from "./AboutSection.module.css";
import Link from "next/link";
export default function AboutSection() {
  return (
    <section id="section_sobre" className={styles.section}>
      <TitleSection
        text="Quem somos? Saiba um pouco mais sobre a ArteMauricio"
        highLight="ArteMauricio"
        highLightColor="var(--st-color)"
        textColor="var(--nd-color)"
        uniqueKey={300}
      />
      <div className={styles.image_cont}>
        <MyButton classNm={null} link="#">
          Conheça nossa história
        </MyButton>
      </div>
      <h3>Onde a Natureza Encontra a Criatividade</h3>
      <p>
        Explore nossa coleção de lembranças autênticas, feitas à mão com
        materiais naturais. Cada peça captura a essência tropical, perfeita para
        presentear ou guardar como uma recordação especial.
      </p>
      <div className={styles.btn}>
        <MyButton classNm={styles.mybtn} link="/catalog">
          Acessar Catálogo
        </MyButton>
      </div>
      <h3>Algo mais?</h3>
      <p>
        Para orçamentos, dúvidas, parcerias e etc. Entre em contato conosco
        através do nosso <a href="">Instagram</a> ou se preferir, acesse nossa{" "}
        <Link href="/contact">Página de Contato</Link>.
      </p>
      <div></div>
    </section>
  );
}
