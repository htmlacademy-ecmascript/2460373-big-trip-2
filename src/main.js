import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import { render, RenderPosition } from './framework/render.js';
import ListPresenter from './presenter/list-presenter.js';
import EventsModel from './model/events-model.js';
import { generateFilter } from './mock/filter.js';

const tripMainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const listContainer = document.querySelector('.trip-events');
const eventsModel = new EventsModel();

const listPresenter = new ListPresenter({
  listContainer: listContainer,
  eventsModel
});

const filters = generateFilter(eventsModel.events);

if (eventsModel.events.length) {
  render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
}

render(new FilterView({ filters }), filterContainer);

listPresenter.init();
