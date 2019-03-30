import React, { Component } from 'react';
import StickyNote from '.././StickyNote';

export default class Modal extends Component {

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
  