import { mockEvents, mockDestinations, mockOffers } from '../mock/event.js';

export default class EventsModel {
  events = this.transformEvents(mockEvents);

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
    return mockDestinations.find((destination) => destination.id === id);
  }

  getOffersByType(type) {
    const offerGroup = mockOffers.find((item) => item.type === type);
    return offerGroup ? offerGroup.offers : [];
  }
}
