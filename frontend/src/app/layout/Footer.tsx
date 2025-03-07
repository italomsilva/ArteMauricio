import styles from "./footer.module.css";
import { FaInstagram, FaWhatsapp, FaMailBulk } from "react-icons/fa";

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <div className={styles.st}>
                <h2>Siga-nos nas redes sociais</h2>
                <i><FaInstagram/></i>
                <h2>Contate-nos</h2>
                <i><FaWhatsapp/></i>
                <i><FaMailBulk/></i>
            </div>
            <div className={styles.nd}>
            <p>Website feito por <a href="/adm/login">Dev.Italo</a></p>
            </div>
        </footer>
    )
}