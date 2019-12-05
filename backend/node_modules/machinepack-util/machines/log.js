module.exports = {
  friendlyName: 'Log a message',
  description: 'Output a message to the console',
  sync: true,
  extendedDescription: '',
  inputs: {
    message: {
      example: 'hello world',
      required: true,
      description: 'The message to output to the console.'
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Done.'
    }
  },
  fn: function(inputs, exits) {
    console.log(inputs.message);
    return exits.success();
  }

};
