import { useState } from "react";
import styles from "./ContactPage.module.css";
import MyInputAndLabel from "@/app/components/contact_form/MyInputAndLabel";
import MyButtonInput from "@/app/components/contact_form/MyButtonInput";
import { socialLinks } from "@/app/data/socialLinks";

export default function ContactPage() {
  const [assunto, setAssunto]: any = useState();
  const [mensagem, setMensagem]: any = useState();
  const [nome, setNome]: any = useState();

  return (
    <section className={styles.main_section}>
      <div className={styles.div_one}>
        <div className={styles.div_text_one}>
          <h1>Gostou do nosso trabalho?</h1>
          <p>Entre em contato com a gente e vamos dar vida às suas idéias!</p>
        </div>
        <form
          className={styles.form_contact}
          onSubmit={(e) => {
            e.preventDefault();
            console.log();
            const fullMsg = `Olá, me chamo ${nome}\nGostaria de falar sobre: ${assunto}\n\n${mensagem}`;
            window.location.href = `${socialLinks.whatsApp}?text=${encodeURIComponent(fullMsg)}`;
            setTimeout(() => {
              window.location.href = `/thanks?message=${encodeURIComponent(
                "Obrigado por entrar em contato!Em breve entraremos em contato com você."
              )}`;
            }, 5000);
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
          <MyButtonInput classNm={styles.btn_form} value="Enviar" id="1" />
        </form>
      </div>
      <div className={styles.div_two}>
        <div className={styles.div_text_two}>
          <h1>Do nosso ateliê para a sua vida!</h1>
          <p>
            Cada peça da arteMauricio carrega a essência do nosso litoral e o
            cuidado de uma família apaixonada pelo que faz. Seja uma lembrança,
            um presente ou uma peça personalizada, queremos que você sinta o
            valor de algo feito à mão. Fale com a gente e descubra como
            transformar sua ideia em arte!
          </p>
        </div>
      </div>
    </section>
  );
}
