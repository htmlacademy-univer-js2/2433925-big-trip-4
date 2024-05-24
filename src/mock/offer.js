import { getRandomNumber, getRandomArrayElement } from '../utils';
import { OFFERS, TYPE_OF_POINT } from '../const';
import { nanoid } from 'nanoid';

function getOffer(type) {
  return {
    type,
    offers: Array.from({length: getRandomNumber(0, OFFERS.length)}, ()=>(
      {
        id: nanoid(),
        price: getRandomNumber(5, 100),
        name: getRandomArrayElement(OFFERS),
        isChecked: getRandomNumber(0, 1)
      }
    ))
  };
}

const mockOffers = [];

TYPE_OF_POINT.forEach((type) => {
  const offer = getOffer(type);
  mockOffers.push(offer);
});

export {getOffer, mockOffers};
