import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from './event-presenter.js';
import { render } from '../framework/render.js';
import { updateEvents } from '../utils/common.js';
import { SortTypes, sortByPrice, sortByTime, sortByDay } from '../utils/sort.js';

export default class ListPresenter {
  #listContainer = null;
  #eventsModel = null;
  #defaultEventsList = [];
  #eventsList = [];
  #listComponent = new ListView();
  #sortComponent = null;
  #noEventComponent = new NoEventView();
  #eventPresenterAll = new Map();
  #currentSortType = null;

  constructor({ listContainer, eventsModel }) {
    this.#listContainer = listContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#defaultEventsList = [...this.#eventsModel.events].sort(sortByDay);
    this.#eventsList = this.#defaultEventsList;

    this.#sortComponent = new SortView({
      onSortChange: this.#handleSortChange
    });

    this.#renderList();
  }

  #renderList() {
    if (!this.#eventsList.length) {
      render(this.#noEventComponent, this.#listContainer);
      return;
    }

    render(this.#sortComponent, this.#listContainer);
    render(this.#listComponent, this.#listContainer);

    for (let i = 0; i < this.#eventsList.length; i++) {
      this.#renderEvent(this.#eventsList[i]);
    }
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      model: this.#eventsModel,
      eventContainer: this.#listComponent.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event);
    this.#eventPresenterAll.set(event.id, eventPresenter);
  }

  #clearEventsList() {
    this.#eventPresenterAll.forEach((presenter) => presenter.destroy());
    this.#eventPresenterAll.clear();
  }

  #sortEvents(sortType) {
    switch (sortType) {
      case SortTypes.DAY:
        this.#eventsList = [...this.#defaultEventsList];
        break;
      case SortTypes.TIME:
        this.#eventsList.sort(sortByTime);
        break;
      case SortTypes.PRICE:
        this.#eventsList.sort(sortByPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #handleEventChange = (updatedEvent) => {
    this.#eventsList = updateEvents(this.#eventsList, updatedEvent);
    this.#eventPresenterAll.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenterAll.forEach((presenter) => presenter.resetView());
  };

  #handleSortChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }

    this.#clearEventsList();
    this.#sortEvents(sortType);
    this.#renderList();
  };
}
