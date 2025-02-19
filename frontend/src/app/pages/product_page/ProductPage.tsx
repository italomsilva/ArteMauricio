"use client";

import {
  getProductById,
  GetProductByIdOutput,
} from "@/app/controller/products/getProductById";
import styles from "./ProductPage.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import Link from "next/link";
import ProductNotFoundErrorPage from "../errors/ProductNotFoundErrorPage";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element";
import MyLoading from "@/app/components/loading/MyLoading";

register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

async function loadProduct(id: string): Promise<GetProductByIdOutput | null> {
  const result = await getProductById(id);
  return result;
}

export default function ProductPage(props: { id: string }) {
  const [product, setProduct] = useState<GetProductByIdOutput | null>();
  const [loading, setLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const loadedProduct = await loadProduct(props.id);
      setProduct(loadedProduct);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className={styles.main_div}>
      {loading ? (
        <div className={styles.div_loading}>
          <MyLoading color="var(--st-color)" size="30vw"></MyLoading>
        </div>
      ) : product ? (
        <section className={styles.main_section}>
          <div className={styles.div_header}>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              className={styles.btn_back}
            >
              <FaArrowLeft />
            </Link>
            <span>
              <p>id: {product?.id}</p>
              <i>
                <FaShareNodes />
              </i>
            </span>
          </div>
          <picture className={styles.picture}>
            {isImageLoading && (
              <div className={styles.div_loading_img}>
                <MyLoading color="var(--nd-color)" size="8rem"></MyLoading>
              </div>
            )}

            <Swiper slidesPerView={1}>
              <SwiperSlide>
                <img
                  src={product.mainPhoto}
                  key={product.id}
                  onLoad={() => setIsImageLoading(false)}
                  style={
                    isImageLoading ? { display: "none" } : { display: "flex" }
                  }
                />
              </SwiperSlide>

              {product.images.map((item) => {
                return (
                  <SwiperSlide>
                    <img
                      src={item.url}
                      key={item.order}
                      onLoad={() => setIsImageLoading(false)}
                      style={
                        isImageLoading
                          ? { display: "none" }
                          : { display: "flex" }
                      }
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </picture>
          <div className={styles.div_text}>
            <p className={styles.p_price}>R$ {product.price}</p>
            <h2 className={styles.p_title}>{product.title}</h2>
            <p className={styles.p_descr}>{product.description}</p>
          </div>
        </section>
      ) : (
        <ProductNotFoundErrorPage />
      )}
    </div>
  );
}
