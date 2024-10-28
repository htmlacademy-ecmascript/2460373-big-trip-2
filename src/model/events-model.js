import { generateMockEvents, getMockDestinations, getMockOffers } from '../mock/event.js';

// console.log('mockEvents:');
// console.log(generateMockEvents());
// console.log('mockDestinations:');
// console.log(getMockDestinations());
// console.log('mockOffers:');
// console.log(getMockOffers());

export default class EventsModel {
  events = this.transformEvents(generateMockEvents());

  getEvents() {
    return this.events;
  }

  transformEvents(events) {
    return events.map((event) => {
      const fullDestination = this.getDestinationById(event.destination);
      const fullOffers = this.getOffersByType(event.type);

      return {
        ...event,
        destination: fullDestination,
        offers: fullOffers
      };
    });
  }

  getDestinationById(id) {
    return getMockDestinations().find((destination) => destination.id === id);
  }

  getOffersByType(type) {
    const offerGroup = getMockOffers().find((item) => item.type === type);
    return offerGroup ? offerGroup.offers : [];
  }
}
