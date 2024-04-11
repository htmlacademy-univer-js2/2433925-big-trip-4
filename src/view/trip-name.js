import {createTripNameTemplate} from '../template/trip-name-template.js';
import {createElement} from '../render.js';

export default class TripNameView{
  #element;

  get template(){
    return createTripNameTemplate();
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
