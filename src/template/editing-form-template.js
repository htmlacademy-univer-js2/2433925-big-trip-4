import { TYPE_OF_POINT } from '../const';
import { makeKebabCase, isChecked, getFullDate } from '../utils';

function getPhotos(pictures) {
  const arr = [];
  for (let i = 0; i < pictures.length; i++) {
    const picture = `<img class="event__photo" src="${pictures[i]}" alt="Event photo">`;
    arr.push(picture);
  }
  return arr.join('\n');
}

function genEventTypeItem (arr) {
  const container = [];
  for (let i = 0; i < arr.length; i++) {
    const type =
    `<div class="event__type-item">
      <input id="event-type-${makeKebabCase(arr[i])}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${makeKebabCase(arr[i])}">
      <label class="event__type-label  event__type-label--${makeKebabCase(arr[i])}" for="event-type-${makeKebabCase(arr[i])}-1">${arr[i]}</label>
    </div>`;
    container.push(type);
  }
  return container.join('\n');
}

function makeOffers1(offers) {
  const container = [];
  for (let i = 0; i < offers.length; i++){

    const checkedOffer =
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-${offers[i].id}" type="checkbox" name="event-offer-${makeKebabCase(offers[i].name)}" ${isChecked(offers[i].isChecked)}>
      <label class="event__offer-label" for="event-offer-${makeKebabCase(offers[i].name)}-${offers[i].id}">
        <span class="event__offer-title">${offers[i].name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offers[i].price}</span>
      </label>
    </div>`;
    container.push(checkedOffer);
  }
  return container.join('\n');
}

function createEditingFormTemplate(point){
  return `<form class="event event--edit" action="#" method="post">
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
          ${genEventTypeItem(TYPE_OF_POINT)}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${point.type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination.name}" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="${point.destination.name}"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFullDate(point.startTime)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFullDate(point.finishTime)}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${makeOffers1(point.offers)}
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${point.destination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${getPhotos(point.destination.photo)}
        </div>
      </div>
    </section>
  </section>
</form>`;
}

export {createEditingFormTemplate};
