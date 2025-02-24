import EventEditFormView from '../view/event-edit-form-view.js';
import EventView from '../view/event-view.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';

export default class TripsPresenter {

  listComponent = new ListView();

  constructor({ listContainer, eventsModel }) {
    this.listContainer = listContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.listEvents = [...this.eventsModel.getEvents()];

    render(new SortView(), this.listContainer);
    render(this.listComponent, this.listContainer);
    render(
      new EventEditFormView(
        {
          event: this.listEvents[0],
          eventDestination: this.eventsModel.getDestinationById(this.listEvents[0].destination),
          destinations: this.eventsModel.destinations,
          offers: this.eventsModel.offers,
          isEditMode: true
        }),
      this.listComponent.element
    );

    for (let i = 1; i < this.listEvents.length; i++) {
      render(
        new EventView({
          event: this.listEvents[i],
          destination: this.eventsModel.getDestinationById(this.listEvents[i].destination),
          offers: this.eventsModel.getOffersByType(this.listEvents[i].type)
        }),
        this.listComponent.element
      );
    }
  }
}
