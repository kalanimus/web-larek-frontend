import {Api} from "../components/base/api"

enum paymentType {
  "Онлайн",
  "При получении"
}

export interface IProductItem
{
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

export interface IOrder 
{
  id: string;
  total: number;
}

export interface ICard
{
  product: IProductItem;
}

export interface IGallery 
{
  cardList: ICard[];
  addCard(card: ICard): void;
  addCardList(cardList: ICard[]): void;
  deleteCard(cardId: string): void;
  render(): void;
}

export interface ICart
{
  productList: IProductItem[];
  total: number;
  addToCart(product: IProductItem): void;
  deleteFromCart(product: IProductItem): void;
  render(): void;
}

export interface IPayment
{
  paymentType: paymentType;
  address: string;
  email: string;
  phone: string;
  SubmitPayment(): IOrder;
}

export interface ModalManager
{
  openCardModel(cardId: string): void;
  openBasketModal(): void;
  openPaymentModal(): void;
}

export interface IApiClient
{
  api: Api;

  getProduct(): IProductItem;
  getProductList(): IProductItem[];
  postOrder(order: IOrder): void;
}