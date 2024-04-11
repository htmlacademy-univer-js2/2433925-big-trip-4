import { getDestination } from '../mock/destination';
import { getOffer } from '../mock/offer';
import { getPoint } from '../mock/point';
import { getRandomNumber } from '../utils';

export default class PointModel{
  #points = Array.from({length: 4}, getPoint);
  #offers = Array.from({length: getRandomNumber(1, 5)}, getOffer);
  #destination = getDestination();

  get points(){
    return this.#points;
  }

  get offers(){
    return this.#offers;
  }

  get destination(){
    return this.#destination;
  }
}
