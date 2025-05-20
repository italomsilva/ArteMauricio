import Link from "next/link";
import styles from "./ErrorPage.module.css";
import { GiBrokenPottery } from "react-icons/gi";
import { ErrorResponse } from "@/app/entities/ErrorResponse";

export default function ErrorPage(props: ErrorResponse) {
  return (
    <section className={styles.error_section}>
        <i>
          <GiBrokenPottery />
        </i>
        <h1>Erro: {props.statusCode} - {props.error}</h1>
        <p>{props.message}</p>
        <Link href={props.backTo??"/"} className={styles.btn_back}>
          Retornar
        </Link>
    </section>
  );
}
