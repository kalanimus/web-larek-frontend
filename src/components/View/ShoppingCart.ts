import { IShoppingCart } from "../../types"
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"
import { IEvents } from "../base/events";

export class ShoppingCart extends Component<IShoppingCart>{
  protected productListElement: HTMLUListElement;
  protected submitButton: HTMLButtonElement;
  protected totalElement: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents){
    super(container);

    this.productListElement = ensureElement(".basket__list", this.container) as HTMLUListElement;
    this.submitButton = ensureElement(".basket__button", this.container) as HTMLButtonElement;
    this.totalElement = ensureElement(".basket__price", this.container) as HTMLElement;

    this.submitButton.addEventListener('click', () => {
      this.events.emit('cart:place_order')
    })
  }
  
  set products(cards: HTMLElement[]){
    this.productListElement.replaceChildren(...cards);
  }

  set total(total: number){
    this.setText(this.totalElement, `${total} синапсов`)
  }

  toggleButton(value: boolean){
    this.submitButton.disabled = !value;
  }
}