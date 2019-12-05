module.exports = {
  friendlyName: 'Generate random integer',
  description: 'Generate a random integer within the specified range.',
  sync: true,
  inputs: {
    start: {
      example: 1,
      defaultsTo: 0,
      friendlyName: 'At least',
      description: 'The min acceptable integer to generate',
      required: true
    },
    end: {
      example: 1,
      defaultsTo: 0,
      friendlyName: 'No greater than',
      description: 'The max acceptable integer to generate',
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      example: 1,
      friendlyName: 'then',
      description: 'OK.'
    }
  },
  fn: function (inputs, exits) {
    var start = Number(inputs.start);
    var end = Number(inputs.end);
    var result = Math.ceil(Math.random() * end) + start;
    exits.success(result);
  }

};
