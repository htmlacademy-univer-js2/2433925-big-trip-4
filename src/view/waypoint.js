import {createWaypointTemplate} from '../template/waypoint-template.js';
import {createElement} from '../render.js';

export default class WaypointView{
  #point;
  #element;

  constructor(point){
    this.#point = point;
  }

  get template(){
    return createWaypointTemplate(this.#point);
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
