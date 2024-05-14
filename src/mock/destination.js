import { getRandomArrayElement, getRandomNumber, genRandomPicture } from '../utils';
import { CITIES, DESCRIPTION } from '../const';
import { nanoid } from 'nanoid';

function getDestination(){
  return {
    id: nanoid(),
    photo: Array.from({length: getRandomNumber(1, 5)}, genRandomPicture),
    description: getRandomArrayElement(DESCRIPTION),
    name: getRandomArrayElement(CITIES),
  };
}

export {getDestination};
