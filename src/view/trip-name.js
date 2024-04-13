import {createTripNameTemplate} from '../template/trip-name-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class TripNameView extends AbstractView{
  get template(){
    return createTripNameTemplate();
  }
}
