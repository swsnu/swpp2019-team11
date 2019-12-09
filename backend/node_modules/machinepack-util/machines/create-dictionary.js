module.exports = {
  friendlyName: 'Create dictionary',
  description: 'Create a dictionary using the specified keys and values.',
  sync: true,
  inputs: {
    dictionary: {
      description: 'The object to build.',
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
      friendlyName: 'then',
      description: 'Done.',
      getExample: function(inputs, exits) {
        return inputs.dictionary;
      }
    }
  },

  fn: function(inputs, exits) {
    return exits.success(inputs.dictionary);
  }

};
