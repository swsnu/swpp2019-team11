module.exports = {
  friendlyName: 'Generate unique token',
  description: 'Generate a unique, alphanumeric string with a probabalistically unlikely chance of collisions.',
  extendedDescription: '',
  sync: true,
  inputs: {},
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Generated alphanumeric string',
      example: '1a17d9af25aef464b46481d901ba2005'
    }
  },
  fn: function(inputs, exits) {
    module.exports.rack = module.exports.rack || require('hat').rack();
    exits.success(module.exports.rack());
  }

};
