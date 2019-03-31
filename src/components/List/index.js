import React, { Component } from 'react';
import Modal from '.././Modal';
import {BoardNode} from '.././OtherComponent';

//list of boards
export default class Board extends Component {
    constructor(props) {
      super(props)
      
    }
    render() {
        
      let title = (this.props.board.title).toUpperCase()
      return(
        <Modal 
        board={this.props.board} 
        boardId={this.props.boardId} 
        add={this.props.add}
        handleColorSelection={this.props.handleColorSelection} 
        colorSelection={this.props.colorSelection}
        delete={this.props.delete}
        deleteBoard={this.props.deleteBoard}
        update={this.props.update}
        display={this.props.display} />

      
      )
    }
  }
  