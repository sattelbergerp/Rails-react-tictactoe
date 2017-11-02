import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserSignInForm from './UserSignInForm';

export default class UserContainer extends Component{

  render(){
    return (<div id="user-container">
        <Route path={`${this.props.match.url}/sign_in`} component={UserSignInForm} />
      </div>);
  }

}
