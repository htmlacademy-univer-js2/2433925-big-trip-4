import {createEditingFormTemplate} from '../template/editing-form-template.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
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

export default class EditingFormView extends AbstractStatefulView{
  #offers;
  #destinations;
  #onSubmitClick;
  #onResetClick;
  #onFormSave;

  constructor({point = EMPTY_POINT, offers, destinations, onSubmitClick, onResetClick, onFormSave}){
    super();
    this._setState(EditingFormView.parsePointToState({point}));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onSubmitClick = onSubmitClick;
    this.#onResetClick = onResetClick;
    this.#onFormSave = onFormSave;
    this._restoreHandlers();
  }

  get template(){
    return createEditingFormTemplate({ state: this._state, offers: this.#offers, destinations: this.#destinations});
  }

  reset = (point) => this.updateElement({point});

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitClick(EditingFormView.parseStateToPoint(this._state));
  };

  #resetButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onResetClick();
  };

  #formSaveHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSave();
  };

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#resetButtonClickHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#formSaveHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  }

  #typeChangeHandler = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: []
      }
    });
  };

  #destinationChangeHandler = (evt) => {
    const checkedDestination = this.#destinations.find((destination) => destination.city === evt.target.value);
    const checkedDestinationCity = (checkedDestination) ? checkedDestination.city : '';
    const checkedDestinationId = (checkedDestination) ? checkedDestination.id : null;

    this.updateElement({
      point: {
        ...this._state.point,
        city: checkedDestinationCity,
        destination: checkedDestinationId
      }
    });
  };

  #offerChangeHandler = () => {
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      point: {
        ...this._state.point,
        offers: checkedOffers.map((element) => element.dataset.id)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        price: evt.target.valueAsNumber
      }
    });
  };

  static parsePointToState = ({point}) => ({point});
  static parseStateToPoint = (state) => state.point;
}
