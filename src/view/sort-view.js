import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { SortTypes } from '../utils/sort.js';

function createSortItemTemplate(sortType) {
  const isChecked = sortType === SortTypes.DAY;
  const isDisabled = [SortTypes.EVENT, SortTypes.OFFER].includes(sortType);

  return `
      <div class="trip-sort__item  trip-sort__item--${sortType}">
        <input
          id="sort-${sortType}"
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${sortType}"
          ${isChecked ? 'checked' : ''}
          ${isDisabled ? 'disabled' : ''}
          data-sort-type="${sortType}">
        <label class="trip-sort__btn" for="sort-${sortType}">${capitalizeFirstLetter(sortType)}</label>
      </div>`;
}

function createSortTemplate() {
  const sortItems = Object.values(SortTypes);
  const sortItemsTemplate = sortItems
    .map((item) => createSortItemTemplate(item))
    .join('');

  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`;
}

export default class SortView extends AbstractView {
  #onSortChange = null;

  constructor({ onSortChange }) {
    super();
    this.#onSortChange = onSortChange;

    this.element.addEventListener('click', this.#sortChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortChangeHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      this.#onSortChange(evt.target.dataset.sortType);
    }
  };
}
