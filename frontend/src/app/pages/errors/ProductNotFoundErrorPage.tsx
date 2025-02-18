import Link from "next/link";
import styles from "./ProductNotFoundErrorPage.module.css";
import { GiBrokenPottery } from "react-icons/gi";

export default function ProductNotFoundErrorPage() {
  return (
    <section className={styles.error_section}>
        <i>
          <GiBrokenPottery />
        </i>
        <p>Produto não encontrado</p>
        <Link href="/catalog" className={styles.btn_back}>
          Retornar ao Catálogo
        </Link>
    </section>
  );
}
