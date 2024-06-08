import dayjs from 'dayjs';
import { FilterType, DURATION, SortType } from './const';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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

function getHoursAndMinutes(date) {
  return date ? dayjs(date).format('HH:mm') : '';
}

function getDay(date) {
  return date ? dayjs(date).format('DD') : '';
}

function getTripDuration(startDate, finishDate) {
  const timeDifference = dayjs.duration(dayjs(finishDate).diff(dayjs(startDate)));
  const timeDifferenceInMinutes = timeDifference.asMinutes();
  const timeDifferenceInHours = timeDifference.asHours();
  const timeDifferenceInDays = timeDifference.asDays();

  if (timeDifferenceInHours < 1) {
    const minutes = Math.floor(timeDifferenceInMinutes);
    return `${minutes / 10 < 1 ? '0' : ''}${minutes}M`;
  } else if (timeDifferenceInDays < 1) {
    const hours = Math.floor(timeDifferenceInHours);
    const minutes = Math.floor(timeDifferenceInMinutes % 60);
    return `${hours / 10 < 1 ? '0' : ''}${hours}H ${minutes / 10 < 1 ? '0' : ''}${minutes}M`;
  } else {
    const days = Math.floor(timeDifferenceInDays % 365);
    const hours = Math.floor(timeDifferenceInHours % 24);
    const minutes = Math.floor(timeDifferenceInMinutes % 60);
    return `${days / 10 < 1 ? '0' : ''}${days}D ${hours / 10 < 1 ? '0' : ''}${hours}H ${minutes / 10 < 1 ? '0' : ''}${minutes}M`;
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

const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortPointsByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointsByTime = (pointA, pointB) => {
  const timePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timePointB - timePointA;
};

const sorting = {
  [SortType.DAY]: (points) => points.sort(sortPointsByDay),
  [SortType.TIME]: (points) => points.sort(sortPointsByTime),
  [SortType.PRICE]: (points) => points.sort(sortPointsByPrice)
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
  isChecked, makeKebabCase, getRandomArrayElement, getRandomNumber, createIdGenerator, humanizeDate, getFullDate, sorting,
  getHoursAndMinutes, getDay, getTripDuration, genRandomPicture, isPointFuture, isPointPresent, isPointPast, filter, getDate, updateItem, toUpperCaseFirstLetter
};
