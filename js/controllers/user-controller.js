define([
  'controllers/base/controller',
  'models/user',
  'views/user-view'
], function(Controller, User, UserView) {
  'use strict';

  var UserController = Controller.extend({
    show: function(params) {
      this.model = new User();
      this.view = new UserView({
        model: this.model,
        region: 'main'
      });
    }
  });

  return UserController;
});
