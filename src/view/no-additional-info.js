import AbstractView from '../framework/view/abstract-view';
import {createNoAdditionalInfoTemplate} from '../template/no-additional-info-template';

export default class NoAdditionalInfoView extends AbstractView {
  get template() {
    return createNoAdditionalInfoTemplate();
  }
}
