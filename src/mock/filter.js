import { filter } from '../utils/filter.js';

// почему это в моках?
function generateFilter(events) {
  return Object.entries(filter).map(
    ([filterType, filterEvents]) => ({
      type: filterType,
      count: filterEvents(events).length,
    }),
  );
}

export { generateFilter };
