import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from './../../actions/accountActions'

class UserContainer extends Component{

  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  handleOnChange = (event)=>{
    this.setState({[event.target.id]: event.target.value});
  }

  handleOnSubmit = (event)=>{
    event.preventDefault();
    if(this.state.email && this.state.password){
      this.props.signUp({
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
      });
    }
  }

  componentDidUpdate(){
    if(this.props.account.loggedIn){
      this.props.history.push('/')
    }
  }

  render(){
    return (<div id="user-container">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="text" className="form-control" id="email"
              value={this.state.email} onChange={this.handleOnChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input type="password" className="form-control" id="password"
            value={this.state.password} onChange={this.handleOnChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password: </label>
            <input type="password" className="form-control" id="password_confirmation"
            value={this.state.password_confirmation} onChange={this.handleOnChange}/>
          </div>
          <button type="submit" disabled={this.props.account.loading}>
            {this.props.account.loading? 'Loading' : 'Sign Up'}
          </button>
        </form>
      </div>);
  }

}

function bindStateToProps(state){
  return {account: state.account}
}

export default connect(bindStateToProps, {signUp})(UserContainer);
