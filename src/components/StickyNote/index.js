import React, { Component } from 'react';

export default class StickyNote extends Component {
   
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
        <div className="col-sm-4 margin30"
        onMouseEnter={() => this.onDisplay(true, this.boardId, this.itemId)}
        onMouseLeave={() => this.onDisplay(false, this.boardId, this.itemId)} >
            <div className= {`quote-container sticky big yellow item ${this.props.sticky.color} ${this.props.sticky.rotate }`}  style={{height: '160px'}}>
    
                    <blockquote>
                       {this.props.sticky.text}
                      <cite className="author"></cite>
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