module.exports = {
  friendlyName: 'Convert to camel case',
  description: 'Build a new camel-cased version of the specified dash-delimited string.',
  extendedDescription: 'Returns a version of the string with dashes removed, using medial capitalization to separate words instead. See http://en.wikipedia.org/wiki/CamelCase for more information.',
  sync: true,
  inputs: {
    string: {
      example: 'foo-bar-baz',
      description: 'The dash-delimited string to convert',
      required: true
    }
  },
  exits: {
    success: {
      description: 'OK.',
      example: 'fooBarBaz',
    },
    error: {
      description: 'Unexpected error occurred.'
    }
  },
  defaultExit: 'success',
  fn: function (inputs, exits) {

    var parts = inputs.string.split(/[\W_]/);
    var transformedParts = [];
    parts.forEach(function(part, index) {
      part = part.toLowerCase();
      if (index !== 0) {
        part = part[0].toUpperCase()+part.substr(1);
      }
      transformedParts.push(part);
    });
    return exits.success(transformedParts.join(''));

  }

};
