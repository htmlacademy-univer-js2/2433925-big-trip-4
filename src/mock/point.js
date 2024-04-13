import { getRandomArrayElement, createIdGenerator } from '../utils';
import { DATES, TYPE_OF_POINT } from '../const';
import { CITIES } from '../const';
import { getRandomNumber } from '../utils';
import { getOffer } from './offer';
import { getDestination } from './destination';

const startDates = DATES.filter((date) => date !== '2024-04-12 09:50');
const pointId = createIdGenerator();

function getPoint(){
  return {
    id: pointId(),
    type: getRandomArrayElement(TYPE_OF_POINT),
    city: getRandomArrayElement(CITIES),
    price: getRandomNumber(100, 1500),
    startTime: getRandomArrayElement(startDates),
    finishTime: '2024-04-12 09:50',
    isFavourite: getRandomNumber(0, 1),
    offers: Array.from({length: getRandomNumber(1, 5)}, getOffer),
    destination: getDestination()
  };
}

export {getPoint};
