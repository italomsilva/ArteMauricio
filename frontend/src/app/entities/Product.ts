export class Product {
  constructor(
    public id: string,
    public title: string,
    public price: number,
    public description: string,
    public createdAt: Date,
    public updatedAt: Date,
    public mainPhoto: string
  ) {}
}

