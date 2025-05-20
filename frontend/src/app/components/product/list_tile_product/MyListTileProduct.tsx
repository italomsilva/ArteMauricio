import { useState } from "react";
import { Product } from "@/app/entities/Product";
import MyLoading from "../../loading/MyLoading";
import styles from './MyListTileProduct.module.css'

export default function MyListTileProduct(input: Input) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <a href={`/adm/edit/product/${input.product.id}`} className={styles.list_tile} >
      <div className={styles.div_img}>
        {isImageLoading && (
            <div className={styles.div_loading}>
              <MyLoading color="var(--nd-color)" size="60px"></MyLoading>
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
      </div>
    </a>
  );
}

type Input = {
  product: Product;
};
