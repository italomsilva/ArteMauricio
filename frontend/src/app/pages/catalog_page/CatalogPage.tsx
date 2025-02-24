"use client";

import { useState, useEffect } from "react";
import styles from "./CatalogPage.module.css";
import { Product } from "@/app/entities/Product";
import MyCardProduct from "@/app/components/product/MyCardProduct";
import { getProducts } from "../../controller/products/getProducts";
import { FaArrowDown } from "react-icons/fa";


async function loadProducts(page: number): Promise<Product[]> {
  const result = await getProducts(page);
  return result;
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const loadedProducts = await loadProducts(page);
      console.log(loadedProducts);
      if (products.length == 0) {
        setProducts(loadedProducts);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...loadedProducts]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [page]);

  if (loading) {
    return <div className={styles.main_section}>Carregando...</div>;
  }

  return (
    <div className={styles.main_section}>
      <div className={styles.div_cards}>
        {products?.map((product) => (
          <MyCardProduct key={product.id} product={product}></MyCardProduct>
        ))}
      </div>
      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        disabled={products.length % 15 != 0 ? true : false}
        className={styles.seemore_btn}
      >
       <span>Ver Mais</span>
        <FaArrowDown></FaArrowDown>
      </button>
    </div>
  );
}
