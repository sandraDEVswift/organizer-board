import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/NavBar';
import DashBoard from './components/Dashboard';

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
          {title: 'board ',
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
          ]}
      ],
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
    this.setBoardSize()
  }

  componentWillUpdate() {
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
handleColorSelection(color) {
  this.setState({
    selectedOption: color
  });
  console.log('color selected: ' + color)
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
  this.setBoardSize()
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
      handleColorSelection={this.handleColorSelection}/>
    </div>
  );
}
}

export default App;
