import NewEventButtonView from '../view/new-event-button.js';
import { render } from '../framework/render.js';

export default class NewPointButtonPresenter {
  #tripPresenter;
  #destinationsModel;
  #offersModel;
  #pointsModel;
  #newPointButtonContainer;
  #newPointButtonComponent;

  constructor({newPointButtonContainer, destinationsModel, offersModel, pointsModel, tripPresenter}) {
    this.#newPointButtonContainer = newPointButtonContainer;
    this.#destinationsModel = destinationsModel;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#tripPresenter = tripPresenter;
  }

  init() {
    this.#newPointButtonComponent = new NewEventButtonView();
  }

  renderNewPointButton = () => {
    render(this.#newPointButtonComponent, this.#newPointButtonContainer);
    this.#newPointButtonComponent.setClickHandler(this.#handleNewPointButtonClick);
    if (this.#offersModel.offers.length === 0 || this.#offersModel.isSuccessfullLoading === false ||
      this.#destinationsModel.destinations.length === 0 || this.#destinationsModel.isSuccessfullLoading === false ||
      this.#pointsModel.isSuccessfullLoading === false) {
      this.#newPointButtonComponent.element.disabled = true;
    }
  };

  #handleNewPointFormClose = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };

  #handleNewPointButtonClick = () => {
    this.#tripPresenter.createPoint(this.#handleNewPointFormClose);
    this.#newPointButtonComponent.element.disabled = true;
  };
}
