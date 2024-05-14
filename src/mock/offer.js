import { getRandomNumber } from '../utils';
import { OFFERS } from '../const';
import { getRandomArrayElement} from '../utils';
import { nanoid } from 'nanoid';

function getOffer() {
  return {
    id: nanoid(),
    price: getRandomNumber(5, 100),
    name: getRandomArrayElement(OFFERS),
    isChecked: getRandomNumber(0, 1)
  };
}

export {getOffer};
