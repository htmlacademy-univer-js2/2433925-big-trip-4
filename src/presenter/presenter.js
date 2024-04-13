import SortView from '../view/sort.js';
import CreationFormView from '../view/creation-form.js';
import EditingFormView from '../view/editing-form.js';
import WaypointView from '../view/waypoint.js';
import { render, RenderPosition, replace } from '../framework/render.js';

export default class Presenter {
  #creationFormView = new CreationFormView();
  #sort = new SortView();
  #container;
  #pointsModel;
  #offersModel;
  #points = [];

  constructor({ container, points, offers }) {
    this.#container = container;
    this.#pointsModel = points;
    this.#offersModel = offers;
    this.#points = [...this.#pointsModel.points];
  }

  init() {
    render(this.#sort, this.#container, RenderPosition.AFTERBEGIN);
    render(this.#creationFormView, this.#container);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint = (point) => {
    const pointComponent = new WaypointView({ point, onEditClick: pointEditClickHandler });
    const editPointComponent = new EditingFormView({ point, onSubmitClick: pointSubmitHandler, onResetClick: resetButtonClickHandler });

    const replacePointToForm = () => {
      replace(editPointComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, editPointComponent);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    function pointEditClickHandler() {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function resetButtonClickHandler() {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function pointSubmitHandler() {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(pointComponent, this.#creationFormView.element);
  };
}
