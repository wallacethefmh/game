define([
  'views/base/view',
  'text!templates/Game.hbs',
  'three'
], function(View, template, THREE) {
  'use strict';

  var GameView = View.extend({
    // Automatically render after initialize
    autoRender: true,

    className: 'Game-view',

    // Save the template string in a prototype property.
    // This is overwritten with the compiled template function.
    // In the end you might want to used precompiled templates.
    template: template,

    makeCube: function() {

      var scene = new THREE.Scene();

      var width = window.innerWidth;
      var height = window.innerHeight;

      camera = new THREE.OrthographicCamera( 0.5 * SCREEN_WIDTH / - 2, 0.5 * SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / - 2, 150, 1000 );
      camera.position.z = 2500;

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      var cube = new THREE.Mesh( geometry, material );
      scene.add( cube );

      camera.position.z = 5;

      var render = function () {
        requestAnimationFrame( render );

        cube.rotation.x += 0.03;
        cube.rotation.y += 0.03;

        cube.position.x += 0.01;
        cube.position.y += 0.005;


        renderer.render(scene, camera);
      };

      function onWindowResize( event ) {

        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;

        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

        camera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();

      }

      console.log(cube);
    }
  });

  return GameView;
});