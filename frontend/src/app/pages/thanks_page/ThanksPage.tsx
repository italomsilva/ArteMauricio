"use client"
import { TbMoodHappy } from "react-icons/tb";
import styles from "./ThanksPage.module.css";
export default function ThanksPage(props: { message: string }) {
  return (
    <section className={styles.main_section}>
      <h1>{props.message}</h1>
      <i>
        <TbMoodHappy />
      </i>
    </section>
  );
}
