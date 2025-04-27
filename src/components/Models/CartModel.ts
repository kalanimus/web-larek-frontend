import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export class CartModel {
  protected productList: IProductItem[] = [];
  protected total: number;

  constructor(protected events: IEvents){
    this.total = 0;
  }

  addProduct(item: IProductItem) {
    this.productList.push(item);
    this.total += item.price;
    this.events.emit('cart:updated');
  }

  removeProduct(id: string){
    const index = this.productList.findIndex(item => item.id === id);
    if(index !== -1){
      this.total -= this.productList[index].price;
      this.productList.splice(index, 1);
    }
    this.events.emit('cart:updated');
  }

  clearCart(){
    this.productList = [];
    this.total = 0;
    this.events.emit('cart:updated');
  }

  isInCart(id: string): boolean{
    return this.productList.find(item => item.id === id)? false: true;
  }

  getProducts(){
    return this.productList;
  }

  getTotal(){
    return this.total;
  }

  get count() {
    return this.productList.length;
  }

  validateCart(): boolean{
    return this.total !== 0;
  }
  
}