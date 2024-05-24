import { TYPE_OF_POINT, CITIES } from '../const';
import { makeKebabCase, getFullDate } from '../utils';

function getPhotos(pictures) {
  const container = [];
  for (let i = 0; i < pictures.length; i++) {
    const picture = `<img class="event__photo" src="${pictures[i]}" alt="Event photo">`;
    container.push(picture);
  }
  return container.join('\n');
}

function isCheckedType(checkedTypeOfPoint, typeOfPoint) {

  if (checkedTypeOfPoint === typeOfPoint) {
    return 'checked';
  }

}

function genEventTypeItem(arrayType, pointType) {
  const container = [];
  for (let i = 0; i < arrayType.length; i++) {
    const type =
      `<div class="event__type-item">
      <input id="event-type-${makeKebabCase(arrayType[i])}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${makeKebabCase(arrayType[i])}" ${isCheckedType(pointType, arrayType[i])}>
      <label class="event__type-label  event__type-label--${makeKebabCase(arrayType[i])}" for="event-type-${makeKebabCase(arrayType[i])}-1">${arrayType[i]}</label>
    </div>`;
    container.push(type);
  }
  return container.join('\n');
}

function makeDestination(currentDestination) {
  return `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${currentDestination.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${getPhotos(currentDestination.photo)}
            </div>
          </div>
  </section>`;
}

function makeOffers(offers) {
  const container = [];
  for (let i = 0; i < offers.length; i++) {

    const checkedOffer =
      `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${makeKebabCase(offers[i].name)}-1"
      type="checkbox" name="event-offer-${makeKebabCase(offers[i].name)}" ${(offers[i].isChecked) ? 'checked' : ''} data-id="${offers[i].id}">
      <label class="event__offer-label" for="event-offer-${makeKebabCase(offers[i].name)}-1">
        <span class="event__offer-title">${offers[i].name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offers[i].price}</span>
      </label>
    </div>`;
    container.push(checkedOffer);
  }
  return `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${container.join('\n')}
    </div>
  </section>`;
}

function genPointDestination() {
  const container = [];
  for (const city of CITIES) {
    const optionValue =
    `<option value="${city}">${city}</option>`;
    container.push(optionValue);
  }
  return container.join('\n');
}

function createEditingFormTemplate({state, offers, destinations}) {
  const { point, startTime, finishTime } = state;
  const currentDestination = destinations.find((destination) => destination.id === point.destination);
  const currentOffers = offers.find((offer) => offer.type.toLowerCase() === point.type.toLowerCase());

  return `
  <li>
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${genEventTypeItem(TYPE_OF_POINT, point.type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.city}" list="destination-list-1">
          <datalist id="destination-list-1">
          ${genPointDestination()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFullDate(startTime)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFullDate(finishTime)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
      ${(currentOffers.offers.length !== 0) ? makeOffers(currentOffers.offers) : ''}
      ${(point.destinations !== null) ? makeDestination(currentDestination) : ''}
      </section>
    </form>
    </li>`;
}

export { createEditingFormTemplate };
