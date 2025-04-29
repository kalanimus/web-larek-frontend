import { PaymentType } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IFormOrder{
  payment: PaymentType;
  email: string;
  buttonState: boolean;
}

export class FormOrder extends Component<IFormOrder> {
  protected paymentForm: HTMLElement;
  protected paymentButtons: HTMLButtonElement[];
  protected addressInput: HTMLInputElement;
  protected nextButton: HTMLButtonElement;
  protected _payment: PaymentType;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.paymentForm = ensureElement('.order__buttons', this.container);
    this.addressInput = ensureElement('.form__input', this.container) as HTMLInputElement;
    this.nextButton = ensureElement('.order__button', this.container) as HTMLButtonElement;
    this._payment = null;
    this.paymentButtons = ensureAllElements('.button', this.paymentForm) as HTMLButtonElement[];


    this.container.addEventListener('submit', (event) => {
      event.preventDefault();
      events.emit('form:next', {payment: this._payment, address: this.addressInput.value});
    })

    this.paymentForm.addEventListener('click', (event) =>{
      const button = (event.target) as HTMLButtonElement;
      if (button.classList.contains('button_alt')) {
        this.payment = ((event.target) as HTMLButtonElement).textContent as PaymentType;
        events.emit('formOrder:payment_input_changed', {address: this.addressInput.value, payment: this._payment});
      }
    })

    this.addressInput.addEventListener('blur', () => {
      events.emit('formOrder:input_changed', {address: this.addressInput.value, payment: this._payment});
    })
  }
  
  set payment(value: PaymentType){
    this._payment = value;
    this.updatePaymentButtons();
  }

  set address(value: string){
    this.addressInput.value = value;
  }

  set buttonState(value: boolean){
    this.nextButton.disabled = !value;
  }

  private updatePaymentButtons() {
    this.paymentButtons.forEach(button => {
        const isActive = button.textContent === this._payment;
        button.classList.toggle('button_alt-active', isActive);
    });
  }
  public cleanForm(){
    this._payment = null;
    this.updatePaymentButtons();
    this.address = '';
    this.buttonState = false;
  }
}