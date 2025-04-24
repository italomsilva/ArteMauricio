import { Product } from 'src/core/domain/entities/Product';
import { EntitySchema } from 'typeorm';

export const ProductSchema = new EntitySchema<Product>({
  name: 'Product',
  target: Product,
  tableName: 'products',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    title: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    price: {
      type: 'double precision', 
      default: -3.14,
    },
    description: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp',
      updateDate: true,
    },
    mainPhoto: {
      name: 'main_photo',
      type: 'varchar',
      length: 255,
      nullable: true,
    },
  },
});
