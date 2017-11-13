import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp, clearErrors } from './../../actions/accountActions'

class UserContainer extends Component{

  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount(){
    this.props.clearErrors();
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

  handleOnClose = (event) => {
    this.props.history.push('/');
  }

  componentDidUpdate(){
    if(this.props.account.loggedIn){
      this.props.history.push('/')
    }
  }

  render(){
    let errors = (<div></div>);

    if(this.props.account.errors.length > 0){
      errors = (<div className="alert alert-danger">{this.props.account.errors.map((error, index)=>{
        return (<p>{error}</p>);
      })}</div>);
    }

    return (<div id="user-container">
        <h2>
          Sign Up
          <button type="button" className="close close-large right" onClick={this.handleOnClose} disabled={this.props.loading}>
            <span aria-hidden="true">&times;</span>
          </button>
        </h2>
        {errors}
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
          <button type="submit" className="btn btn-primary" disabled={this.props.account.loading}>
            {this.props.account.loading? 'Loading' : 'Sign Up'}
          </button>
        </form>
      </div>);
  }

}

function bindStateToProps(state){
  return {account: state.account}
}

export default connect(bindStateToProps, {signUp, clearErrors})(UserContainer);
