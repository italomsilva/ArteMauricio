"use client";

import {
  getProductById,
  GetProductByIdOutput,
} from "@/app/controller/products/getProductById";
import styles from "./EditProductPage.module.css";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import ProductNotFoundErrorPage from "../errors/ProductNotFoundErrorPage";
import { useState, useEffect } from "react";
import MyLoading from "@/app/components/loading/MyLoading";
import MyInputAndLabel from "@/app/components/contact_form/MyInputAndLabel";
import { editProduct } from "@/app/controller/products/editProduct";
import { deleteProduct } from "@/app/controller/products/deleteProduct";

async function loadProduct(id: string): Promise<GetProductByIdOutput | null> {
  return await getProductById(id);
}

export default function EditProductPage(props: { id: string }) {
  const [product, setProduct] = useState<GetProductByIdOutput | null>(null);
  const [loading, setLoading] = useState(true);

  const [inpTitle, setInpTitle] = useState("");
  const [inpPrice, setInpPrice] = useState("");
  const [inpDescription, setInpDescription] = useState("");
  const [inpMainPhoto, setInpMainPhoto] = useState<File | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const loadedProduct = await loadProduct(props.id);
      if (loadedProduct) {
        setProduct(loadedProduct);
        setInpTitle(loadedProduct.title);
        setInpPrice("" + loadedProduct.price);
        setInpDescription(loadedProduct.description);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [props.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setInpMainPhoto(e.target.files[0]);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken") ?? "";
    const result = await deleteProduct(product!.id, token);
    if (result) {
      alert("Produto deletado com sucesso!");
    } else {
      alert("Erro ao excluir");
    }
    history.back()
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!product) return;

    const token = localStorage.getItem("authToken") ?? "";

    const data = await editProduct({
      productId: product.id,
      token: token,
      title: inpTitle,
      price: parseFloat(inpPrice),
      description: inpDescription,
      mainPhoto: inpMainPhoto ?? null,
    });

    alert("Produto atualizado com sucesso!");
  };

  return (
    <section className={styles.main_div}>
      {loading ? (
        <div className={styles.div_loading}>
          <MyLoading color="var(--st-color)" size="30vw"></MyLoading>
        </div>
      ) : product ? (
        <section className={styles.main_section}>
          <form className={styles.form_edit} onSubmit={handleSubmit}>
            <div className={styles.div_title}>
              <h2>Editar produto</h2>
            </div>
            <div className={styles.div_inputs}>
              <MyInputAndLabel
                id="ititle"
                type="text"
                labelText="Título"
                text={inpTitle}
                handleValue={setInpTitle}
                classNm={styles.comp_inputs}
              />
              <MyInputAndLabel
                id="iprice"
                type="text"
                labelText="Preço"
                text={inpPrice}
                classNm={styles.comp_inputs}
                handleValue={setInpPrice}
              />
              <MyInputAndLabel
                id="idescription"
                type="text"
                labelText="Descrição"
                text={inpDescription}
                classNm={styles.comp_inputs}
                handleValue={setInpDescription}
              />
              <div className={styles.input_file}>
                <h3>Foto Principal</h3>
                <div className={styles.div_mainphoto}>
                  {product.mainPhoto ? (
                    <img src={product.mainPhoto} alt="Main Product" />
                  ) : (
                    <p>Produto sem foto principal</p>
                  )}
                </div>
                <label htmlFor="iimainphoto">Alterar Foto Principal</label>
                <input
                  type="file"
                  name="imainphoto"
                  id="iimainphoto"
                  onChange={handleFileChange}
                  hidden={true}
                  accept="image/*"
                />
                <p className={styles.img_filename}>{inpMainPhoto?.name}</p>
              </div>
            </div>
            <div className={styles.div_btns}>
              <button className={styles.btn_sub} type="submit">
                Salvar
              </button>
              <button
                type="button"
                className={styles.btn_delete}
                onClick={handleDelete}
              >
                <FaTrash />
              </button>
            </div>
          </form>
          <div className={styles.link_btns}>
            <a href="">
              Editar fotos secundárias do produto <FaArrowRight />
            </a>
            <a href="">
              Editar categorias do produto
              <FaArrowRight />
            </a>
          </div>
        </section>
      ) : (
        <ProductNotFoundErrorPage />
      )}
    </section>
  );
}
