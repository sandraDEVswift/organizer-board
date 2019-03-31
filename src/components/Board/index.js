import React, { Component } from 'react';
import Modal from '.././Modal';
import {BoardNode} from '.././OtherComponent';


//list of boards
export default class Board extends Component {
    constructor(props) {
      super(props) 
    }

    componentDidMount() {
      const children  = this.props;
      console.log(children.dimensions)
    }
    componentDidUpdate() {
      const children  = this.props;
      console.log(children.dimensions)
    }
    render() {
      let title = (this.props.board.title).toUpperCase()
      const children  = this.props;
      const height = '"' + children.height + 'px"'
      console.log(height)
  
      return(
        <div className="col-sm-4 margin40">
          <div className={`options ${this.display}`} onClick={() => this.delete(this.boardId, this.itemId)}>
            <button className="btn btn-link trash" >
              <i class="fa fa-times-circle" aria-hidden="true"></i>
            </button>
          </div>
       
        <Modal 
        board={this.props.board} 
        boardId={this.props.boardId} 
        add={this.props.add}
        handleColorSelection={this.props.handleColorSelection} 
        colorSelection={this.props.colorSelection}
        delete={this.props.delete}
        deleteBoard={this.props.deleteBoard}
        update={this.props.update}
        display={this.props.display} 
        />
  
        <div className="board" data-toggle="modal" data-target={`#item${this.props.boardId}`} style={{height: '330px'}}>
        <br />
          <div className="container">
            <h5>{title}</h5>
                  <div className="row">
                    <BoardNode notes={this.props.board.notes} /> 
                  </div>
                </div>
            </div>
         </div>
  
      )
    }
  }
  