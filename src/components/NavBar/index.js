import React, { Component } from 'react';

export default class Navbar extends Component {
    constructor(props) {
      super(props)
      this.addBoard = this.addBoard.bind(this)
    }
  
    addBoard() {
      this.props.addBoard()
    }

    render() { 
      return(
        <div>
          <nav className="navbar navbar-right navbar-light bg-light fixed-top bg-dark">
            <a className="navbar-brand" href="#"><button onClick={() => {this.addBoard()}}>+</button></a>
          </nav>
        </div>
      )
    }
  }