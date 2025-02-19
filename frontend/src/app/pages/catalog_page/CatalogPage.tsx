'use client'

import { useState, useEffect } from "react";
import styles from "./CatalogPage.module.css";
import { Product } from "@/app/entities/Product";
import MyCardProduct from "@/app/components/product/MyCardProduct";
import { getAllProducts } from "../../controller/products/getAllProducts";

async function loadProducts(): Promise<Product[]> {
  const result = await getAllProducts();
  return result;
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProducts = async () => {
      const loadedProducts = await loadProducts();
      setProducts(loadedProducts);
      setLoading(false); 
    };

    fetchProducts();
  }, []);

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
    </div>
  );
}