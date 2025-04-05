import { isEventInFuture, isEventInPresent, isEventInPast } from './date.js';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const filter = {
  [FilterType.EVERYTHING]: (events) => [...events],
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventInFuture(event)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isEventInPresent(event)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventInPast(event)),
};

// пока не используется, на будущее
// получается, неправильный регистр у ключа... Должен быть КАПС
const FilterMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

function generateFilter(events) {
  return Object.entries(filter).map(
    ([filterType, filterEvents]) => ({
      type: filterType,
      count: filterEvents(events).length,
    })
  );
}

export { filter, FilterMessage, generateFilter };
