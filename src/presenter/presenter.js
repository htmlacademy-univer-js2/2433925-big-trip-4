import SortView from '../view/sort.js';
import CreationFormView from '../view/creation-form.js';
import EmptyListView from '../view/empty-list.js';
import { render, RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';

export default class Presenter {
  #creationFormView = new CreationFormView();
  #sort = new SortView();
  #container;
  #pointsModel;
  #offersModel;
  #points = [];
  #offers = [];
  #pointPresenters = new Map();
  #noPointComponent = new EmptyListView();

  constructor({ container, points, offers }) {
    this.#container = container;
    this.#pointsModel = points;
    this.#offersModel = offers;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#offers = [...this.#offersModel.offers];

    if (this.#points.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#render();
    }
    this.#renderSort();
  }

  #onModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#creationFormView.element,
      onDataChange: this.#onDataChange,
      onModeChange: this.#onModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(from, to) {
    this.#points.slice(from, to).forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #onDataChange = (updatedPoint) => {
    this.#container = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort() {
    render(this.#sort, this.#container, RenderPosition.AFTERBEGIN);
  }

  #clearPoinList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #render() {
    render(this.#creationFormView, this.#container);

    for(let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }
}
