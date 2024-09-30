import { createElement } from '../render.js';

function createDetailsTemplate() {
  return '<section class="event__details"></section>';
}

export default class DetailsView {
  getTemplate() {
    return createDetailsTemplate();
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
