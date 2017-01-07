/**
 * 创建一个天空
 */
import * as THREE from 'three';

const nx = require('./textures/skybox/nx.jpg');
const ny = require('./textures/skybox/ny.jpg');
const nz = require('./textures/skybox/nz.jpg');
const px = require('./textures/skybox/px.jpg');
const py = require('./textures/skybox/py.jpg');
const pz = require('./textures/skybox/pz.jpg');


export function createSky(scene: any) {
	const light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	scene.add( light );
	// REFLECTION MAP
	var urls = [
		px, nx, py, ny, pz, nz
	];
	const textureCube = new THREE.CubeTextureLoader().load(urls);
	scene.background = textureCube;
}




