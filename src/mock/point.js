import { getRandomNumber, getDate } from '../utils';
import { nanoid } from 'nanoid';

function getPoint(type, city, offersId, destinationId){
  return {
    id: nanoid(),
    type,
    city,
    price: getRandomNumber(100, 1500),
    startTime: getDate({next: false}),
    finishTime: getDate({next: true}),
    isFavourite: getRandomNumber(0, 1),
    offers: offersId,
    destination: destinationId
  };
}

export {getPoint};
