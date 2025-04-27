import { ProductApi } from './components/API/ProductApi';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { CartModel } from './components/Models/CartModel';
import { GalleryModel } from './components/Models/GalleryModel';
import { OrderModel } from './components/Models/OrderModel';
import { Card } from './components/View/Card';
import { CardPreview } from './components/View/CardPreview';
import { FormContacts } from './components/View/FormContacts';
import { FormOrder } from './components/View/FormOrder';
import { Modal } from './components/View/Modal';
import { Page } from './components/View/Page';
import { ShoppingCart } from './components/View/ShoppingCart';
import { ShoppingCartProduct } from './components/View/ShoppingCartProduct';
import { Success } from './components/View/Success';
import './scss/styles.scss';
import { IProductItem, PaymentType } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';

const testCards: IProductItem[] = [
        {
            id: "854cef69-976d-4c2a-a18c-2aa45046c390",
            description: "Если планируете решать задачи в тренажёре, берите два.",
            image: "https://i.ytimg.com/vi/flwOhlqAkck/maxresdefault.jpg",
            title: "+1 час в сутках",
            category: "софт-скил",
            price: 750
        },
        {
            id: "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
            description: "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
            image: "https://i.pinimg.com/originals/da/aa/3e/daaa3ef9a33e5039b74b51d86d29b7a9.png",
            title: "HEX-леденец",
            category: "другое",
            price: 1450
        }
    ];

const events = new EventEmitter();
const gallery = new GalleryModel(events);
const cart = new CartModel(events);
const order = new OrderModel();
const productApi = new ProductApi(new Api(API_URL));

const galleryList = document.querySelector('.gallery') as HTMLUListElement;
const page = new Page(document.querySelector('.page__wrapper') as HTMLElement, events);
const modal = new Modal(document.querySelector('.modal') as HTMLElement, events);

const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const cartTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cartProductTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderFormTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsFormTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), events);
const shoppingCart = new ShoppingCart(cloneTemplate(cartTemplate), events);
const orderForm = new FormOrder(cloneTemplate(orderFormTemplate), events);
const contactsForm = new FormContacts(cloneTemplate(contactsFormTemplate), events)
const success = new Success(cloneTemplate(successTemplate), events)

productApi.getProducts()
.then((response) =>{
    gallery.addItems(response.items.map(item => ({...item, image: CDN_URL + item.image})));
})

events.on("gallery:changed", () => {
  const cardsHTMLElement = gallery.getItems().map(card => new Card(cloneTemplate(cardTemplate), events).render(card))
  page.render({
    gallery: cardsHTMLElement
  })
})

events.on('card:click', ({id}: {id: string}) => {
    const cardPreviewHTML = cardPreview.render(gallery.getItem(id));
    modal.render({content: cardPreviewHTML});
    modal.open();
    if(cart.isInCart(id)){
        cardPreview.toggleButton(false)
    } else {
        cardPreview.toggleButton(true)
    }
})

events.on('card:buy', ({id}: {id: string}) => {
    const card = gallery.getItem(id);
    cart.addProduct(card);
    modal.close();
})

events.on('cart:updated', () => {
    const cartTotal = cart.count;
    page.render({
        cartTotal:cartTotal})
})

events.on('cart:click', ()=>{
    ShoppingCartProduct.cleanIndex();
    const shoppingCartHTML = shoppingCart.render({
        products: cart.getProducts().map(product => new ShoppingCartProduct(cloneTemplate(cartProductTemplate), events).render(product)),
        total: cart.getTotal()
    });

    modal.render({content: shoppingCartHTML});
    if(cart.validateCart()){
        shoppingCart.toggleButton(true)
    } else {
        shoppingCart.toggleButton(false)
    }
    modal.open();
})

events.on('cart_product:delete', ({id}: {id: string}) => {
    ShoppingCartProduct.cleanIndex();
    cart.removeProduct(id);
    const shoppingCartHTML = shoppingCart.render({
        products: cart.getProducts().map(product => new ShoppingCartProduct(cloneTemplate(cartProductTemplate), events).render(product)),
        total: cart.getTotal()
    });

    modal.render({content: shoppingCartHTML});
})

events.on ('cart:place_order', () => {
    const orderFormHTML = orderForm.render();
    modal.render({content: orderFormHTML});
})

events.on('validationOrder:correct', ()=>{
    orderForm.buttonState = true;
})

events.on('validationOrder:incorrect', ()=>{
    orderForm.buttonState = false;
})

events.on('form:next', ({payment, address}: {payment: PaymentType, address: string}) => {
    order.fillOrder(payment, address);
    const contactsFormHTML = contactsForm.render();
    modal.render({content: contactsFormHTML});
})

events.on('formOrder:input_changed', ({address, payment}: {address: string, payment: PaymentType}) => {
    if (OrderModel.validateAddress(address) && OrderModel.validatePayment(payment)){
        events.emit('validationOrder:correct')
    } else {
        events.emit('validationOrder:incorrect')
    }
})

events.on('validationContacts:correct', ()=>{
    contactsForm.buttonState = true;
})

events.on('validationContacts:incorrect', ()=>{
    contactsForm.buttonState = false;
})

events.on('formContacts:input_changed', ({email, phone}: {email: string, phone: string}) => {
    if (OrderModel.validateEmail(email) && OrderModel.validatePhone(phone)){
        events.emit('validationContacts:correct')
    } else {
        events.emit('validationContacts:incorrect')
    }
})

events.on('form:submit', ({email, phone}: {email: string, phone: string}) => {
    order.addContacts(phone, email);
    
    productApi.postOrder(OrderModel.makeApiOrderObj(order, cart.getProducts().filter(product => product.price != null).map(product => product.id),cart.getTotal()))
        .then((response) => {
            const successHTML = success.render({total: cart.getTotal()});
            modal.render({content: successHTML});cart.clearCart();
            order.clearOrder();
            orderForm.cleanForm();
            contactsForm.cleanForm();
        })

})

events.on('closeSuccess', () => {
    modal.close();
})
