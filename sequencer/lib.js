import * as THREE from "https://unpkg.com/three@0.119.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js";

export function init() {
  let scene = new THREE.Scene(); // holds all of our geometric objects we create. we render the scene.
  // configure the camera to view the 3D scene.
  let camera = new THREE.PerspectiveCamera(
    75, // field of view, in degrees
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping plane (configures how close objects need to be to the camera to disappear)
    1000 // far clipping plane (configures how far objects need to be from the camera to disappear)
  );
  camera.position.z = 5;

  let renderer = new THREE.WebGLRenderer(); // create the graphics renderer
  renderer.setSize(window.innerWidth, window.innerHeight); // make it as big as the html body element
  document.body.appendChild(renderer.domElement); // draw the renderer's canvas HTML element on the screen!

  // allow us to control the camera position with the mouse
  let controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, -10);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 3;

  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  window.addEventListener('resize', onWindowResize, false );

  return {scene, camera, renderer, controls}
}

