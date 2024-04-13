import {createFiltersTemplate} from '../template/filters-template.js';
import AbstractView from '../framework/view/abstract-view.js';


export default class FiltersView extends AbstractView{
  get template(){
    return createFiltersTemplate();
  }
}
