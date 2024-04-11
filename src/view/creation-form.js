import {createCreationFormTemplate} from '../template/creation-form-template.js';
import {createElement} from '../render.js';

export default class CreationFormView{
  #element;

  get template(){
    return createCreationFormTemplate();
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
