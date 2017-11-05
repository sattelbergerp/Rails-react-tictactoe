import React, { Component } from 'react';
import { connect } from 'react-redux';
import Model from './../Modal'


class NewGameForm extends Component{

  constructor(){
    super();
    this.state = {
      name: ''
    }
  }

  handleOnChange = (event)=>{
    this.setState({[event.target.id]: event.target.value});
  }

  handleOnClose = ()=>{
    this.props.history.push('/');
  }

  render(){
    return (<div>
        <Model title="Create Game" onClose={this.handleOnClose} submitText="Create" loading={true}>
        <form onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name: </label>
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

  };
}

export default connect(null, {})(NewGameForm);
