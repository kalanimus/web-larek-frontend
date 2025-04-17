import { PaymentType } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IFormOrder{
  payment: PaymentType;
  email: string;
  buttonState: boolean;
}

export class FormOrder extends Component<IFormOrder> {
  protected paymentForm: HTMLElement;
  protected addressInput: HTMLInputElement;
  protected nextButton: HTMLButtonElement;
  protected _payment: PaymentType;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.paymentForm = ensureElement('.order__buttons', this.container);
    this.addressInput = ensureElement('.form__input', this.container) as HTMLInputElement;
    this.nextButton = ensureElement('.order__button', this.container) as HTMLButtonElement;
    this._payment = null;

    this.container.addEventListener('submit', (event) => {
      event.preventDefault();
      events.emit('form:next', {payment: this._payment, address: this.addressInput.value});
    })

    this.paymentForm.addEventListener('click', (event) =>{
      this.payment = ((event.target) as HTMLButtonElement).textContent as PaymentType;
      events.emit('formOrder:input_changed', {address: this.addressInput.value, payment: this._payment});
    })

    this.addressInput.addEventListener('input', () => {
      events.emit('formOrder:input_changed', {address: this.addressInput.value, payment: this._payment});
    })
  }
  
  set payment(value: PaymentType){
    this._payment = value;
  }

  set address(value: string){
    this.setText(this.addressInput, value);
  }

  set buttonState(value: boolean){
    this.nextButton.disabled = !value;
  }
}