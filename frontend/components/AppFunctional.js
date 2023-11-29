import React, { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [ message, setMessage ] = useState( initialMessage );
  const [ email, setEmail] = useState(initialEmail); 
  const [steps, setSteps] = useState(initialSteps); 
  const [index, setIndex] = useState(initialIndex); 
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const getY = () => {
    return Math.floor(index / 3 ) + 1;
  }
  
  const getX = () => {
    return (index % 3) + 1;
  }
  
  function canMoveUp(){
    return index -3 >= 0 ;
  }
  
  function moveUp(){
    if(!canMoveUp()){
      setMessage(`You can't go up`)
      return
    }
    setSteps(steps + 1)
    setIndex(index -3)
    setMessage('')
  }
  
  function canMoveDown(){
    return index +3 <= 8 ; 
  }
  
  function moveDown(){
    if(!canMoveDown()){
      setMessage(`You can't go down`)
      return
    }
    setSteps(steps +1)
    setIndex(index +3)
    setMessage('')
  }
  
  function canMoveLeft(){
    return index % 3 !== 0 
  }

  function moveLeft(){
    if(!canMoveLeft()){
      setMessage(`You can't go left`)
      return
    }
    setSteps(steps +1)
    setIndex(index -1)
    setMessage('')
  }

  function canMoveRight(){
    return index % 3 !==2 ;
  }

  function moveRight(){
    if(!canMoveRight()){
      setMessage(`You can't go right`)
      return
    }
    setSteps(steps +1)
    setIndex(index +1)
    setMessage('')
  }

  function getXY() {
    return `${getX()}, ${getY()}`
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    setEmail(initialEmail)
    setIndex(initialIndex)
    setMessage(initialMessage)
    setSteps(initialSteps)
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    setEmail(evt.target.value)
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    evt.preventDefault();
    axios.post('http://localhost:9000/api/result', {x: getX(), y: getY(), steps: steps, email: email})
    .then(res => {
      setMessage(res.data.message)
      setEmail(initialEmail)
      setIndex(initialIndex)
      setSteps(initialSteps)
    }).catch(err => {
      setMessage(err.response.data.message)
     
    })
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({getXY()})</h3>
        <h3 id="steps">{ steps === 1 ? `You moved 1 time` : `You moved ${steps} times`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick= {moveLeft}>LEFT</button>
        <button id="up" onClick= {moveUp}>UP</button>
        <button id="right" onClick={moveRight}>RIGHT</button>
        <button id="down" onClick= {moveDown}>DOWN</button>
        <button id="reset" onClick= {reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
