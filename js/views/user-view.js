define([
  'views/base/view',
  'text!templates/user.hbs'
], function(View, template) {
  'use strict';

  var UserView = View.extend({
    // Automatically render after initialize
    autoRender: true,

    className: 'user-view',

    // Save the template string in a prototype property.
    // This is overwritten with the compiled template function.
    // In the end you might want to used precompiled templates.
    template: template
  });

  return UserView;
});
