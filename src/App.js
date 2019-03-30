import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class StickyNote extends Component {
   
  constructor(props) {
    super(props)
    this.onDisplay = this.onDisplay.bind(this)
    this.display = this.props.sticky.visibility ? 'display' : ''
    this.itemId = this.props.itemId
    this.boardId = this.props.boardId
  }
  
  onDisplay(toggle, itemId, boardId) {
    console.log(toggle, itemId, boardId)
    this.props.show(toggle, itemId, boardId)
    this.display = this.props.sticky.visibility ? 'display' : ''
  }
  
  delete(boardId, itemId) {
    this.props.delete(boardId, itemId)
  }

  render() {
    return(
      <div className="col-sm-4 margin10"
      onMouseEnter={() => this.onDisplay(true, this.boardId, this.itemId)}
      onMouseLeave={() => this.onDisplay(false, this.boardId, this.itemId)} >
          <div className= {`quote-container sticky big yellow item ${this.props.sticky.color} ${this.props.sticky.rotate }`} >
  
                  <blockquote>
                     {this.props.sticky.text}
                    <cite className="author">Albert Einstein</cite>
                  </blockquote>
  
                  <div className={`options ${this.display}`} onClick={() => this.delete(this.boardId, this.itemId)}>
                        <button className="btn btn-link trash" >
                          <i class="fa fa-times-circle" aria-hidden="true"></i>
                        </button>
                  </div>
                </div>
        </div>         
  )
} 
}

//1 dot representing a sticky note on the board
class StickyNode extends Component {
  render() {
    return(
    <div className="col-sm-4">
      <br />
      <div className={`little-note sticky ${this.props.note.color} ${this.props.note.rotate }`}>
          <blockquote className="font10">
             {this.props.note.text}
             
          </blockquote>
      </div>
    </div>
    )
  }
}


//1 board on the list
class BoardNode extends Component {
    render() {
      return(
        this.props.notes.map((note, item) => {
          return <StickyNode note={note} key={item} />
      })  
    )
  }
}

class Modal extends Component {

  constructor(props) {
    super(props)
  }
 
  add(note, id, color) {
    if (note != "") {
      this.props.add(note, id, color)
      this.refs.note.value = ""
    } else {

    }
  }

  deleteBoard(id) {
    this.props.deleteBoard(id)
  }

  handleColorSelection(event) {
    this.props.handleColorSelection(event.target.value)
  }

  checkButton(event) {
    console.log('color selection '+ event.target.value)
    event.target.checked = event.target.value === this.props.colorSelection
  }

