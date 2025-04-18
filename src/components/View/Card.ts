import { IProductItem } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Card extends Component<IProductItem> {
  protected cardImage: HTMLImageElement;
  protected cardTitle: HTMLElement;
  protected cardCategory: HTMLElement;
  protected cardPrice: HTMLElement;
  protected cardId: string;

  constructor(container: HTMLButtonElement, protected events: IEvents){
    super(container);
    this.cardImage = this.container.querySelector('.card__image') as HTMLImageElement;
    this.cardTitle = this.container.querySelector('.card__title') as HTMLElement;
    this.cardCategory = this.container.querySelector('.card__category') as HTMLElement;
    this.cardPrice = this.container.querySelector('.card__price') as HTMLElement;

    this.container.addEventListener('click', (event) => {
      this.events.emit('card:click', {id: this.cardId})
    })
  }

  set id(value: string){
    this.cardId = value;
  }

  set image(value: string){
    this.setImage(this.cardImage, value);
  }

  set title(value: string){
    this.setText(this.cardTitle, value);
  }

  set category(value: string){
    this.setText(this.cardCategory, value);
    switch (value){
      case 'софт-скил':
        this.cardCategory.classList.add('card__category_soft');
        break;
      case 'хард-скил':
        this.cardCategory.classList.add('card__category_hard');
        break;
      case 'кнопка':
        this.cardCategory.classList.add('card__category_button');
        break;
      case 'дополнительное':
        this.cardCategory.classList.add('card__category_additional');
        break;
      default:
        this.cardCategory.classList.add('card__category_other');
        break;  
    }
  }

  set price(value: number){
    if(value)
      this.setText(this.cardPrice, `${value} синапсов`);
    else
      this.setText(this.cardPrice, 'Бесценно');
  }
}