import Presenter from './presenter/presenter.js';
import FiltersView from './view/filters.js';
import TripNameView from './view/trip-name.js';
import { render, RenderPosition } from './framework/render.js';
import PointModel from './models/point-model.js';
import OfferModel from './models/offer-model.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const presenter = new Presenter({container: tripEvents, points: new PointModel, offers: new OfferModel});

render(new FiltersView(), tripControlsFilters);
render(new TripNameView(), tripMain, RenderPosition.AFTERBEGIN);

presenter.init();
