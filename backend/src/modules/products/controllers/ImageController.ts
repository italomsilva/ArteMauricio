import { Body, Controller, Delete, Patch, Post } from "@nestjs/common";
import { AddImageUseCase } from "src/core/usecases/product/images/AddImage";
import { ChangeImageOrderUseCase } from "src/core/usecases/product/images/ChangeImageOrder";
import { DeleteImageUseCase } from "src/core/usecases/product/images/DeleteImage";

@Controller('product')
export class ImageController{
    constructor(
        private readonly addImageUseCase:AddImageUseCase,
        private readonly changeImageOrderUseCase:ChangeImageOrderUseCase,
        private readonly deleteImageUseCase:DeleteImageUseCase
    ){}

    @Post('add-image')
    async addImage(@Body() body): Promise<any>{
        const result = await this.addImageUseCase.execute(body)
        return result;
    }
    @Patch('change-image-order')
    async changeOrder(@Body() body): Promise<any>{
        const result = await this.changeImageOrderUseCase.execute(body)
        return result;
    }

    @Delete('delete-image')
    async deleteImage(@Body() body):Promise<any>{
        const result = await this.deleteImageUseCase.execute(body);
        return result;
    }


}