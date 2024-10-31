import { generateMockEvents, getMockDestinations, getMockOffers } from '../mock/event.js';


export default class EventsModel {
  events = generateMockEvents();
  destinations = getMockDestinations();
  offers = getMockOffers();

  getEvents() {
    return this.events;
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }

  // ЗАЧЕМ, РАЗ ЕСТЬ СВОЙСТВО?
  // getOffers() {
  //   return getMockOffers();
  // }

  getOffersByType(type) {
    const offerGroup = this.offers.find((item) => item.type === type);
    return offerGroup?.offers || [];
  }
}
