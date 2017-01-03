import * as React from 'react';
import * as THREE from 'three';
import { Detector } from './../../threeUtils/detector';
import './../../threeUtils/controls/orbitControls';
const girls = require('./images/girl.jpg');
const Gif = require('./../../library/gif.js');
export default class LoginPage extends React.Component<any, any>{
	rootElement = 'loginPageRoot';
	renderer: any = null;
	scene: any = null;
	camera: any = null;
	triangleMesh: any = null;
	squareMesh: any = null;
	pyramidMesh: any = null;
	cubeMesh: any = null;
	boxMesh: any = null;
	xRotation = 0.0;
	yRotation = 0.0;
	zRotation = 0.0;
	xSpeed = 0.0;
	ySpeed = 0.01;
	zTranslation = 0.0;
	controls = null;
	componentDidMount() {
		const rootElement = this.refs[this.rootElement] as HTMLElement;

		// Initialize the scene
		this.initializeScene(rootElement);
		// Render the scene (map the 3D world to the 2D scene)
		// this.renderScene();
		this.animateScene();
	}
	// Global scene object


	/**
	 * Initialze the scene.
	 */
	initializeScene(element: HTMLElement) {
		// Check whether the browser supports WebGL. If so, instantiate the hardware accelerated
		// WebGL renderer. For antialiasing, we have to enable it. The canvas renderer uses
		// antialiasing by default.
		// The approach of multiple renderers is quite nice, because your scene can also be
		// viewed in browsers, which don't support WebGL. The limitations of the canvas renderer
		// in contrast to the WebGL renderer will be explained in the tutorials, when there is a
		// difference.
		if (Detector.webgl) {
			this.renderer = new THREE.WebGLRenderer({ antialias: true });
			// If its not supported, instantiate the canvas renderer to support all non WebGL
			// browsers
		} else {
			this.renderer = new THREE.CanvasRenderer();
		}

		// Set the background color of the renderer to black, with full opacity
		this.renderer.setClearColor(0x000000, 1);

		// Get the size of the inner window (content area) to create a full size renderer
		let canvasWidth = window.innerWidth;
		let canvasHeight = window.innerHeight;

		// Set the renderers size to the content areas size
		this.renderer.setSize(canvasWidth, canvasHeight);

		// Get the DIV element from the HTML document by its ID and append the renderers DOM
		// object to it
		element.appendChild(this.renderer.domElement);

		// Create the scene, in which all objects are stored (e. g. camera, lights,
		// geometries, ...)
		this.scene = new THREE.Scene();

		// Now that we have a scene, we want to look into it. Therefore we need a camera.
		// Three.js offers three camera types:
		//  - PerspectiveCamera (perspective projection)
		//  - OrthographicCamera (parallel projection)
		//  - CombinedCamera (allows to switch between perspective / parallel projection
		//    during runtime)
		// In this example we create a perspective camera. Parameters for the perspective
		// camera are ...
		// ... field of view (FOV),
		// ... aspect ratio (usually set to the quotient of canvas width to canvas height)
		// ... near and
		// ... far.
		// Near and far define the cliping planes of the view frustum. Three.js provides an
		// example (http://mrdoob.github.com/three.js/examples/
		// -> canvas_camera_orthographic2.html), which allows to play around with these
		// parameters.
		// The camera is moved 10 units towards the z axis to allow looking to the center of
		// the scene.
		// After definition, the camera has to be added to the scene.
		this.camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 100);
		this.camera.position.set(0, 3, 20);
		this.camera.lookAt(this.scene.position);
		this.scene.add(this.camera);

		// Create the triangle (or any arbitrary geometry).
		// 1. Instantiate the geometry object
		// 2. Add the vertices
		// 3. Define the faces by setting the vertices indices
		// var triangleGeometry = new THREE.Geometry();
		// triangleGeometry.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0));
		// triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
		// triangleGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
		// triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));


		// triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xFF0000);
		// triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00FF00);
		// triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0x0000FF);
		// // To color the surface, a material has to be created. If all faces have the same color,
		// // the THREE.MeshBasicMaterial fits our needs. It offers a lot of attributes (see
		// // https://github.com/mrdoob/three.js/blob/master/src/materials/MeshBasicMaterial.js)
		// // from which we need in this lesson only 'color'.

