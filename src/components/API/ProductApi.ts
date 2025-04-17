import { IOrderResponse, IProductItem } from "../../types";
import { IApi } from "../base/api";

export class ProductApi{
  constructor(protected api: IApi){}

  getProducts(): Promise<{items: IProductItem[], total: number}> {
    return this.api.get<{items: IProductItem[], total: number}>('/product/');
  }
  
  postOrder(order: Object): Promise<IOrderResponse>{
    return this.api.post<IOrderResponse>('/order', order);
  }
}