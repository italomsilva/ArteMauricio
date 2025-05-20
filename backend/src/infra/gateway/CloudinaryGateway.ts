import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ImageCloudGateway } from 'src/core/domain/gateways/ImageCloudGateway';

@Injectable()
export class CloudinaryGateway implements ImageCloudGateway {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async upload(
    productId: string,
    productImageId: number,
    file: Express.Multer.File,
    isMainphoto?: boolean,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `products/${productId}`,
            public_id: isMainphoto? `mainphoto`:`${productImageId}`,
            overwrite: true,
            resource_type: 'auto',
          },
          (error, result: UploadApiResponse) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          },
        )
        .end(file.buffer);
    });
  }

  async delete(productId: string, productImageId: number): Promise<void> {
    const publicId = `products/${productId}/${productImageId}`;
    await cloudinary.uploader.destroy(publicId);
  }
  
  async deleteAllProductImages(productId: string): Promise<void> {
    const folderPath = `products/${productId}`;
  
    try {
      await cloudinary.api.delete_resources_by_prefix(folderPath);
  
      await cloudinary.api.delete_folder(folderPath);
    } catch (error) {
      console.error(`Erro ao excluir a pasta '${folderPath}':`, error);
    }
  }
  
}
