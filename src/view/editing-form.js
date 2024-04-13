import {createEditingFormTemplate} from '../template/editing-form-template.js';
import AbstractView from '../framework/view/abstract-view.js';
import { getDestination } from '../mock/destination.js';
import { getOffer } from '../mock/offer.js';
import { getRandomNumber } from '../utils.js';

const EMPTY_POINT = {
  id: 1,
  type: 'flight',
  city: 'Moscow',
  price: getRandomNumber(0, 1000),
  startTime: '2024-04-10 04:40',
  finishTime: '2024-04-10 04:40',
  isFavorite: false,
  offers: Array.from({length: getRandomNumber(1, 5)}, getOffer),
  destination: getDestination()
};

export default class EditingFormView extends AbstractView{
  #point;
  #onSubmitClick;
  #onResetClick;

  constructor({point = EMPTY_POINT, onSubmitClick, onResetClick}){
    super();
    this.#point = point;
    this.#onSubmitClick = onSubmitClick;
    this.#onResetClick = onResetClick;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#resetButtonClickHandler);
  }

  get template(){
    return createEditingFormTemplate(this.#point);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitClick();
  };

  #resetButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onResetClick();
  };
}
