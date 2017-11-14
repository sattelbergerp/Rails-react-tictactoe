import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from './../../actions/gameActions'

class ChatBox extends Component{

  constructor(){
    super();
    this.state = {
      msg: ''
    }
  }


  handleOnChange = (event)=>{
    this.setState({[event.target.id]: event.target.value});
  }

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.sendMessage(this.props.gameId, {contents: this.state.msg});
    this.setState({msg: ''});
  }


  render(){
    let contents = this.props.messages.slice().reverse().map((msg, index) => {
      if(msg)return msg.user.email+': '+msg.contents;
      else return "";
    }).join("\n");
    return (<div>
        <form onSubmit={this.handleOnSubmit}>
          <input type="text" className="form-control" id="msg" disabled={!this.props.inGame}
            value={this.state.msg} onChange={this.handleOnChange} placeholder="Say something..."/>
        </form>
        <textarea rows="6" readOnly="true" value={contents} className="chatBox"/>
      </div>);
  }

}

function bindStateToProps(state){
  return {
    messages: state.game.messages,
    gameId: state.game.current.id,
    inGame: state.game.inGame,
  };
}

export default connect(bindStateToProps, { sendMessage })(ChatBox);
