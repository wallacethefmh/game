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

      // ENVIRONMENT VARS
      var ground,
          maxAnisotropy = renderer.getMaxAnisotropy(),
          userProjectiles = [];
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
          target = false;
          targetRaycaster.setFromCamera(mouse, camera);
          var clickTarget = targetRaycaster.intersectObject(ground)[0];

          // console.log(clickTarget.point.normalize());
          // console.log(clickTarget.point);
          // var projectileRay = new THREE.Ray(mesh.position, clickTarget.point.multiplyScalar(1000).normalize());
          // console.log(clickTarget.point.multiplyScalar(1000));
          // console.log(clickTarget.point);
          // console.log(projectileRay.origin);
          // console.log(projectileRay.direction);

          var lastX = mesh.position.x;
          var lastY = mesh.position.y;

          var geometry = new THREE.Geometry();
          geometry.vertices.push(
            new THREE.Vector3( lastX, lastY, 0 ),
            clickTarget.point
          );

          var line = new THREE.Line( geometry );
          
          scene.add( line );

          var a = new ClickProjectile();
          a.init(mesh, line.geometry.vertices[1], line.geometry.vertices[0]);
          userProjectiles.push(a);

        }

        for (var i = userProjectiles.length - 1; i >= 0; i--) {
          if (userProjectiles[i].finished) userProjectiles.splice(i, 1);
        };
        for (var i = userProjectiles.length - 1; i >= 0; i--) {
          userProjectiles[i].render();
        };       

        renderer.render( scene, camera );

      }

      function initEnvironment() {
        
        // GROUND
        var texture = THREE.ImageUtils.loadTexture( "assets/images/textures/terrain-marble.jpg" );
        var material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture } );
        texture.anisotropy = maxAnisotropy;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 512, 512 );

        var geometry = new THREE.PlaneBufferGeometry( 100, 100, 32 );
        
        ground = new THREE.Mesh( geometry, material );
        ground.scale.set( 3000, 3000, 3000 );
        scene.add( ground );

        // LIGHTING
        scene.add( new THREE.AmbientLight( 0xeef0ff ) );
        
        var light = new THREE.PointLight( 0xFFFFFF, 1, 1000 );
        light.position.set( 0, 0, 500 );
        scene.add( light );

      }

      var ClickProjectile = function() {
        this.initialSpeed = 40;
        this.count = 0;
        this.speed = this.initialSpeed;
        this.mesh;
        this.destination;
        this.destNorm;
        this.movedX = 0;
        this.movedY = 0;
        this.lastLog = 0;
        this.init = function(mesh, finish, start) {
          this.mesh = mesh;
          this.destination = new THREE.Vector3();
          this.destination.subVectors(finish, start);
          this.destNorm = this.destination.clone().normalize();
          this.count = 0;
        }
        this.render = function() {

          
          this.speed = 2 + 9 * (this.count) - 4.9 * Math.pow(this.count, 2);
          console.log(this.speed);


          this.count += 1;
          if (this.count > 1000) this.destroy();
          
          this.mesh.position.x += this.destNorm.x * this.speed;
          this.mesh.position.y += this.destNorm.y * this.speed;
          
          this.movedX += Math.abs(this.destNorm.x * this.speed);
          this.movedY += Math.abs(this.destNorm.y * this.speed);

          if (this.movedX > Math.abs(this.destination.x)) this.destroy();
          // console.log('xdiff: ' . xdiff);
          // console.log('ydiff: ' . ydiff);
          // if ((xdiff < 2 && xdiff > -2) && (ydiff < 2 && ydiff > -2)) this.detroy();
          // if (Math.abs(this.mesh.position.x) > Math.abs(this.destination.x) 
          //   || Math.abs(this.mesh.position.y) > Math.abs(this.destination.y) ) this.destroy();
        }
        this.destroy = function() {
          this.finished = 1;
        }
      }

      animate();
    }
  });

  return GameView;
});