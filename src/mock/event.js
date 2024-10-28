import { getRandomInteger, getRandomArrayElement, createRandomIdGeneratorFromRange } from '../util.js';

const MIN_PICTURE_COUNT = 0;
const MAX_PICTURE_COUNT = 5;
const MIN_OFFER_COUNT = 0;
const MAX_OFFER_COUNT = 3;
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

const createPicture = () => ({
  src: 'http://picsum.photos/300/200',
  description: 'Picture description'
});

// УДАЛИТЬ, ЕСЛИ ХВАТАЕТ Array.from И createPicture
// const generatePictures = (qty) => {
//   const pictures = [];

//   for (let i = 0; i < qty; i++) {
//     pictures.push(createPicture());
//   }

//   return pictures;
// };

const createDestination = (cityName) => ({
  id: generateDestinationId().toString(),
  description: `${cityName} — is a beautiful city`,
  name: cityName,
  pictures: Array.from({length: getRandomInteger(MIN_PICTURE_COUNT, MAX_PICTURE_COUNT) }, createPicture)
});

const createDestinations = () => CITIES_LIST.map(createDestination);

const createOffer = () => ({
  id: generateOfferId().toString(),
  title: 'Make better',
  price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
});

const createOfferGroup = (type) => ({
  type,
  offers: Array.from({ length: getRandomInteger(MIN_OFFER_COUNT, MAX_OFFER_COUNT) }, createOffer)
});

const createOffers = () => EVENT_TYPES_LIST.map(createOfferGroup);

const mockDestinations = createDestinations();
const mockOffers = createOffers();

const getOfferIdsByType = (type) => {
  const offerGroup = mockOffers.find((item) => item.type === type);
  const offersIds = offerGroup.offers.map((offer) => offer.id);
  return offersIds;
};

const createEvent = (type) => ({
  id: generateEventId().toString(),
  basePrice: getRandomInteger(100, 3000),
  dateFrom: new Date(),
  dateTo: new Date(Date.now() + getRandomInteger(3600000, 86400000)),
  destination: getRandomArrayElement(mockDestinations).id,
  isFavorite: Math.random() > 0.5,
  offers: getOfferIdsByType(type),
  type
});

const createEventArray = (qty) =>
  Array.from({ length: qty }, () =>
    createEvent(getRandomArrayElement(EVENT_TYPES_LIST))
  );

const generateMockEvents = () => createEventArray(getRandomInteger(2, 10));
const getMockDestinations = () => mockDestinations;
const getMockOffers = () => mockOffers;

export { generateMockEvents, getMockDestinations, getMockOffers };
