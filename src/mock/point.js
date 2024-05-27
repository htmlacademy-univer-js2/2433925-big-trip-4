import { getRandomNumber, getRandomArrayElement, genRandomPicture } from '../utils.js';
import { TYPE_OF_POINT, DESCRIPTION, CITIES } from '../const.js';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const generateDescription = () => {
  let description = '';
  for (let i = 0; i < getRandomNumber(1, 4); i++) {
    description += ` ${getRandomArrayElement(DESCRIPTION)}`;
  }
  return description;
};

const generatePhoto = () => ({
  src: genRandomPicture(),
  description: generateDescription(),
});

const generateDestination = (id) => ({
  id,
  description: generateDescription(),
  name: CITIES[id],
  pictures: Array.from({length: getRandomNumber(1, 4)}, generatePhoto),
});

const getDestinations = () => Array.from({length: CITIES.length}).map((value, index) => generateDestination(index));

const generateOffer = (id, pointType) => ({
  id,
  title: `offer for ${pointType}`,
  price: getRandomNumber(100, 1000)
});

const generateOffersByType = (pointType) => ({
  type: pointType,
  offers: Array.from({length: getRandomNumber(1, 4)}).map((value, index) => generateOffer(index + 1, pointType)),
});

const getOffersByType = () => Array.from({length: TYPE_OF_POINT.length}).map((value, index) => generateOffersByType(TYPE_OF_POINT[index]));

const offersByType = getOffersByType();

const destinations = getDestinations();

const generatePoint = () => {
  const offersByTypePoint = getRandomArrayElement(offersByType);
  const allOfferIdsByTypePoint = offersByTypePoint.offers.map((offer) => offer.id);
  return {
    basePrice: getRandomNumber(100, 1000),
    dateFrom: dayjs().add(getRandomNumber(-3, 0), 'day').add(getRandomNumber(-2, 0), 'hour').add(getRandomNumber(-59, 0), 'minute'),
    dateTo: dayjs().add(getRandomNumber(0, 2), 'day').add(getRandomNumber(0, 2), 'hour').add(getRandomNumber(0, 59), 'minute'),
    destinationId: getRandomArrayElement(destinations).id,
    id: nanoid(),
    isFavorite: Boolean(getRandomNumber()),
    offerIds: Array.from({length: getRandomNumber(0, allOfferIdsByTypePoint.length)}).map(() => allOfferIdsByTypePoint[getRandomNumber(0, allOfferIdsByTypePoint.length - 1)]),
    type: offersByTypePoint.type,
  };
};

const getPoints = () => Array.from({length: 10}).map(() => generatePoint());

export {getPoints, getDestinations, getOffersByType};
