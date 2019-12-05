module.exports = {
  friendlyName: 'Convert to number',
  description: 'Convert the specified string to its numeric equivalent.',
  extendedDescription: 'For example, "5" is converted to 5.',
  sync: true,
  inputs: {
    string: {
      description: 'The string to convert',
      example: '5',
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Done.',
      example: 5
    },
    notANumber: {
      description: 'The provided string cannot be converted into a number.'
    }
  },
  fn: function(inputs, exits) {
    var _ = require('lodash');
    if (_.isNaN(+inputs.string)) {
      return exits.notANumber();
    }
    return exits.success(inputs.string);
  },

};
