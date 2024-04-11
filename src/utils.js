import dayjs from 'dayjs';

function getRandomNumber(min, max) {
  const lower = Math.ceil(Math.min(max, min));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomArrayElement (items) {
  return items[Math.floor(Math.random() * items.length)];
}

function createIdGenerator() {
  let id = 1;
  return function () {
    id += 1;
    return id;
  };
}

function humanizeDate(date){
  return date ? dayjs(date).format('MMM DD') : '';
}

function getFullDate(date){
  return date ? dayjs(date).format('DD/MM/YY HH:mm') : '';
}

function getHourseAndMinutes(date){
  return date ? dayjs(date).format('HH:mm') : '';
}

function getDay(date){
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

function genRandomPicture () {
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

export {isChecked, makeKebabCase, getRandomArrayElement, getRandomNumber, createIdGenerator, humanizeDate, getFullDate, getHourseAndMinutes, getDay, getTripDuration, genRandomPicture };
