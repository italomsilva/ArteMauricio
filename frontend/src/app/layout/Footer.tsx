import styles from "./footer.module.css";
import { FaInstagram, FaWhatsapp, FaMailBulk } from "react-icons/fa";

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <h2>Siga-nos nas redes sociais</h2>
            <i><FaInstagram/></i>
            <h2>Contate-nos</h2>
            <i><FaWhatsapp/></i>
            <i><FaMailBulk/></i>
            <p>Website feito por Dev.Italo</p>
        </footer>
    )
}