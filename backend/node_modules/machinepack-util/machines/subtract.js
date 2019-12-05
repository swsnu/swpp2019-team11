module.exports = {
  friendlyName: 'Subtract (-)',
  description: 'Subtract one number from another and return the difference.',
  extendedDescription: '',
  sync: true,
  inputs: {
    a: {
      description: 'The number to subtract from.',
      example: -20,
      required: true
    },
    b: {
      description: 'The number to subtract.',
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
      description: 'Returns the difference (a - b)',
      example: -22.2
    }
  },
  fn: function(inputs, exits) {
    return exits.success(inputs.a-inputs.b);
  },

};
