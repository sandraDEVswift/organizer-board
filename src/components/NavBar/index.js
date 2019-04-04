import React, { Component } from 'react';


class Dropdown extends Component {
    updateSettings(input) {
    this.props.updateSettings(input)
    }

    render() {
      return( 
        <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Settings
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="#" onClick={this.updateSettings('stickies')}>Stickies</a>
            <a className="dropdown-item" href="#" onClick={this.updateSettings('cards')}>Cards</a>
          </div>
        </li>
      </ul>
      )
    }
}
export default class Navbar extends Component {
    constructor(props) {
      super(props)
      this.addBoard = this.addBoard.bind(this)
    }
  
    addBoard() {
      this.props.addBoard()
    }
    updateSettings(input) {
      
    }
  
    render() { 
      return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a className="btn btn-dark" href="#" onClick={() => {this.addBoard()}}>+</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            {/* <Dropdown updateSettings={this.updateSettings}/> */}
        </div>
      </nav>
      )
    }
  }