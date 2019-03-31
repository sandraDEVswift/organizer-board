import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Utilities.css';

import Navbar from './components/NavBar';
import DashBoard from './components/Dashboard';
import ls from 'local-storage'

class App extends Component {

  constructor(props) {
    super(props)

    this.rotate = {
      three: 'ThreeDegBackwards',
      four: 'FourDeg',
      five : 'FiveDeg'
    }

    this.styling = {
      stickies: 'stickies', 
      cards: 'cards'
    }
    this.state = {
      dummyData: [
          {title: 'board 1',
            notes: [
            {text: 'note 1', color: 'pink', rotate: this.rotate.five, visibility: false} 
          ]}
      ],
      data: [],
      width: '', 
      heigth: '',
      selectedOption: 'pink', 
      appearance: this.styling.stickies
    }
    this.add = this.add.bind(this)
    this.display = this.display.bind(this)
    this.delete = this.delete.bind(this)
    this.addBoard = this.addBoard.bind(this)
    this.update = this.update.bind(this)
    this.deleteBoard = this.deleteBoard.bind(this)
    this.updateSettings = this.updateSettings.bind(this)
    this.handleColorSelection = this.handleColorSelection.bind(this)
  }
  componentDidMount() {
    if (this.state.data.length == 0) {
      this.setState({
        data: this.state.dummyData
      }) 
    } 
    this.setState({
      data : ls.get('data', this.state.data)
    })
    this.setBoardSize()
  }

  componentDidUpdate() {
    ls.set('data', this.state.data)
  }

  setBoardSize() {
    //setting board width and height on render and component update
    const elems = document.getElementsByClassName('board')
      for(let elem in elems) {
          for (let el in elem.item) {
            console.log('height: ' + el)
          }  
        this.setState({
          width: elem.clientHeight, 
          height: elem.clientWidth
        })
        
      }   
   }

  handleColorSelection(color) {
    this.setState({
      selectedOption: color
    });
  }

add(note, id) {
  const rotates = Object.values(this.rotate).map(val  => {return val})
  let rotate = rotates[Math.floor(Math.random() * rotates.length)]  
  //allowing a max of 9 sticky notes per board - beyond this number, the user is prompted to create a separate new board
  if (this.state.data[id].notes.length < 9) {
    this.state.data[id].notes.push({text: note, color: this.state.selectedOption, rotate: rotate, visibility: false}) 
  } else {
    if(window.confirm('you can have a maximum of 9 stickies per board - Do you want to create a new board')) {
      this.addBoard()
    }
  }
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
  this.setBoardSize()
  console.log('height: ' + this.state.heigth);
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

update(boardId, title) {
  let board = this.state.data[boardId]
  board.title = title
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

updateSettings(input) {
  const styling = {
    stickies: 'stickies', 
    cards: 'cards'
  }

  var settings = ''
  switch (input) {
    case 'stickies': settings = styling.stickies
    case 'cards': settings = styling.cards
  }
  this.state.appearance = settings
}

render() {
  
  return (
    <div>
      <Navbar 
      addBoard={this.addBoard} 
      updateSettings={this.updateSettings}
      />
      <br /> <br />
      <DashBoard 
      boards={this.state.data} 
      add={this.add} 
      delete={this.delete}
      deleteBoard={this.deleteBoard}
      update={this.update}
      display={this.display}
      colorSelection={this.state.selectedOption}
      handleColorSelection={this.handleColorSelection}
      height={this.state.heigth}
      />
    </div>
  );
}
}

export default App;
