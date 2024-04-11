import { getRandomNumber } from '../utils';
import { OFFERS } from '../const';
import { getRandomArrayElement, createIdGenerator } from '../utils';

const offerId = createIdGenerator();

function getOffer() {
  return {
    id: offerId(),
    price: getRandomNumber(5, 100),
    name: getRandomArrayElement(OFFERS),
    isChecked: getRandomNumber(0, 1)
  };
}

export {getOffer};
