import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import { render, replace } from '../framework/render.js';

export default class EventPresenter {
  #eventsModel = null;
  #eventContainer = null;
  #destination = null;
  #eventComponent = null;
  #eventFormComponent = null;

  constructor({ model, eventContainer }) {
    this.#eventsModel = model;
    this.#eventContainer = eventContainer;

  }

  init(event) {
    this.#destination = this.#eventsModel.getDestinationById(event.destination);

    this.#eventComponent = new EventView({
      event,
      destination: this.#destination,
      offers: this.#eventsModel.getOffersByType(event.type),
      onEditClick: this.#onEditClick
    });

    this.#eventFormComponent = new EventFormView({
      event,
      eventDestination: this.#destination,
      destinations: this.#eventsModel.destinations,
      offers: this.#eventsModel.offers,
      isEditMode: true,
      onFormSubmit: this.#onFormSubmit,
      onCloseClick: this.#onCloseClick
    });

    render(this.#eventComponent, this.#eventContainer);
  }

  #replaceEventToForm() {
    replace(this.#eventFormComponent, this.#eventComponent);
  }

  #replaceFormToEvent() {
    replace(this.#eventComponent, this.#eventFormComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onEditClick = () => {
    this.#replaceEventToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onCloseClick = () => {
    this.#replaceFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #onFormSubmit = () => {
    this.#replaceFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
