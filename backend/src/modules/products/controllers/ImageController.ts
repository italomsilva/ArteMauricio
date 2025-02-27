import { Body, Controller, Delete, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AddImageUseCase } from 'src/core/usecases/product/images/AddImage';
import { ChangeImageOrderUseCase } from 'src/core/usecases/product/images/ChangeImageOrder';
import { DeleteImageUseCase } from 'src/core/usecases/product/images/DeleteImage';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductController {
  constructor(private readonly addImageUseCase: AddImageUseCase) {}

  @Post('add-image')
  @UseInterceptors(FileInterceptor('file'))
  async addImage(
    @Body() body: { productId: string; imageOrder: number },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const input = {
      productId: body.productId,
      imageOrder: body.imageOrder,
      file, 
    };
    return await this.addImageUseCase.execute(input);
  }
}


@Controller('product')
export class ImageController {
  constructor(
    private readonly addImageUseCase: AddImageUseCase,
    private readonly changeImageOrderUseCase: ChangeImageOrderUseCase,
    private readonly deleteImageUseCase: DeleteImageUseCase,
  ) {}

  @Post('add-image')
  @UseInterceptors(FileInterceptor('file')) // O nome do campo no formulário deve ser 'file'
  async addImage(
    @Body() body: { productId: string; imageOrder: number },
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('Received File:', file); // Debugando o arquivo recebido
    console.log('Received Body:', body); // Debugando o corpo da requisição

    if (!file) {
      throw new Error('No file uploaded');
    }

    const input = {
      productId: body.productId,
      imageOrder: body.imageOrder,
      file, // O arquivo enviado será automaticamente mapeado para a variável 'file'
    };

    return await this.addImageUseCase.execute(input);
  }
  @Patch('change-image-order')
  async changeOrder(@Body() body): Promise<any> {
    const result = await this.changeImageOrderUseCase.execute(body);
    return result;
  }

  @Delete('delete-image')
  async deleteImage(@Body() body): Promise<any> {
    const result = await this.deleteImageUseCase.execute(body);
    return result;
  }
}
