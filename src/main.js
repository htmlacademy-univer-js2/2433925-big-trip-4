import Presenter from './presenter/presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripNameView from './view/trip-name.js';
import { render, RenderPosition } from './framework/render.js';
import PointModel from './models/point-model.js';
import OfferModel from './models/offer-model.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const pointModel = new PointModel();
const presenter = new Presenter({container: tripEvents, points: pointModel, offers: new OfferModel});
const filterPresenter = new FilterPresenter({container: tripControlsFilters, pointModel});

render(new TripNameView(), tripMain, RenderPosition.AFTERBEGIN);

presenter.init();
filterPresenter.init();
