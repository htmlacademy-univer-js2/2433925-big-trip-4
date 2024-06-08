import { render, replace, remove } from '../framework/render.js';
import FiltersView from '../view/filters.js';
import { filter } from '../utils.js';
import { FilterType, UpdateType } from '../const.js';

export default class FilterPresenter {
  #filterContainer;
  #filterModel;
  #pointsModel;
  #filterComponent;
  #destinationsModel;
  #offersModel;

  constructor({filterContainer, pointsModel, filterModel, destinationsModel, offersModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FilterType.EVERYTHING,
        name: FilterType.EVERYTHING,
        count: filter[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: FilterType.FUTURE,
        count: filter[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.PRESENT,
        name: FilterType.PRESENT,
        count: filter[FilterType.PRESENT](points).length,
      },
      {
        type: FilterType.PAST,
        name: FilterType.PAST,
        count: filter[FilterType.PAST](points).length,
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FiltersView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    if (this.#offersModel.offers.length === 0 || this.#offersModel.isSuccessfullLoading === false ||
      this.#destinationsModel.destinations.length === 0 || this.#destinationsModel.isSuccessfullLoading === false ||
      this.#pointsModel.isSuccessfullLoading === false) {
      return;
    }
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
