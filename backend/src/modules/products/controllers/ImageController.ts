import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AddImageUseCase } from 'src/core/usecases/product/images/AddImage';
import { ChangeImageOrderUseCase } from 'src/core/usecases/product/images/ChangeImageOrder';
import { DeleteImageUseCase } from 'src/core/usecases/product/images/DeleteImage';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product/image')
export class ImageController {
  constructor(
    private readonly addImageUseCase: AddImageUseCase,
    private readonly changeImageOrderUseCase: ChangeImageOrderUseCase,
    private readonly deleteImageUseCase: DeleteImageUseCase,
  ) {}
  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  async addImage(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    const input = {
      productId: body.productId,
      imageOrder: body.imageOrder,
      file,
    };
    return await this.addImageUseCase.execute(input);
  }

  @Patch('change-order')
  async changeOrder(@Body() body): Promise<any> {
    const result = await this.changeImageOrderUseCase.execute(body);
    return result;
  }

  @Delete('delete')
  async deleteImage(@Body() body): Promise<any> {
    const result = await this.deleteImageUseCase.execute(body);
    return result;
  }
}
