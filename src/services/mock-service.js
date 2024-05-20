import { getPoint } from '../mock/point';
import { mockOffers } from '../mock/offer';
import { mockDestinations } from '../mock/destination';
import { getRandomArrayElement, getRandomNumber } from '../utils';
import { TYPE_OF_POINT, CITIES } from '../const';

export default class MockService {
  #points;
  #offers;
  #destinations;

  constructor() {
    this.#offers = mockOffers;
    this.#destinations = mockDestinations;
    this.#points = this.#genPoints();
  }

  #genPoints() {
    return Array.from({length: 4}, () => {
      const type = getRandomArrayElement(TYPE_OF_POINT);
      const city = getRandomArrayElement(CITIES);

      const destinationByCity = this.#destinations.find((destByCity) => destByCity.city === city);

      const offersByType = this.#offers.find((offerByType) => offerByType.type === type);
      const offersIds = [];
      offersByType.offers.forEach((offer) => {
        if (getRandomNumber(0, 1)) {
          offersIds.push(offer.id);
        }
      });

      return getPoint(type, city, offersIds, destinationByCity.id);
    });
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
