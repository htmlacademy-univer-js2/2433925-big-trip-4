import { createEmptyListTemplate } from '../template/empty-list-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class EmptyListView extends AbstractView {
  #filterType;

  constructor(filterType){
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
