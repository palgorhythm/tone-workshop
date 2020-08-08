import * as THREE from "https://unpkg.com/three@0.119.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js";

var scene, camera, renderer, controls;
init();
// var cube = createCube()
// createObject([-4, 0, 0])
// when we call animate, it runs 60 times per second (by default),
//  which allows us to see the sequence of rendered images as an animation.
var objects = createManyRandomObjects();
var rotations = [];
for (var i = 0; i < objects.length; i += 1) {
  rotations.push([
    Math.random() * 0.03,
    Math.random() * 0.03,
    Math.random() * 0.03,
  ]);
}
animate();

// SECTION 1: CREATING THE SCENE
function init() {
  scene = new THREE.Scene(); // holds all of our geometric objects we create. we render the scene.
  // configure the camera to view the 3D scene.
  camera = new THREE.PerspectiveCamera(
    75, // field of view, in degrees
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping plane (configures how close objects need to be to the camera to disappear)
    1000 // far clipping plane (configures how far objects need to be from the camera to disappear)
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer(); // create the graphics renderer
  renderer.setSize(window.innerWidth, window.innerHeight); // make it as big as the html body element
  document.body.appendChild(renderer.domElement); // draw the renderer's canvas HTML element on the screen!

  // allow us to control the camera position with the mouse
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, -10);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 3;
}

// SECTION 2: CREATING AN OBJECT
function createCube(color = "#00FFAA") {
  var geometry = new THREE.BoxGeometry();
  var material = new THREE.MeshBasicMaterial({ color });
  var newCube = new THREE.Mesh(geometry, material);
  scene.add(newCube);

  return newCube;
}

// SECTION 3: ANIMATING!
function animate() {
  requestAnimationFrame(animate);

  controls.update(); // update the position of the camera based on mouse movement

  for (var i = 0; i < objects.length; i += 1) {
    objects[i].rotation.x += rotations[i][0];
    objects[i].rotation.y += rotations[i][1];
    objects[i].rotation.z += rotations[i][2];
  }

  renderer.render(scene, camera);
}

// SECTION 4: CREATE FUNCTIONS TO GET RANDOM COLORS/SHAPES
function getRandomColor() {
  var colors = [
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
  var randomIndex = Math.round(Math.random() * colors.length);
  return colors[randomIndex];
}

function createRandomGeometry() {
  var geometries = [
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
  var chosenGeometryIndex = Math.floor(Math.random() * geometries.length);
  var chosenGeometry = geometries[chosenGeometryIndex];
  return new chosenGeometry();
}

// SECTION 5: CREATE RANDOM OBJECTS
function createObject(position) {
  var geometry = createRandomGeometry();
  var position = position || [0, 0, 0];

  var material = new THREE.MeshBasicMaterial({ color: getRandomColor() });
  material.wireframe = true;
  var newObject = new THREE.Mesh(geometry, material);
  newObject.position.set(...position);

  scene.add(newObject);

  return newObject;
}

// SECTION 6: CREATE MANY OBJECTS
function createManyRandomObjects() {
  var width = 2.5;
  var height = 5;
  var depth = 4.5;
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

var part, synth, loopNotes;

function loop(time, value) {
  var currentStep = Math.round((part ? part.progress : 0) * 16);

  for (var i = 0; i < objects.length; i += 1) {
    if (i === currentStep) {
      objects[i].scale.set(1.5, 1.5, 1.5);
    } else {
      objects[i].scale.set(1, 1, 1);
    }

    if (currentStep === 0) {
      // we're at the beginning of the loop!
      objects[i].material.color.set(getRandomColor());
      var octave = 2 + (i % 16) / 4;
      // part.at(`0:0:${i}`, {"time" : `0:0:${i}`, "note" : getRandomNote(octave), "velocity": Math.random()});
    }
  }
  //the value is an object which contains both the note and the velocity
  synth.triggerAttackRelease(value.note, "32n", time, value.velocity);
}

function getRandomNote(octave) {
  var pitchClasses = ["C", "D", "E", "F#", "G", "A", "B"];
  var randomPitchClassIndex = Math.floor(Math.random() * pitchClasses.length);
  var randomPitchClass = pitchClasses[randomPitchClassIndex];
  // var randomOctave = 1 + Math.ceil(Math.random()*4)
  var randomNote = `${randomPitchClass}${octave}`;
  return randomNote;
}

var loopNotes = [
  { time: "0:0:0", note: "C2", velocity: 1.0 },
  { time: "0:0:1", note: "E4", velocity: 0.6 },
  { time: "0:0:2", note: "G4", velocity: 0.7 },
  { time: "0:0:3", note: "B4", velocity: 0.8 },
  { time: "0:0:4", note: "D5", velocity: 0.9 },
  { time: "0:0:5", note: "A4", velocity: 0.6 },
  { time: "0:0:6", note: "B4", velocity: 0.3 },
  { time: "0:0:7", note: "D4", velocity: 0.4 },
  { time: "0:0:8", note: "C4", velocity: 0.8 },
  { time: "0:0:9", note: "E4", velocity: 0.5 },
  { time: "0:0:10", note: "G4", velocity: 0.2 },
  { time: "0:0:11", note: "B4", velocity: 0.7 },
  { time: "0:0:12", note: "D5", velocity: 0.9 },
  { time: "0:0:13", note: "F#5", velocity: 0.2 },
  { time: "0:0:14", note: "B4", velocity: 0.3 },
  { time: "0:0:15", note: "G4", velocity: 0.4 },
];
var button = document.getElementById("start-button");
button.addEventListener("click", onButtonClick);

var voice0 = {
  volume: -20,
  portamento: 50,
  oscillator: {
    type: "sine",
  },
  filterEnvelope: {
    attack: 0.01,
    decay: 0,
    sustain: 0.5,
    release: 0.2,
  },
  envelope: {
    attack: 0.01,
    decay: 0,
    sustain: 0.5,
    release: 0.2,
  },
};
var voice1 = {
  volume: -20,
  portamento: 100,
  oscillator: {
    type: "sawtooth",
  },
  filterEnvelope: {
    attack: 0.01,
    decay: 0,
    sustain: 0.5,
    release: 0.2,
  },
  envelope: {
    attack: 0.01,
    decay: 0,
    sustain: 0.5,
    release: 0.2,
  },
};
var synthOptions = {
  vibratoAmount: 0.5,
  vibratoRate: 5,
  harmonicity: 1,
  voice0,
  voice1,
};

function onButtonClick(event) {
  synth = new Tone.DuoSynth(synthOptions).toDestination();
  part = new Tone.Part(loop, loopNotes).start(0);
  part.loop = Infinity;
  Tone.Transport.bpm.value = 60;
  Tone.Transport.start();
}