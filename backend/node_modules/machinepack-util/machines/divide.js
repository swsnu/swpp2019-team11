module.exports = {
  friendlyName: 'Divide (÷)',
  description: 'Divide two numbers and return the quotient.',
  sync: true,
  inputs: {
    a: {
      description: 'The first number.',
      example: 5,
      required: true
    },
    b: {
      description: 'The second number.',
      example: 2,
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Returns the quotient (a ÷ b)',
      example: 2.5
    }
  },
  fn: function(inputs, exits) {
    return exits.success(inputs.a/inputs.b);
  },

};
