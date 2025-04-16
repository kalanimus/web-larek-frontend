import { IPage } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


export class Page extends Component<IPage>{
  protected galleryElement: HTMLElement;
  protected cartTotalElement: HTMLElement;

  constructor(container: HTMLElement){
    super(container);

    this.galleryElement = ensureElement(".gallery", this.container);
    this.cartTotalElement = ensureElement(".header__basket-counter", this.container);
  }

  set gallery(cards: HTMLElement[]){
    this.galleryElement.replaceChildren(...cards);
  }

  set cartTotal(total: number){
    this.setText(this.cartTotalElement, total)
  }
}