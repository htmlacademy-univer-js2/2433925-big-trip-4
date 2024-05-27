import AbstractView from '../framework/view/abstract-view';
import { newEventButtonTemplate } from '../template/new-event-button-template';

export default class NewEventButtonView extends AbstractView {
  get template() {
    return newEventButtonTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
