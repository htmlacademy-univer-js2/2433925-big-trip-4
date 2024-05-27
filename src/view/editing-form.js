import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { PointType } from '../const';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { createEditingFormTemplate } from '../template/editing-form-template';

const POINT = {
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: PointType.TAXI,
};

export default class EditingFormView extends AbstractStatefulView{
  #destinations;
  #offers;
  #datepickerFrom;
  #datepickerTo;
  #isNewPoint;
  #offersByType;

  constructor({point = POINT, destinations, offers, isNewPoint}) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this._state = EditingFormView.parsePointToState(point);
    this.#isNewPoint = isNewPoint;
    this.#offersByType = this.#offers.find((offer) => offer.type === this._state.type);
    this.#setInnerHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  get template () {
    return createEditingFormTemplate(this._state, this.#destinations, this.#offers, this.#isNewPoint);
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
      dateFrom: userDate
    });
  };

  #pointDateToChangeHandler = ([userDate]) =>{
    this.updateElement({
      dateTo: userDate
    });
  };

  #pointPriceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value),
    });
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._state.offers = [];
    this.updateElement({
      type: evt.target.value,
    });
  };

  #pointOffersChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedOfferId = evt.target.id.slice(12);
    const offers = this._state.offers.filter((offer) => offer !== checkedOfferId);
    let currentOfferIds = [...this._state.offers];
    if (offers.length !== this._state.offers.length) {
      currentOfferIds = offers;
    }
    else {
      currentOfferIds.push(checkedOfferId);
    }
    this._setState({
      offers: currentOfferIds
    });
  };

  #pointDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destination = this.#destinations.find((dest) => dest.name === evt.target.value);
    this.updateElement({
      destination: destination.id,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input').addEventListener('change', this.#pointDestinationChangeHandler);
    if(this.#offersByType && this.#offersByType.offers.length > 0){
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#pointOffersChangeHandler);
    }
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
    isDisabled: false,
    isSaving: false,
    isDeleting: false
  });

  static parseStateToPoint = (state) => {
    const point = {...state};
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  };
}
