import { createFiltersTemplate } from '../template/filters-template.js';
import AbstractView from '../framework/view/abstract-view.js';


export default class FiltersView extends AbstractView {
  #filters = [];

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate({filters: this.#filters});
  }
}
