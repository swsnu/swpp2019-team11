module.exports = {
  friendlyName: 'Pick random item',
  description: 'Randomly select an item from an array',
  sync: true,
  inputs: {
    array: {
      typeclass: 'array',
      description: 'The array of items to pick from',
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      friendlyName: 'then',
      description: 'An item was randomly selected',
      getExample: function(inputs, env) {
        return inputs.array[0];
      },
    }
  },
  fn: function(inputs, exits) {
    var _ = require('lodash');
    var list = inputs.array;
    return exits.success(_.sample(list));
  }
};
