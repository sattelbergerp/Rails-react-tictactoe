import React, { Component } from 'react';
import { connect } from 'react-redux';
import {} from './../../actions/gameActions'

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
  }


  render(){
    let why = this.props.messages.map((msg, index) => {
      return msg.user.email+': '+msg.contents;
    }).join("\n");
    console.log(why);
    return (<div>
        <textarea rows="6" readonly="true" value={why} className="chatBox"/>

      </div>);
  }

}

function bindStateToProps(state){
  return {
    messages: state.game.messages
  };
}

export default connect(bindStateToProps, {})(ChatBox);
