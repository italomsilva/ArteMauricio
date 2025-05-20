import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AddImageUseCase } from 'src/core/usecases/product/images/AddImage';
import { DeleteImageUseCase } from 'src/core/usecases/product/images/DeleteImage';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetAllImagesByProductIdUseCase } from 'src/core/usecases/product/images/GetAllImagesByProductId';
import { EditProductImageUseCase } from 'src/core/usecases/product/images/EditProductImage';

@Controller('product/images')
export class ImageController {
  constructor(
    private readonly addImageUseCase: AddImageUseCase,
    private readonly editProductImageUseCase: EditProductImageUseCase,
    private readonly deleteImageUseCase: DeleteImageUseCase,
    private readonly getAllImagesByProductIdUseCase: GetAllImagesByProductIdUseCase,
  ) {}
  @Get(':productId')
  async getAllImagesByProductId(@Param() params) {
    return await this.getAllImagesByProductIdUseCase.execute({
      productId: params.productId,
    });
  }

  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  async addImage(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    const input = {
      productId: body.productId,
      imageOrder: body.imageOrder,
      file,
      isMainPhoto: body.isMainPhoto,
    };
    return await this.addImageUseCase.execute(input);
  }

  @Put('edit')
  @UseInterceptors(FileInterceptor('file'))
  async changeOrder(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const input = {
      productImageId: Number(body.productImageId),
      newOrder: body.newOrder ? Number(body.newOrder) : null,
      file,
    };
    return await this.editProductImageUseCase.execute(input);
  }

  @Delete('delete')
  async deleteImage(@Body() body): Promise<any> {
    const result = await this.deleteImageUseCase.execute(body);
    return result;
  }
}
