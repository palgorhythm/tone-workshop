var synth = null

var scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

for (var i  = 0; i < scale.length; i ++){
  // get the current note of the scale
  var currentNote = scale[i]
  
  // create a button element
  var button = document.createElement('button')

  // set the text of the button
  button.innerHTML = currentNote

  // create a handler for button presses
  var buttonHandler = createButtonHandler(currentNote)
  // make the handler run when you click the button
  button.addEventListener('click', buttonHandler)

  // actually draw the button onto the page
  document.body.appendChild(button);
}


function createButtonHandler(note, octave = 4)  {
  function handler () {
    console.log(`clicked the ${note} button!`)
    if(!synth){
      synth = new Tone.Synth().toMaster(); 
    }
    synth.triggerAttackRelease(`${note}${octave}`, "8n");
  }
  return handler
}