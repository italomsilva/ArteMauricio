import { useState } from "react";
import { Product } from "@/app/entities/Product";
import MyLoading from "../loading/MyLoading";
import styles from './MyCardProduct.module.css'

export default function MyCardProduct(input: Input) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <a href={`product/${input.product.id}`} className={styles.card} key={input.product.id}>
      <div className={styles.div_img}>
        {isImageLoading && (
            <div className={styles.div_loading}>
              <MyLoading color="#1f363d" size="60px"></MyLoading>
            </div>
        )}
        <img
          src={input.product.mainPhoto}
          alt={input.product.title}
          onLoad={() => setIsImageLoading(false)}
          style={isImageLoading?{display:'none'}:{display: 'flex'}}
        />
      </div>
      <div className={styles.div_txt}>
        <h3>{input.product.title}</h3>
        <p>R$ {input.product.price.toFixed(2)}</p>
      </div>
    </a>
  );
}

type Input = {
  product: Product;
};
