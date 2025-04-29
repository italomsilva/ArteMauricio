import styles from "./footer.module.css";
import { FaInstagram, FaWhatsapp, FaMailBulk } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.st}>
        <h2>Siga-nos nas redes sociais</h2>
        <a href="https://www.instagram.com/arte_mauricio_" target="_blank">
          <FaInstagram />
        </a>
        <h2>Contate-nos</h2>
        <a href="" target="_blank">
          <FaWhatsapp />
        </a>
        <i>
          <FaMailBulk />
        </i>
      </div>
      <div className={styles.nd}>
        <p>
          Website feito por <a href="/adm/login">Dev.Italo</a>
        </p>
      </div>
    </footer>
  );
}
