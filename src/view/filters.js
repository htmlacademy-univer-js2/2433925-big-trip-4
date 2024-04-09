import {createFiltersTemplate} from '../template/filters-template.js';
import {createElement} from '../render.js';

export default class FiltersView{
  getTemplate(){
    return createFiltersTemplate();
  }

  getElement(){
    if (!this.element){
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
