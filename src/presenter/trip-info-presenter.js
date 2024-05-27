import { render, remove } from '../framework/render.js';
import TripInfoView from '../view/trip-info.js';


export default class TripNameView {
  #points;
  #offers;
  #destinations;
  #destinationsModel;
  #offersModel;
  #tripInfoComponent;
  #tripInfoContainer;

  constructor(tripInfoContainer, destinationsModel, offersModel) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init = (points) => {
    this.#points = points;
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];
    this.#tripInfoComponent = new TripInfoView(this.#points, this.#destinations, this.#offers);
    render(this.#tripInfoComponent, this.#tripInfoContainer);
  };

  destroy = () => {
    remove(this.#tripInfoComponent);
  };
}
