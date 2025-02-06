import styles from "./LoginPage.module.css";
import MyInputAndLabel from "../../components/contact_form/MyInputAndLabel";
import MyButtonInput from "@/app/components/contact_form/MyButtonInput";
export default function LoginPage() {
  return (
    <section className={styles.main_section}>
      <form action="https://dontpad.com/aloitzin" method="GET" onSubmit={undefined}>
      <MyInputAndLabel
        id="ilogin"
        type="text"
        classNm={styles.textinput}
        handleValue={undefined}
        key={1}
        labelText="Login: "
        placeHoldertext=""
      ></MyInputAndLabel>
            <MyInputAndLabel
        id="ilogin"
        type="password"
        classNm={styles.textinput}
        handleValue={undefined}
        key={1}
        labelText="Senha: "
        placeHoldertext=""
      ></MyInputAndLabel>
      <MyButtonInput id="1"></MyButtonInput>

      </form>
    </section>
  );
}
