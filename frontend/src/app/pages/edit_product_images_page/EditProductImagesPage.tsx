"use client";
import { ProductImage } from "@/app/entities/ProductImage";
import styles from "./EditProductImagesPage.module.css";
import { MouseEvent, useEffect, useState } from "react";
import MyLoading from "@/app/components/loading/MyLoading";
import { getAllProductImages } from "@/app/controller/products/images/getAllProductimages";
import { FaTrash } from "react-icons/fa";
import { deleteImage } from "@/app/controller/products/images/deleteImage";
import { editImage } from "@/app/controller/products/images/editImages";
import { GrAddCircle } from "react-icons/gr";
import { addImage } from "@/app/controller/products/images/addImage";

async function loadProductImages(
  productId: string,
  token: string
): Promise<ProductImage[]> {
  return await getAllProductImages(productId, token);
}

export default function EditProductImagesPage(props: { productId: string }) {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [imageSelected, setImageSelected] = useState<ProductImage>();
  const [order, setOrder] = useState<number>();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem("authToken");
      const loadedImages = await loadProductImages(props.productId, token!);
      if (loadedImages.length != 0) {
        setImages(loadedImages);
      }
      setLoading(false);
    };
    fetchImages();
  }, [props.productId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleCreate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    setImageSelected({ id: -1, order: 0, productId: props.productId, url: "" });
    setOrder(1);
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (imageSelected && token) {
      const result = await deleteImage(imageSelected.id, token);
      if (result == true) {
        alert("Deletada com sucesso");
      } else {
        alert("Falha ao deletar");
      }
      location.reload();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (imageSelected && token) {
      let result: boolean;
      if (imageSelected.id == -1) {
        result = await addImage({
          productId: props.productId,
          imageOrder: order??0,
          file: file!,
          token: token
        })
      } else {
        result = await editImage({
          productImageId: imageSelected.id,
          newOrder: order,
          token,
          image: file,
        });
      }
      console.log(result);
      if (result) {
        alert("Operação efetuada com sucesso");
      } else {
        alert("Algo deu errado, tente novamente mais tarde");
      }
      location.reload();
    }
  };

  return loading ? (
    <div className={styles.div_loading}>
      <MyLoading center={true} color="var(--st-color)" />
    </div>
  ) : (
    <section className={styles.main_section}>
      <ul className={styles.grid_imgs}>
        {images.map((image) => (
          <li
            className={imageSelected?.id == image.id ? styles.selected_img : ""}
            key={Number(image.id)}
            onClick={(e) => {
              setImageSelected(image);
              setOrder(image.order);
            }}
          >
            <img src={image.url} />
          </li>
        ))}
      </ul>
      <div>
        <button className={styles.add_btn} onClick={handleCreate}>
          Adicionar Nova Imagem <GrAddCircle />
        </button>
      </div>
      {imageSelected ? (
        <form onSubmit={handleSubmit} className={styles.form_img}>
          <h2>
            {imageSelected.id == -1 ? "Adicionar Imagem" : "Editar Imagem"}
          </h2>
          <div className={styles.img_demo}>
            <img src={imageSelected.url} />
            <p>{imageSelected.id == -1 ? "" : "Imagem Atual"}</p>
          </div>
          <div className={styles.inputs_order}>
            <label htmlFor="">Ordem:</label>
            <input
              type="number"
              name="oder"
              id="iorder"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
            />
          </div>
          <div className={styles.inputs_file}>
            <label htmlFor="iifile">
              {imageSelected.id == -1
                ? "Escolher Imagem"
                : "Escolher Nova Imagem"}
            </label>
            <input
              type="file"
              name="nifile"
              id="iifile"
              onChange={handleFileChange}
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
              onClick={(e) => handleDelete(e)}
              hidden={imageSelected.id == -1 ? true : false}
            >
              <FaTrash />
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
}
