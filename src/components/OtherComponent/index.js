import React, { Component } from 'react';

//1 dot representing a sticky note on the board
export class StickyNode extends Component {
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
export class BoardNode extends Component {
    render() {
      return(
        this.props.notes.map((note, item) => {
          return <StickyNode note={note} key={item} />
      })  
    )
  }
}