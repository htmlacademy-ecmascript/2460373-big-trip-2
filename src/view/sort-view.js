import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { SortTypes } from '../utils/sort.js';

function createSortItemTemplate(sortName) {
  const isChecked = sortName === 'day';

  return `
      <div class="trip-sort__item  trip-sort__item--${sortName}">
        <input
          id="sort-${sortName}"
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${sortName}"
          ${isChecked ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${sortName}">${capitalizeFirstLetter(sortName)}</label>
      </div>`;
}

function createSortTemplate() {
  const sortItems = Object.values(SortTypes);
  const sortItemsTemplate = sortItems
    .map((item) => createSortItemTemplate(item))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }
}
