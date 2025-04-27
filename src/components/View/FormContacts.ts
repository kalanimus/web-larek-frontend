import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IFormContacts{
  email: string;
  phone: string;
  buttonState: boolean;
}

export class FormContacts extends Component<IFormContacts>{
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;
  protected submitButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents){
    super(container);

    const inputs = ensureAllElements('.form__input', this.container);
    this.emailInput = inputs[0] as HTMLInputElement;
    this.phoneInput = inputs[1] as HTMLInputElement;
    this.submitButton = ensureElement('.button', this.container) as HTMLButtonElement;

    this.container.addEventListener('submit', (event) =>{
      event.preventDefault();
      events.emit('form:submit', {email: this.emailInput.value, phone: this.phoneInput.value});
    })
    
    this.emailInput.addEventListener('input', () => {
      events.emit('formContacts:input_changed', {email: this.emailInput.value, phone: this.phoneInput.value});
    })

    this.phoneInput.addEventListener('input', () => {
      events.emit('formContacts:input_changed', {email: this.emailInput.value, phone: this.phoneInput.value});
    })
  }

  set email(value: string){
    this.emailInput.value = value
  }

  set phone(value: string){
    this.phoneInput.value = value
  }

  set buttonState(value: boolean){
    this.submitButton.disabled = !value;
  }

  public cleanForm(){
    this.email = '';
    this.phone = '';
    this.buttonState = false;
  }
}