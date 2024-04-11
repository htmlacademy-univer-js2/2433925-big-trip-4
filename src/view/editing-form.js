import {createEditingFormTemplate} from '../template/editing-form-template.js';
import {createElement} from '../render.js';
import { getRandomArrayElement, getRandomNumber } from '../utils';
import { getDestination } from '../mock/destination';
import { getOffer } from '../mock/offer';
import { CITIES, TYPE_OF_POINT } from '../const';
import dayjs from 'dayjs';

export default class EditingFormView{
  #element;
  #point;
  #defaultPoint = {
    id: 1,
    type: getRandomArrayElement(TYPE_OF_POINT),
    city: getRandomArrayElement(CITIES),
    price: getRandomNumber(100, 1500),
    startTime: dayjs('2024-04-12 04:40',),
    finishTime: dayjs('2024-04-12 09:50'),
    isFavorite: false,
    offers: Array.from({length: getRandomNumber(1, 5)}, getOffer),
    destination: getDestination(),
  };

  constructor(point = this.#defaultPoint){
    this.#point = point;
  }

  get template(){
    return createEditingFormTemplate(this.#point);
  }

  get element(){
    if (!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement(){
    this.#element = null;
  }
}
