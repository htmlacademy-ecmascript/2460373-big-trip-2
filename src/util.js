import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const EVENT_TYPES_LIST = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const DateFormat = {
  SHORT_DATE: 'MMM DD',
  SHORT_DATE_TIME: 'DD/MM/YY HH:mm',
  FULL_DATE: 'YYYY-MM-DD',
  FULL_DATE_TIME: 'YYYY-MM-DD[T]HH:mm',
  TIME: 'HH:mm',
  FULL_TIME: 'DD[D] HH[H] mm[M]',
  MINUTES: 'mm[M]'
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomIdGeneratorFromRange = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const humanizeDate = (date, format) => date ? dayjs(date).format(format) : '';

const getDateDifference = (earlierDate, laterDate) => {
  const date1 = dayjs(laterDate);
  const date2 = dayjs(earlierDate);
  const difference = dayjs.duration(date1.diff(date2));

  return difference.format(DateFormat.FULL_TIME).replace(/\b00D 00H\b/, '').replace(/\b00D\b/, '');
};


export { getRandomInteger, getRandomArrayElement, createRandomIdGeneratorFromRange, capitalizeFirstLetter, humanizeDate, DateFormat, getDateDifference, EVENT_TYPES_LIST };
