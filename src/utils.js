import dayjs from 'dayjs';
import { FilterType, DURATION, SortType } from './const';

function getRandomNumber(min, max) {
  const lower = Math.ceil(Math.min(max, min));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function createIdGenerator() {
  let id = 1;
  return function () {
    id += 1;
    return id;
  };
}

function humanizeDate(date) {
  return date ? dayjs(date).format('MMM DD') : '';
}

function getFullDate(date) {
  return date ? dayjs(date).format('DD/MM/YY HH:mm') : '';
}

function getHourseAndMinutes(date) {
  return date ? dayjs(date).format('HH:mm') : '';
}

function getDay(date) {
  return date ? dayjs(date).format('DD') : '';
}

function getTripDuration(startDate, finishDate) {
  const MSEC_IN_MINUTE = 60000;
  const MSEC_IN_HOUR = 3600000;
  const MSEC_IN_FIVE_HOURS = 18000000;
  const MSEC_IN_24_HOURS = 86400000;
  const MIN_IN_HOUR = 60;
  const HOURS_IN_DAY = 24;
  let timeDiff = dayjs(finishDate).diff(dayjs(startDate));
  if (timeDiff / MSEC_IN_MINUTE < MIN_IN_HOUR) {
    return dayjs(timeDiff).format('m[M]');
  } else if (timeDiff / MSEC_IN_HOUR < HOURS_IN_DAY) {
    timeDiff -= MSEC_IN_FIVE_HOURS;
    return dayjs(timeDiff).format('H[H] m[M]');
  } else {
    timeDiff -= (MSEC_IN_FIVE_HOURS + MSEC_IN_24_HOURS);
    return dayjs(timeDiff).format('D[D] HH[H] m[M]');
  }
}

function genRandomPicture() {
  return `https://loremflickr.com/248/152?random=${getRandomNumber(1, 1000)}`;
}

function makeKebabCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function isChecked(int) {
  return (int === 1) ? 'checked' : '';
}

function isPointFuture(point) {
  return dayjs().isBefore(point.dateFrom);
}

function isPointPresent(point) {
  return (dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo));
}

function isPointPast(point) {
  return dayjs().isAfter(point.dateTo);
}

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point))
};

let dateTime = dayjs().subtract(getRandomNumber(0, DURATION.DAY), 'day').toDate();

function getDate({ next }) {
  const minsGap = getRandomNumber(0, DURATION.MIN);
  const hoursGap = getRandomNumber(1, DURATION.HOUR);
  const daysGap = getRandomNumber(0, DURATION.DAY);

  if (next) {
    dateTime = dayjs(dateTime)
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .add(daysGap, 'day')
      .toDate();
  }

  return dateTime;
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function sortDay(DayA, DayB){
  return dayjs(DayA.startTime).diff(dayjs(DayB.startTime));
}

function sortTime(timeA, timeB){
  const timeDif1 = dayjs(timeA.finishTime).diff(dayjs(timeA.startTime));
  const timeDif2 = dayjs(timeB.finishTime).diff(dayjs(timeB.startTime));

  return timeDif2 - timeDif1;
}

function sortPrice(priceA, priceB) {
  return priceB.price - priceA.price;
}

const sort = {
  [SortType.DAY]: (points) => [...points].sort(sortDay),
  [SortType.PRICE]: (points) => [...points].sort(sortPrice),
  [SortType.TIME]: (points) => [...points].sort(sortTime),
};

function toUpperCaseFirstLetter(value){
  if (!value){
    return value;
  }

  const firstLetter = value[0].toUpperCase();
  const remainingPart = value.slice(1);
  return firstLetter + remainingPart;
}

export {
  isChecked, makeKebabCase, getRandomArrayElement, getRandomNumber, createIdGenerator, humanizeDate, getFullDate, sortDay, sortTime, sortPrice, sort,
  getHourseAndMinutes, getDay, getTripDuration, genRandomPicture, isPointFuture, isPointPresent, isPointPast, filter, getDate, updateItem, toUpperCaseFirstLetter
};
