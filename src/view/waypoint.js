import {createWaypointTemplate} from '../template/waypoint-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class WaypointView extends AbstractView{
  #point;
  #onEditClick;
  #onFavoriteClick;

  constructor({point, onEditClick, onFavoriteClick}){
    super();
    this.#point = point;
    this.#onEditClick = onEditClick;
    this.#onFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template(){
    return createWaypointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavoriteClick();
  };
}
