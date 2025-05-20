"use client";

import { useState } from "react";
import styles from "./CreateProductPage.module.css";
import MyInputAndLabel from "@/app/components/contact_form/MyInputAndLabel";
import { createProduct } from "@/app/controller/products/CreateProduct";

export default function CreateProductPage() {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0.0);
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = (await localStorage.getItem("authToken")) ?? "";
    const result = await createProduct({
      token,
      title,
      price,
      description,
      mainPhoto: file ?? null,
    });
    if (result) {
      alert("Produto adicionado com Sucesso!");
    } else {
      alert("Algo deu errado, tente novamente.");
    }
    window.history.back();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <section className={styles.main_section}>
      <form onSubmit={handleSubmit} className={styles.form_add_product}>
        <h1>Adicionar novo Produto</h1>
        <MyInputAndLabel
          id="ititle"
          type="text"
          labelText="Nome:"
          handleValue={setTitle}
          classNm={styles.inp_txt}
        />
        <div className={styles.inp_txt}>
          <label htmlFor="iprice">Preço:</label>
          <input
            type="number"
            id="iprice"
            name="niprice"
            placeholder="Exemplo: 10.50"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <MyInputAndLabel
          id="idescr"
          type="text"
          labelText="Descrição:"
          handleValue={setDescription}
          classNm={styles.inp_txt}
        />
        <div className={styles.inp_file}>
          <label htmlFor="iifile">Escolher Imagem Principal</label>
          <input
            type="file"
            name="file"
            id="iifile"
            onChange={(e) => handleFileChange(e, setFile)}
            accept="image/*"
            hidden
          />
          <p>
            Arquivo selecionado: <strong>{file?.name}</strong>
          </p>
        </div>
        <input type="submit" value="Salvar" className={styles.btn_sub} />
      </form>
    </section>
  );
}