		// // Create a white basic material and activate the 'doubleSided' attribute to force the
		// // rendering of both sides of each face (front and back). This prevents the so called
		// // 'backface culling'. Usually, only the side is rendered, whose normal vector points
		// // towards the camera. The other side is not rendered (backface culling). But this
		// // performance optimization sometimes leads to wholes in the surface. When this happens
		// // in your surface, simply set 'doubleSided' to 'true'.
		// var triangleMaterial = new THREE.MeshBasicMaterial({
		// 	vertexColors: THREE.VertexColors,
		// 	side: THREE.DoubleSide
		// });

		// // Create a mesh and insert the geometry and the material. Translate the whole mesh
		// // by -1.5 on the x axis and by 4 on the z axis. Finally add the mesh to the scene.
		// this.triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
		// this.triangleMesh.position.set(-1.5, 0.0, 4.0);
		// this.scene.add(this.triangleMesh);

		// // The creation of the square is done in the same way as the triangle, except of the
		// // face definition. Instead of using one THREE.Face3, we have to define two
		// // THREE.Face3 objects.
		// // 1. Instantiate the geometry object
		// // 2. Add the vertices
		// // 3. Define the faces by setting the vertices indices
		// var squareGeometry = new THREE.Geometry();
		// squareGeometry.vertices.push(new THREE.Vector3(-1.0, 1.0, 0.0));
		// squareGeometry.vertices.push(new THREE.Vector3(1.0, 1.0, 0.0));
		// squareGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
		// squareGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
		// squareGeometry.faces.push(new THREE.Face3(0, 1, 2));
		// squareGeometry.faces.push(new THREE.Face3(0, 2, 3));

		// // Create a white basic material and activate the 'doubleSided' attribute.
		// var squareMaterial = new THREE.MeshBasicMaterial({
		// 	color: 0x009AD9,
		// 	side: THREE.DoubleSide
		// });

		// // Create a mesh and insert the geometry and the material. Translate the whole mesh
		// // by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene.
		// this.squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
		// this.squareMesh.position.set(1.5, 0.0, 4.0);
		// this.scene.add(this.squareMesh);



		// // To create a pyramid, we use THREE.CylinderGeometry. By its five parameters, we are
		// // able to create the geometry of the pyramid (subtype of a cylinder).
		// // Parameter 1 'radiusTop': Controls the radius of the upper end of the cylinder. If we
		// //                          set to to '0', we have a cone.
		// // Parameter 2 'radiusBottom': Controls the radius of the lower end.
		// // Parameter 3 'height': Sets the height of the cylinder.
		// // Parameter 4 'segments': Number of segments, forming the cylindrical shell. To create
		// //                         a pyramid, we choose '4'.
		// // Parameter 5 'openEnded': Allows to have open ends ('true') or closed ends ('false')
		// //                          of the cylindern. Since the pyramid shall have a bottom
		// //                          face, we set it to 'false'.
		// var pyramidGeometry = new THREE.CylinderGeometry(0, 1.5, 1.5, 4, false);

		// // Coloring the faces with vertex colors is a bit tricky, but allows us to see how to
		// // loop through the faces and check whether they have three or four vertices.
		// // With a simple 'for'-loop we run through all faces, which are accessed by their index.
		// // The 'instanceof' operator gives the possibility to check, whether the current face is
		// // a THREE.Face4 or THREE.Face3. Depending on its object type, we set three or four
		// // vertex colors. For THREE.Face4 we switch the colors of vertex 1 and 2 for every
		// // second face because we want the lower vertices having the same colors as the
		// // neighbour face. Vertex 0 and 3 are the upper vertices, which are always red.
		// // If WebGL isn't supported and the canvas renderer is used, it ignores the vertex
		// // colors. They are only supported by the WebGL renderer (current release of
		// // Three.js: 49).
		// for (let i = 0; i < pyramidGeometry.faces.length; i++) {
		// 	if (pyramidGeometry.faces[i] instanceof THREE.Face4) {
		// 		pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xFF0000);
		// 		if ((i % 2) === 0) {
		// 			pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
		// 			pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x0000FF);
		// 		} else {
		// 			pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x0000FF);
		// 			pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x00FF00);
		// 		}
		// 		pyramidGeometry.faces[i].vertexColors[3] = new THREE.Color(0xFF0000);
		// 	} else {
		// 		pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xFF0000);
		// 		pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
		// 		pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x0000FF);
		// 	}
		// }

