'use strict';

/*global ga:false, requestAnimationFrame:false, THREE:false */

var planeDefinition = 100;
var planeSize = 1245000;
var totalObjects = 5000;
var frame = 0;


var container = document.createElement('div');
document.body.appendChild( container );


var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight,1, 400000);

camera.position.z = 550000;
camera.position.y =10000;

camera.lookAt( new THREE.Vector3(0,2000,0) );


var scene = new THREE.Scene();


var uniforms = {
	time: { type: 'f', value: 0.0 }
};



var material = new THREE.ShaderMaterial( {
	uniforms: uniforms,
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
	wireframe: true,
	color: 'blue'
});



var plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( planeSize, planeSize, planeDefinition, planeDefinition ), material );
plane.rotation.x -= Math.PI * 0.5;

scene.add( plane );

var geometry = new THREE.Geometry();

for (var i = 0; i < totalObjects; i ++) {
  var vertex = new THREE.Vector3();
  vertex.x = Math.random() * planeSize - (planeSize * 0.5);
  vertex.y = (Math.random() * 100000) + 10000;
  vertex.z = Math.random() * planeSize - (planeSize * 0.5);
  geometry.vertices.push( vertex );
}


var renderer = new THREE.WebGLRenderer({alpha:true, antialias: true});


renderer.setSize(window.innerWidth, window.innerHeight);

container.appendChild( renderer.domElement );





function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
	requestAnimationFrame( render );
	camera.position.z -= 50;
	uniforms.time.value = frame;

	frame += 0.04;
	renderer.render( scene, camera );
}


render();
window.addEventListener('resize', onWindowResize, false);



// -------------------------------------------------
//
// Analytics sh*t
// 
// -------------------------------------------------
$('#subscribe').on('click', function(){
	ga('send', 'event', 'button', 'click', 'Subscribe');
});

