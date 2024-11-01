import { createElement } from '../render.js';
import { EVENT_TYPES_LIST, capitalizeFirstLetter, DATE_FORMATS, humanizeDate } from '../util.js';

const BLANK_EVENT = {
  basePrice: '',
  dateFrom: new Date(),
  dateTo: new Date(Date.now() + 3600000),
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight'
};

function createEventTypesListTemplate(targetType, eventId) {
  const eventTypeItemsHtml = EVENT_TYPES_LIST.map((type) => (
    `<div class="event__type-item">
      <input
        id="event-type-${type}-${eventId}"
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${type === targetType ? 'checked' : ''}
      >
      <label
        class="event__type-label  event__type-label--${type}"
        for="event-type-${type}-${eventId}"
      >
        ${capitalizeFirstLetter(type)}
      </label>
    </div>`
  ));

  return eventTypeItemsHtml.join('');
}

function createDestinationOptionsTemplate(destinations) {
  return destinations.map((description) => (
    `<option value="${description.name}"></option>`
  )).join('');
}

function createDestinationDescriptionTemplate(description) {
  return description ? `<p class="event__destination-description">${description}</p>` : '';
}

function createImgsTemplate(photos) {
  return photos
    .map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)
    .join('');
}

function createDestinationPhotoSectionTemplate(photos) {
  if (!photos.length) {
    return '';
  }

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${createImgsTemplate(photos)}
      </div>
    </div>`
  );
}

function createDestinationSectionTemplate(eventDestination) {
  if (!eventDestination.description && !eventDestination.pictures.length) {
    return '';
  }

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${createDestinationDescriptionTemplate(eventDestination.description)}
      ${createDestinationPhotoSectionTemplate(eventDestination.pictures)}
    </section>`
  );

}

function createOffersListTemplate(event, allOffersByType) {
  return allOffersByType.map((offer) => (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox"
        name="event-offer-${offer.id}" ${event.offers.includes(offer.id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  )).join('');
}

function createOffersSectionTemplate(event, allOffers) {
  const targetTypeOffers = allOffers.find((item) => item.type === event.type).offers;

  if (!targetTypeOffers.length) {
    return '';
  }

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOffersListTemplate(event, targetTypeOffers)}
      </div>
    </section>`
  );
}

function createRollupButtonTemplate(isEditMode) {
  return isEditMode
    ? (`
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      `)
    : '';
}

function createEventEditFormTemplate(event, eventDestination, destinations, offers, isEditMode) {
  const { id, basePrice, dateFrom, dateTo, type } = event;

  const startDate = humanizeDate(dateFrom, DATE_FORMATS.SHORT_DATE_TIME);
  const endDate = humanizeDate(dateTo, DATE_FORMATS.SHORT_DATE_TIME);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventTypesListTemplate(type, id)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${capitalizeFirstLetter(type)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text"
              name="event-destination" value="${eventDestination.name}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${createDestinationOptionsTemplate(destinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time"
              value="${startDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time"
              value="${endDate}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${isEditMode ? 'Delete' : 'Cancel'}</button>
          ${createRollupButtonTemplate(isEditMode)}
        </header>
        <section class="event__details">
          ${createOffersSectionTemplate(event, offers)}
          ${createDestinationSectionTemplate(eventDestination)}
        </section>
      </form>
    </li>`
  );
}

export default class EventEditFormView {
  constructor({ event = BLANK_EVENT, eventDestination = BLANK_EVENT.destination, destinations, offers, isEditMode }) {
    this.event = event;
    this.eventDestination = eventDestination;
    this.destinations = destinations;
    this.offers = offers;
    this.isEditMode = isEditMode;
  }

  getTemplate() {
    return createEventEditFormTemplate(
      this.event,
      this.eventDestination,
      this.destinations,
      this.offers,
      this.isEditMode
    );
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
