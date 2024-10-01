import EventEditFormView from '../view/event-edit-form-view.js';
import EventView from '../view/event-view.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class TripsPresenter {

  listComponent = new ListView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(new SortView(), this.listContainer);
    render(this.listComponent, this.listContainer);
    render(new EventEditFormView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.listComponent.getElement());
    }
  }
}
