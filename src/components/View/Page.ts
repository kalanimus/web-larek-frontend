import { IPage } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";


export class Page extends Component<IPage>{
  protected galleryElement: HTMLElement;
  protected cartTotalElement: HTMLButtonElement;
  protected cartButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents){
    super(container);

    this.galleryElement = ensureElement(".gallery", this.container);
    this.cartTotalElement = ensureElement(".header__basket-counter", this.container) as HTMLButtonElement;
    this.cartButton = ensureElement(".header__basket", this.container) as HTMLButtonElement;

    this.cartButton.addEventListener('click', ()=>{
      events.emit('cart:click');
    })
  }

  set gallery(cards: HTMLElement[]){
    this.galleryElement.replaceChildren(...cards);
  }

  set cartTotal(total: number){
    this.setText(this.cartTotalElement, total)
  }
}