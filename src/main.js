import FiltersView from './view/filters.js';
import TripNameView from './view/trip-name.js';
import { render, RenderPosition} from './render.js';
import Presenter from './presenter/presenter.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const presenter = new Presenter({container: tripEvents});

render(new FiltersView(), tripControlsFilters);
render(new TripNameView(), tripMain, RenderPosition.AFTERBEGIN);

presenter.init();
