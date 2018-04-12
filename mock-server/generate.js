const format = require('date-fns/format');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomIntegersArray(arrayLength, max) {
  const randomArray = Array.apply(null, Array(arrayLength)).map(function(item, index) {
    return Math.floor(Math.random() * max);
  });

  // Filter values to be unique
  return randomArray.filter((v, i, a) => a.indexOf(v) === i);
}

function createDate(days) {
  const today = new Date();
  const nextDate = today.setDate(today.getDate() + days);
  return format(nextDate);
}

const categories = [
  'Art',
  'Commedy',
  'Dance',
  'Film',
  'Sport',
  'Food',
  'Theater',
  'Party',
  'Music',
  'Networking',
];
const county = [
  'Banska Bystrica',
  'Bratislava',
  'Nitra',
  'Presov',
  'Kosice',
  'Trencin',
  'Trnava',
  'Zilina',
];

const places = [
  'Magio Plaz',
  'Zepelin Cafe',
  'Amfik Cafe',
  'Mestka sportova hala Piestany',
  'City Arena Trnava',
  'Synagoga Cafe',
  'Thalmainer',
];

module.exports = function() {
  var faker = require('faker');
  var _ = require('lodash');
  return {
    events: _.times(35, function(index) {
      const randomEventDaysLength = Math.floor(Math.random() * 7);
      return {
        id: index,
        userId: index,
        name: faker.company.companyName(),
        image: faker.image.avatar(),
        description: faker.lorem.text(),
        address: {
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          zipCode: faker.address.zipCode(),
          state: faker.address.state(),
          place: places[Math.floor(Math.random() * places.length)],
        },
        going: getRandomInt(0, 133),
        likes: getRandomInt(0, 500),
        interested: getRandomInt(0, 300),
        category: categories[Math.floor(Math.random() * categories.length)],
        county: county[Math.floor(Math.random() * county.length)],
        startDate: createDate(index),
        endDate: createDate(index + randomEventDaysLength),
        createdAt: createDate(-10 - index),
        updatedAt: null,
        deletedAt: null,
      };
    }),
    comments: _.times(250, function(index) {
      return {
        eventId: getRandomInt(1, 35),
        userId: getRandomInt(1, 45),
        title: faker.lorem.words(),
        text: faker.lorem.paragraph(),
        author: {
          image: faker.image.avatar(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
        createdAt: createDate(-index),
        updatedAt: null,
        deletedAt: null,
      };
    }),
    users: _.times(45, function(index) {
      return {
        id: index,
        county: county[Math.floor(Math.random() * county.length)],
        userName: faker.internet.userName(),
        city: faker.address.city(),
        placeOfBirth: faker.address.city(),
        job: faker.name.jobTitle(),
        favourite: {
          book: faker.lorem.words(),
          song: faker.lorem.words(),
          moto: faker.lorem.words(),
          film: faker.lorem.words(),
        },
        going: getRandomIntegersArray(getRandomInt(0, 7), 35),
        interested: getRandomIntegersArray(getRandomInt(0, 12), 35),
        likes: getRandomIntegersArray(getRandomInt(0, 6), 35),
        age: getRandomInt(18, 50),
        createdAt: createDate(-Math.floor(Math.random() * 1500)),
        updatedAt: null,
        deletedAt: null,
      };
    }),
  };
};
