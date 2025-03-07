export interface ImageCloudGateway {
  upload(
    productId: string,
    order: number,
    file: Express.Multer.File,
    isMainphoto?: boolean,
  ): Promise<string>;
  delete(productId: string, order: number): Promise<void>;
  deleteAllProductImages(productId: string): Promise<void>;
}
