module.exports = {
  friendlyName: 'Dereference (.)',
  description: 'Get the value at a particular key within a dictionary.',
  extendedDescription: '',
  sync: true,
  inputs: {
    dictionary: {
      description: 'The dictionary to dereference',
      typeclass: 'dictionary',
      required: true
    },
    keypath: {
      description: 'The key to look up (can be nested, e.g. "avatar" or "avatar.sizeInBytes")',
      example: 'mom.email',
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Returns the concatenated result.',
      getExample: function (inputs,env){
        var subtree = inputs.dictionary;
        try {
          env._.each(inputs.keypath.split('.'), function (subkey){
            subtree = subtree[subkey];
          });
        }
        catch (e) {
          return;
        }
        return subtree;
      }
    }
  },
  fn: function(inputs, exits) {
    var _ = require('lodash');

    var subtree = inputs.dictionary;
    try {
      _.each(inputs.keypath.split('.'), function (subkey){
        subtree = subtree[subkey];
      });
    }
    catch (e) {
      return exits.error(e);
    }
    return exits.success(subtree);
  },

};
