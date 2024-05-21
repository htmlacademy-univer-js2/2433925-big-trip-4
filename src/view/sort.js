import {createSortTemplate} from '../template/sort-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class SortView extends AbstractView{
  #onSortTypeChange;
  #type;

  constructor({onSortTypeChange, type}) {
    super();
    this.#onSortTypeChange = onSortTypeChange;
    this.#type = type;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template(){
    return createSortTemplate(this.#type);
  }

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#onSortTypeChange(evt.target.dataset.sortType);
  };
}
