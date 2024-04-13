import { createIdGenerator, getRandomArrayElement, getRandomNumber, genRandomPicture } from '../utils';
import { CITIES, DESCRIPTION } from '../const';

const destinationId = createIdGenerator();

function getDestination(){
  return {
    id: destinationId(),
    photo: Array.from({length: getRandomNumber(1, 5)}, genRandomPicture),
    description: getRandomArrayElement(DESCRIPTION),
    name: getRandomArrayElement(CITIES),
  };
}

export {getDestination};
