import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from './../../actions/accountActions'

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
      this.props.signIn({
        email: this.state.email,
        password: this.state.password,
      });
    }
  }

  componentDidUpdate(){
    this.props.history.push('/')
  }

  render(){
    return (<div id="user-container">
        <h2>Sign In</h2>
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
          <button type="submit" disabled={this.props.account.loading}>
            {this.props.account.loading? 'Loading' : 'Sign In'}
          </button>
        </form>
      </div>);
  }

}

function bindStateToProps(state){
  return {account: state.account}
}

export default connect(bindStateToProps, {signIn})(UserContainer);
