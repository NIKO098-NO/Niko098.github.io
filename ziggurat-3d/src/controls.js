export function setupControls(renderer, scene){
  const orbitCamera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
  orbitCamera.position.set(40,40,40);
  const fpCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  fpCamera.position.set(0,5,0);
  return { orbitCamera, fpCamera };
}
export function updateControls(dt){} 
export function activeCamera(){ return new THREE.PerspectiveCamera(); }