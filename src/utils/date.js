import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const DateFormat = {
  SHORT_DATE: 'MMM DD',
  SHORT_DATE_TIME: 'DD/MM/YY HH:mm',
  FULL_DATE: 'YYYY-MM-DD',
  FULL_DATE_TIME: 'YYYY-MM-DD[T]HH:mm',
  TIME: 'HH:mm',
  FULL_TIME: 'DD[D] HH[H] mm[M]',
  MINUTES: 'mm[M]'
};

const humanizeDate = (date, format) => date ? dayjs(date).format(format) : '';

const getDateDifference = (earlierDate, laterDate) => {
  const date1 = dayjs(laterDate);
  const date2 = dayjs(earlierDate);
  const difference = dayjs.duration(date1.diff(date2));

  return difference.format(DateFormat.FULL_TIME).replace(/\b00D 00H\b/, '').replace(/\b00D\b/, '');
};

export { humanizeDate, DateFormat, getDateDifference };
