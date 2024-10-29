import { generateMockEvents, getMockDestinations, getMockOffers } from '../mock/event.js';


export default class EventsModel {
  events = generateMockEvents();
  destinations = getMockDestinations();
  offers = getMockOffers();

  getEvents() {
    return this.events;
  }

  // transformEvents(events) {
  //   return events.map((event) => {
  //     const fullDestination = this.getDestinationById(event.destination);
  //     const fullOffers = this.getOffersByType(event.type);

  //     return {
  //       ...event,
  //       destination: fullDestination,
  //       offers: fullOffers
  //     };
  //   });
  // }

  getDestinationById(id) {
    return getMockDestinations().find((destination) => destination.id === id);
  }

  // ЗАЧЕМ, РАЗ ЕСТЬ СВОЙСТВО?
  // getOffers() {
  //   return getMockOffers();
  // }

  getOffersByType(type) {
    const offerGroup = getMockOffers().find((item) => item.type === type);
    return offerGroup ? offerGroup.offers : [];
  }
}
