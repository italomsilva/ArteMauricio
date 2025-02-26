export interface ImageCloudGateway {
    upload(productId:string, order:number, file:Express.Multer.File):Promise<string>;
    delete(productId:string, order:number):Promise<void>    
}