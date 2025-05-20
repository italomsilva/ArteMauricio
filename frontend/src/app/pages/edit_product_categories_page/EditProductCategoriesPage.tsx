"use client";
import { useEffect, useState } from "react";
import styles from "./EditProductCategoriesPage.module.css";
import { getAllCategories } from "@/app/controller/categories/getAllCategories";
import MyLoading from "@/app/components/loading/MyLoading";
import { Category } from "@/app/entities/Category";
import { ProductCategory } from "@/app/entities/ProductCategory";
import { getAllProductCategories } from "@/app/controller/categories/getAllProductCategories";
import { FaTrash } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { deleteProductCategory } from "@/app/controller/categories/deleteProductCategory";
import { addProductCategory } from "@/app/controller/categories/addProductCategory";

export default function EditProductCategoriesPage({
  productId,
}: {
  productId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  useEffect(() => {
    const fetchAllCategories = async () => {
      const allcategories = await getAllCategories();
      const productcategories = await getAllProductCategories(productId);
      setAllCategories(allcategories);
      setProductCategories(productcategories);
      setLoading(false);
    };
    fetchAllCategories();
  }, []);

  const handleDeleteCategory = async (productCategoryId: number) => {
    const token = localStorage.getItem("authToken");
    const result = await deleteProductCategory(productCategoryId, token!);

    if (result) {
      alert("Deletado com sucesso");
    } else {
      alert("Algo deu errado, tente novamente.");
    }

    location.reload();
  };

  const handleAddCategory = async (categoryName: string) => {
    const token = localStorage.getItem("authToken");
    const result = await addProductCategory({
      categoryName,
      productId,
      token: token!,
    });

    if (result) {
      alert("Adicionado com sucesso");
    } else {
      alert("Algo deu errado, tente novamente.");
    }

    location.reload();
  };

  const hasDuplicate = (categoryName: string) => {
    const result = productCategories.find(
      (el) => el.categoryName == categoryName
    );
    return result ? true : false;
  };

  return loading ? (
    <div className={styles.div_loading}>
      <MyLoading center={true} color="var(--st-color)" size="40vw" />
    </div>
  ) : (
    <section className={styles.main_section}>
      <h2>Categorias do Produto</h2>
      <ul className={styles.ul_prod_cat}>
        {productCategories.map((cat, index) => {
          return (
            <li key={index} onClick={() => handleDeleteCategory(cat.id)}>
              <p>{cat.categoryName}</p>
              <span key={index*index+1} className={styles.btn_delete}>
                <FaTrash />
              </span>
            </li>
          );
        })}
      </ul>
      <h2>Outras Categorias</h2>
      <ul className={styles.ul_all_cat}>
        {allCategories.map((cat, index) => {
          return (
            <li key={index}
              onClick={() => handleAddCategory(cat.name)}
              className={hasDuplicate(cat.name) ? styles.disabled : ""}
            >
              <p>{cat.name}</p>
              <span className={styles.btn_add}>
                <GrAddCircle />
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
