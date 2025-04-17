import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface ISuccess{
  total: number;
}

export class Success extends Component<ISuccess>{
  protected totalSinapses: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.totalSinapses = ensureElement('.order-success__description', this.container);
    this.closeButton = ensureElement('.order-success__close', this.container) as HTMLButtonElement;

    this.closeButton.addEventListener('click', () => {
      events.emit('closeSuccess');
    })
  }

  set total(value: number) {
    this.setText(this.totalSinapses, `Списано ${value} синапсов`)
  }
}