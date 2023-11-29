import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  state = initialState

  canMoveUp = () => {
    return this.state.index - 3 >= 0 ; 
  }

  canMoveDown = () => {
    return this.state.index + 3 <= 8 ; 
  }

  canMoveLeft = () => {
    // return this.state.index !== 0 && this.state.index !== 3 && this.state.index !== 6;
    return this.state.index % 3 !== 0 ;
  }
  canMoveRight = () => {
    return this.state.index % 3 !== 2 ;
  }

  moveUp = () => {
    if(!this.canMoveUp()){
      this.setState({message: `You can't go up`});
      return;
    }
    this.setState({index: this.state.index - 3, message: '', steps: this.state.steps +1})
  }

  moveDown = () => {
    if(!this.canMoveDown()){
      this.setState({message: `You can't go down`});
      return;
    }
    this.setState({index: this.state.index + 3, message: '', steps: this.state.steps +1})
  }

  moveLeft = () => {
    if(!this.canMoveLeft()){
      this.setState({message: "You can't go left" }) ; 
      return;
    }
    this.setState({index: this.state.index -1, message: '', steps: this.state.steps +1})
  }

  moveRight = () => {
    if(!this.canMoveRight()){
      this.setState({message: "You can't go right" }) ; 
      return;
    }
    this.setState({index: this.state.index +1, message: '', steps: this.state.steps +1})
  }


  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getY = () => {
    return Math.floor(this.state.index / 3 ) + 1;
  }
  getX = () => {
    return (this.state.index % 3) + 1;
  }

  getXY = () => {
    // const coordinates = ['1,1', '1,2', '1,3', '2,1', '2,2', '2,3', '3,1', '3,2', '3,3'] ;
    // return coordinates[this.state.index]
    return `${ this.getX() }, ${ this.getY() }`
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    this.setState(initialState)
    // Use this helper to reset all states to their initial values.
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState( {email: evt.target.value })
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    // console.log('testing')
    axios.post('http://localhost:9000/api/result', { x: this.getX(), y: this.getY(), steps: this.state.steps, email: this.state.email } )
    .then(res => {
      // console.log( res )
      this.setState( { message: res.data.message, email: '' } )
    }).catch(err => {
      // console.error( err )
      this.setState( { message: err.response.data.message, email: '' } );
    })
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.getXY()})</h3>
          <h3 id="steps">{ this.state.steps === 1 ? `You moved 1 time` : `You moved ${this.state.steps} times`}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message" >{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.moveLeft}>LEFT</button>
          <button id="up" onClick={this.moveUp}>UP</button>
          <button id="right" onClick={this.moveRight}>RIGHT</button>
          <button id="down" onClick={this.moveDown}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit" ></input>
        </form>
      </div>
    )
  }
}
