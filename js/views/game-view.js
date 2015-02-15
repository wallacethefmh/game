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

      initEnvironment();

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

          //console.log(mesh);
          //console.log(mouse);
          targetRaycaster.set(mesh, mouse);
          mesh.position.x += 25 * targetRaycaster.ray.direction.x;
          mesh.position.y += 25 * targetRaycaster.ray.direction.y;
          target = false;
        }

        renderer.render( scene, camera );

      }

      function initEnvironment() {
        var maxAnisotropy = renderer.getMaxAnisotropy();
        
        // GROUND
        var texture = THREE.ImageUtils.loadTexture( "assets/images/textures/terrain-marble.jpg" );
        var material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture } );
        texture.anisotropy = maxAnisotropy;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 512, 512 );

        var geometry = new THREE.PlaneBufferGeometry( 100, 100, 32 );
        var planeMesh = new THREE.Mesh( geometry, material );
        planeMesh.scale.set( 1000, 1000, 1000 );
        scene.add( planeMesh );

        // LIGHTING
        scene.add( new THREE.AmbientLight( 0xeef0ff ) );

        //var light = new THREE.DirectionalLight( 0xffffff, 2 );
        //light.position.set( 1, 1, 1 );
        //scene.add( light );
        
        var light = new THREE.PointLight( 0xFFFFFF, 1, 1000 );
        light.position.set( 0, 0, 500 );
        scene.add( light );

      }

      animate();
    }
  });

  return GameView;
});