module.exports = {
  friendlyName: 'Multiply (✕)',
  description: 'Multiply two numbers and return the product.',
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
      example: -10,
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Returns the product (a ✕ b)',
      example: -20
    }
  },
  fn: function(inputs, exits) {
    return exits.success(inputs.a*inputs.b);
  },

};
