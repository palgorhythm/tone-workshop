import * as Tone from "tone";

var synth = null

var scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

for (var i  = 0; i < scale.length; i ++){
  var currentNote = scale[i]
  var button = document.createElement('button')
  createButtonHandler(button, currentNote)
}


function createButtonHandler(button, note, octave = 4)  {
  function handler() {
    console.log(`clicked the ${note} button!`)
    if(!synth){
      synth = new Tone.Synth().toMaster(); 
    }
    synth.triggerAttackRelease(`${note}${octave}`, "8n");
  }
  button.addEventListener('click', handler)
  console.log(button)
}