import {createWaypointTemplate} from '../template/waypoint-template.js';
import {createElement} from '../render.js';

export default class WaypointView{
  getTemplate(){
    return createWaypointTemplate();
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
