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
  "Онлайн",
  "При получении"
}

export interface IOrder {
  payment: PaymentType,
  email: string,
  phone: string,
  address: string,
  total: number,
  items: string[]
}

export interface IOrderResponse {
  id: string;
  total: number;
}

export interface IPage {
  gallery: IProductItem[];
  cartTotal: number;  
}

export interface IShoppingCart {
  products: IProductItem[];
  total: number;
}