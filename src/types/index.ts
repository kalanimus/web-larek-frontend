export interface IProductItem
{
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}
export enum PaymentType {
  "Онлайн" = "Онлайн",
  "При получении" ="При получении"
}

export interface IOrderResponse {
  id: string;
  total: number;
}

export interface IPage {
  gallery: HTMLElement[];
  cartTotal: number;  
}

export interface IShoppingCart {
  products: HTMLElement[];
  total: number;
}