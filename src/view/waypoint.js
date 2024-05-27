import {createWaypointTemplate} from '../template/waypoint-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class WaypointView extends AbstractView{
  #point;
  #destination;
  #offers;

  constructor(point, destination, offers){
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
  }

  get template(){
    return createWaypointTemplate(this.#point, this.#destination, this.#offers);
  }

  setEditClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
