import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class CardPreview extends Component<IProductItem> {
  protected buyButton: HTMLButtonElement;

  protected cardImage: HTMLImageElement;
  protected cardTitle: HTMLElement;
  protected cardCategory: HTMLElement;
  protected cardPrice: HTMLElement;
  protected cardDescription: HTMLElement;
  protected cardId: string;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);

    this.buyButton = ensureElement('.card__button', this.container) as HTMLButtonElement;
    this.cardImage = ensureElement('.card__image', this.container) as HTMLImageElement;
    this.cardTitle = this.container.querySelector('.card__title') as HTMLElement;
    this.cardCategory = this.container.querySelector('.card__category') as HTMLElement;
    this.cardPrice = this.container.querySelector('.card__price') as HTMLElement;
    this.cardDescription = this.container.querySelector('.card__text') as HTMLElement;

    this.buyButton.addEventListener('click', () => {
      events.emit('card:buy', {id: this.cardId});
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
    value? this.setText(this.cardPrice, `${value} синапсов`): this.setText(this.cardPrice, 'Бесценно');
  }

  set description(value:string) {
    this.setText(this.cardDescription, value);
  }

  toggleButton(value: boolean){
    !value? this.setText(this.buyButton, 'Купить') : this.setText(this.buyButton, 'Уже в корзине');
    this.buyButton.disabled = value;
  }
}