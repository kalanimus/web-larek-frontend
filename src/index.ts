import { ProductApi } from './components/API/ProductApi';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { GalleryModel } from './components/Models/GalleryModel';
import { Card } from './components/View/Card';
import { Page } from './components/View/Page';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';

const testCards = [
        {
            id: "854cef69-976d-4c2a-a18c-2aa45046c390",
            description: "Если планируете решать задачи в тренажёре, берите два.",
            image: "/5_Dots.svg",
            title: "+1 час в сутках",
            category: "софт-скил",
            price: 750
        },
        {
            id: "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
            description: "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
            image: "/Shell.svg",
            title: "HEX-леденец",
            category: "другое",
            price: 1450
        }
    ];

const events = new EventEmitter();
const gallery = new GalleryModel(events);
const galleryList = document.querySelector('.gallery') as HTMLUListElement;
const page = new Page(document.querySelector('.page__wrapper') as HTMLElement);
const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;

const card1 = new Card(cloneTemplate(cardTemplate));
const card2 = new Card(cloneTemplate(cardTemplate));
console.log(galleryList)

galleryList.append(card1.render());
galleryList.append(card2.render());


// events.on("gallery: changed", () => {
//   const cardsHTMLElement = gallery.getItems().map(card => new Card())
// })