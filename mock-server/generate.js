function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

module.exports = function () {
  var faker = require('faker');
  var _ = require('lodash');
  return {
    events: _.times(35, function (index) {
      return {
        id: index,
        name: faker.name.firstName(),
      };
    })
  };
};
