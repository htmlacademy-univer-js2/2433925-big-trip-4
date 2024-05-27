import AbstractView from '../framework/view/abstract-view';
import { menuTemplate } from '../template/menu-template';

export default class MenuView extends AbstractView{
  get template() {
    return menuTemplate();
  }
}
