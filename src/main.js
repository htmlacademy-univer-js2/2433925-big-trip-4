import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MenuView from './view/menu.js';
import { render } from './framework/render.js';
import PointsModel from './models/point-model.js';
import FilterModel from './models/filter-model.js';
import OffersModel from './models/offer-model.js';
import DestinationsModel from './models/destination-model.js';
import NewEventButtonView from './view/new-event-button.js';
import PointsApiService from './api/points-api.js';
import DestinationsApiService from './api/destinations-api.js';
import OffersApiService from './api/offers-api.js';

const AUTHORIZATION = 'Basic hetvcj3459msejf1';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';
const menuContainer = document.querySelector('.trip-controls__navigation');
const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({filterContainer, filterModel, pointsModel});
filterPresenter.init();
const tripPresenter = new TripPresenter({
  tripContainer: tripEvents,
  pointsModel: pointsModel,
  filterModel: filterModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
});
tripPresenter.init(pointsModel);
const newPointButtonComponent = new NewEventButtonView();
const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};
const handleNewPointButtonClick = () => {
  tripPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};
offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().finally(() => {
      render(newPointButtonComponent, tripMain);
      newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
    });
  });
});
render(new MenuView(), menuContainer);
