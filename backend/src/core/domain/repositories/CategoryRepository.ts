import { Category } from "../entities/Category";

export interface CategoryRepository {
    create(categoryName:string):Promise<Category>;
    findAll():Promise<Category[]>;
    findByName(categoryName:string):Promise<Category>;
    findById(categoryId:number):Promise<Category>;
    update(category:Category):Promise<any>;
    save(category:Category):Promise<Category>;
    delete(categoryId:number):Promise<any>;
}