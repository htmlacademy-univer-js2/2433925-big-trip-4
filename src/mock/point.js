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
/*{
  id: 2,
  type: getRandomArrayElement(TYPE_OF_POINT),
  city: getRandomArrayElement(CITIES),
  price: getRandomNumber(100, 1500),
  startTime: dayjs('2024-03-09 14:45'),
  finishTime: dayjs('2024-03-10 17:20'),
  isFavourite: getRandomNumber(0, 1),
  offers: Array.from({length: getRandomNumber(1, 5)}, getOffer),
  destination: getDestination()
},
{
  id: 3,
  type: getRandomArrayElement(TYPE_OF_POINT),
  city: getRandomArrayElement(CITIES),
  price: getRandomNumber(100, 1500),
  startTime: dayjs('2024-04-05 09:15'),
  finishTime: dayjs('2024-04-05 09:40'),
  isFavourite: getRandomNumber(0, 1),
  offers: Array.from({length: getRandomNumber(1, 5)}, getOffer),
  destination: getDestination()
},
{
  id: 4,
  type: getRandomArrayElement(TYPE_OF_POINT),
  city: getRandomArrayElement(CITIES),
  price: getRandomNumber(100, 1500),
  startTime: dayjs('2024-02-10 07:25'),
  finishTime: dayjs('2024-02-10 12:30'),
  isFavourite: getRandomNumber(0, 1),
  offers: Array.from({length: getRandomNumber(1, 5)}, getOffer),
  destination: getDestination()
},
{
  id: 5,
  type: getRandomArrayElement(TYPE_OF_POINT),
  city: getRandomArrayElement(CITIES),
  price: getRandomNumber(100, 1500),
  startTime: dayjs('2024-04-12 04:40'),
  finishTime: dayjs('2024-04-12 09:50'),
  isFavourite: getRandomNumber(0, 1),
  offers: Array.from({length: getRandomNumber(1, 5)}, getOffer),
  destination: getDestination()
}


function getRandomPoint(){
  return getRandomArrayElement(mockPoints);
}*/

export {getPoint};
