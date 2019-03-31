import React, { Component } from 'react';
import Board from '.././Board';

export default class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: '', 
      heigth: ''
    }
  }

  componentDidMount() {
    this.setBoardSize()
  }

  componentDidUpdate() {
    this.setBoardSize()
  }

  setBoardSize() {
    //setting board width and height on render and component update
    const elems = document.getElementsByClassName('board')
   
    for (let elem of elems) {
      this.state.width = elem.clientWidth
      this.state.heigth = elem.clientWidth
      console.log('width: '+ elem.clientWidth + ', height: ' + elem.clientWidth);
    }
   }
    render() {
      const dimensions = {
        width: this.state.width,
        height: this.state.heigth
      };
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
        dimensions={dimensions}
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