import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MenuView from './view/menu.js';
import { render } from './framework/render.js';
import PointsModel from './models/point-model.js';
import FilterModel from './models/filter-model.js';
import NewEventButtonView from './view/new-event-button.js';
import { getPoints, getDestinations, getOffersByType } from './mock/point.js';

const menuContainer = document.querySelector('.trip-controls__navigation');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);
const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel);
pointsModel.init(points, destinations, offersByType);
filterPresenter.init();
tripPresenter.init(pointsModel);
const newPointButtonComponent = new NewEventButtonView();
const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};
const handleNewPointButtonClick = () => {
  tripPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};
render(newPointButtonComponent, tripMain);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
render(new MenuView(), menuContainer);
