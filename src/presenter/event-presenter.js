import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class EventPresenter {
  #eventsModel = null;
  #eventContainer = null;
  #event = null;
  #destination = null;
  #eventComponent = null;
  #eventFormComponent = null;
  #onDataChange = null;

  constructor({ model, eventContainer, onDataChange }) {
    this.#eventsModel = model;
    this.#eventContainer = eventContainer;
    this.#onDataChange = onDataChange;
  }

  init(event) {
    this.#event = event;
    this.#destination = this.#eventsModel.getDestinationById(this.#event.destination);

    const prevEventComponent = this.#eventComponent;
    const prevEventFormComponent = this.#eventFormComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      destination: this.#destination,
      offers: this.#eventsModel.getOffersByType(this.#event.type),
      onEditClick: this.#onEditClick,
      onFavoriteClick: this.#onFavoriteClick
    });

    this.#eventFormComponent = new EventFormView({
      event: this.#event,
      eventDestination: this.#destination,
      destinations: this.#eventsModel.destinations,
      offers: this.#eventsModel.offers,
      isEditMode: true,
      onFormSubmit: this.#onFormSubmit,
      onCloseClick: this.#onCloseClick,
      onFavoriteClick: this.#onFavoriteClick
    });


    if (prevEventComponent === null || prevEventFormComponent === null) {
      render(this.#eventComponent, this.#eventContainer);
      return;
    }

    if (this.#eventContainer.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#eventContainer.contains(prevEventFormComponent.element)) {
      replace(this.#eventFormComponent, prevEventFormComponent);
    }

    remove(prevEventComponent);
    remove(prevEventFormComponent);
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

  #onFavoriteClick = () => {
    this.#onDataChange({ ...this.#event, isFavorite: !this.#event.isFavorite });
  };
}
