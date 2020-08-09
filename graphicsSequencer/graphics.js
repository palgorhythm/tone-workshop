import * as THREE from "https://unpkg.com/three@0.119.1/build/three.module.js";
import { init } from "./lib.js";

// SECTION 1: CREATING THE SCENE
let { scene, camera, renderer, controls } = init();

// SECTION 2: CREATING AN OBJECT
function createCube(color = "#00FFAA") {
  // create a geometry, a material, and then make the mesh out of those two components.
  let geometry = new THREE.BoxGeometry();
  let material = new THREE.MeshBasicMaterial({ color });
  let newCube = new THREE.Mesh(geometry, material);

  // you must also add it to the scene
  scene.add(newCube);

  return newCube;
}

// SECTION 3: ANIMATING!
function animate() {
  // tells the browser to call this function every time it wants to paint a new frame
  requestAnimationFrame(animate);

  controls.update(); // update the position of the camera based on mouse movement

  // // rotate all objects by their custom rotation amounts
  updateRotationsOfObjects()

  // tell the ThreeJS renderer what scene to render, and with what camera
  renderer.render(scene, camera);
}

// create a cube
// let cube = createCube();
export let objects = createManyRandomObjects();
let rotations = [];
// loop from 0 all the way to 15 (bc we have 16 objects)
for (let i = 0; i < objects.length; i += 1) {
  // create a random x, y, and z rotation for the current object.
  rotations.push([
    Math.random() * 0.03,
    Math.random() * 0.03,
    Math.random() * 0.03,
  ]);
}

animate();


// SECTION 4: CREATE FUNCTIONS TO GET RANDOM COLORS/SHAPES
export function getRandomColor() {
  let colors = [
    "#ffadad",
    "#ffd6a5",
    "#fdffb6",
    "#caffbf",
    "#9bf6ff",
    "#a0c4ff",
    "#bdb2ff",
    "#ffc6ff",
    "#007BFF",
    "#FFAAEE",
    "#B7BB4E",
    "#FBBFAA",
    "#00D2E0",
    "#BBFFAA",
    "#FFAA44",
    "#55AA55",
    "#FF6437",
  ];
  let randomIndex = Math.round(Math.random() * colors.length);
  return colors[randomIndex];
}

function createRandomGeometry() {
  let geometries = [
    THREE.BoxGeometry,
    THREE.CircleGeometry,
    THREE.ConeGeometry,
    THREE.CylinderGeometry,
    THREE.DodecahedronGeometry,
    THREE.IcosahedronGeometry,
    THREE.OctahedronGeometry,
    THREE.SphereGeometry,
    THREE.TetrahedronGeometry,
    THREE.TorusGeometry,
    THREE.TorusKnotGeometry,
  ];
  let chosenGeometryIndex = Math.floor(Math.random() * geometries.length);
  let chosenGeometry = geometries[chosenGeometryIndex];
  return new chosenGeometry();
}

// SECTION 5: CREATE RANDOM OBJECTS
function createObject(position) {
  let geometry = createRandomGeometry();

  let material = new THREE.MeshBasicMaterial({ color: getRandomColor() });
  material.wireframe = true; // just the edges!

  let newObject = new THREE.Mesh(geometry, material);
  newObject.position.set(position[0], position[1], position[2]);

  scene.add(newObject);

  return newObject;
}

// createObject([-4, 0, 0]);

// SECTION 6: CREATE MANY OBJECTS
function createManyRandomObjects() {
  // these numbers were found thru experimentation- not an exact science!
  let width = 2.5;
  let height = 5;
  let depth = 4.5;
  return [
    createObject([-width * 3, height, -depth]),
    createObject([-width, height, -depth]),
    createObject([width, height, -depth]),
    createObject([width * 3, height, -depth]),

    createObject([-width * 3, height / 3, -depth]),
    createObject([-width, height / 3, -depth]),
    createObject([width, height / 3, -depth]),
    createObject([width * 3, height / 3, -depth]),

    createObject([-width * 3, -height / 3, -depth]),
    createObject([-width, -height / 3, -depth]),
    createObject([width, -height / 3, -depth]),
    createObject([width * 3, -height / 3, -depth]),

    createObject([-width * 3, -height, -depth]),
    createObject([-width, -height, -depth]),
    createObject([width, -height, -depth]),
    createObject([width * 3, -height, -depth]),
  ];
}

function updateRotationsOfObjects() {
  // call this function inside animate, and it will update the rotations of all objects
  // by their custom rotation amounts.
  if (!objects) {
    return;
  }
  for (let i = 0; i < objects.length; i += 1) {
    objects[i].rotation.x += rotations[i][0];
    objects[i].rotation.y += rotations[i][1];
    objects[i].rotation.z += rotations[i][2];
  }
}