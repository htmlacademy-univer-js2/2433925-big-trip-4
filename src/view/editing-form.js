import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { TYPE_OF_POINT } from '../const.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { createEditingFormTemplate } from '../template/editing-form-template';

const POINT = {
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destinationId: 0,
  isFavorite: false,
  offerIds: [],
  type: TYPE_OF_POINT[0],
};

export default class EditingFormView extends AbstractStatefulView{
  #destination;
  #offers;
  #datepickerFrom;
  #datepickerTo;
  #isNewPoint;

  constructor({point = POINT, destination, offers, isNewPoint}) {
    super();
    this.#destination = destination;
    this.#offers = offers;
    this._state = EditingFormView.parsePointToState(point);
    this.#isNewPoint = isNewPoint;
    this.#setInnerHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  get template () {
    return createEditingFormTemplate(this._state, this.#destination, this.#offers, this.#isNewPoint);
  }

  setPointClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#pointClickHandler);
  };

  setSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#submitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #pointClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #submitHandler = (evt) =>{
    evt.preventDefault();
    this._callback.submit(EditingFormView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditingFormView.parseStateToPoint(this._state));
  };

  removeElement = () => {
    super.removeElement();
    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  reset = (point) =>{
    this.updateElement(
      EditingFormView.parsePointToState(point),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setOuterHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  };

  #pointDateFromChangeHandler = ([userDate]) =>{
    this.updateElement({
      dateFrom: dayjs(userDate).toDate(),
    });
  };

  #pointDateToChangeHandler = ([userDate]) =>{
    this.updateElement({
      dateTo: dayjs(userDate).toDate(),
    });
  };

  #pointPriceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: `${Number(evt.target.value).toString()}`,
    });
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._state.offerIds = [];
    this.updateElement({
      type: evt.target.value,
    });
  };

  #pointOffersChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedOfferId = Number(evt.target.id.slice(-1));
    const offerIds = this._state.offerIds.filter((n) => n !== checkedOfferId);
    let currentOfferIds = [...this._state.offerIds];
    if (offerIds.length !== this._state.offerIds.length) {
      currentOfferIds = offerIds;
    }
    else {
      currentOfferIds.push(checkedOfferId);
    }
    this._setState({
      offerIds: currentOfferIds,
    });
  };

  #pointDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destination = this.#destination.find((x) => x.name === evt.target.value);
    this.updateElement({
      destinationId: destination.id,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input').addEventListener('change', this.#pointDestinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#pointOffersChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#pointPriceChangeHandler);
  };

  #setDatepickerFrom = () => {
    if (this._state.dateFrom) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateFrom,
          maxDate: this._state.dateTo,
          onChange: this.#pointDateFromChangeHandler,
        },
      );
    }
  };

  #setDatepickerTo = () => {
    if (this._state.dateTo) {
      this.#datepickerTo = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateTo,
          minDate: this._state.dateFrom,
          onChange: this.#pointDateToChangeHandler,
        },
      );
    }
  };

  #setOuterHandlers = () => {
    if (!this.#isNewPoint) {
      this.setPointClickHandler(this._callback.click);
    }
    this.setSubmitHandler(this._callback.submit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };


  static parsePointToState = (point) => ({...point,
    dateTo: dayjs(point.dateTo).toDate(),
    dateFrom: dayjs(point.dateFrom).toDate(),
  });

  static parseStateToPoint = (state) => {
    const point = {...state};
    return point;
  };
}
