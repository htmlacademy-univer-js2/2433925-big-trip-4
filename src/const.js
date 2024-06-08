const TYPE_OF_POINT = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'London', 'Paris'];

const OFFERS = [
  'Add Luggage',
  'Switch To Comfort Class',
  'Add Meal',
  'Choose Seats',
  'Travel By Train',
  'Rent a car',
  'Book tickets',
  'Lunch in city',
];

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const DURATION = {
  HOUR: 5,
  DAY: 5,
  MIN: 59
};

const Mode = {
  PREVIEW: 'preview',
  EDITING: 'editing',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const SortTypeDescription = {
  [SortType.DAY]: 'Day',
  [SortType.EVENT]: 'Event',
  [SortType.TIME]: 'Time',
  [SortType.PRICE]: 'Price',
  [SortType.OFFER]: 'Offer',
};

const PointType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

const PointTypeDescription = {
  [PointType.BUS]: 'Bus',
  [PointType.SHIP]: 'Ship',
  [PointType.RESTAURANT]: 'Restaurant',
  [PointType.TAXI]: 'Taxi',
  [PointType.DRIVE]: 'Drive',
  [PointType.FLIGHT]: 'Flight',
  [PointType.TRAIN]: 'Train',
  [PointType.CHECK_IN]: 'Check-in',
  [PointType.SIGHTSEEING]: 'Sightseeing'
};

const ApiServiceResponseMethod = {
  PUT: 'PUT',
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE'
};

const SORT_TYPES_DISABLED = [SortType.EVENT, SortType.OFFER];

const TimeLimit = {
  LOWER_LIMIT: 300,
  UPPER_LIMIT: 1000
};

export {TYPE_OF_POINT, CITIES, DESCRIPTION, OFFERS, FilterType, DURATION, Mode, SortType, UpdateType, UserAction, SortTypeDescription, PointTypeDescription,
  ApiServiceResponseMethod, SORT_TYPES_DISABLED, PointType, TimeLimit};
