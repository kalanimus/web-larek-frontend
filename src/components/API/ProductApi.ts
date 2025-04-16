import { IOrder, IOrderResponse, IProductItem } from "../../types";
import { IApi } from "../base/api";

export class ProductApi{
  constructor(protected api: IApi){}

  getProducts(): Promise<IProductItem[]> {
    return this.api.get<IProductItem[]>('/product/');
  }
  
  postOrder(order: IOrder): Promise<IOrderResponse>{
    return this.api.post<IOrderResponse>('/order', order);
  }
}