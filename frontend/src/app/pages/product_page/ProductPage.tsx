"use client";

import { useState, useEffect } from "react";
import { Product } from "@/app/entities/Product";
import { getProductById } from "@/app/controller/products/getProductById";
import MyLoading from "@/app/components/loading/MyLoading";
import styles from "./ProductPage.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";

async function loadProduct(id: string): Promise<Product | null> {
  const result = await getProductById(id);
  return result;
}

export default function ProductPage(props: { id: string }) {
  const [product, setProduct] = useState<Product | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const loadedProduct = await loadProduct(props.id);
      setProduct(loadedProduct ?? null);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className={styles.main_div}>
      {loading ? (
        <div className={styles.div_loading}>
          <MyLoading color="#1f363d" size="40vw"></MyLoading>
        </div>
      ) : (
        <section className={styles.main_section}>
          <p>
            <FaArrowLeft /> <FaShareNodes /> id do produto: {product?.id}
          </p>
          <img src={product?.mainPhoto} alt="" />
            <p>{product?.price}</p>
            <h1>{product?.title}</h1>
            <p>{product?.description}</p>
          </section>
      )}
    </div>
  );
}
