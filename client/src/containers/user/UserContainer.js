import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserSignInForm from './UserSignInForm';
import UserSignUpForm from './UserSignUpForm';

export default class UserContainer extends Component{

  render(){
    return (<div id="user-container">
        <Route path={`${this.props.match.url}/sign_in`} component={UserSignInForm} />
        <Route path={`${this.props.match.url}/sign_up`} component={UserSignUpForm} />
      </div>);
  }

}
