import dayjs from 'dayjs';

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const sortByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

const getEventDuration = (event) => dayjs(event.dateTo).diff(dayjs(event.dateFrom));

const sortByTime = (eventA, eventB) => {
  const eventADuration = getEventDuration(eventA);
  const eventBDuration = getEventDuration(eventB);

  return eventBDuration - eventADuration;
};

const sortByDay = (eventA, eventB) => eventA.dateFrom - eventB.dateFrom;

export { SortTypes, sortByDay, sortByTime, sortByPrice };
