import {createTripNameTemplate} from '../template/trip-name-template.js';
import {createElement} from '../render.js';

export default class TripNameView{
  getTemplate(){
    return createTripNameTemplate();
  }

  getElement(){
    if (!this.element){
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