  render() {
    const stickiesList = this.props.board.notes.map((sticky, index) => {
        return <StickyNote 
        boardId={this.props.boardId}
        sticky={sticky} 
        key={index} 
        itemId={index}
        show={this.props.display} 
        delete={this.props.delete}
        /> 
    })
  
  return(
      
    <div className="modal fade" id={`item${this.props.boardId}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{this.props.board.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
                  <div className="container-fluid">
                          <br />
                          <div className="row">
                                {stickiesList} 
                           </div>
                           <br />
                    </div>
          </div>
          <div className="modal-footer" id="mdl-footer">
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-sm-12">
                          
                          <div className="form-group">
                              <input type="text" className="form-control form-control-lg" id="input" aria-describedby="emailHelp" autofocus placeholder="New Note" ref="note"/>
                              <small id="emailHelp" className="form-text text-muted">add text for new sticky note here</small>
                          </div>  
                      </div>

                      <div className="col-sm-12">
                          <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" ref="color" name="inlineRadioOptions" id="inlineRadio1" value="pink" onChange={(e) => this.handleColorSelection(e)} onEnter={(e) => this.checkButton(e)} defaultChecked={this.props.colorSelection === 'pink'} />
                              <label className="form-check-label radioBtncolor pink" for="inlineRadio1"></label>
                              </div>
                              <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" ref="color" name="inlineRadioOptions" id="inlineRadio2" value="blue" onChange={(e) => this.handleColorSelection(e)}  onEnter={(e) => this.checkButton(e)} checked={this.props.colorSelection === 'blue'} />
                              <label className="form-check-label radioBtncolor blue" for="inlineRadio2"></label>
                              </div>
                              <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" ref="color" name="inlineRadioOptions" id="inlineRadio3" value="orange" onChange={(e) => this.handleColorSelection(e)}  onEnter={(e) => this.checkButton(e)} checked={this.props.colorSelection === 'orange' } />
                              <label className="form-check-label radioBtncolor orange" for="inlineRadio3"></label>
                          </div>
                      </div>
                  </div>
                  <div className="float-right">
                      <button type="button" className="btn btn-success add btn-lg" onClick={() => {this.add(this.refs.note.value, this.props.boardId)}}>Add</button> &nbsp;
                      <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal" onClick={() => {this.deleteBoard(this.props.boardId)}}>Delete</button> 
                  </div>
          </div>
          </div>
        </div>
      </div>
     </div>
    
    )
  }
}

//list of boards
class Board extends Component {
  constructor(props) {
    super(props)
    
  }
  render() {
    let title = (this.props.board.title).toUpperCase()
    return(
      <div className="col-sm-4 margin10" >
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
      display={this.props.display} />

      <div className="board" data-toggle="modal" data-target={`#item${this.props.boardId}`}>
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

class DashBoard extends Component {
  
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

class Navbar extends Component {
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

class App extends Component {

  constructor(props) {
    super(props)

    this.rotate = {
      three: 'ThreeDegBackwards',
      four: 'FourDeg',
      five : 'FiveDeg'
    }

    this.state = {
      data: [
          {title: 'board 1',
            notes: [
            {text: 'note 1', color: 'pink', rotate: this.rotate.five, visibility: false},
            {text: 'note 2', color: 'pink', rotate: this.rotate.four, visibility: false},
            {text: 'note 3', color: 'blue', rotate: this.rotate.five, visibility: false}
          ]}, 
          {title: 'board 2', 
            notes: [
            {text: 'note 1', color: 'pink', rotate: this.rotate.three, visibility: false},
            {text: 'note 2', color: 'blue', rotate: this.rotate.four, visibility: false},
            {text: 'note 3', color: 'pink', rotate: this.rotate.three, visibility: false},
            {text: 'note 3', color: 'yellow', rotate: this.rotate.five, visibility: false},
          ]},
          {title: 'board 3',
            notes: [
            {text: 'note 1', color: 'blue', rotate: this.rotate.four, visibility: false},
            {text: 'note 2', color: 'blue', rotate: this.rotate.five, visibility: false},
            {text: 'note 3', color: 'yellow', rotate: this.rotate.three, visibility: false}
          ]},
          {title: 'board 4', 
            notes: [
            {text: 'note 1', color: 'blue', rotate: this.rotate.five, visibility: false},
            {text: 'note 2', color: 'yellow', rotate: this.rotate.five, visibility: false},
            {text: 'note 3', color: 'blue', rotate: this.rotate.five, visibility: false}, 
            {text: 'note 4', color: 'pink', rotate: this.rotate.five, visibility: false}, 
            {text: 'note 5', color: 'pink', rotate: this.rotate.five, visibility: false}
          ]},
      ],
      selectedOption: 'pink'
    }

    this.add = this.add.bind(this)
    this.display = this.display.bind(this)
    this.delete = this.delete.bind(this)
    this.addBoard = this.addBoard.bind(this)
    this.deleteBoard = this.deleteBoard.bind(this)
    this.handleColorSelection = this.handleColorSelection.bind(this)
  }

handleColorSelection(color) {
  this.setState({
    selectedOption: color
  });
  console.log('color selected: ' + color)
}

get(id) {
  this.state.data.forEach((board) => {
    if (board.title == id) {
      return board
    }
  });
}

add(note, id) {
  const rotates = Object.values(this.rotate).map(val  => {return val})
  let rotate = rotates[Math.floor(Math.random() * rotates.length)]
  console.log(id)
  this.state.data[id].notes.push({text: note, color: this.state.selectedOption, rotate: rotate, visibility: false})
  this.setState({
    data : this.state.data
  });
}

addBoard() {
  let board = {title:'board', notes: []}
  this.state.data.push(board)
  this.setState({
    data : this.state.data
  });
}

deleteBoard(id) {
  if (this.state.data[id].notes.length > 0) {
    if (window.confirm('the board is not empty. Are you sure you want to delete it')) {
      this.state.data.splice(id, 1)
    }
  } else {
    this.state.data.splice(id, 1)
  }
 
  this.setState({
    data : this.state.data
  });
}

display(toggle, boardId, itemId) {
  let board = this.state.data[boardId]
  let item = board.notes[itemId]
  item.visibility = toggle
  this.setState({
    data : this.state.data
  });
}


delete(boardId, itemId) {
  let board = this.state.data[boardId]
  board.notes.splice(itemId, 1)
  this.setState({
    data : this.state.data
  });
}

render() {
  return (
    <div>
      <Navbar addBoard={this.addBoard} />
      <br /> <br />
      <DashBoard 
      boards={this.state.data} 
      add={this.add} 
      delete={this.delete}
      deleteBoard={this.deleteBoard}
      display={this.display}
      colorSelection={this.state.selectedOption}
      handleColorSelection={this.handleColorSelection}/>
    </div>
  );
}
}

export default App;
