import { getRandomColor, objects } from "./graphics.js";
import { synthConfig } from "./synthConfig.js";

// SECTION 1: ADD MUSIC BUTTON !

let part, synth, loopNotes; // define global letiables

let button = document.getElementById("start-button"); // find the button by its id (specified in the HTML)
button.addEventListener("click", startSequencer); // when u click it, run startSequencer function

function startSequencer() {
  // set our synth letiable. 
  // synthConfig lives in synthConfig.js: check it out and play with some of the values!
  synth = new Tone.DuoSynth(synthConfig).toDestination();
  synth.triggerAttackRelease('C2', "4n")

  part = new Tone.Part(runSequenceStep, loopNotes).start(0);
  part.loop = Infinity;
  Tone.Transport.bpm.value = 70;
  Tone.Transport.start();
}

// SECTION 2: SETUP OUR LOOP!

loopNotes = [
  // time is in Bars:Beats:Sixteenths
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

function runSequenceStep(time, value) {
  let currentStep = Math.round((part ? part.progress : 0) * 16);

  applyMusicToGraphics(currentStep)

  //actually play the note!
  synth.triggerAttackRelease(value.note, "32n", time, value.velocity);
}


// SECTION 3: APPLY MUSIC TO THE GRAPHICS WE CREATED!
function applyMusicToGraphics(currentStep){
  for (let i = 0; i < objects.length; i += 1) {
    if (i === currentStep) {
      // makes the object corresponding to the current step get bigger!
      objects[i].scale.set(1.5, 1.5, 1.5);
    } else {
      objects[i].scale.set(1, 1, 1);
    }

    if (currentStep === 0) {
      // we're at the beginning of the musical loop!
      objects[i].scale.set(2, 2, 2);
      objects[i].material.color.set(getRandomColor());
      setRandomNote(i);
    }
  }
}

function setRandomNote(objectIndex) {
  let octave = 2 + (objectIndex % 16) / 4;

  part.at(`0:0:${objectIndex}`, {
    time: `0:0:${objectIndex}`,
    note: getRandomNote(octave),
    velocity: Math.random(),
  });
}

function getRandomNote(octave) {
  let pitchClasses = ["C", "D", "E", "F#", "G", "A", "B"];
  let randomPitchClassIndex = Math.floor(Math.random() * pitchClasses.length);
  let randomPitchClass = pitchClasses[randomPitchClassIndex];
  let randomNote = `${randomPitchClass}${octave}`;
  return randomNote;
}