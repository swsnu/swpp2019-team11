module.exports = {
  friendlyName: 'Parse JSON',
  description: 'Parse data from a JSON string.',
  extendedDescription: '',
  sync: true,
  inputs: {
    json: {
      description: 'The JSON string to parse',
      example: '{"some json": "like this"}',
      required: true
    },
    schema: {
      description: 'An example of what the resulting data should look like.',
      typeclass: '*',
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    couldNotParse: {
      description: 'Could not parse provided string- must be a valid JSON string.',
      extendedDescription: 'Oftentimes this error is a result of not using double-quotes.  Refer to the official JSON specification at http://www.json.org/ for more information.'
    },
    success: {
      description: 'Done.',
      getExample: function (inputs){
        return inputs.schema;
      }
    }
  },
  fn: function(inputs, exits) {
    var parsedJson;
    try {
      parsedJson = JSON.parse(inputs.json);
    }
    catch (e){
      return exits.couldNotParse(e);
    }
    return exits.success(parsedJson);
  },

};
