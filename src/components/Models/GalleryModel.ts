import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export class GalleryModel {
  protected productList: IProductItem[] = [];

  constructor(protected events: IEvents){}

  // set productList(data: IProductItem[]) {
  //   this.productList = data;
  // }

  getItem(id: string): IProductItem{
    return this.productList.find(item => item.id === id);
  }

  getItems(): IProductItem[]{
    return this.productList;
  }

  addItem(item: IProductItem){
    this.productList.push(item);
    this.events.emit('gallery: changed');
  }

  addItems(itemList: IProductItem[]){
    this.productList.push(...itemList);
    this.events.emit('gallery: changed');
  }
}