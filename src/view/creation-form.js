import {createCreationFormTemplate} from '../template/creation-form-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class CreationFormView extends AbstractView{
  get template(){
    return createCreationFormTemplate();
  }
}
