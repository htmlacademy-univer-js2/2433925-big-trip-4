import {createWaypointTemplate} from '../template/waypoint-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class WaypointView extends AbstractView{
  #point;
  #onEditClick;

  constructor({point, onEditClick}){
    super();
    this.#point = point;
    this.#onEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template(){
    return createWaypointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
  };
}
