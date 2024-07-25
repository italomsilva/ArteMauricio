import { Category } from "../entities/Category";

export interface CategoryRepository {
    create(input:any):Category;
    findAll():Promise<Category[]>;
    update(category:Category):Promise<Category>;
    save(category:Category):Promise<Category>;
    delete(category:Category):Promise<any>;
}