		// // To activate the vertex color, we have to set 'vertexColors' attribute to
		// // 'THREE.VertexColors'. Otherwise they won't be displayed.

		// // Create a basic material, supporting vertex colors. Activate the 'doubleSided'
		// // attribute to force the rendering of both sides of each face (front and back).
		// // This prevents the so called 'backface culling'. Usually, only the side is
		// // rendered, whose normal vector points towards the camera. The other side is not
		// // rendered (backface culling). But this performance optimization sometimes leads
		// // to wholes in the surface. When this happens in your surface, simply set
		// // 'doubleSided' to 'true'.
		// var pyramidMaterial = new THREE.MeshBasicMaterial({
		// 	vertexColors: THREE.VertexColors,
		// 	side: THREE.DoubleSide
		// });

		// // Create a mesh and insert the geometry and the material. Translate the whole mesh
		// // by -1.5 on the x axis and by 4 on the z axis. Finally add the mesh to the scene.
		// this.pyramidMesh = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
		// this.pyramidMesh.position.set(-1.5, 0.0, 4.0);
		// this.scene.add(this.pyramidMesh);

		// Create the cube
		// Parameter 1: Width
		// Parameter 2: Height
		// Parameter 3: Depth
		var boxGeometry = new THREE.BoxGeometry(2.0, 2.0, 2.0);

		// Applying different materials to the faces is a more difficult than applying one
		// material to the whole geometry. We start with creating an array of
		// THREE.MeshBasicMaterial.

		// Define six colored materials
		// var boxMaterials = [
		// 	new THREE.MeshBasicMaterial({ color: 0xFF0000 }),
		// 	new THREE.MeshBasicMaterial({ color: 0x00FF00 }),
		// 	new THREE.MeshBasicMaterial({ color: 0x0000FF }),
		// 	new THREE.MeshBasicMaterial({ color: 0xFFFF00 }),
		// 	new THREE.MeshBasicMaterial({ color: 0x00FFFF }),
		// 	new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
		// ];

		// Create a MeshFaceMaterial, which allows the cube to have different materials on
		// each face
		// create the video element
		const glassTexture = new new THREE.TextureLoader().load(girls);
		// neheTexture.min_filter = THREE.LinearFilter;
		// neheTexture.mag_filter = THREE.LinearFilter;
		//neheTexture.wrapS = THREE.RepeatWrapping;
		//neheTexture.wrapT = THREE.RepeatWrapping;
		// glassTexture.repeat.x = 2;
		// glassTexture.repeat.y = 2

		var boxMaterial = new THREE.MeshLambertMaterial({
			map: glassTexture,
			depthWrite: false,
			transparent: true,
			opacity: 0.8,
			side: THREE.DoubleSide,
			combine: THREE.MixOperation
		});

