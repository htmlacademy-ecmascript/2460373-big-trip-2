import { createElement } from '../render.js';
import { capitalizeFirstLetter, humanizeDate, DATE_FORMATS, getDateDifference } from '../util.js';

function createOfferTemplate({ title, price }) {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`
  );
}

function createOfferListTemplate(offers) {
  if (!offers.length) {
    return '';
  }

  const offerTemplates = offers.map((offer) => createOfferTemplate(offer)).join('');

  return (
    `<ul class="event__selected-offers">
      ${offerTemplates}
    </ul>`
  );
}

function createEventTemplate(event, destination, offers) {
  const { basePrice, dateFrom, dateTo, isFavorite, type } = event;

  const startShortDate = humanizeDate(dateFrom, DATE_FORMATS.SHORT_DATE);
  const startFullDate = humanizeDate(dateFrom, DATE_FORMATS.FULL_DATE);
  const startFullDateTime = humanizeDate(dateFrom, DATE_FORMATS.FULL_DATE_TIME);
  const startTime = humanizeDate(dateFrom, DATE_FORMATS.TIME);

  const endFullDateTime = humanizeDate(dateTo, DATE_FORMATS.FULL_DATE_TIME);
  const endTime = humanizeDate(dateTo, DATE_FORMATS.TIME);

  const duration = getDateDifference(dateFrom, dateTo);

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${startFullDate}">${startShortDate.toUpperCase()}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalizeFirstLetter(type)} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startFullDateTime}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endFullDateTime}">${endTime}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${createOfferListTemplate(offers)}
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path
              d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class EventView {
  constructor({ event, destination, offers }) {
    this.event = event;
    this.destination = destination;
    this.allOffers = offers;
  }

  getEventOffers() {
    return this.allOffers.filter((offer) =>
      this.event.offers.some((v) => v === offer.id));
  }

  getTemplate() {
    return createEventTemplate(this.event, this.destination, this.getEventOffers());
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