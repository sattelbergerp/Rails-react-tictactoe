import React, { Component } from 'react';
import { connect } from 'react-redux';
import Model from './../../containers/Modal'
import {createGame} from './../../actions/gameActions'

class NewGameForm extends Component{

  constructor(){
    super();
    this.state = {
      name: ''
    }
  }

  componentDidUpdate(){
    if(this.props.inGame){
      this.props.history.push('/games/'+this.props.game.id);
    }
  }

  handleOnChange = (event)=>{
    if(event.target.id==="name" && event.target.value.length > 36)return;
    this.setState({[event.target.id]: event.target.value});
  }

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.createGame({name: this.state.name});
  }

  handleOnClose = ()=>{
    this.props.history.push('/');
  }

  render(){
    let errors= (<div></div>);
    if(this.props.errors.length > 0){
      errors = (<div className="alert alert-danger">{this.props.errors.map((error, index)=>{
        return (<p>{error}</p>);
      })}</div>);
    }
    return (<div>
        <Model title="Create Game" onClose={this.handleOnClose} submitText="Create" loading={this.props.loading} onSubmit={this.handleOnSubmit}>
        {errors}
        <form onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <span className="right">{this.state.name.length}/36</span>
            <input type="text" className="form-control" id="name"
              value={this.state.name} onChange={this.handleOnChange}/>
          </div>
        </form>
        </Model>
      </div>);
  }

}

function bindStateToProps(state){
  return {
    loading: state.game.loading,
    inGame: state.game.inGame,
    game: state.game.current,
    errors: state.game.errors
  };
}

export default connect(bindStateToProps, { createGame })(NewGameForm);
