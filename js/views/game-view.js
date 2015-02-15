define([
  'views/base/view',
  'text!templates/game.hbs',
  'three'
], function(View, template, THREE) {
  'use strict';

  var GameView = View.extend({
    // Automatically render after initialize
    autoRender: true,

    className: 'game-view',

    // Save the template string in a prototype property.
    // This is overwritten with the compiled template function.
    // In the end you might want to used precompiled templates.
    template: template,

    makeCube: function() {

      var scene = new THREE.Scene();

      var SCREEN_WIDTH = window.innerWidth;
      var SCREEN_HEIGHT = window.innerHeight;

      var camera = new THREE.OrthographicCamera( SCREEN_WIDTH / -2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / - 2, 1, 1000 );
      var cameraHelper = new THREE.CameraHelper( camera );
      camera.position.z = 1000;

      var renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
      renderer.domElement.style.position = "relative";
      document.body.appendChild( renderer.domElement );

      var mesh = new THREE.Mesh( new THREE.SphereGeometry( 31, 14, 14 ), new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } ) );
      mesh.position.x = 100;
      mesh.position.y = -100;
      mesh.position.z = 40;
      scene.add( mesh );

      var mesh2 = new THREE.Mesh( new THREE.SphereGeometry( 31, 14, 14 ), new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } ) );
      mesh2.position.x = -100;
      mesh2.position.y = 100;
      mesh.position.z = 140;
      scene.add( mesh2 );

      window.addEventListener( 'resize', onWindowResize, false );
      window.addEventListener( 'click', onDocumentMouseClick, false );

      function onWindowResize( event ) {

        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;

        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

        camera.left   = - SCREEN_WIDTH / 2;
        camera.right  =   SCREEN_WIDTH / 2;
        camera.top    =   SCREEN_HEIGHT / 2;
        camera.bottom = - SCREEN_HEIGHT / 2;
        camera.updateProjectionMatrix();

        console.log('in resize');

      }

      function animate() {

        requestAnimationFrame( animate );
        render();

      }

      var target = false;
      var mouse = new THREE.Vector2();
      var targetRaycaster = new THREE.Raycaster();
      function onDocumentMouseClick( event ) {

        event.preventDefault();

        target = true;

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      }

      function render() {

        var r = Date.now() * 0.0005;

        mesh.rotation.x += 0.008;
        mesh.rotation.y += 0.007;

        mesh2.rotation.x += 0.008;
        mesh2.rotation.y -= 0.009;

        if (target) {
          targetRaycaster.set(mesh, mouse);
          console.log(targetRaycaster.ray.direction.x);
          console.log(targetRaycaster.ray.direction.y);
          mesh.position.x += 25 * targetRaycaster.ray.direction.x;
          mesh.position.y += 25 * targetRaycaster.ray.direction.y;
          target = false;
        }

        renderer.render( scene, camera );

      }

      animate();
    }
  });

  return GameView;
});