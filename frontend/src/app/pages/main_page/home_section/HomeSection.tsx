import logo from "../../../images/logo.png";
import styles from "./HomeSection.module.css";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import MyButton from "@/app/components/MyButton";
import Link from "next/link";
export default function homeSection() {
  return (
    <section id="home" className={styles.section_home}>
      <div></div>
      <div className={styles.maincont}>
        <div className={styles.main_cont_home}>
          <div className={styles.div_txt}>
            <h1>ArteMauricio</h1>
            <p>Inspiração Litorânea transformada em Arte</p>
          </div>
          <div className={styles.div_img}>
            <img src={logo.src} alt="" />
          </div>
        </div>
        <div className={styles.div_btns}>
          <MyButton classNm={styles.btn_one} link="/catalog">
            Catálogo
          </MyButton>
          <MyButton classNm={styles.btn_two} link="/contact">
            Contato
          </MyButton>
        </div>
      </div>
      <div className={styles.footer_home}>
        <span>
          <MdKeyboardDoubleArrowUp />
        </span>
      </div>
    </section>
  );
}
