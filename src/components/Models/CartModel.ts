import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export class CartModel {
  protected products: IProductItem[] = [];
  protected total: number;

  constructor(protected events: IEvents){
    this.total = 0;
  }

  addProduct(item: IProductItem) {
    this.products.push(item);
    this.total += item.price;
  }

  removeProduct(id: string){
    const index = this.products.findIndex(item => item.id === id);
    if(index !== -1){
      this.products.splice(index, 1);
      this.total -= this.products[index].price;
    }
  }

  get count() {
    return this.products.length;
  }
}