import React, { Component } from 'react';
import Board from '.././Board';

export default class DashBoard extends Component {
  
    render() {
      const boards = this.props.boards.map((board, key) => {
        return <Board 
        board={board} 
        key={key}   
        boardId={key} 
        add={this.props.add}
        display={this.props.display}
        delete={this.props.delete}
        deleteBoard={this.props.deleteBoard}
        update={this.props.update}
        colorSelection={this.props.colorSelection}
        handleColorSelection={this.props.handleColorSelection}
        />
      })
      return(
          <div className="container-fluid">
          <br />
          <div className="row">
            <div className="col-sm-10 offset-1"> 
                <div className="row">
                  {boards}
                </div>
            </div>
          </div>
          </div>
      )
    }
  }