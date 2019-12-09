module.exports = {
  friendlyName: 'Search string using regexp',
  description: 'Search a string using a regular expression and return the first match.',
  sync: true,
  inputs: {
    string: {
      example: 'hello world',
      description: 'The string to search',
      required: true
    },
    regexp: {
      example: 'world',
      description: 'The regular expression to match against (as a string- don\'t include prefix and suffix slashes)',
      required: true
    }
  },
  exits: {
    success: {
      friendlyName: 'match found',
      description: 'Returns the matched substring.',
      example: 'world',
    },
    invalidRegexp: {
      friendlyName: 'invalid regex',
      description: 'Provided regular expression is invalid (cannot be instantiated into a RegExp object)'
    },
    fail: {
      friendlyName: 'no match found',
      description: 'No match found'
    },
    error: {
      description: 'Unexpected error occurred.'
    }
  },
  defaultExit: 'success',
  fn: function (inputs, exits) {

    // Check that the regexp is valid
    var regexp;
    try {
      regexp = new RegExp(inputs.regexp);
    } catch (e) {
      return exits.invalidRegexp(e);
    }

    var matches = inputs.string.match(regexp);
    if (!matches) {
      return exits.fail();
    }
    return exits.success(matches[0]);

  }

};
