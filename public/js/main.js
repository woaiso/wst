var renderer, scene, camera, composer, circle, skelet, particle;
window.onload = function() {
    init();
    animate();
}
function init() {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    document.getElementById('canvas').appendChild(renderer.domElement);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,1,1000);
    camera.position.z = 800;
    scene.add(camera);

    var gridHelper = new THREE.GridHelper(400,40,0x42CBF8,0x42CBF8);
    gridHelper.position.y = -150;
    gridHelper.position.x = -100;
    scene.add(gridHelper);
    window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
    // requestAnimationFrame(animate);

    // gridHelper.position.x -= 1;
    // gridHelper.position.y += 1;
    // renderer.clear();
    renderer.render(scene, camera)
}
