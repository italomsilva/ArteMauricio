import styles from "./LoginPage.module.css";
import MyInputAndLabel from "../../components/contact_form/MyInputAndLabel";
import MyButtonInput from "@/app/components/contact_form/MyButtonInput";
import { login } from "@/app/controller/auth/login";
import { useState } from "react";

export default function LoginPage() {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userToken = await login(loginValue, passwordValue);
    if (userToken) {
      setToken(userToken);
      localStorage.setItem("authToken", userToken);
      alert("Login realizado com sucesso!");
      setTimeout(() => {
        window.location.href = "/adm/products";
      }, 500);
    } else {
      alert("Erro no login. Verifique suas credenciais.");
    }
  };

  return (
    <section className={styles.main_section}>
      <form onSubmit={(e)=>handleSubmit(e)} className={styles.form}>
        <MyInputAndLabel
          id="ilogin"
          type="text"
          classNm={styles.textinput}
          handleValue={setLoginValue} 
          labelText="Login: "
          placeHoldertext=""
        />
        <MyInputAndLabel
          id="ipassword"
          type="password"
          classNm={styles.textinput}
          handleValue={setPasswordValue} 
          labelText="Senha: "
          placeHoldertext=""
        />
        <MyButtonInput id="1" classNm={styles.btn_submit} value="Entrar" />
      </form>
    </section>
  );
}
