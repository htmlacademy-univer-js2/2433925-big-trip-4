import AbstractView from '../framework/view/abstract-view';
import { createNoPointTemplate } from '../template/loading-template';

export default class LoadingView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
