import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from './event-presenter.js';
import { render } from '../framework/render.js';
import { updateEvents } from '../utils/common.js';

export default class ListPresenter {
  #listContainer = null;
  #eventsModel = null;
  #listEvents = [];
  #listComponent = new ListView();
  #sortComponent = new SortView();
  #noEventComponent = new NoEventView();
  #eventPresenterAll = new Map();

  constructor({ listContainer, eventsModel }) {
    this.#listContainer = listContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#listEvents = [...this.#eventsModel.events];

    this.#renderList();

    for (let i = 0; i < this.#listEvents.length; i++) {
      this.#renderEvent(this.#listEvents[i]);
    }
  }

  #renderList() {
    if (!this.#listEvents.length) {
      render(this.#noEventComponent, this.#listContainer);
      return;
    }

    render(this.#sortComponent, this.#listContainer);
    render(this.#listComponent, this.#listContainer);
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

  #handleEventChange = (updatedEvent) => {
    this.#listEvents = updateEvents(this.#listEvents, updatedEvent);
    this.#eventPresenterAll.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenterAll.forEach((presenter) => presenter.resetView());
  };
}
