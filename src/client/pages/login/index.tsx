import * as React from 'react';
import * as THREE from 'three';
import { Detector } from './../../threeUtils/detector';
import './../../threeUtils/controls/orbitControls';
const girls = require('./images/girl.jpg');
const suger = require('./sounds/sugar.mp3');
const logo = require('./images/logo.png');
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
	listener = null;
	analyser = null;
	METERNUM = 16;
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


		var boxGeometry = new THREE.BoxGeometry(2.0, 2.0, 2.0);


		const glassTexture = new THREE.TextureLoader().load(logo);
		var boxMaterial = new THREE.MeshLambertMaterial({
			map: glassTexture,
			depthWrite: false,
			transparent: true,
			opacity: 0.8,
			side: THREE.DoubleSide,
			combine: THREE.MixOperation
		});
		// Create a mesh and insert the geometry and the material. Translate the whole mesh
		// by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene.
		this.boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
		this.boxMesh.position.set(0.0, 0.0, this.zTranslation);
		this.scene.add(this.boxMesh);


		var lineMaterial = new THREE.LineBasicMaterial({
			color: 0x880E4F
		});

		var radius = 10;
		var radials = 48;
		var circles = 16;
		var divisions = 128;
		var gridHelper = new THREE.PolarGridHelper(radius, radials, circles, divisions, new THREE.Color(0x880E4F), new THREE.Color(0xE91E63));
		this.scene.add(gridHelper);
		//构建一个环形圆圈
		const a0 = 10; //单个角度
		const r = 5;
		for (let i = 0; i < 360 / a0; i++) {
			const circlesGeometry = new THREE.Geometry();
			const x = 0 + r * Math.cos(a0 * i * Math.PI / 180);
			const y = 0 + r * Math.sin(a0 * i * Math.PI / 180);
			circlesGeometry.vertices.push(new THREE.Vector3(x, 0.1, y));
			circlesGeometry.vertices.push(new THREE.Vector3(x, -0.1, y));
			const line = new THREE.Line(circlesGeometry, lineMaterial);
			this.scene.add(line);
		}




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

		const MWIDTH = 0.2;
		const MTHICKNESS = 0.3;

		//播放器
		//创建绿色柱条的形状
		var cubeGeometry = new THREE.CubeGeometry(MWIDTH, 1, MTHICKNESS);
		//创建绿色柱条的材质
		var cubeMaterial = new THREE.MeshPhongMaterial({
			color: 0x880E4F,
			ambient: 0x880E4F,
			specular: 0x880E4F,
			shininess: 20,
			reflectivity: 5.5
		});
		//创建白色盖子的形状
		var capGeometry = new THREE.CubeGeometry(MWIDTH, 0.05, MTHICKNESS);
		//创建白色盖子的材质
		var capMaterial = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			ambient: 0xffffff,
			specular: 0xffffff,
			shininess: 20,
			reflectivity: 5.5
		});
		const METERNUM = this.METERNUM;
		const GAP = 0.3;
		//创建一字排开的柱条和盖子，并添加到场景中
		for (var i = METERNUM - 1; i >= 0; i--) {
			var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cube.position.x = -METERNUM * (MWIDTH + GAP) / 2 + (MWIDTH + GAP) * i;
			cube.position.y = -0.2;
			cube.position.z = 0;
			cube.castShadow = true;
			cube.name = 'cube' + i;
			this.scene.add(cube);
			//盖子
			var cap = new THREE.Mesh(capGeometry, capMaterial);
			cap.position.x = -METERNUM * (MWIDTH + GAP) / 2 + (MWIDTH + GAP) * i;
			cap.position.y = 0;
			cap.position.z = 0;
			cap.castShadow = true;
			cap.name = 'cap' + i;
			this.scene.add(cap);
		};




		//Create an AudioListener and add it to the camera
		this.listener = new THREE.AudioListener();
		this.camera.add(this.listener);
		// create a global audio source
		var sound = new THREE.Audio(this.listener);

		var audioLoader = new THREE.AudioLoader();

		//Load a sound and set it as the Audio object's buffer
		audioLoader.load(suger, (buffer) => {
			sound.setBuffer(buffer);
			sound.setLoop(false);
			sound.setVolume(0.5);
			sound.play();
		});
		this.analyser = new THREE.AudioAnalyser(sound, 32);

		var meter = this.scene.getObjectByName('cube' + 1, true);
		(window as any).meter = meter;
		this.createPentagram();
		this.createCircle();
		this.createShapes();
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
		const METERNUM = this.METERNUM;
		this.xRotation += this.xSpeed;
		this.yRotation += this.ySpeed;

		this.boxMesh.rotation.set(this.xRotation, this.yRotation, this.zTranslation);

		this.boxMesh.position.z = this.zTranslation;

		if (this.analyser) {
			//从音频分析器中获取数据
			var array = new Uint8Array(this.analyser.data);
			this.analyser.getFrequencyData(array);
			var step = Math.round(array.length / METERNUM);
			//更新每根柱条的高度
			for (var i = 0; i < METERNUM; i++) {
				var value = array[i * step] / 4;
				value = value < 1 ? 1 : value;
				var meter = this.scene.getObjectByName('cube' + i, true),
					cap = this.scene.getObjectByName('cap' + i, true);
				meter.scale.y = value / 10;
				//计算柱条边沿尺寸以获得高度
				meter.geometry.computeBoundingBox();
				let height = (meter.geometry.boundingBox.max.y - meter.geometry.boundingBox.min.y) * value / 10;
				//将柱条高度与盖子高度进行比较
				if (height / 2 > cap.position.y) {
					cap.position.y = height / 2;
				} else {
					cap.position.y -= 0.02;
				};
			}
		};

		requestAnimationFrame(this.animateScene);
		this.renderer.render(this.scene, this.camera);
		if (this.controls !== null && typeof this.controls !== 'undefined') {
			this.controls.update();
		}
	}
	/**
	 * 创建一个五角星
	 */
	createPentagram() {
		//创建线条的材质
		const material = new THREE.LineBasicMaterial({
			color: 0x880E4F,
			lineWidth: 2,
			linecap: 'round', //ignored by WebGLRenderer
			linejoin: 'round' //ignored by WebGLRenderer
		});
		//创建线条形状
		const geometry = new THREE.Geometry();
		var Base = { x: 0, y: 0 };
		var radius = 4;
		for (let i = 1; i <= 6; ++i) {
			var th = i * 4 * Math.PI / 5;
			var x = Base.x + radius * Math.sin(th);
			var y = Base.y + radius - radius * Math.cos(th);
			geometry.vertices.push(new THREE.Vector3(x, y, 0));
		}
		const line = new THREE.Line(geometry, material);
		this.scene.add(line);
	}
	/**
	 * 创建圆形
	 */
	createCircle() {
		var geometry = new THREE.CircleGeometry(5, 24);
		var material = new THREE.MeshBasicMaterial({ color: 0x009AD9 });
		var circle = new THREE.Mesh(geometry, material);
		circle.position.y = 5;
		this.scene.add(circle);
	}

	createShapes() {
		var heartShape = new THREE.Shape();

		heartShape.moveTo(0, 0);
		heartShape.bezierCurveTo(2.5, 2.5, 2.0, 0, 0, 0);
		heartShape.bezierCurveTo(3.0, 0, 3.0, 3.5, 3.0, 3.5);
		heartShape.bezierCurveTo(3.0, 5.5, 1.0, 7.7, 2.5, 9.5);
		heartShape.bezierCurveTo(6.0, 7.7, 8.0, 5.5, 8.0, 3.5);
		heartShape.bezierCurveTo(8.0, 3.5, 8.0, 0, 5.0, 0);
		heartShape.bezierCurveTo(3.5, 0, 2.5, 2.5, 2.5, 2.5);

		var extrudeSettings = { amount: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

		var geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

		var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial());
		this.scene.add(mesh);

	}
	render() {
		return (
			<div ref={this.rootElement} />
		);
	}
}
