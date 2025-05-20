"use client";

import { useState, useEffect } from "react";
import styles from "./AdmCatalogPage.module.css";
import { Product } from "@/app/entities/Product";
import { getProducts } from "../../controller/products/getProducts";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import MySearchInput from "@/app/components/search_input/MySearchInput";
import MyListTileProduct from "@/app/components/product/list_tile_product/MyListTileProduct";

async function loadProducts(
  page: number,
  searchQuery: string
): Promise<Product[]> {
  const result = await getProducts(page, searchQuery);
  if (result.length == 0) {
    window.alert("Nenhum produto encontrado.");
  }
  return result;
}

export default function AdmCatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const loadedProducts = await loadProducts(page, searchQuery);

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
    return <div className={styles.main_section}>Carregando...</div>;
  }

  return (
    <div className={styles.main_section}>
      <MySearchInput onSearch={handleSearch} />
      <a className={styles.addproduct_btn} href="/adm/products/create">
        <span>Adicionar Novo Produto</span>
        <GrAddCircle />
      </a>
      <a className={styles.addproduct_btn} href="/adm/categories">
        <span>Categorias</span>
        <FaArrowRight />
      </a>
      <div className={styles.div_list}>
        {products?.map((product, index) => (
          <MyListTileProduct
            key={index * index * index}
            product={product}
          />
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
