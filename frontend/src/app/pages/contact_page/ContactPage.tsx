import { useState } from "react";
import styles from "./ContactPage.module.css";
import MyInputAndLabel from "@/app/components/contact_form/MyInputAndLabel";

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
          placeHoldertext="Ex: Italo"
          type="text"
          text={nome}
          handleValue={(e)=>setNome(e.target.value)}
        />
        <MyInputAndLabel
          id="assunto"
          labelText="Assunto: "
          placeHoldertext="Ex: Apoiador de celular"
          type="text"
          text={assunto}
          handleValue={(e)=>setAssunto(e.target.value)}
        />
        <MyInputAndLabel
          id="msg"
          labelText="Mensagem: "
          placeHoldertext="Ex: Gostaria do Orçamento de um Quadro"
          type="message"
          text={mensagem}
          handleValue={(e)=>setMensagem(e.target.value)}
        />
        <input type="submit" value="Pegue" />
      </form>
    </section>
  );
}
