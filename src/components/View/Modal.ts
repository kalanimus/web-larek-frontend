import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected closeButton: HTMLButtonElement;
  protected modalContent: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents){
    super(container);

    this.closeButton = ensureElement('.modal__close', this.container) as HTMLButtonElement;
    this.modalContent = ensureElement('.modal__content', this.container);

    this.closeButton.addEventListener('click', (event) => {
      this.close();
    })
  }

  set content(value: HTMLElement) {
    this.modalContent.replaceChildren(value);
  }

  open(){
    this.toggleClass(this.container, 'modal_active');
    this.events.emit('modal:open');
  }

  close(){
    this.toggleClass(this.container, 'modal_active');
    this.content = null;
    this.events.emit('modal:close');
  }
}