import { createEmptyListTemplate } from '../template/empty-list-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class EmptyListView extends AbstractView {
  get template() {
    return createEmptyListTemplate();
  }
}
