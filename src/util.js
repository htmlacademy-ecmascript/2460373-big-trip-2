import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const DATE_FORMATS = {
  SHORT_DATE: 'MMM DD',
  FULL_DATE: 'YYYY-MM-DD',
  FULL_DATE_TIME: 'YYYY-MM-DD[T]HH:mm',
  TIME: 'HH:mm',
  MINUTES: 'mm[M]'
};

dayjs.extend(duration);

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

const addLeadingZero = (number) => String(number).padStart(2, '0');

const getDateDifference = (earlierDate, laterDate) => {
  let minutes = dayjs(laterDate).diff(dayjs(earlierDate), 'minute');
  const hours = Math.floor(minutes / 60);
  minutes = minutes - (hours * 60);
  const difference = `${addLeadingZero(hours)}H ${addLeadingZero(minutes)}M`;
  return difference;
};

export { getRandomInteger, getRandomArrayElement, createRandomIdGeneratorFromRange, capitalizeFirstLetter, humanizeDate, DATE_FORMATS, getDateDifference };
