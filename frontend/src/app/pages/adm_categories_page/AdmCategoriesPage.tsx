"use client";
import { useEffect, useState } from "react";
import styles from "./AdmCategoriesPage.module.css";
import { getAllCategories } from "@/app/controller/categories/getAllCategories";
import MyLoading from "@/app/components/loading/MyLoading";
import { Category } from "@/app/entities/Category";
import { FaTrash } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { deleteCategory } from "@/app/controller/categories/deleteCategory";
import { createCategory } from "@/app/controller/categories/createCategory";
import MyInputAndLabel from "@/app/components/contact_form/MyInputAndLabel";

export default function AdmCategoriesPage() {
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [createMode, setCreateMode] = useState(false);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const allcategories = await getAllCategories();
      setAllCategories(allcategories);
      setLoading(false);
    };
    fetchAllCategories();
  }, []);

  const handleDeleteCategory = async (categoryId: number) => {
    const token = localStorage.getItem("authToken");
    const result = await deleteCategory(categoryId, token!);

    if (result) {
      alert("Deletado com sucesso");
    } else {
      alert("Algo deu errado, tente novamente.");
    }

    location.reload();
  };

  const handleAddCategory = async (categoryName: string) => {
    const token = localStorage.getItem("authToken");
    const result = await createCategory(categoryName, token!);

    if (result) {
      alert("Adicionado com sucesso");
    } else {
      alert("Algo deu errado, tente novamente.");
    }

    location.reload();
  };

  return loading ? (
    <div className={styles.div_loading}>
      <MyLoading center={true} color="var(--st-color)" size="40vw" />
    </div>
  ) : (
    <section className={styles.main_section}>
      <button
        onClick={() => setCreateMode(!createMode)}
        className={styles.btn_add}
      >
        Adicionar Nova Categoria <GrAddCircle />
      </button>
      {createMode ? (
        <form
          action={() => handleAddCategory(newCategory)}
          className={styles.form_create}
        >
          <MyInputAndLabel
            id="iname"
            type="text"
            handleValue={setNewCategory}
            classNm={styles.input_txt}
          />
          <input type="submit" value="Salvar" className={styles.btn_sub} />
        </form>
      ) : null}
      <ul className={styles.ul_all_cat}>
        {allCategories.map((cat, index) => {
          return (
            <li key={index} className={styles.li_cat}>
              <p>{cat.name}</p>
              <span
                className={styles.btn_delete}
                onClick={() => handleDeleteCategory(cat.id)}
              >
                <FaTrash />
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
