const TYPE_OF_POINT = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const CITIES = [
  'Moscow',
  'Yekaterinburg',
  'Ishevsk',
  'Novosibirsk',
  'Kazan',
  'Perm',
  'Sochi',
  'Sevastopol',
  'Sarapul',
  'Samara',
  'Surgut',
];

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
  DEFAULT: 'DEFAULT',
  EDITTING: 'EDITTING',
};

export {TYPE_OF_POINT, CITIES, DESCRIPTION, OFFERS, FilterType, DURATION, Mode};
