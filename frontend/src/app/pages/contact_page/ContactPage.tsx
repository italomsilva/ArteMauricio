import { useState } from "react";
import styles from "./ContactPage.module.css";
import MyInputAndLabel from "@/app/components/contact_form/MyInputAndLabel";
import MyButtonInput from "@/app/components/contact_form/MyButtonInput";

export default function ContactPage() {
  const [assunto, setAssunto]: any = useState();
  const [mensagem, setMensagem]: any = useState();
  const [nome, setNome]: any = useState();

  
  return (
    <section className={styles.main_section}>
      <div className={styles.div_text_one}>
        <h1>Gostou do nosso trabalho?</h1>
        <p>Entre em contato com a gente e vamos dar vida às suas idéias!</p>
      </div>
      <form className={styles.form_contact}
        onSubmit={(e) => {
          e.preventDefault();
          console.log();
          const fullMsg = `Olá, sou ${nome}\n${mensagem}`;
          window.location.href = `mailto:italomonteiro0085@gmail.com?subject=${encodeURIComponent(
            assunto
          )}&body=${encodeURIComponent(fullMsg)}`;
          setTimeout(()=>{window.location.href = "/contact/thanks"}, 5000);
        }}
      >
        <MyInputAndLabel
          id="nome"
          labelText="Nome: "
          placeHoldertext="Seu nome"
          type="text"
          text={nome}
          handleValue={setNome}
          classNm={styles.my_input}
        />
        <MyInputAndLabel
          id="assunto"
          labelText="Assunto: "
          placeHoldertext="Ex: Apoiador de celular"
          type="text"
          text={assunto}
          handleValue={setAssunto}
          classNm={styles.my_input}
        />
        <MyInputAndLabel
          id="msg"
          labelText="Mensagem: "
          placeHoldertext="Ex: Gostaria de um Apoiador personalizado..."
          type="message"
          text={mensagem}
          handleValue={setMensagem}
          classNm={styles.my_input}
        />
        <MyButtonInput classNm={styles.btn_form} value="submit" id="1" />
      </form>
    </section>
  );
}
