import SortView from '../view/sort.js';
import CreationFormView from '../view/creation-form.js';
import EditingFormView from '../view/editing-form.js';
import WaypointView from '../view/waypoint.js';
import { render, RenderPosition} from '../render.js';

export default class Presenter{
  #creationFormView = new CreationFormView();
  #sort = new SortView();
  #container;
  #pointsModel;
  #offersModel;
  #points;

  constructor({container, points, offers}){
    this.#container = container;
    this.#pointsModel = points;
    this.#offersModel = offers;
  }

  init(){
    this.#points = [...this.#pointsModel.points];
    render(this.#sort, this.#container, RenderPosition.AFTERBEGIN);
    render(new EditingFormView(this.#points), this.#container);
    render(this.#creationFormView, this.#container);

    for (let i = 0; i < this.#points.length; i++){
      render(new WaypointView(this.#points[i]), this.#creationFormView.element);
    }
  }
}
