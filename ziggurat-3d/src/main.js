import { buildZiggurat } from "./ziggurat.js";
import { setupUI } from "./ui.js";
import { setupControls, updateControls, activeCamera } from "./controls.js";
import { TWEEN } from "./tween.js";

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById("canvas3d") });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0f15);
scene.fog = new THREE.FogExp2(0x05070a, 0.0025);

const { orbitCamera, fpCamera } = setupControls(renderer, scene);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(50,80,50);
dirLight.castShadow = true;
scene.add(dirLight);
scene.add(new THREE.HemisphereLight(0x8888ff, 0x222222, 0.3));

const ground = new THREE.Mesh(new THREE.PlaneGeometry(400,400), new THREE.MeshStandardMaterial({ color:0x11120f }));
ground.rotation.x = -Math.PI/2;
ground.receiveShadow = true;
scene.add(ground);

const ziggurat = buildZiggurat(scene);
setupUI(scene, ziggurat);

window.addEventListener("resize", ()=>{
  renderer.setSize(window.innerWidth, window.innerHeight);
  orbitCamera.aspect = fpCamera.aspect = window.innerWidth/window.innerHeight;
  orbitCamera.updateProjectionMatrix(); fpCamera.updateProjectionMatrix();
});

const clock = new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);
  updateControls(clock.getDelta());
  TWEEN.update(performance.now());
  renderer.render(scene, activeCamera());
}
animate();
