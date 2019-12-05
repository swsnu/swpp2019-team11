module.exports = {
  friendlyName: 'Add (+)',
  description: 'Add two numbers together and return the sum.',
  extendedDescription: '',
  sync: true,
  inputs: {
    a: {
      description: 'The first number.',
      example: 2,
      required: true
    },
    b: {
      description: 'The second number.',
      example: 2.2,
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Returns the sum (a + b)',
      example: 4.2
    }
  },
  fn: function(inputs, exits) {
    return exits.success(inputs.a+inputs.b);
  },

};
