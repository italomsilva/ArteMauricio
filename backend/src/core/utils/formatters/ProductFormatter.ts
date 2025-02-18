import { Category } from 'src/core/domain/entities/Category';
import { Product } from 'src/core/domain/entities/Product';
import { ProductCategory } from 'src/core/domain/entities/ProductCategory';
import { ProductImage } from 'src/core/domain/entities/ProductImage';

export function productFormatter(input: {
  product: Product;
  categories: ProductCategory[];
  images: ProductImage[];
}): {
    id: string;
    title: string;
    price: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    mainPhoto: string;
    categories: string[];
    images: {
      url: string;
      order: number;
    }[];
  
} {
  const sortedImages = [...input.images].sort((a, b) => a.order - b.order);
  return {
    id: input.product.id,
    title: input.product.title,
    price: input.product.price,
    description: input.product.description,
    createdAt: input.product.createdAt,
    updatedAt: input.product.createdAt,
    mainPhoto: input.product.mainPhoto,
    categories: input.categories.map((c) => {
      return c.categoryName;
    }),
    images: sortedImages
  };
}
