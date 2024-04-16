import FilterView from '../view/filters.js';
import { render } from '../framework/render.js';
import { getFilters } from '../mock/filter.js';

export default class FilterPresenter {
  #container;
  #pointModel;
  #filters = [];

  constructor({ container, pointModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#filters = getFilters(this.#pointModel.points);
  }

  init() {
    render(new FilterView(this.#filters), this.#container);
  }
}
