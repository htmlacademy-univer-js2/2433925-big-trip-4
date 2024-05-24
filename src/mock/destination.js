import { getRandomArrayElement, getRandomNumber, genRandomPicture } from '../utils';
import { CITIES, DESCRIPTION } from '../const';
import { nanoid } from 'nanoid';

function getDestination(city){
  return {
    id: nanoid(),
    photo: Array.from({length: getRandomNumber(1, 5)}, genRandomPicture),
    description: getRandomArrayElement(DESCRIPTION),
    city,
  };
}

const mockDestinations = [];

CITIES.forEach((city) => {
  const destination = getDestination(city);
  mockDestinations.push(destination);
});

export {getDestination, mockDestinations};
