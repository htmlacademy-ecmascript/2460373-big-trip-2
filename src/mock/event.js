import { getRandomInteger, getRandomArrayElement, createRandomIdGeneratorFromRange } from '../util.js';

const MIN_PICTURE_COUNT = 0;
const MAX_PICTURE_COUNT = 5;
const MIN_OFFER_COUNT = 0;
const MAX_OFFER_COUNT = 5;
const MIN_OFFER_PRICE = 10;
const MAX_OFFER_PRICE = 200;

const CITIES_LIST = [
  'New York',
  'London',
  'Tokyo',
  'Paris',
  'Berlin',
  'Moscow',
  'Sydney',
  'Toronto',
  'Dubai',
  'Rome'
];

const EVENT_TYPES_LIST = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const generateEventId = createRandomIdGeneratorFromRange(100, 199);
const generateDestinationId = createRandomIdGeneratorFromRange(200, 299);
const generateOfferId = createRandomIdGeneratorFromRange(300, 399);

const generatePictures = (qty) => {
  const pictures = [];
  const createPicture = () => ({
    src: 'http://picsum.photos/300/200',
    description: 'Picture description'
  });
  for (let i = 0; i < qty; i++) {
    pictures.push(createPicture());
  }
  return pictures;
};

const createDestination = (cityName) => ({
  id: generateDestinationId(),
  description: `${cityName} — is a beautiful city`,
  name: cityName,
  pictures: Array.from({ length: getRandomInteger(MIN_PICTURE_COUNT, MAX_PICTURE_COUNT) }, generatePictures)
});

const createDestinations = () => {
  const destinations = [];
  for (let i = 0; i < CITIES_LIST.length; i++) {
    const destination = createDestination(CITIES_LIST[i]);
    destinations.push(destination);
  }
  return destinations;
};

const createOffer = () => ({
  id: generateOfferId(),
  title: 'Make better',
  price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
});

const createOfferGroup = (type) => ({
  type,
  offers: Array.from({ length: getRandomInteger(MIN_OFFER_COUNT, MAX_OFFER_COUNT) }, createOffer)
});

const createOffers = () => {
  const offers = [];
  for (let i = 0; i < EVENT_TYPES_LIST.length; i++) {
    const offerGroup = createOfferGroup(EVENT_TYPES_LIST[i]);
    offers.push(offerGroup);
  }
  return offers;
};

const mockDestinations = createDestinations();
const mockOffers = createOffers();


const getOffersByType = (type) => {
  const offerGroup = mockOffers.find((item) => item.type === type);
  return offerGroup ? offerGroup.offers : [];
};

const createEvent = (type) => ({
  id: generateEventId(),
  basePrice: getRandomInteger(100, 3000),
  dateFrom: new Date(),
  dateTo: new Date(Date.now() + getRandomInteger(3600000, 86400000)),
  destination: getRandomArrayElement(mockDestinations).id,
  isFavorite: Math.random() > 0.5,
  offers: getOffersByType(type),
  type
});

const createEventArray = (qty) =>
  Array.from({ length: qty }, () => {
    createEvent(getRandomArrayElement(EVENT_TYPES_LIST));
  });

const mockEvents = createEventArray(getRandomInteger(1, 10));

export { mockEvents };
