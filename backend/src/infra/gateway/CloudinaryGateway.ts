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

  async upload(productId: string, order: number, file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `products/${productId}`,
          public_id: `${order}`,
          overwrite: true,
          resource_type: 'auto',
        },
        (error, result: UploadApiResponse) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      ).end(file.buffer);
    });
  }

  async delete(productId: string, order: number): Promise<void> {
    const publicId = `products/${productId}/${order}`;
    await cloudinary.uploader.destroy(publicId);
  }
}
