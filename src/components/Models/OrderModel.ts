import { PaymentType } from "../../types";
import { IEvents } from "../base/events";


export class OrderModel {
  protected _payment: PaymentType;
  protected _address: string;
  protected _email: string;
  protected _phone: string;

  constructor(protected events: IEvents) {}

  fillOrder(payment: PaymentType, address: string){
    this._payment = payment;
    this._address = address;
  }

  addContacts(phone: string, email: string) {
    this._phone = phone;
    this._email = email;
  }

  clearOrder(){
    this._payment = null;
    this._address = '';
    this._email = '';
    this._phone = '';
  }

  validateOrderForm(address: string, payment: PaymentType){
    if (this.validateAddress(address) && this.validatePayment(payment)){
      this.events.emit('validationOrder:correct');
    } else {
      this.events.emit('validationOrder:incorrect', ({error: "Неверно указан адрес или поле не заполнено"}));
    }
  }

  validateContactsForm(email: string, phone: string){
    if (this.validateEmail(email) && this.validatePhone(phone))
      this.events.emit('validationContacts:correct');
    
  }

  validateAddress(value: string): boolean {
    return value? true : false;
  }

  validatePayment(value: PaymentType): boolean {
    return value? true : false;
  }

  validateEmail(value: string): boolean {
    if (value)
      return true;
    else {
      this.events.emit('validationContacts:incorrect', ({error: "Неверно указана почта"}));
      return false;
    }
  }

  validatePhone(value: string): boolean {
    if (value)
      return true;
    else {
      this.events.emit('validationContacts:incorrect', ({error: "Неверно указан телефон"}));
      return false;
    }
  }

  static makeApiOrderObj(order: OrderModel,items: string[], total: number): Object{
    return {
      payment: order._payment,
      address: order._address,
      email: order._email,
      phone: order._phone,
      items: items,
      total: total
    }
  }
}