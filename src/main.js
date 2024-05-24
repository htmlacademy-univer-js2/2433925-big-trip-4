import Presenter from './presenter/presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripNameView from './view/trip-name.js';
import { render, RenderPosition } from './framework/render.js';
import PointModel from './models/point-model.js';
import DestinationModel from './models/destination-model.js';
import OfferModel from './models/offer-model.js';
import MockService from './services/mock-service.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const mockService = new MockService();
const pointModel = new PointModel(mockService);
const offerModel = new OfferModel(mockService);
const destinationModel = new DestinationModel(mockService);
const presenter = new Presenter({container: tripEvents, points: pointModel, offerModel, destinationModel});
const filterPresenter = new FilterPresenter({container: tripControlsFilters, pointModel});

render(new TripNameView(), tripMain, RenderPosition.AFTERBEGIN);
filterPresenter.init();
presenter.init();
