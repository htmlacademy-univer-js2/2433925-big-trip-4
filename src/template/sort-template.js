import { SortType, SortTypeDescription, SORT_TYPES_DISABLED } from '../const.js';

function createSortTemplate(currentSortType) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${Object.values(SortType).map((sortType) => `<div class="trip-sort__item  trip-sort__item--${sortType}">
  <input ${currentSortType === sortType ? 'checked' : ''} data-sort-type=${sortType} id="sort-${sortType}"
  class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}"
  ${SORT_TYPES_DISABLED.includes(sortType) ? 'disabled' : ''}>
  <label class="trip-sort__btn" for="sort-${sortType}">${SortTypeDescription[sortType]}</label>
  </div>`).join('')}
</form>`;
}

export {createSortTemplate};
