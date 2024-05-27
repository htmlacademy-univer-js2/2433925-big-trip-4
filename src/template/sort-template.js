import { SortType } from '../const.js';

function createSortTemplate(type) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--${SortType.DAY}">
    <input ${type === SortType.DAY ? 'checked' : ''} data-sort-type=${SortType.DAY} id="sort-${SortType.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.DAY}" checked>
    <label class="trip-sort__btn" for="sort-${SortType.DAY}">Day</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--${SortType.EVENT}">
    <input ${type === SortType.EVENT ? 'checked' : ''} data-sort-type=${SortType.EVENT} id="sort-${SortType.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.EVENT}" disabled>
    <label class="trip-sort__btn" for="sort-${SortType.EVENT}">Event</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--${SortType.TIME}">
    <input ${type === SortType.TIME ? 'checked' : ''} data-sort-type=${SortType.TIME} id="sort-${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.TIME}">
    <label class="trip-sort__btn" for="sort-${SortType.TIME}">Time</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--${SortType.PRICE}">
    <input ${type === SortType.PRICE ? 'checked' : ''} data-sort-type=${SortType.PRICE} id="sort-${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.PRICE}">
    <label class="trip-sort__btn" for="sort-${SortType.PRICE}">Price</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--${SortType.OFFER}">
    <input ${type === SortType.OFFER ? 'checked' : ''} data-sort-type=${SortType.OFFER} id="sort-${SortType.OFFER}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.OFFER}" disabled>
    <label class="trip-sort__btn" for="sort-${SortType.OFFER}">Offers</label>
  </div>
</form>`;
}

export {createSortTemplate};
