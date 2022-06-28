import * as THREE from '/node_modules/three/build/three.module.js';
import vShader from '/shaders/vertex.glsl.js';
import fShader from '/shaders/fragment.glsl.js';

const mod = document.querySelector('.three');
const sizes = {
  h: mod.getBoundingClientRect().height,
  w: mod.getBoundingClientRect().width,
};
const camera = new THREE.PerspectiveCamera(75, sizes.w / sizes.h, 0.1, 1000);
camera.position.set(0, 30, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd0d0d0);

const renderer = new THREE.WebGLRenderer({
  antialias: false,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.w, sizes.h);
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
document.querySelector('.three').appendChild(renderer.domElement);

window.addEventListener('resize', function () {
  sizes.w = mod.getBoundingClientRect().width;
  sizes.h = mod.getBoundingClientRect().height;

  camera.aspect = sizes.w / sizes.h;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.w, sizes.h);
});

const ambLight = new THREE.AmbientLight(0xecdfdf, 4);

const spotLight = new THREE.SpotLight(0xecdfdf, 10);
spotLight.position.set(0, 100, 0);

scene.add(spotLight);

const box = new THREE.BoxGeometry(10, 20, 10);
const bigBox = new THREE.BoxGeometry(30, 30, 30);

const mat = new THREE.MeshLambertMaterial({
  color: 0x03c6fc,
});
mat.side = THREE.DoubleSide;

////SHADER MATERIAL///
const uniforms = {
  u_resolution: { value: { x: sizes.w, y: sizes.h } },
  u_time: { value: 0.0 },
  u_var: { value: 0.5 },
};
const shaderMat = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: vShader,
  fragmentShader: fShader,
});

////OBJECTS///
const room = new THREE.Mesh(bigBox, shaderMat);
room.receiveShadow = true;
room.position.set(0, 0, 0);
const mesh = new THREE.Mesh(box, shaderMat);
mesh.castShadow = true;
mesh.position.set(0, 0, 0);

scene.add(room);

const clock = new THREE.Clock();
const animate = () => {
  // mesh.rotation.x += 0.01;
  // camera.lookAt(scene.position);
  renderer.autoClear = false;
  renderer.clear();
  renderer.render(scene, camera);
  uniforms.u_var.value = shaderVar;
  uniforms.u_time.value = clock.getElapsedTime() * 0.2;

  // Call tick again on the next frame
  window.requestAnimationFrame(animate);
};

animate();
