import { generateMockEvents, getMockDestinations, getMockOffers } from '../mock/event.js';


export default class EventsModel {
  #events = generateMockEvents();
  #destinations = getMockDestinations();
  #offers = getMockOffers();

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  getOffersByType(type) {
    const offerGroup = this.#offers.find((item) => item.type === type);
    return offerGroup?.offers || [];
  }
}
