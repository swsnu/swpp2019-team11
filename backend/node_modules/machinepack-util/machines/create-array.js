module.exports = {
  friendlyName: 'Create array',
  description: 'Create an array using the specified values.',
  sync: true,
  inputs: {
    array: {
      description: 'The array to build.',
      typeclass: 'array',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Returns created array.',
      friendlyName: 'then',
      getExample: function(inputs, exits) {
        return inputs.array;
      }
    }
  },

  fn: function(inputs, exits) {
    return exits.success(inputs.array);
  }

};
