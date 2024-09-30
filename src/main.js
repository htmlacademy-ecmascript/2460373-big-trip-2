import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import { render, RenderPosition } from './render.js';
import ListPresenter from './presenter/list-presenter.js';

const tripMainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const listContainer = document.querySelector('.trip-events');
const listPresenter = new ListPresenter({ listContainer: listContainer });

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);

listPresenter.init();
