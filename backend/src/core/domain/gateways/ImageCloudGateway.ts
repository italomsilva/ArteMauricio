export interface ImageCloudGateway {
  upload(
    productId: string,
    productImageId: number,
    file: Express.Multer.File,
    isMainphoto?: boolean,
  ): Promise<string>;
  delete(productId: string, productImageId: number): Promise<void>;
  deleteAllProductImages(productId: string): Promise<void>;
}
