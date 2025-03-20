import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import NoEventView from '../view/no-event-view.js';
import { render, replace } from '../framework/render.js';

export default class TripsPresenter {
  #listContainer = null;
  #eventsModel = null;
  #listComponent = new ListView();

  constructor({ listContainer, eventsModel }) {
    this.#listContainer = listContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.listEvents = [...this.#eventsModel.events];

    if (!this.listEvents.length) {
      render(new NoEventView(), this.#listContainer);
      return;
    }

    render(new SortView(), this.#listContainer);
    render(this.#listComponent, this.#listContainer);

    for (let i = 0; i < this.listEvents.length; i++) {
      this.renderEvent(this.listEvents[i]);
    }
  }

  renderEvent(event) {
    const destination = this.#eventsModel.getDestinationById(event.destination);

    const eventComponent = new EventView({
      event,
      destination,
      offers: this.#eventsModel.getOffersByType(event.type),
      onEditClick
    });

    const eventFormComponent = new EventFormView({
      event,
      eventDestination: destination,
      destinations: this.#eventsModel.destinations,
      offers: this.#eventsModel.offers,
      isEditMode: true,
      onFormSubmit,
      onCloseClick
    });

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    function onEditClick() {
      replaceEventToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function onCloseClick() {
      replaceFormToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function onFormSubmit() {
      replaceFormToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function replaceEventToForm() {
      replace(eventFormComponent, eventComponent);
    }

    function replaceFormToEvent() {
      replace(eventComponent, eventFormComponent);
    }

    render(eventComponent, this.#listComponent.element);
  }
}
