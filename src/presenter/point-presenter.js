import {render, replace, remove} from '../framework/render.js';
import WaypointView from '../view/waypoint.js';
import EditingFormView from '../view/editing-form.js';
import { Mode } from '../const.js';

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #mode = Mode.DEFAULT;
  #point = null;
  #offersModel = null;
  #destinationsModel = null;

  constructor({pointListContainer, offersModel, destinationsModel, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;
    this.#pointComponent = new WaypointView ({
      point: this.#point,
      pointOffers: this.#offersModel.getByType(point.type),
      pointDestinations: this.#destinationsModel.getById(point.destinations),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });


    this.#pointEditComponent = new EditingFormView({
      point: this.#point,
      offers: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations,
      onResetClick: this.#handleResetClick,
      onSubmitClick: () => {

      },
      onFormSave: this.#handleSaveClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITTING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditToPoint();
    }
  }

  #replacePointToEdit() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITTING;
  }

  #replaceEditToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEdit();
  };

  #handleFormClick = () => {
    this.#replaceEditToPoint();
  };

  #handleSaveClick = () => {
    this.#replaceEditToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavourite: !this.#point.isFavourite});
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replacePointToEdit();
  };

  #handleResetClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceEditToPoint();
  };
}

