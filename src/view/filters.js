import {createFiltersTemplate} from '../template/filters-template.js';
import {createElement} from '../render.js';

export default class FiltersView{
  #element;

  get template(){
    return createFiltersTemplate();
  }

  get element(){
    if (!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement(){
    this.#element = null;
  }
}
