import { getOffer } from '../mock/offer';

export default class OfferModel{
  #offers = Array.from({length: 5}, getOffer);

  get offers(){
    return this.#offers;
  }
}
