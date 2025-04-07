import EventFormView from '../view/event-form-view.js';
import EventView from '../view/event-view.js';
import { render, replace, remove } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventsModel = null;
  #eventContainer = null;
  #event = null;
  #destination = null;

  #mode = Mode.DEFAULT;

  #eventComponent = null;
  #eventFormComponent = null;

  #onDataChange = null;
  #onModeChange = null;

  constructor({ model, eventContainer, onDataChange, onModeChange }) {
    this.#eventsModel = model;
    this.#eventContainer = eventContainer;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
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
      // eventDestination: this.#destination,
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

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#eventFormComponent.reset(this.#event);
      this.#replaceFormToEvent();
    }
  }

  #replaceEventToForm() {
    replace(this.#eventFormComponent, this.#eventComponent);
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToEvent() {
    replace(this.#eventComponent, this.#eventFormComponent);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.resetView();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onEditClick = () => {
    this.#replaceEventToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onCloseClick = () => {
    this.resetView();
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
