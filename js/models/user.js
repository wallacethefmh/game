define([
  'models/base/model'
], function(Model) {
  'use strict';

  var Game = Model.extend({
    defaults: {
      name: 'dude'
    }

    // ,initialize: function(attributes, options) {
    //  Model.prototype.initialize.apply(this, arguments);
    //  console.debug('HelloWorld#initialize');
    //  console.debug('arguments');
    //  console.debug(arguments);
    // }
  });

  return Game;
});