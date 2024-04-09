import SortView from '../view/sort.js';
import CreationFormView from '../view/creation-form.js';
import EditingFormView from '../view/editing-form.js';
import WaypointView from '../view/waypoint.js';
import { render, RenderPosition} from '../render.js';

export default class Presenter{
  creationFormView = new CreationFormView();
  sort = new SortView();

  constructor({container}){
    this.container = container;
  }

  init(){
    render(this.sort, this.container, RenderPosition.AFTERBEGIN);
    render(new EditingFormView(), this.container);
    render(this.creationFormView, this.container);

    for (let i = 0; i < 3; i++){
      render(new WaypointView(), this.creationFormView.getElement());
    }
  }
}
