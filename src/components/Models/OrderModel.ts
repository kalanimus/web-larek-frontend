import { PaymentType } from "../../types";


export class OrderModel {
  protected _payment: PaymentType;
  protected _address: string;
  protected _email: string;
  protected _phone: string;

  constructor() {}

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

  static validateAddress(value: string): boolean {
    return value? true : false;
  }

  static validatePayment(value: PaymentType): boolean {
    return value? true : false;
  }

  static validateEmail(value: string): boolean {
    return value? true : false;
  }

  static validatePhone(value: string): boolean {
    return value? true : false;
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