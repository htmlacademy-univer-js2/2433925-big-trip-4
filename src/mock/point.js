import { getRandomArrayElement, createIdGenerator, getRandomNumber, getDate } from '../utils';
import { TYPE_OF_POINT, CITIES } from '../const';
import { getOffer } from './offer';
import { getDestination } from './destination';

const pointId = createIdGenerator();

function getPoint(){
  return {
    id: pointId(),
    type: getRandomArrayElement(TYPE_OF_POINT),
    city: getRandomArrayElement(CITIES),
    price: getRandomNumber(100, 1500),
    startTime: getDate({next: false}),
    finishTime: getDate({next: true}),
    isFavourite: getRandomNumber(0, 1),
    offers: Array.from({length: getRandomNumber(1, 5)}, getOffer),
    destination: getDestination()
  };
}

export {getPoint};
