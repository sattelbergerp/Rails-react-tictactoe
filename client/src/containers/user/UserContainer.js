import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserSignInForm from './../../components/user/UserSignInForm';
import UserSignUpForm from './../../components/user/UserSignUpForm';
import UserInfoPage from './../../components/user/UserInfoPage';

export default class UserContainer extends Component{

  render(){
    return (<div className="overlay">
      <div id="user-container">
        <Switch>
            <Route path={`${this.props.match.url}/sign_in`}
              component={UserSignInForm} />
            <Route path={`${this.props.match.url}/sign_up`}
              component={UserSignUpForm} />
            <Route path={`${this.props.match.url}/:id`}
              component={UserInfoPage} />
        </Switch>
      </div>
    </div>);
  }

}
