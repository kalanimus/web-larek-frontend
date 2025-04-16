import { IShoppingCart } from "../../types"
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"

export class ShoppingCart extends Component<IShoppingCart>{
  protected productListElement: HTMLUListElement;
  protected submitButton: HTMLButtonElement;
  protected totalElement: HTMLElement;

  constructor(container: HTMLElement){
    super(container);

    this.productListElement = ensureElement(".basket__list", this.container) as HTMLUListElement;
    this.submitButton = ensureElement(".basket__button", this.container) as HTMLButtonElement;
    this.totalElement = ensureElement(".basket__price", this.container) as HTMLElement;
  }

  
  
}