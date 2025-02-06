export class ProductImage {
  constructor(
    public id: number,
    public productId: string,
    public url: string,
    public order: number
  ) {}
}
