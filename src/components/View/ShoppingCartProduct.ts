import { IProductItem } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class ShoppingCartProduct extends Component<IProductItem> {
  protected productTitle: HTMLElement;
  protected productPrice: HTMLElement;
  protected deleteButton: HTMLButtonElement;
  protected productIndex: HTMLElement;
  protected productId: string;
  protected static index: number = 0;

  constructor(container: HTMLLIElement, protected events: IEvents, index: number){
    super(container);
    this.productTitle = this.container.querySelector('.card__title') as HTMLElement;
    this.productPrice = this.container.querySelector('.card__price') as HTMLElement;
    this.deleteButton = this.container.querySelector('.basket__item-delete') as HTMLButtonElement;
    this.productIndex = this.container.querySelector('.basket__item-index') as HTMLElement;

    this.setText(this.productIndex, index);
    
    this.deleteButton.addEventListener('click', () => {
      this.events.emit('cart_product:delete', {id: this.productId})
    })
  }

  set id(value: string){
    this.productId = value;
  }

  set title(value: string){
    this.setText(this.productTitle, value);
  }

  set price(value: number){
    if(!value) value = 0
    this.setText(this.productPrice, `${value} синапсов`);
  }
}