module.exports = {
  friendlyName: 'Merge',
  description: 'Merge two dictionaries together and return the result.',
  sync: true,
  extendedDescription: '',
  inputs: {
    primary: {
      description: 'The dictionary whose keys will take precedence.',
      typeclass: 'dictionary',
      required: true
    },
    secondary: {
      description: 'The dictionary whose keys may be overridden by `primary`.',
      typeclass: 'dictionary',
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
      getExample: function(inputs, env) {
        return env._.merge(_.merge({}, inputs.secondary), inputs.primary);
      }
    }
  },
  fn: function(inputs, exits) {
    var _ = require('lodash');

    return exits.success(_.merge(_.merge({}, inputs.secondary), inputs.primary));
  },

};
