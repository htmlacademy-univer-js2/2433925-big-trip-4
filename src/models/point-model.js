export default class PointModel{
  #points;

  constructor(service){
    this.#points = service.points;
  }

  get points(){
    return this.#points;
  }
}
