define([
  'controllers/base/controller',
  'models/game',
  'views/game-view'
], function(Controller, Game, GameView) {
  'use strict';

  var GameController = Controller.extend({
    show: function(params) {
      this.model = new Game();
      this.view = new GameView({
        model: this.model,
        region: 'main'
      });
      this.view.makeCube();
    }
  });

  return GameController;
});
