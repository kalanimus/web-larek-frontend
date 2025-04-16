import { IProductItem } from "../../types";
import { Component } from "../base/Component";

export class Card extends Component<IProductItem> {
  protected cardImage: HTMLImageElement;
  protected cardTitle: HTMLElement;
  protected cardCategory: HTMLElement;
  protected cardPrice: HTMLElement;

  constructor(container: HTMLElement){
    super(container);
    this.cardImage = this.container.querySelector('.card__image') as HTMLImageElement;
    this.cardTitle = this.container.querySelector('.card__title') as HTMLElement;
    this.cardCategory = this.container.querySelector('.card__category') as HTMLElement;
    this.cardPrice = this.container.querySelector('.card__price') as HTMLElement;
  }

  set image(value: string){
    this.setImage(this.cardImage, value);
  }

  set title(value: string){
    this.setText(this.cardTitle, value);
  }

  set category(value: string){
    this.setText(this.cardCategory, value);
  }

  set price(value: string){
    this.setText(this.cardPrice, value);
  }
}