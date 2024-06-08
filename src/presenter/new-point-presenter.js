import { render, remove, RenderPosition } from '../framework/render.js';
import EditingFormView from '../view/editing-form.js';
import { UserAction, UpdateType } from '../const.js';
import EmptyListView from '../view/empty-list.js';

export default class NewPointPresenter {
  #noPointComponent;
  #pointListContainer;
  #createPointComponent;
  #changeData;
  #destroyCallback;
  #destinationsModel;
  #offersModel;
  #destinations;
  #offers;
  #filterType;
  #pointsModel;

  constructor({pointListContainer, changeData, destinationsModel, offersModel, filterType, pointsModel}) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterType = filterType;
    this.#pointsModel = pointsModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#createPointComponent) {
      return;
    }

    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];
    this.#createPointComponent = new EditingFormView({
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: true
    });
    this.#createPointComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#createPointComponent.setDeleteClickHandler(this.#handleDeleteClick);
    render(this.#createPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #renderNoPoints = () => {
    this.#noPointComponent = new EmptyListView(this.#filterType);
    render(this.#noPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
  };

  destroy = () => {
    if (!this.#createPointComponent) {
      return;
    }

    this.#destroyCallback?.();
    remove(this.#createPointComponent);
    this.#createPointComponent = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);
    if (this.#pointsModel.points.length === 0){
      this.#renderNoPoints();
    }
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  setSaving = () => {
    this.#createPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  #resetFormState = () => {
    this.#createPointComponent.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  };

  setAborting = () => {
    if (this.#createPointComponent){
      this.#createPointComponent.shake(this.#resetFormState);
    }
  };
}
