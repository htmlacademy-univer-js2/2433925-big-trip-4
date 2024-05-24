import SortView from '../view/sort.js';
import CreationFormView from '../view/creation-form.js';
import EmptyListView from '../view/empty-list.js';
import { render, RenderPosition, remove, replace} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem, sortTime, sortPrice, sortDay} from '../utils.js';
import { SortType } from '../const.js';

export default class Presenter {
  #creationFormView;
  #sort;
  #container;
  #pointsModel;
  #offersModel;
  #destinationsModel;
  #points = [];
  #pointPresenters = new Map();
  #noPointComponent = new EmptyListView();
  #currentSortType = SortType.DAY;
  #sourcePoints = [];

  constructor({ container, points, offerModel, destinationModel}) {
    this.#container = container;
    this.#pointsModel = points;
    this.#offersModel = offerModel;
    this.#destinationsModel = destinationModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points].sort(sortDay);
    this.#sourcePoints = [...this.#pointsModel.points];
    this.#render();
  }

  #onModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#creationFormView.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#onDataChange,
      onModeChange: this.#onModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #renderNoPoints() {
    render(this.#noPointComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #onDataChange = (updatedPoint) => {
    this.#container = updateItem(this.#points, updatedPoint);
    this.#sourcePoints = updateItem(this.#sourcePoints, updateItem);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch(sortType) {
      case SortType.TIME:
        this.#points.sort(sortTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPrice);
        break;
      case SortType.DAY:
        this.#points.sort(sortDay);
        break;
    }

    this.#currentSortType = sortType;
  }

  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderSort();
    this.#renderPoints();
  };

  #renderSort() {
    const prevSortComponent = this.#sort;
    this.#sort = new SortView({
      type: this.#currentSortType,
      onSortTypeChange: this.#onSortTypeChange,
    });

    if (prevSortComponent) {
      replace(this.#sort, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sort, this.#container, RenderPosition.AFTERBEGIN);
    }
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #rendereventListContainer = () => {
    this.#creationFormView = new CreationFormView();
    render(this.#creationFormView, this.#container);
  };

  #render() {
    if (this.#points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#rendereventListContainer();
    this.#renderPoints();
  }
}
