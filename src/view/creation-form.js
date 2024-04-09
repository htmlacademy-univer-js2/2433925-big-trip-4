import {createCreationFormTemplate} from '../template/creation-form-template.js';
import {createElement} from '../render.js';

export default class CreationFormView{
  getTemplate(){
    return createCreationFormTemplate();
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
