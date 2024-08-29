import logo from "../../../images/logo.png";
import styles from "./HomeSection.module.css";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
export default function homeSection() {
  return (
    <section id="home-section" className={styles.section_home}>
      <div className={styles.maincont}>
        <div className={styles.main_cont_home}>
          <div className={styles.div_txt}>
            <h1>ArteMauricio</h1>
            <p>Inspiração Litorânea para o Seu Lar</p>
          </div>
          <div className={styles.div_img}>
            <img src={logo.src} alt="" />
          </div>
        </div>
        <div className={styles.div_btns}>
          <a className={styles.btn_one} href="#catalog-section">
            Catalogo
          </a>
          <a className={styles.btn_two} href="#contato-section">
            Contato
          </a>
        </div>
      </div>
      <div className={styles.footer_home}>
      <span><MdKeyboardDoubleArrowUp/></span>
      </div>
    </section>
  );
}
