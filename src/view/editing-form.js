import {createEditingFormTemplate} from '../template/editing-form-template.js';
import {createElement} from '../render.js';

export default class EditingFormView{
  getTemplate(){
    return createEditingFormTemplate();
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
