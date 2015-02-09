define([
  'views/base/view',
  'text!templates/user.hbs',
  'lib/three',
  'lib/utils'
], function(View, template, Three, Utils) {
  'use strict';

  var UserView = View.extend({
    // Automatically render after initialize
    autoRender: true,

    className: 'user-view',

    // Save the template string in a prototype property.
    // This is overwritten with the compiled template function.
    // In the end you might want to used precompiled templates.
    template: template,

    makeCube: function() {
      
      console.log('view:');
      console.log(View);
      console.log('template:');
      console.log(template);
      console.log('three:');
      console.log(Three);
      console.log('utils:');
      console.log(Utils);

      // var scene = new THREE.Scene();
      // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

      // var renderer = new THREE.WebGLRenderer();
      // renderer.setSize( window.innerWidth, window.innerHeight );
      // document.body.appendChild( renderer.domElement );

      // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      // var cube = new THREE.Mesh( geometry, material );
      // scene.add( cube );

      // camera.position.z = 5;

      // var render = function () {
      //   requestAnimationFrame( render );

      //   cube.rotation.x += 0.1;
      //   cube.rotation.y += 0.1;

      //   renderer.render(scene, camera);
      // };

      // render();
    }
  });

  return UserView;
});
