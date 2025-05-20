"use client";

import {
  getProductById,
  GetProductByIdOutput,
} from "@/app/controller/products/getProductById";
import styles from "./ProductPage.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MyLoading from "@/app/components/loading/MyLoading";

import { register } from "swiper/element";
register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ErrorResponse } from "@/app/entities/ErrorResponse";
import ErrorPage from "../errors/ErrorPage";
import { AiOutlineAlert } from "react-icons/ai";

export default function ProductPage(props: { id: string }) {
  const [product, setProduct] = useState<GetProductByIdOutput | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const loadProduct = async (
    id: string
  ): Promise<GetProductByIdOutput | ErrorResponse> => {
    const result = await getProductById(id);
    return result;
  };

  const getBuyUrl = (title: string, price: number): string => {
    const titleUrl = encodeURIComponent(`*"${title}"*`);
    const priceUrl = encodeURIComponent(`${price.toFixed(2)}`);
    // const currentUrl = encodeURIComponent(window.location.href);
    const currentUrl = encodeURIComponent(
      `https://www.artemauricio.com.br/products/${props.id}`
    );
    const numeroWhatsapp = "5585991289947";

    const link = `https://wa.me/${numeroWhatsapp}?text=Oi!%20Me%20interessei%20pelo%20produto%20${titleUrl}%20que%20vi%20no%20site,%20com%20o%20preço%20de%20R$%20${priceUrl}.%20Ele%20ainda%20está%20disponível%3F%0A%0AProduto:%20${currentUrl}`;

    return link;
  };

  const handleShare = async (title: string, price: number) => {
    const url = window.location.href;

    const message = `Oi! Me interessei pelo produto ${title} que vi no site, com o preço de R$ ${price.toFixed(
      2
    )}. Ele ainda está disponível?\n\nproduto: ${url}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Produto Interessante",
          text: message,
          url,
        })
        .then(() => console.log("Compartilhado com sucesso!"))
        .catch((error) => console.error("Erro ao compartilhar:", error));
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copiado para a área de transferência!");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const loadedProduct = await loadProduct(props.id);
      if (loadedProduct instanceof ErrorResponse) {
        setError(loadedProduct);
        setProduct(null);
      } else {
        setProduct(loadedProduct);
        setError(null);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.div_loading}>
        <MyLoading color="var(--st-color)" size="30vw"></MyLoading>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <ErrorPage
          error={error.error}
          message={error.message}
          statusCode={error.statusCode}
          backTo="/catalog"
        />
      </div>
    );
  }

  if (product) {
    return (
      <div className={styles.main_div}>
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
                <FaShareNodes
                  onClick={() => handleShare(product.title, product.price)}
                />
              </i>
            </span>
          </div>
          <picture className={styles.picture}>
            {isImageLoading && (
              <div className={styles.div_loading_img}>
                <MyLoading color="var(--nd-color)" size="8rem"></MyLoading>
              </div>
            )}

            <div
              className={styles.slide}
              style={{ display: isImageLoading ? "none" : "block" }}
            >
              <Swiper slidesPerView={1}>
                <SwiperSlide key={87875987658}>
                  <img
                    src={product.mainPhoto}
                    onLoad={() => setIsImageLoading(false)}
                    style={
                      isImageLoading ? { display: "none" } : { display: "flex" }
                    }
                  />
                </SwiperSlide>
                {product.images.map((item) => {
                  return (
                    <SwiperSlide key={item.order}>
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
            </div>
          </picture>
          <div className={styles.div_text}>
            <p className={styles.p_price}>
              R$ {product.price > 0 ? product.price.toFixed(2) : "-"}
            </p>
            {product.price<0 && (            <p className={styles.p_alert} >
              <AiOutlineAlert className={styles.i_alert}/>
              Produto feito por encomenda e com valor variável ao desejo do
              cliente
            </p>
            )}
            <h2 className={styles.p_title}>{product.title}</h2>
            <a
              href={getBuyUrl(product.title, product.price)}
              className={styles.btn_comp}
              target="_blank"
            >
              Comprar
            </a>
            <p className={styles.p_descr}>{product.description}</p>
          </div>
        </section>
      </div>
    );
  }
}
