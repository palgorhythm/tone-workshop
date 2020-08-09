let synth = null

let scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

for (let i  = 0; i < scale.length; i ++){
  // get the current note of the scale
  let currentNote = scale[i]
  
  // create a button element
  let button = document.createElement('button')

  // set the text of the button
  button.innerHTML = currentNote

  // create a handler for button presses
  let buttonHandler = createButtonHandler(currentNote)
  // make the handler run when you click the button
  button.addEventListener('click', buttonHandler)

  // actually draw the button onto the page
  document.body.appendChild(button);
}


// output a function that we call every time a button is clicked
function createButtonHandler(note, octave = 4)  {
  function handler () {
    console.log(`clicked the ${note} button!`)
    if(!synth){
      synth = new Tone.Synth().toDestination(); 
    }
    synth.triggerAttackRelease(`${note}${octave}`, "8n");
  }
  return handler
}