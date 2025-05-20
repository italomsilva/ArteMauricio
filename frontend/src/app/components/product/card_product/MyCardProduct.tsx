import { useState } from "react";
import { Product } from "@/app/entities/Product";
import MyLoading from "../../loading/MyLoading";
import styles from "./MyCardProduct.module.css";
import imageError from "@/app/images/image-error.png";
export default function MyCardProduct(input: Input) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [mainImage, setMainImage] = useState(input.product.mainPhoto);

  return (
    <a href={`product/${input.product.id}`} className={styles.card}>
      <div className={styles.div_img}>
        {isImageLoading && (
          <div className={styles.div_loading}>
            <MyLoading color="var(--nd-color)" size="60px"></MyLoading>
          </div>
        )}
        <img
          src={mainImage}
          alt={input.product.title}
          onLoad={() => setIsImageLoading(false)}
          onError={() => setMainImage(imageError.src)}
          style={isImageLoading ? { display: "none" } : { display: "flex" }}
        />
      </div>
      <div className={styles.div_txt}>
        <h3>{input.product.title}</h3>
        <p>R$ {input.product.price >= 0? input.product.price.toFixed(2): "-"}</p>
      </div>
    </a>
  );
}

type Input = {
  product: Product;
};
