"use client";

import { useState, useEffect } from "react";
import styles from "./CatalogPage.module.css";
import { Product } from "@/app/entities/Product";
import MyCardProduct from "@/app/components/product/card_product/MyCardProduct";
import { getProducts } from "../../controller/products/getProducts";
import { FaArrowDown } from "react-icons/fa";
import MySearchInput from "@/app/components/search_input/MySearchInput";
import MyLoading from "@/app/components/loading/MyLoading";

async function loadProducts(
  page: number,
  searchQuery: string,
  category?: string
): Promise<Product[]> {
  const result = await getProducts(page, searchQuery, category);
  if (result.length == 0) {
    window.alert("Nenhum produto encontrado.");
  }
  return result;
}

export default function CatalogPage(props:{category?:string}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const loadedProducts = await loadProducts(page, searchQuery, props.category);

      if (page === 1) {
        setProducts(loadedProducts);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...loadedProducts]);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [page, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  if (loading && page === 1) {
    return (
      <div className={styles.main_section}>
        <div className={styles.div_loading}>
          <MyLoading color="var(--st-color)" size="8rem"></MyLoading>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main_section}>
      <MySearchInput onSearch={handleSearch} />

      <div className={styles.div_cards}>
        {products?.map((product, index) => (
          <MyCardProduct key={index * index * index} product={product} />
        ))}
      </div>

      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        disabled={products.length % 15 !== 0}
        className={styles.seemore_btn}
      >
        <span>Ver Mais</span>
        <FaArrowDown />
      </button>
    </div>
  );
}
