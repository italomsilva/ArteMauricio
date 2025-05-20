import styles from "./footer.module.css";
import {
  FaPaintBrush,
  FaInstagram,
  FaWhatsapp,
  FaMailBulk,
} from "react-icons/fa";
import { socialLinks } from "@/app/data/socialLinks";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.st}>
        <h2>Siga-nos nas redes sociais</h2>
        <a href={socialLinks.instagram} target="_blank">
          <FaInstagram />
        </a>
        <h2>Contate-nos</h2>
        <a href={socialLinks.whatsApp} target="_blank">
          <FaWhatsapp />
        </a>
        <a href={socialLinks.email} target="_blank">
          <FaMailBulk />
        </a>
      </div>
      <div className={styles.nd}>
        <p>
          <a href="/adm/login">
            <FaPaintBrush />
          </a>
          Website feito por{" "}
          <a href="https://devitalo-about.vercel.app/" target="_blank">
            Dev.Italo
          </a>
        </p>
      </div>
    </footer>
  );
}
