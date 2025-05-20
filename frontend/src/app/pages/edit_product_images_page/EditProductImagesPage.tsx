"use client";

import { useEffect, useState } from "react";
import styles from "./EditProductImagesPage.module.css";
import MyLoading from "@/app/components/loading/MyLoading";
import { FaTrash } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { ProductImage } from "@/app/entities/ProductImage";
import {
  handleCreate,
  handleDelete,
  handleFileChange,
  handleSubmit,
  loadProductImages,
} from "./EditProductImage.controller";

export default function EditProductImagesPage(props: { productId: string }) {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [imageSelected, setImageSelected] = useState<ProductImage>();
  const [order, setOrder] = useState<number>();
  const [file, setFile] = useState<File | null>(null);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchImages = async () => {
      const loadedImages = await loadProductImages(props.productId, token!);
      if (loadedImages.length !== 0) {
        setImages(loadedImages);
      }
      setLoading(false);
    };
    fetchImages();
  }, [props.productId]);

  return loading ? (
    <div className={styles.div_loading}>
      <MyLoading center={true} color="var(--st-color)" size="40vw" />
    </div>
  ) : (
    <section className={styles.main_section}>
      <ul className={styles.grid_imgs}>
        {images.map((image) => (
          <li
            className={
              imageSelected?.id === image.id ? styles.selected_img : ""
            }
            key={Number(image.id)}
            onClick={() => {
              setImageSelected(image);
              setOrder(image.order);
            }}
          >
            <img src={image.url} />
          </li>
        ))}
      </ul>
      <div>
        <button
          className={styles.add_btn}
          onClick={(e) =>
            handleCreate(e, setImageSelected, setOrder, props.productId)
          }
        >
          Adicionar Nova Imagem <GrAddCircle />
        </button>
      </div>
      {imageSelected ? (
        <form
          onSubmit={(e) =>
            handleSubmit(e, imageSelected, order, file, token, props.productId)
          }
          className={styles.form_img}
        >
          <h2>
            {imageSelected.id === -1 ? "Adicionar Imagem" : "Editar Imagem"}
          </h2>
          <div className={styles.img_demo}>
            <img src={imageSelected.url} />
            <p>{imageSelected.id === -1 ? "" : "Imagem Atual"}</p>
          </div>
          <div className={styles.inputs_order}>
            <label htmlFor="iorder">Ordem:</label>
            <input
              type="number"
              name="order"
              id="iorder"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
            />
          </div>
          <div className={styles.inputs_file}>
            <label htmlFor="iifile">
              {imageSelected.id === -1
                ? "Escolher Imagem"
                : "Escolher Nova Imagem"}
            </label>
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
          <div className={styles.inputs_btn}>
            <input className={styles.btn_sub} type="submit" value="Salvar" />
            <button
              type="button"
              className={styles.btn_delete}
              onClick={(e) => handleDelete(e, imageSelected, token)}
              hidden={imageSelected.id === -1}
            >
              <FaTrash />
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
}
