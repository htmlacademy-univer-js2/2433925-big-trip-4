import {createSortTemplate} from '../template/sort-template.js';
import {createElement} from '../render.js';

export default class SortView{
  #element;

  get template(){
    return createSortTemplate();
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