		var lineMaterial = new THREE.LineBasicMaterial({
			color: 0x880E4F
		});
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(-5, 0, 0));
		geometry.vertices.push(new THREE.Vector3(0, 5, 0));
		geometry.vertices.push(new THREE.Vector3(5, 0, 0));
		geometry.vertices.push(new THREE.Vector3(0, 0, 5));
		geometry.vertices.push(new THREE.Vector3(0, 5, 0));
		geometry.vertices.push(new THREE.Vector3(0, 0, -5));


		var line = new THREE.Line(geometry, lineMaterial);

		var radius = 10;
		var radials = 48;
		var circles = 16;
		var divisions = 128;
		var gridHelper = new THREE.PolarGridHelper(radius, radials, circles, divisions, new THREE.Color(0x880E4F), new THREE.Color(0xE91E63));

		this.scene.add(line);
		this.scene.add(gridHelper);

		var texture1 = new THREE.CanvasTexture(this.generateTexture(0, 0.5, 1), THREE.UVMapping);
		var materials = [

			new THREE.MeshNormalMaterial(),
			new THREE.MeshDepthMaterial(),
			new THREE.MeshBasicMaterial({ color: 0x0066ff, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }),
			new THREE.MeshBasicMaterial({ color: 0xffaa00, wireframe: true }),
			new THREE.MeshBasicMaterial({ map: texture1, fog: false }),
			new THREE.MeshLambertMaterial({ color: 0xdddddd }),
			new THREE.MeshPhongMaterial({ color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading }),
			new THREE.MeshPhongMaterial({ color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.SmoothShading })

		];

		var geometryStar = new THREE.SphereGeometry(50, 32, 16);

		for (var i = 0; i < 5000; i++) {

			// random order
			//var index = Math.floor( Math.random() * materials.length );

			// sort by material / geometry
			var index = Math.floor((i / 5000) * materials.length);

			var material = materials[index];

			var mesh = new THREE.Mesh(geometryStar, material);

			mesh.position.x = Math.random() * 10000 - 5000;
			mesh.position.y = Math.random() * 10000 - 5000;
			mesh.position.z = Math.random() * 10000 - 5000;

			//mesh.rotation.x = Math.random() * 360 * ( Math.PI / 180 );
			mesh.rotation.y = Math.random() * 2 * Math.PI;

			mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 4 + 1;

			this.scene.add(mesh);

		}



		// Create a mesh and insert the geometry and the material. Translate the whole mesh
		// by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene.
		this.boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
		this.boxMesh.position.set(0.0, 0.0, this.zTranslation);
		this.scene.add(this.boxMesh);

		// Ambient light has no direction, it illuminates every object with the same
		// intensity. If only ambient light is used, no shading effects will occur.
		var ambientLight = new THREE.AmbientLight(0x101010, 1.0);
		this.scene.add(ambientLight);

		// Directional light has a source and shines in all directions, like the sun.
		// This behaviour creates shading effects.
		var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
		directionalLight.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
		this.scene.add(directionalLight);
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

		document.addEventListener('keydown', this.onDocumentKeyDown, false);
	}
	generateTexture(r, g, b) {

		var canvas = document.createElement('canvas');
		canvas.width = 256;
		canvas.height = 256;

		var context = canvas.getContext('2d');
		var image = context.getImageData(0, 0, 256, 256);

		var x = 0, y = 0, p;

		for (var i = 0, j = 0, l = image.data.length; i < l; i += 4, j++) {

			x = j % 256;
			y = x == 0 ? y + 1 : y;
			p = Math.floor(x ^ y);

			image.data[i] = ~~p * r;
			image.data[i + 1] = ~~p * g;
			image.data[i + 2] = ~~p * b;
			image.data[i + 3] = 255;

		}

		context.putImageData(image, 0, 0);

		return canvas;

	}
	//监控按键
	onDocumentKeyDown = (event: KeyboardEvent) => {
		const keyCode = event.which;

		if (keyCode === 37) { //left
			this.ySpeed -= 0.01;
		} else if (keyCode === 38) { //top
			this.xSpeed -= 0.01;
		} else if (keyCode === 39) { //right
			this.ySpeed += 0.01;
		} else if (keyCode === 40) { //bottom
			this.xSpeed += 0.01;
		}
	}
	/**
	 * Animate the scene and call rendering.
	 */
	animateScene = () => {

		this.xRotation += this.xSpeed;
		this.yRotation += this.ySpeed;

		this.boxMesh.rotation.set(this.xRotation, this.yRotation, this.zTranslation);

		this.boxMesh.position.z = this.zTranslation;

		// Define the function, which is called by the browser supported timer loop. If the
		// browser tab is not visible, the animation is paused. So 'animateScene()' is called
		// in a browser controlled loop.
		requestAnimationFrame(this.animateScene);
		this.renderer.render(this.scene, this.camera);
		if (this.controls !== null && typeof this.controls !== 'undefined') {
			this.controls.update();
		}
	}
	render() {
		return (
			<div ref={this.rootElement} />
		);
	}
}
